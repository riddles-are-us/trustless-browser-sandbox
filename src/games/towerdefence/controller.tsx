import init, * as gameplay from "./js";
import { drawObjects, drawTiles } from "./tile";
import React, { useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Button, Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ImageMD5 } from "./js/config";
import { Container } from "react-bootstrap";

import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';

// ZKWASM RELATED STUFF
import { selectReadyToSubmit, selectCommands, selectMessageToSigned, selectMsgHash, setReadyToSubmit } from "../../data/game";

import cover from "./images/towerdefence.jpg";

import {
  selectL2Account,
  selectL1Account,
  loginL2AccountAsync
} from "../../data/accountSlice";

import {
  selectGameLoaded,
  setLoaded,
  setMD5,
  appendCommand,
} from "../../data/game";

import { useDroppable } from '@dnd-kit/core';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import "./style.scss";

// Within your component that receives `transform` from `useDraggable`:
//const style = {
//   transform: CSS.Translate.toString(transform),
//}
//

interface TileProp {
  index: number;
  id: string;
  children: React.ReactNode
}

function Droppable(props: TileProp) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
    data: { index: props.index }
  });

  return (
    <div ref={setNodeRef} className="droppable-tile">
      {props.index} - {props.children}
    </div>
  );
}

interface TowerProp {
  id: string;
  index: number;
  inventory: any;
}


function Draggable(props: TowerProp) {
  const ele = (() => {
    if (props.inventory["object"]["Tower"]["direction"] == 'Top') {
      return <i className="bi bi-arrow-up-square"></i>
    } else if (props.inventory["object"]["Tower"]["direction"] == 'Bottom') {
      return <i className="bi bi-arrow-down-square"></i>
    } else if (props.inventory["object"]["Tower"]["direction"] == 'Left') {
      return <i className="bi bi-arrow-left-square"></i>
    } else if (props.inventory["object"]["Tower"]["direction"] == 'Right') {
      return <i className="bi bi-arrow-right-square"></i>
    }
  })();

  const tower = props.inventory["object"]["Tower"];


  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    data: { node: ele, index: props.index }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <>
      {!props.inventory["used"] &&
        <div className="dragable-tile" >
          <div className="item item-unused" ref={setNodeRef} {...listeners} {...attributes} style={style}>{ele}</div>
          <div>power {tower.power}</div>
          <div>range {tower.range}</div>
          <div>cooldown {tower.cooldown}</div>
        </div>
      }
      {props.inventory["used"] &&
        <div className="dragable-tile">
          <div className="item item-used" {...attributes} style={style}>{ele}</div>
          <div>power {tower.power}</div>
          <div>range {tower.range}</div>
          <div>cooldown {tower.cooldown}</div>
        </div>
      }

    </>
  );
}

class TileInfo {
  feature: any;
  tower: any;
  spawner: any;
  collector: any;
  id: string;
  index: number;

  constructor(index: number) {
    this.id = `tile-info-${index}`;
    this.index = index,
      this.feature = null;
    this.tower = null;
    this.spawner = null;
    this.collector = null;
  }
}

interface TileInfoProp {
  tileInfo: TileInfo
}

const tileWidth = 12;
const tileHeight = 8;
const tileSize = tileWidth * tileHeight;

function TileBlock(prop: TileInfoProp) {
  const tileInfo = prop.tileInfo;
  const { isOver, setNodeRef } = useDroppable({
    id: tileInfo.id,
    data: tileInfo
  });

  if (tileInfo.tower) {
    return (
      <div ref={setNodeRef} className="droppable-tile">
        {tileInfo.tower}
      </div>
    )
  } else if (tileInfo.spawner) {
    return (
      <div ref={setNodeRef} className="droppable-tile">
        {tileInfo.spawner}
      </div>
    )
  } else if (tileInfo.collector) {
    return (
      <div ref={setNodeRef} className="droppable-tile">
        {tileInfo.collector}
      </div>
    )
  } else if (tileInfo.feature) {
    return (
      <div ref={setNodeRef} className="droppable-tile">
        {tileInfo.feature}
      </div>)
  } else {
    return (
      <div ref={setNodeRef} className="droppable-tile">
      </div>
    )
  }
}

function Monster({monster}: {monster: any}) {
  <div>ABC</div>

}
export function GameController() {
  // Game Loading Status
  /* Test merkle root
     6411109203874391172
     12156582326191033569
     18190570047656100927
     2451350522329201736
  */

  const dispatch = useAppDispatch();

  const l2account = useAppSelector(selectL2Account);
  const gameLoaded = useAppSelector(selectGameLoaded);
  const gameReadyToSubmit = useAppSelector(selectReadyToSubmit);

  const [timer, setTimer] = useState<number>(0);
  const [play, setPlay] = useState<boolean>(false);
  const [tiles, setTiles] = useState<Array<any>>(new Array(tileSize).fill(new TileInfo(0)).map((value, index) => new TileInfo(index)));
  const [inventory, setInventory] = useState<Array<any>>([]);
  const [valid, setValid] = useState<boolean>(false);
  const [reward, setReward] = useState<number>(0);
  const [monsterLeft, setMonsterLeft] = useState<number>(0);
  const [lastState, setLastState] = useState<{frame: number; state:any}>({frame: 0, state: null});
  const [nextState, setNextState] = useState<any>(null);

  function initGame(l2account: number) {
    (init as any)().then(() => {
      console.log("setting instance");
      console.log(gameplay);
      gameplay.init(BigInt(l2account));
      const stateStr = gameplay.get_state();
      const state = JSON.parse(stateStr);
      console.log("state", state);
      for (let i = 0; i < 96; i++) {
        const feature = state.map.tiles[i].feature;
        if (feature != null) {
          if (feature == "Bottom") {
            tiles[i].feature = <i className="bi bi-arrow-down-circle"></i>
          } else if (feature == "Top") {
            tiles[i].feature = <i className="bi bi-arrow-up-circle"></i>
          } else if (feature == "Left") {
            tiles[i].feature = <i className="bi bi-arrow-left-circle"></i>
          } else if (feature == "Right") {
            tiles[i].feature = <i className="bi bi-arrow-right-circle"></i>
          }
        }
      }
      for (const obj of state.map.objects) {
        const i = obj.position.x + obj.position.y * state.map.width;
        if (obj.object.Collector) {
          tiles[i].collector = <i className="bi bi-award-fill"></i>
        }
        if (obj.object.Spawner) {
          tiles[i].collector = <i className="bi bi-bug"></i>
        }
      }
      setInventory(state.inventory);
      setTiles(tiles);
      setMonsterLeft(state.terminates);
      dispatch(setMD5(ImageMD5));
      dispatch(setLoaded(true));
    });
  }

  function startGame() {
    (init as any)().then(() => {
      console.log("start play");
      const stateStr = gameplay.get_state();
      const state = JSON.parse(stateStr);
      setNextState(state);
      setPlay(true);
    });
  }

  function step() {
      (init as any)().then(() => {
        if (lastState.frame == 0) { // 12 frame per state change
          setLastState({
                  frame: 11,
                  state: nextState,
          }); // set the last state
          console.log("simulating ");
          const command = (0n << 32n);
          dispatch(appendCommand(command));
          gameplay.step(command);

          const stateStr = gameplay.get_state();
          const state = JSON.parse(stateStr);

          console.log("state", state);
          setNextState(state);

          if (state.terminates == 0) {
            dispatch(setReadyToSubmit(true));
          }
        } else {
          setLastState({
                  ...lastState,
                  frame: lastState.frame - 1,
          });
        }
        setTimer(timer+1);
    });
  }

  function draw() {
    drawTiles(lastState.state.map.tiles);
    drawObjects(lastState.state.map, 12 - lastState.frame);
    setReward(lastState.state.treasure);
    setMonsterLeft(lastState.state.terminates);
  }

  function placeTower(index: number, tileIndex: number) {
    (init as any)().then(() => {
      let command = BigInt(1);
      command += (BigInt(index) << 8n);
      command += (BigInt(tileIndex) << 16n);

      dispatch(appendCommand(command));
      gameplay.step(command);
      const stateStr = gameplay.get_state();
      const state = JSON.parse(stateStr);
      setInventory(state.inventory);
    });

  }

  useEffect(() => {
    if (l2account) {
      if (gameLoaded == false) {
        initGame(Number(BigInt("0x" + l2account.address)));
      }
    }
  }, [l2account]);

  useEffect(() => {
    if (l2account && gameLoaded && play && !gameReadyToSubmit && monsterLeft != 0) {
      console.log("timer...");
      setTimeout(() => {
        step();
      }, 80)
    }
  }, [timer, play, monsterLeft]);

  useEffect(() => {
      if(lastState && lastState.state) {
          draw();
      }
  }, [lastState]);


  function handle_drop(event: DragEndEvent) {
    const t = tiles.slice(0);
    if (event.over && event.over!.data) {
      const index = event.over!.data.current!.index;
      if (t[index].feature) {
        return;
      } else {
        t[index].tower = event.active.data.current!.node;
        placeTower(event.active!.data.current!.index, index);
        setTiles(t);
      }
    }
  }

  function handle_over(event: DragEndEvent) {
    const t = tiles.slice(0);
    if (event.over && event.over!.data) {
      const index = event.over!.data.current!.index;
      if (t[index].feature) {
        setValid(false);
        return;
      } else {
        setValid(true);
      }
    } else {
      //setValid(false);
    }
  }


  const account = useAppSelector(selectL1Account);

  return (
    <>
      {!l2account &&
        <Container className="mt-5">
          <div className="load-game">
            <img src={cover} width="100%"></img>
            <button className="btn btn-confirm"
              onClick={() => dispatch(loginL2AccountAsync(account!))}
            > Start Play </button>
          </div>
        </Container>
      }
      {l2account && !play &&
        <DndContext onDragEnd={handle_drop} onDragOver={handle_over}>
          <DragOverlay>
            {
              <div>
                {valid && <div className="position-indicator valid-position"></div>}
                {!valid && <div className="position-indicator invalid-position"></div>}
              </div>
            }
          </DragOverlay>
          <Container className="mt-5">
            <Row className="mb-5">
              <Col>
                Reward {reward}
              </Col>
              <Col>
                Monster Left {monsterLeft}
              </Col>
            </Row>
            {Array.from({ length: 8 }, (_, j) =>
              <Row className="justify-content-center">
                {Array.from({ length: 12 }, (_, i) =>
                  <TileBlock key={i} tileInfo={tiles[j * 12 + i]}></TileBlock>
                )
                }
              </Row>
            )}
            <Row className="justify-content-center mt-5">
              <Col>
                Drag to place your defending tower:
              </Col>
            </Row>
            <Row className="justify-content-center mt-5">
              {inventory.map((inventory, i) => {
                return <Draggable id={`inventory-${i}`} index={i} inventory={inventory} />
              })}
            </Row>
            <Row className="justify-content-center mt-5">
              <Col md={2}>
                <Button onClick={() => startGame()} style={{ width: "100%" }}>Confirm</Button>
              </Col>
            </Row>
          </Container>
        </DndContext>
      }
      {l2account && play &&
        <>
          <Container className="mt-5 mb-5">
            <Row>
              <Col>
                Reward {reward}
              </Col>
              <Col>
                Monster Left {monsterLeft}
              </Col>
            </Row>
          </Container>
          <Row className="text-center">
            <Col>
              <canvas id="canvas" height="500" width="740"></canvas>
            </Col>
          </Row>
          <Row className="justify-content-center mt-5">
            {inventory.map((inventory, i) => {
              return <Draggable id={`inventory-${i}`} index={i} inventory={inventory} />
            })}
          </Row>
        </>
      }
    </>
  );
}
