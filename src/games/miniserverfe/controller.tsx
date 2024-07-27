import React, { useState, useEffect, useRef, memo } from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Col, Row, OverlayTrigger, Tooltip, Container } from "react-bootstrap";
import { selectL2Account } from "../../data/accountSlice";
import { CreateObjectModal } from "./createObject";
import { createCommand } from "./helper";
import { query, ZKWasmAppRpc, LeHexBN } from "zkwasm-ts-server";
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
import {getConfig, sendTransaction, setSelectedCreatureIndex} from "./thunk";

import cover from "./images/cover.jpg";

import { selectL1Account, loginL2AccountAsync } from "../../data/accountSlice";
import Loading from './load';

// clag
const CMD_INSTALL_PLAYER = 1n;

const rpc = new ZKWasmAppRpc("http://localhost:3000");

interface playerProperty {
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
  const [nonce, setNonce] = useState(0n);

  // modified modifier array
  const [dropList, setDropList] = useState<Array<number|null>>([null, null, null, null, null, null, null, null]);
  const [cacheDropList, setCacheObjDropList] = useState<Array<number|null>>([]);

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
    if(index != null && modifiersInfo && modifiersInfo[index]) {
      return (
        <div className="preview">
          <ProgramInfo
            name={modifiersInfo[index].name}
            entity = {modifiersInfo[index].entity}
            local = {modifiersInfo[index].local}
            delay = {modifiersInfo[index].delay} /
          >
        </div>
      )
    } else {
      return null;
    }
  }

  useEffect(() => {
    const cIndex = external.getSelectedIndex()
    if (cIndex) {
      if (external.userActivity == "creating") {
        setDropList([...cacheDropList]);
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

  function handleDragStart(event: DragStartEvent) {
    const {active} = event;
    setDraggingModifierIndex(Number(active.id));
  }

  function handleDragEnd(event: DragEndEvent) {
    const selected = event.active.id;
    if(event.over && typeof event.over.id == "string" && event.over.id.includes("droppable")) {
      const index = Number(event.over.id.replace("droppable", ""));
      const arr = [...dropList];
      arr[index] = Number(selected);
      setDropList(arr);
      setCacheObjDropList(arr);
    }
    setDraggingModifierIndex(null);
  }

  async function createPlayer() {
    try {
      // Get player id
      const data = query(l2account!.address);
      const playerId = new LeHexBN(data.pkx).toU64Array().join("");
      const playerIdHex = "0x" + BigInt(playerId).toString(16);
      setPlayerIds(playerIdHex);

      const insPlayerCmd = createCommand(0n, CMD_INSTALL_PLAYER, 0n);
      dispatch(sendTransaction({cmd: [insPlayerCmd, 0n, 0n, 0n], prikey: l2account!.address}));
    } catch(e) {
      dispatch(setErrorMessage("Error at create player " + e));
    }
  }

  function decodePlayerInfo(playerInfo: playerProperty) {
    setLocalValues(playerInfo.local);
  }

  async function queryStateWithReboot() {
    if (l2account) {
        await queryState(external.viewerActivity);
    }
    setInc(inc + 1);
  }

  async function queryState(clientAction: string) {
    try {
      const playerAction = external.userActivity;

      // Get the state response
      const res = await rpc.queryState(l2account!.address);

      // Parse the response to ensure it is a plain JSON object
      const parsedRes = JSON.parse(JSON.stringify(res));

      // Extract the data from the parsed response
      const data = JSON.parse(parsedRes.data);

      setNonce(BigInt(data[0].nonce));

      console.log("query state data", data);
      if(playerAction == "creating") {
        decodePlayerInfo(data[0].data);
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
        decodePlayerInfo(data[0].data);
        dispatch(setGlobalTimer(data[2]));
        if (clientAction == "monitoringResult") {
          dispatch(setUserActivity("browsing"));
          dispatch(setViewerActivity("queryingUpdate"));
        }
        setObjects(data[1]);
      } else if(playerAction == "loading") {
        decodePlayerInfo(data[0].data);
        dispatch(setGlobalTimer(data[2]));
        dispatch(setUserActivity("browsing"));
      } else {
        decodePlayerInfo(data[0].data);
        dispatch(setGlobalTimer(data[2]));
        setObjects(data[1]);

        if (clientAction == "idle") {
          dispatch(setViewerActivity("queryingUpdate"));

          if (data[1].length != 0) {
            dispatch(setSelectedCreatureIndex(0));
          }
        }
      } /* Very hard to handle after rebooting status
         else if(playerAction == "afterRebootBrowsing") {
          setObjects(data[1]);
          setShowModal(false);
          decodeObjectInfo(data[1][Number(highlightedId)]);
          setPlayerAction("browsing");
        }
         */
    } catch (e) {
      if (e == "QueryStateError") {
        await createPlayer();
      } else {
        dispatch(setErrorMessage("Error at query state " + e));
      }
    }
  }

  function clientLoaded() {
    return (external.userActivity!="loading");

  }

  function changeScrollRef() {
    // Scroll to bottom
    setTimeout(() => {
      if(scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 1000);
  }

  useEffect(() => {
    if (external.userActivity === "creating") {
      changeScrollRef();
    }
  }, [external.userActivity]);

  useEffect(() => {
    dispatch(getConfig());
  }, [l2account]);

  useEffect(() => {
    setTimeout(() => {
      queryStateWithReboot();
    }, 1000)
  }, [inc]);

  const account = useAppSelector(selectL1Account);

  if (l2account && clientLoaded()) {
    return (
      <div className="controller">
        <CreateObjectModal/>
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="errorAlert">
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
              <OverlayTrigger key={l2account!.address} placement="bottom"
                overlay={<Tooltip id={`tooltip-${playerIds}`}><strong>{l2account!.address}</strong>.</Tooltip>}
              >
                <div className="playerIds">
                  playerIds: {l2account!.address}
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
            <Explore objects={objects} modifiers={dropList} nonce={nonce}/>
            <div className="program">
              <div className="title">PROGRAM</div>
              <div className="draggableBox">
                <SortableContext
                  items={modifiersInfo.map((_, index) => index)}
                  strategy={verticalListSortingStrategy}
                >
                  { modifiersInfo.map((modifier, index) =>
                      <DragableModifier
                        key={index}
                        index={String(index)}
                        name={modifier.name}
                        entity = {modifier.entity}
                        local = {modifier.local}
                        delay = {modifier.delay}
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
  } else if (l2account) {
    return (<Container className="mt-5">
                <Loading/>
      </Container>)
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
