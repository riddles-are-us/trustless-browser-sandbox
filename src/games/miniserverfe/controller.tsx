import React, { useState, useEffect, useRef, memo } from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { query_state, send_transaction } from "./rpc";
import { Col, Row, OverlayTrigger, Tooltip, Container } from "react-bootstrap";
import { selectL2Account } from "../../data/accountSlice";
import { CreateObjectModal } from "./createObject";
import { createCommand } from "./helper";
import { query, LeHexBN } from "./sign";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.scss";
import "../style.scss";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectExternal, selectLocalAttributes, selectModifier, setErrorMessage, setViewerActivity, setUserActivity, setGlobalTimer } from './thunk';
import { ObjectProperty} from './types';
import { Creature } from './creature';
import {ProgramInfo} from './modifier';
import {CreateButton} from './opbutton';
import {ErrorAlert} from './error';
import {Explore} from './explore';
import {getConfig} from "./thunk";

import cover from "./images/miniserver.png";

import { selectL1Account, loginL2AccountAsync } from "../../data/accountSlice";

// clag
const CMD_INSTALL_PLAYER = 1n;

interface playerProperty {
  player_id: Array<string>,
  objects: Array<number>,
  local: Array<number>
}

export function GameController() {

  const dispatch = useAppDispatch();
  const external = useAppSelector(selectExternal);
  const modifiersInfo = useAppSelector(selectModifier);

  // player related information
  const [playerIds, setPlayerIds] = useState("");
  const [localValues, setLocalValues] = useState<number[]>([]);
  const [objects, setObjects] = useState<Array<ObjectProperty>>([]);


  // modified modifier array
  const [dropList, setDropList] = useState<number[]>([]);
  const [emptyObjDropList, setEmptyObjDropList] = useState<number[]>([]);

  const [draggingModifierIndex, setDraggingModifierIndex] = useState<number|null>(null);

  const [inc, setInc] = useState(0);
  const l2account = useAppSelector(selectL2Account);
  //const exploreBoxRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);


  const localAttributes = useAppSelector(selectLocalAttributes);

  const DragableModifier = memo(
    function DragableModifier(props: any) {
      const {attributes, listeners, setNodeRef, transform, transition} = useSortable({
        id: props.index
      });
      const style = {
        transform: CSS.Transform.toString(transform),
        transition
      }
      return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="programItem">
          <ProgramInfo {...props}></ProgramInfo>
        </div>
      )
    });

   function Preview({index}: {index: number | null}) {
      if(index) {
        return (
          <div className="programItem">
            <ProgramInfo
              name={modifiersInfo[index][3]}
              entity = {modifiersInfo[index][1]}
              local = {modifiersInfo[index][2]}
              delay = {modifiersInfo[index][0]} /
            >
          </div>
        )
      } else {
        return null;
      }
    }

        /*
  useEffect(() => {
    let cIndex = external.getSelectedIndex()
    if (cIndex) {
      if (external.userActivity == "creating") {
         if(emptyObjDropList.length != 0) {
             setDropList([...emptyObjDropList]);
         }
      } else {
          const currentObj = objects[cIndex];
          const arr: number[]= [];
          currentObj.modifiers.map((modifier) => {
            arr.push(modifier);
          });
          setDropList(arr);
      }
    }
  }, [external]);
         */


  function handleDragStart(event: any) {
    const {active} = event;
    setDraggingModifierIndex(active.id);
  }

  function handleDragEnd(event: any) {
    const selected = event.active.id;
    if(event.over && typeof event.over.id == "string" && event.over.id.includes("droppable")) {
      const index = Number(event.over.id.replace("droppable", ""));
      const arr = [...dropList];
      arr[index] = selected;
      setDropList(arr);
      setEmptyObjDropList(arr);
    }
    setDraggingModifierIndex(null);
  }

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function createPlayer() {
    try {
      // Get player id
      const data = query(l2account!.address);
      const playerId = new LeHexBN(data.pkx).toU64Array().join("");
      const playerIdHex = "0x" + BigInt(playerId).toString(16);
      setPlayerIds(playerIdHex);

      const insPlayerCmd = createCommand(CMD_INSTALL_PLAYER, 0n);
      await send_transaction([insPlayerCmd,0n,0n,0n], l2account!.address);
      dispatch(setViewerActivity("queryingUpdate"));
    } catch(e) {
      dispatch(setErrorMessage("Error at create player " + e));
    }
  }

  function decodePlayerInfo(playerInfo: playerProperty) {
    setLocalValues(playerInfo.local);
  }

  async function queryStateWithReboot() {
    if(playerLoaded()) {
      await queryState(external.viewerActivity);
    }
    setInc(inc + 1);
  }

  async function queryState(clientAction: string) {
    try {
      const playerAction = external.userActivity;
      const res = await query_state([], l2account!.address);
      console.log("Query state", res);
      const data = JSON.parse(res.data);
      console.log("data", data);

      if(playerAction == "creating") {
        decodePlayerInfo(data[0]);
        dispatch(setGlobalTimer(data[2]));
        if (clientAction == "monitoringResult") {
          if(data[1].length == external.getSelectedIndex()! + 1) {
            dispatch(setUserActivity("browsing"));
            dispatch(setViewerActivity("queryingUpdate"));
            setObjects(data[1]);
          }
        } else {
          setObjects(data[1]);
        }
      } else if(playerAction == "rebooting") {
        decodePlayerInfo(data[0]);
        dispatch(setGlobalTimer(data[2]));
        if (clientAction == "monitoringResult") {
          dispatch(setUserActivity("browsing"));
          dispatch(setViewerActivity("queryingUpdate"));
        }
        setObjects(data[1]);
      } else {
        decodePlayerInfo(data[0]);
        dispatch(setGlobalTimer(data[2]));
        setObjects(data[1]);
      } /* Very hard to handle after rebooting status
         else if(playerAction == "afterRebootBrowsing") {
          setObjects(data[1]);
          setShowModal(false);
          decodeObjectInfo(data[1][Number(highlightedId)]);
          setPlayerAction("browsing");
        }
         */
    } catch (e) {
      dispatch(setErrorMessage("Error at query state " + e));
    }
  }

  function playerLoaded() {
    return (playerIds != "");
  }

  useEffect(() => {
    if(playerIds == "" && l2account) {
      createPlayer();
    }
    dispatch(getConfig());
  }, [l2account]);

  useEffect(() => {
    setTimeout(() => {
      queryStateWithReboot();
    }, 3000)
  }, [inc]);

  const account = useAppSelector(selectL1Account);

  if (l2account) {
    return (
      <div className="controller">
        <CreateObjectModal/>
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div style={{ left: "50%", transform: "translateX(-50%)", position: "absolute" }}>
            <ErrorAlert/>
          </div>
          <Row className="player">
            <Col className="local">
              {
                localAttributes.map((item, index) => {
                  return (
                    <OverlayTrigger key={index} placement="bottom"
                      overlay={<Tooltip id={`tooltip-${index}`}><strong>{item}</strong></Tooltip>}
                    >
                    <div className="localItem" key={index}>{item}:
                      {
                        localValues.length !=0 ? <span className="value">{localValues[index]}</span> :
                        <span className="value">0</span>
                      }
                    </div>
                    </OverlayTrigger>
                  )
                })
              }
            </Col>
            <Col xs={3}>
              <OverlayTrigger key={playerIds} placement="bottom"
                overlay={<Tooltip id={`tooltip-${playerIds}`}><strong>{playerIds}</strong>.</Tooltip>}
              >
                <div className="playerIds">
                  playerIds: {playerIds}
                </div>
              </OverlayTrigger>
            </Col>
          </Row>
          <div className="main">
            <div className="creatures">
              <div className="title">CREATURES</div>
              <div className="creatureBox" ref={scrollRef}>
                {
                  objects.map((item, index) =>
                    <Creature key={index} robot={item} index={index} />
                  )
                }
                <Creature key={objects.length} index = {objects.length} robot={{entity:[], object_id:[], modifiers: [], modifier_info:"0"}} />
              </div>
              <div className="createObject">
              {<CreateButton objects={objects} />}
              </div>
            </div>
            <Explore objects={objects} modifiers={dropList}/>
            <div className="program">
              <div className="title">PROGRAM</div>
              <div className="draggableBox">
                <SortableContext
                  items={modifiersInfo}
                  strategy={verticalListSortingStrategy}
                >
                  { modifiersInfo.map((item, index) =>
                      <DragableModifier
                        key={index}
                        id={item[3]}
                        name={item[3]}
                        entity = {item[1]}
                        local = {item[2]}
                        delay = {item[0]}
                      />
                    )
                  }
                </SortableContext>
                <DragOverlay>
                  <Preview index={draggingModifierIndex} />
                </DragOverlay>
              </div>
            </div>
          </div>
        </DndContext>
      </div>
    )
  } else {
    return (
      <Container className="mt-5">
        <div className="load-game">
          <img src={cover} width="100%"></img>
          <button className="btn btn-confirm"
            onClick={() => dispatch(loginL2AccountAsync(account!))}
          > Start Play </button>
        </div>
      </Container>
    )
  }
}
