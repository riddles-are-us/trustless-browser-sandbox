import init, * as gameplay from "./js";
import { drawObjects, drawTiles, drawBullets, getTileIndex, getCor, inGrid } from "./tile";
import React, { useEffect, useMemo, useRef, useState, memo } from "react";
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

interface TowerProp {
  id: string;
  index: number;
  inventory: any;
}

function DroppableCanvas({ play, step, render }: { play: boolean; step: () => void; render: () => void }) {
  const { isOver, setNodeRef } = useDroppable({
    id: "canvan",
    data: {}
  });
  const gameReadyToSubmit = useAppSelector(selectReadyToSubmit);
  const l2account = useAppSelector(selectL2Account);
  const [timer, setTimer] = useState<number>(0);
  const gameLoaded = useAppSelector(selectGameLoaded);

  useEffect(() => {
    if (l2account && gameLoaded && play && !gameReadyToSubmit) {
      //console.log("timer...");
      setTimeout(() => {
        step();
        setTimer(timer + 1);
        render();
      }, 80)
    } else {
      setTimeout(() => {
        setTimer(timer + 1); // re-check in 80
      }, 80)
    }
  }, [timer]);

  return (
    <canvas ref={setNodeRef} id="canvas" height="480" width="720">
    </canvas>
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

function Monster({ monster }: { monster: any }) {
  <div>ABC</div>

}

let lastState: { frame: number, state: any } = {
  frame: 0,
  state: null
};
let nextState: any = null;

function setLastState(state: { frame: number, state: any }) {
  lastState = state;
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
  const [play, setPlay] = useState<boolean>(false);
  const [inventory, setInventory] = useState<Array<any>>([]);
  const [treasure, setTreasure] = useState<number>(0);
  const [valid, setValid] = useState<boolean>(false);
  const [monsterLeft, setMonsterLeft] = useState<number>(0);
  /*
  const [lastState, setLastState] = useState<{frame: number; state:any}>({frame: 0, state: null});
  const [nextState, setNextState] = useState<any>(null);
   */

  function setNextState(state: any) {
    nextState = state;
    if (nextState.treasure != treasure) {
      setTreasure(nextState.treasure);
    }
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
      setNextState(state);
      if (!play) {
        drawCanvas();
      }
    });
  }

  function upgradeInventory(index: number) {
    (init as any)().then(() => {
      let command = BigInt(2);
      command += (BigInt(index) << 8n);
      dispatch(appendCommand(command));
      gameplay.step(command);
      const stateStr = gameplay.get_state();
      const state = JSON.parse(stateStr);
      setInventory(state.inventory);
      setNextState(state);
    });
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

    const upgrade_cost = props.inventory["cost"] * props.inventory["upgrade_modifier"];



    return (
      <>
        {
          <div className="dragable-tile" >
            {props.inventory["cost"] <= nextState.treasure &&
              <div className="item item-unused" ref={setNodeRef} {...listeners} {...attributes} style={style}>{ele}</div>
            }
            {props.inventory["cost"] > nextState.treasure &&
              <div className="item item-used" {...attributes} style={style}>{ele}</div>
            }
            <div>cost {props.inventory["cost"]}</div>
            <div>power {tower.power}</div>
            <div>range {tower.range}</div>
            <div>cooldown {tower.cooldown}</div>
            <button onClick={() => upgradeInventory(props.index)} disabled={upgrade_cost > nextState.treasure}>upgrade ({upgrade_cost})</button>
          </div>
        }

      </>
    );
  }


  function initGame(l2account: number) {
    (init as any)().then(() => {
      console.log("setting instance");
      console.log(gameplay);
      gameplay.init(BigInt(l2account));
      const stateStr = gameplay.get_state();
      const state = JSON.parse(stateStr);
      console.log("state", state);
      setNextState(state);
      setInventory(state.inventory);
      setMonsterLeft(state.terminates);
      dispatch(setMD5(ImageMD5));
      dispatch(setLoaded(true));
    });
  }

  function startGame() {
    (init as any)().then(() => {
      console.log("start play");
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

        if (state.events.length != 0) {
          console.log("state", state);
        }
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
    });
  }

  function draw() {
    drawTiles(lastState.state.map.tiles);
    drawObjects(lastState.state.map, 12 - lastState.frame);
    if (nextState) {
      drawBullets(nextState.events, 12 - lastState.frame);
    }
    setMonsterLeft(lastState.state.terminates);
  }

  function drawPause() {
    drawTiles(nextState.map.tiles);
    drawObjects(nextState.map, 0);
  }

  function drawCanvas() {
    if (lastState && lastState.state) {
      draw();
    } else if (nextState) {
      drawPause();
    }
  }



  useEffect(() => {
    if (l2account) {
      if (gameLoaded == false) {
        initGame(Number(BigInt("0x" + l2account.address)));
      } else if (!play) {
        drawCanvas();
      }
    }
  }, [l2account, gameLoaded]);


  function handle_drop(event: DragEndEvent) {
    if (event.over && event.over!.data) {
      const over_top = event.over.rect.top;
      const over_left = event.over.rect.left;
      const src_cy = (
        event.active.rect.current.translated!.top +
        event.active.rect.current.translated!.bottom
      ) / 2;
      const src_cx = (
        event.active.rect.current.translated!.left +
        event.active.rect.current.translated!.right
      ) / 2;
      const offset_x = src_cx - over_left;
      const offset_y = src_cy - over_top;
      if (inGrid(offset_x, offset_y)) {
        const cor = getCor(offset_x, offset_y);
        const index = getTileIndex(cor[0], cor[1]);
        const feature = nextState.map.tiles[index].feature;
        if (feature) {
          return;
        } else {
          placeTower(event.active!.data.current!.index, index);
        }
      } else {
        setValid(false);
      }
    } else {
      //setValid(false);
    }
  }

  function handle_over(event: DragEndEvent) {
    if (event.over && event.over!.data) {
      const over_top = event.over.rect.top;
      const over_left = event.over.rect.left;
      const src_cy = (
        event.active.rect.current.translated!.top +
        event.active.rect.current.translated!.bottom
      ) / 2;
      const src_cx = (
        event.active.rect.current.translated!.left +
        event.active.rect.current.translated!.right
      ) / 2;
      const offset_x = src_cx - over_left;
      const offset_y = src_cy - over_top;
      if (inGrid(offset_x, offset_y)) {
        const cor = getCor(offset_x, offset_y);
        const index = getTileIndex(cor[0], cor[1]);
        const feature = nextState.map.tiles[index].feature;
        if (feature) {
          setValid(false);
          return;
        } else {
          setValid(true);
        }
      } else {
        setValid(false);
      }
    } else {
      //setValid(false);
    }
  }

  const Inventory = memo(
    function ({ inventory }: { inventory: Array<any> }) {
      return (
        <>
          {inventory.map((inventory, i) => {
            return <Draggable id={`inventory-${i}`} index={i} inventory={inventory} />
          })}
        </>
      );
    });

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
      {l2account &&
        <DndContext onDragEnd={handle_drop} onDragOver={handle_over}>
          <DragOverlay>
            {
              <div>
                {valid && <div className="position-indicator valid-position"></div>}
                {!valid && <div className="position-indicator invalid-position"></div>}
              </div>
            }
          </DragOverlay>
          <Container className="mt-5 mb-5">
            <Row>
              <Col>
                Treasure: {treasure}
              </Col>
              <Col>
                Monster Left {monsterLeft}
              </Col>
            </Row>
          </Container>
          <Row className="text-center">
            <Col>
              <DroppableCanvas play={play} step={step} render={drawCanvas}></DroppableCanvas>
            </Col>
          </Row>
          <Row className="justify-content-center mt-5">
            <Inventory inventory={inventory}></Inventory>
          </Row>

          {!play &&
            <Row className="justify-content-center mt-5">
              <Col md={2}>
                <Button onClick={() => startGame()} style={{ width: "100%" }}>Confirm</Button>
              </Col>
            </Row>
          }
        </DndContext>
      }

    </>
  );
}
