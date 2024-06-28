import React, { useState, useEffect, useRef, memo } from 'react';
import { useAppSelector } from "../../app/hooks";
import { DndContext, useDroppable, DragOverlay } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { query_state, send_transaction, query_config } from "./rpc";
import { Alert, Col, Row, OverlayTrigger, Tooltip, ProgressBar } from "react-bootstrap";
import { selectL2Account } from "../../data/accountSlice";
import { CreateObjectModal } from "../../modals/createObject";
import { getModifierIndex, getHaltBit, encode_modifier, createCommand, getCounter } from "./helper";
import { query, LeHexBN } from "./sign";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.scss";

const CMD_INSTALL_PLAYER = 1n;
const CMD_INSTALL_OBJECT = 2n;
const CMD_RESTART_OBJECT = 3n;

interface Modifier {
   delay: number,
   entity: Array<number>,
   local: Array<number>,
   name: string,
}

interface ObjectProperty {
  entity: Array<number>,
  object_id: Array<string>,
  modifiers: Array<number>,
  modifier_info: string,
}

interface playerProperty {
  player_id: Array<string>,
  objects: Array<number>,
  local: Array<number>
}

export function GameController() {
  const [playerIds, setPlayerIds] = useState("");
  const [objects, setObjects] = useState<Array<ObjectProperty>>([]);
  const [dropList, setDropList] = useState<{id: number, action: string}[]>([]);
  const [emptyObjDropList, setEmptyObjDropList] = useState<{id: number, action: string}[]>([]);
  const [entityAttributes, setEntityAttributes] = useState<string[]>([]);
  const [localAttributes, setLocalAttributes] = useState<string[]>([]);
  const [localValues, setLocalValues] = useState<number[]>([]);
  const [modifiers, setModifiers] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [highlightedId, setHighlightedId] = useState("");
  const [currentModifierIndex, setCurrentModifierIndex] = useState<number>(0);
  const [objEntity, setObjEntity] = useState<Array<number>>([]);
  const [activeId, setActiveId] = useState("");
  const [parentW, setParentW] = useState(0);
  const [parentH, setParentH] = useState(0);
  const [haltBit, setHaltBit] = useState(0);
  const [haltPosition, setHaltPosition] = useState(0);
  const [playerAction, setPlayerAction] = useState<"browsing" | "creating" | "rebooting" | "afterRebootBrowsing">("browsing");
  const [inc, setInc] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [currentOperation, setCurrentOperation] = useState<"creation" | "reboot" | "">("");
  const l2account = useAppSelector(selectL2Account);
  const [worldTime, setWorldTime] = useState<number>(0);
  const exploreBoxRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const Creature = memo(
    function Creature({robot, index}: {robot: ObjectProperty, index: number}) {
      // Convert object_id to hex string
      const objId = robot.object_id.join("");
      const objHex = objId != "" ? "0x" + BigInt(objId).toString(16) : "";
      return (
        <OverlayTrigger key={index} placement="bottom"
          overlay={<Tooltip id={`tooltip-${index}`}><strong>{objHex}</strong></Tooltip>}
        >
          <div className="creature" key={index} id={String(index)} onClick={(e) => {handleHighlight(e);}} style={{ backgroundColor: String(index) === highlightedId ? "yellow" : "transparent" }}>
            <img className="creatureImg" src={require("./images/robot.png")} />
            <div className="objId">{ objHex }</div>
          </div>
        </OverlayTrigger>
      )
    });

  const CurrentModifierIndex = memo(
    function CurrentModifierIndex(props: any) {
      const currentMI = props.currentModifierIndex;

      return (
        <OverlayTrigger key={currentMI} placement="bottom"
          overlay={<Tooltip id={`tooltip-${currentMI}`}><strong>currentModifierIndex: {props.currentModifierIndex}</strong>.</Tooltip>}
        >
          <div className="currentModifierIndex">
            {props.currentModifierIndex}
          </div>
        </OverlayTrigger>
      )
    });

  const ObjectEntity = memo(
    function ObjectEntity({robot}: {robot: ObjectProperty[]}) {
      if(robot.length > 0) {
        return (
          <div className="entity">
            {
              objEntity.map((item, index) => {
                if(entityAttributes.length !=0) {
                  return <span key={index}>{entityAttributes[index]}: {item} </span>;
                } else {
                  return <span key={index}>loading</span>;
                }
              })
            }
          </div>
        )
      } else {
        return (
          <div className="entity"></div>
        )
      }
    });

  const CircleLayout = memo(
    function CircleLayout({ children }: { children: any }) {
      const angleStep = 360 / 8;
      return (
        <div className="exploreBox" ref={exploreBoxRef}>
          <CurrentModifierIndex currentModifierIndex={currentModifierIndex} />
          {children.map((child: any, index: any) => {
            const angle = angleStep * (index - 2);
            const r=200;
            const radians = (angle * Math.PI) / 180;
            const x = parentW / 2 - 50 + Math.cos(radians) * r;
            const y = parentH / 2 - 50  + Math.sin(radians) * r;
            const { setNodeRef } = useDroppable({
              id: "droppable" + index
            });

            return (
              <div
                ref={setNodeRef}
                key={index}
                style={{
                  position: 'absolute',
                  top: `${y}px`,
                  left: `${x}px`
                }}
              >
                {child}
              </div>
            );
          })}
        </div>
      );
    });

  const ProgramInfo = memo(
    function ProgramInfo(props: any) {
      const attrArray: any[] = [];
      {props.entity.map((item: any, index: number) => {
        if (item != 0) {
          const obj = {"entity": entityAttributes[index], "item": item};
          attrArray.push(obj);
        }
      })}
      {props.local.map((item: any, index: number) => {
        if (item != 0) {
          const obj = {"local": localAttributes[index], "item": item};
          attrArray.push(obj);
        }
      })}
      return (
        <div className="programInfo">
          <div>{props.name}({props.delay})</div>
          {
            Array.from({ length: 3 }).map((_, i) =>
              <div key={i}>
                {
                  Array.from({ length: 3 }).map((_, j) => {
                    if(attrArray[i * 3 + j] != undefined) {
                      const attr = attrArray[i * 3 + j];
                      if(attr.entity) {
                        return (
                          <div key={j}>[{attr.entity}:{attr.item}]</div>
                        )
                      } else if(attr.local) {
                        return (
                          <div key={j}>[{attr.local}:{attr.item}]</div>
                        )
                      }
                    }
                  })
                }
              </div>
            )
          }
        </div>
      )
    });

  const DragableModifier = memo(
    function DragableModifier(props: any) {
      const {attributes, listeners, setNodeRef, transform, transition} = useSortable({
        id: props.id
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

  const Preview = memo(
    function Preview(props: any) {
      const index = modifiers.findIndex(item => (item[3] == props.id));
      if(index != -1) {
        return (
          <div className="programItem">
            <ProgramInfo
              id={activeId}
              name={modifiers[index][3]}
              entity = {modifiers[index][1]}
              local = {modifiers[index][2]}
              delay = {modifiers[index][0]} /
            >
          </div>
        )
      } else {
        return null;
      }
    });

  const OperateButton = memo(
    function OperateButton(props: any) {
      const res = dropList.some(item => item.action == "");
      if(!res && (props.currentOperation == "creation" || props.currentOperation == "reboot")) {
        return <button className="confirm" onClick={() => {confirm();}}>Confirm</button>;
      } else if(props.currentOperation == "" && props.highlightedId != "-1" && props.highlightedId != ""){
        return <button className="reboot" onClick={() => {reboot();}}>Reboot</button>;
      } else if(props.highlightedId == "-1" && !res){
        return <button className="confirm" onClick={() => {confirm();}}>Confirm</button>;
      } else {
        return <div></div>;
      }
    });

  function NewButton(props: any) {
    if(!props.l2account) {
      return <div></div>;
    } else {
      if(props.highlightedId != "" && props.highlightedId != "-1") {
        return <button onClick={() => { handleCreateObject(); }}>NEW +</button>;
      } else {
        return <div></div>;
      }
    }
  }

  function Progress(props: any) {
    let progress = 0;
    const objects = props.objects;
    const highlightedId = props.highlightedId;
    if(objects.length > 0 && highlightedId != "-1") {
      const counter = getCounter(objects[Number(highlightedId)].modifier_info);
      progress = ((worldTime - counter) / props.delay) * 100;
    } else {
      progress = 0;
    }
    return <ProgressBar variant="info" now={progress} style={{marginTop:"10px"}} />;
  }

  function ErrorAlert() {
    return (
      <div>
        { show && (
          <Alert variant="danger" onClose={() => setShow(false)} dismissible style={{width: "200px"}}>
            <Alert.Heading>Error</Alert.Heading>
            <p>{error}</p>
          </Alert>
        )}
      </div>
    );
  }

  const handleHighlight = (e: any) => {
    if(e.currentTarget.id != "-1") {
      setHighlightedId(e.currentTarget.id);
      const currentObj = objects[e.currentTarget.id];
      const currentMIndex = getModifierIndex(currentObj.modifier_info);
      setCurrentModifierIndex(currentMIndex);
      setHaltPosition(currentMIndex);
      const haltBit = getHaltBit(currentObj.modifier_info);
      setHaltBit(haltBit);
      setObjEntity(currentObj.entity);
      const arr: {id: number, action: string}[]= [];
      currentObj.modifiers.map((modifier) => {
        arr.push({id: modifier, action: modifiers[modifier][3]});
      });
      setDropList(arr);
      setCurrentOperation("");
    }
  };

  function handleDragStart(event: any) {
    const {active} = event;
    setActiveId(active.id);
  }

  function handleDragEnd(event: any) {
    const selected = modifiers.findIndex((item) => item[3] == event.active.id);
    if(selected != -1) {
      if(event.over && typeof event.over.id == "string" && event.over.id.includes("droppable")) {
        const index = Number(event.over.id.replace("droppable", ""));
        const arr = [...dropList];
        arr[index] = {id: selected, action: modifiers[selected][3]};
        setDropList(arr);

        if(highlightedId == "-1") {
          setEmptyObjDropList(arr);
        }
      }
    }
    setActiveId("");
  }

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function queryStateWithRetry(retry: number, playerAction: string) {
    for (let i = 0; i< retry; i++) {
      await delay(2000);
      try {
        queryState(playerAction);
        break;
      } catch(e) {
        continue;
      }
    }
  }

  function allowCreateObject() {
    if(!l2account) {
      return "Please derive processing Key!";
    } else if(playerIds == "") {
      return "Please wait for getting player id!";
    } else {
      return "";
    }
  }

  async function createObject() {
    if(emptyObjDropList.length != 0) {
      setDropList([...emptyObjDropList]);
    } else {
      const arr = new Array(8).fill({"id": -1,"action": ""});
      setDropList(arr);
    }

    setShow(false);
    setHighlightedId("-1");
    setCurrentModifierIndex(0);
    setHaltPosition(0);
    setHaltBit(0);
    setObjEntity([]);
    setCurrentOperation("creation");

    // Scroll to bottom
    setTimeout(() => {
      if(scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 1000);
  }

  function handleCreateObject() {
    const res = allowCreateObject();
    if(res != "") {
      setShow(true);
      setError(res);
    } else {
      createObject();
    }
  }

  async function reboot() {
    setCurrentOperation("reboot");
  }

  async function confirm() {
    try {
      setShowModal(true);
      const currentMessage = "Waiting for " + currentOperation + "...";
      if(currentOperation == "") {
        setMessage("Waiting for creation...");
      } else {
        setMessage(currentMessage);
      }
      const index = dropList.slice().reverse().map((item) => {
        return BigInt(item.id);
      });
      const modifiers: bigint = encode_modifier(index);

      if(currentOperation == "creation" || currentOperation == "") {
        const objIndex = BigInt(objects.length);
        const insObjectCmd = createCommand(CMD_INSTALL_OBJECT, objIndex);
        await send_transaction([insObjectCmd, modifiers, 0n, 0n], l2account!.address);
        setPlayerAction("creating");
        await queryStateWithRetry(3, "creating");
      } else if(currentOperation == "reboot") {
        const restartObjectCmd = createCommand(CMD_RESTART_OBJECT, BigInt(highlightedId));
        await send_transaction([restartObjectCmd, modifiers, 0n, 0n], l2account!.address);
        setPlayerAction("rebooting");
        await queryStateWithRetry(3, "rebooting");
      }
      setCurrentOperation("");
    } catch(e) {
      setShow(true);
      setError("Error at create object " + e);
    }
  }
  async function createPlayer() {
    try {
      setShow(false);
      // Get player id
      const data = query(l2account!.address);
      const playerId = new LeHexBN(data.pkx).toU64Array().join("");
      const playerIdHex = "0x" + BigInt(playerId).toString(16);
      setPlayerIds(playerIdHex);

      const insPlayerCmd = createCommand(CMD_INSTALL_PLAYER, 0n);
      await send_transaction([insPlayerCmd,0n,0n,0n], l2account!.address);
      await queryStateWithRetry(3, playerAction);
    } catch(e) {
      setShow(true);
      setError("Error at create player " + e);
    }
  }

  function decodePlayerInfo(playerInfo: playerProperty) {
    setLocalValues(playerInfo.local);
  }

  function decodeObjectInfo(objectInfo: ObjectProperty) {
    setObjEntity(objectInfo.entity);
    const currentMIndex = getModifierIndex(objectInfo.modifier_info);
    setCurrentModifierIndex(currentMIndex);
    setHaltPosition(currentMIndex);
    const haltBit = getHaltBit(objectInfo.modifier_info);
    setHaltBit(haltBit);
  }

  async function queryStateWithReboot(playerAction: string) {
    if(playerLoaded() && !playerInAction(playerAction)) {
      await queryState(playerAction);
    }
    setInc(inc + 1);
  }

  async function queryState(playerAction: string) {
    try {
      const res = await query_state([], l2account!.address);
      console.log("Query state", res);
      const data = JSON.parse(res.data);
      console.log("data", data);
      if(playerInAction(playerAction)) {
        decodePlayerInfo(data[0]);
        setWorldTime(data[2]);
        if(data[1].length > 0) {
          if(playerAction == "creating") {
            setPlayerAction("browsing");
          } else if(playerAction == "rebooting") {
            setPlayerAction("afterRebootBrowsing");
          }
        }
      } else if(!playerInAction(playerAction)) {
        decodePlayerInfo(data[0]);
        setWorldTime(data[2]);

        if(playerAction == "browsing") {
          if(data[1].length == 0) {
            setHighlightedId("-1");
          } else if(data[1].length != objects.length) {
            setObjects(data[1]);
            const lastObjectIndex = data[1].length - 1;
            setShowModal(false);
            setHighlightedId(String(lastObjectIndex));
            decodeObjectInfo(data[1][lastObjectIndex]);

            // Set dropList
            const arr: {id: number, action: string}[]= [];
            data[1][lastObjectIndex].modifiers.map((modifier: number) => {
              arr.push({id: modifier, action: modifiers[modifier][3]});
            });
            setDropList(arr);
          } else if(data[1].length == objects.length){
            if(JSON.stringify(data[1]) != JSON.stringify(objects)) {
              setObjects(data[1]);
              if(highlightedId != "-1") {
                const currentMIndex = getModifierIndex(data[1][Number(highlightedId)].modifier_info);
                setCurrentModifierIndex(currentMIndex);
                setHaltPosition(currentMIndex);
                const haltBit = getHaltBit(data[1][Number(highlightedId)].modifier_info);
                setHaltBit(haltBit);
              }
            }
          }
        } else if(playerAction == "afterRebootBrowsing") {
          setObjects(data[1]);
          setShowModal(false);
          decodeObjectInfo(data[1][Number(highlightedId)]);
          setPlayerAction("browsing");
        }
      }
    } catch (e) {
      if(showModal) {
        setMessage("Error at query state " + e);
      } else {
        setShow(true);
        setError("Error at query state " + e);
      }
    }
  }

  async function queryConfig() {
    try {
      const res = await query_config();
      const data = JSON.parse(res.data);
      setEntityAttributes(data.entity_attributes);
      setLocalAttributes(data.local_attributes);
      setModifiers(data.modifiers);
      if(dropList.length == 0) {
        const arr = new Array(8).fill({"id": -1,"action": ""});
        setDropList(arr);
      }
    } catch(e) {
      setShow(true);
      setError("Error at query config " + e);
    }
  }

  function resizeChange() {
    if(exploreBoxRef.current) {
      setParentW(exploreBoxRef.current.offsetWidth);
      setParentH(exploreBoxRef.current.offsetHeight);
    }
  }

  function playerLoaded() {
    return (playerIds != "");
  }

  function playerInAction(playerAction: string) {
    return (playerAction != "browsing" && playerAction != "afterRebootBrowsing");
  }

  useEffect(() => {
    queryConfig();
    if(exploreBoxRef.current) {
      setParentW(exploreBoxRef.current.offsetWidth);
      setParentH(exploreBoxRef.current.offsetHeight);
    }
    window.addEventListener("resize", resizeChange);
  }, []);

  useEffect(() => {
    if(playerIds == "" && l2account) {
      createPlayer();
    }
  }, [l2account]);

  useEffect(() => {
    setTimeout(() => {
      queryStateWithReboot(playerAction);
    }, 3000)
  }, [inc]);

  return (
    <div className="controller">
      <CreateObjectModal showModal={showModal} message={message}></CreateObjectModal>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div style={{ left: "50%", transform: "translateX(-50%)", position: "absolute" }}>
          <ErrorAlert />
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
              { highlightedId == "-1" && <Creature key={-1} robot={{entity:[], object_id:[], modifiers: [], modifier_info:"0"}} index={-1} /> }
            </div>
            <div className="createObject">
            {<NewButton l2account={l2account} highlightedId={highlightedId} />}
            </div>
          </div>
          <div className="explore">
            <div className="tip">{<div>Please drag modifiers to fill the 8 grids!</div>}</div>
            {<ObjectEntity robot={objects} />}
            {
              <CircleLayout>
                {dropList.length != 0 ?
                  dropList.map((item, index) => {
                    let color = "";
                    if(item.action != "") {
                      if(haltBit == 1 && haltPosition == index) {
                        color = "red";
                      } else if((haltBit == 0 || haltBit == 2) && currentModifierIndex == index) {
                        color = "green";
                      } else {
                        color = "yellow";
                      }
                    }
                    const mIndex = modifiers.findIndex(modifier => (modifier[3] == item.action));
                    return (
                      <div key={index}>
                        <OverlayTrigger placement="bottom"
                        overlay={<Tooltip id={`tooltip-${index}`}>
                          {
                            mIndex != -1 ?
                            <div className="programItem">
                              <ProgramInfo
                                name={modifiers[mIndex][3]}
                                entity = {modifiers[mIndex][1]}
                                local = {modifiers[mIndex][2]}
                                delay = {modifiers[mIndex][0]}
                              >
                              </ProgramInfo>
                            </div> :
                            <strong>
                              {item.action}
                            </strong>
                          }
                        </Tooltip>}>
                          <div className="exploreItem" style={{backgroundColor: color}}>
                            {item.action}
                          </div>
                        </OverlayTrigger>
                        {mIndex != -1 && currentModifierIndex == index && highlightedId != "-1" && haltBit != 1 && <Progress highlightedId={highlightedId} objects={objects} delay={modifiers[mIndex][0]} />}
                      </div>
                    );
                  }) :
                  Array.from({ length: 8 }).map((_, index) =>
                    <OverlayTrigger key={index} placement="bottom"
                    overlay={<Tooltip id={`tooltip-${index}`}><strong></strong></Tooltip>}
                    >
                      <div key={index} className="exploreItem">
                      </div>
                    </OverlayTrigger>
                  )
                }
              </CircleLayout>
            }
            {<OperateButton highlightedId={highlightedId} haltBit={haltBit} currentOperation={currentOperation}></OperateButton>}
          </div>
          <div className="program">
            <div className="title">PROGRAM</div>
            <div className="draggableBox">
              <SortableContext
                items={modifiers}
                strategy={verticalListSortingStrategy}
              >
                { modifiers.map((item, index) =>
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
                <Preview id={activeId} />
              </DragOverlay>
            </div>
          </div>
        </div>
      </DndContext>
    </div>
  )
}