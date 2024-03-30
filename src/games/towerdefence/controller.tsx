import init, * as gameplay from "./js";
import { drawObjects, drawTiles } from "./tile";
import React, { useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Button, Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ImageMD5 } from "./js/config";
import { Container } from "react-bootstrap";
// import { loadAllImages } from "./imageUtil";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

// ZKWASM RELATED STUFF
import {
  selectCommands,
  selectMessageToSigned,
  selectMsgHash,
  setReadyToSubmit,
} from "../../data/game";

import cover from "./images/towerdefence.jpg";

import {
  selectL2Account,
  selectL1Account,
  loginL2AccountAsync,
} from "../../data/accountSlice";

import {
  selectGameLoaded,
  setLoaded,
  setMD5,
  appendCommand,
} from "../../data/game";

import { useDroppable } from "@dnd-kit/core";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import "./style.scss";

import droneImage from "./images/drone.gif";
// Within your component that receives `transform` from `useDraggable`:
//const style = {
//   transform: CSS.Translate.toString(transform),
//}
//

interface TileProp {
  index: number;
  id: string;
  children: React.ReactNode;
}

function Droppable(props: TileProp) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
    data: { index: props.index },
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
    if (props.inventory["object"]["Tower"]["direction"] == "Top") {
      return <i className="bi bi-arrow-up-square text-white text-white"></i>;
    } else if (props.inventory["object"]["Tower"]["direction"] == "Bottom") {
      return <i className="bi bi-arrow-down-square text-white"></i>;
    } else if (props.inventory["object"]["Tower"]["direction"] == "Left") {
      return <i className="bi bi-arrow-left-square text-white"></i>;
    } else if (props.inventory["object"]["Tower"]["direction"] == "Right") {
      return <i className="bi bi-arrow-right-square text-white"></i>;
    }
  })();

  const tower = props.inventory["object"]["Tower"];

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    data: { node: ele, index: props.index },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;
  const buttonStyle = {
    width: "150px",
    height: "220px",
    backgroundColor: "#082f49",
    ...style,
  };
  return (
    <>
      {!props.inventory["used"] && (
        <button
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          style={buttonStyle}
          className="bg-sky-600"
        >
          {ele}
          <p className="text-white">power {tower.power}</p>
          <p className="text-white">range {tower.range}</p>
          <p className="text-white">cooldown {tower.cooldown}</p>
          <div
            style={{
              backgroundImage: `url(${droneImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              width: "150px",
              height: "50px",
            }}
          ></div>
        </button>
      )}
      {props.inventory["used"] && (
        <button disabled={true}>
          {ele}
          <p>power {tower.power}</p>
          <p>range {tower.range}</p>
          <p>cooldown {tower.cooldown}</p>
          <div
            style={{
              backgroundImage: `url(${droneImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              width: "150px",
              height: "50px",
            }}
          ></div>
        </button>
      )}
    </>
  );
}

class TileInfo {
  feature: any;
  tower: any;
  id: string;
  index: number;
  constructor(index: number) {
    this.id = `tile-info-${index}`;
    (this.index = index), (this.feature = null);
    this.tower = null;
  }
}

interface TileInfoProp {
  tileInfo: TileInfo;
}

const tileWidth = 12;
const tileHeight = 8;
const tileSize = tileWidth * tileHeight;

function TileBlock(prop: TileInfoProp) {
  const tileInfo = prop.tileInfo;
  const { isOver, setNodeRef } = useDroppable({
    id: tileInfo.id,
    data: tileInfo,
  });

  if (tileInfo.feature) {
    return (
      <div ref={setNodeRef} className="droppable-tile">
        {tileInfo.feature}
      </div>
    );
  } else {
    return (
      <div ref={setNodeRef} className="droppable-tile">
        {tileInfo.tower}
      </div>
    );
  }
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
  const [timer, setTimer] = useState<number>(0);
  const [play, setPlay] = useState<boolean>(false);
  const [tiles, setTiles] = useState<Array<any>>(
    new Array(tileSize)
      .fill(new TileInfo(0))
      .map((value, index) => new TileInfo(index))
  );
  const [inventory, setInventory] = useState<Array<any>>([]);
  const [reward, setReward] = useState<number>(0);
  const [monsterLeft, setMonsterLeft] = useState<number>(0);

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
            tiles[i].feature = (
              <i className="bi bi-arrow-down-circle text-white"></i>
            );
          } else if (feature == "Top") {
            tiles[i].feature = (
              <i className="bi bi-arrow-up-circle text-white"></i>
            );
          } else if (feature == "Left") {
            tiles[i].feature = (
              <i className="bi bi-arrow-left-circle text-white"></i>
            );
          } else if (feature == "Right") {
            tiles[i].feature = (
              <i className="bi bi-arrow-right-circle text-white"></i>
            );
          }
        }
      }
      setInventory(state.inventory);
      setTiles(tiles);
      setMonsterLeft(state.terminates);
      dispatch(setMD5(ImageMD5));
      dispatch(setLoaded(true));
    });
  }

  async function stepMove() {
    await (init as any)().then(async () => {
      console.log("moving ");
      const command = 0n << 32n;
      dispatch(appendCommand(command));
      gameplay.step(command);

      const stateStr = gameplay.get_state();
      const state = JSON.parse(stateStr);
      console.log("state", state);
      // await loadAllImages();
      drawTiles(state.map.tiles);
      drawObjects(state.map.objects);
      setReward(state.treasure);
      setMonsterLeft(state.terminates);
      if (state.terminates == 0) {
        dispatch(setReadyToSubmit(true));
      }
    });
  }

  function placeTower(index: number, tileIndex: number) {
    (init as any)().then(() => {
      let command = BigInt(1);
      command += BigInt(index) << 8n;
      command += BigInt(tileIndex) << 16n;

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
    if (l2account && gameLoaded && play && timer < 200 && monsterLeft != 0) {
      console.log("timer...");
      setTimeout(() => {
        stepMove();
        setTimer(timer + 1);
      }, 1000);
    }
  }, [timer, play, monsterLeft]);

  function handle_drop(event: DragEndEvent) {
    const t = tiles.slice(0);
    if (event.over!.data) {
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

  const account = useAppSelector(selectL1Account);

  return (
    <>
      {!l2account && (
        <Container className="mt-5">
          <div className="load-game">
            <img src={cover} width="100%"></img>
            <button
              className="btn btn-confirm"
              onClick={() => dispatch(loginL2AccountAsync(account!))}
            >
              {" "}
              Start Play{" "}
            </button>
          </div>
        </Container>
      )}
      {l2account && !play && (
        <DndContext onDragEnd={handle_drop}>
          <Container className="mt-5">
            <Row className="justify-content-center">
              <Col>Drag to place your defending tower:</Col>
            </Row>
            <Row>
              <Col>
                {inventory.map((inventory, i) => {
                  return (
                    <Draggable
                      id={`inventory-${i}`}
                      index={i}
                      inventory={inventory}
                    />
                  );
                })}
              </Col>
            </Row>
            {Array.from({ length: 8 }, (_, j) => (
              <Row className="justify-content-center">
                {Array.from({ length: 12 }, (_, i) => (
                  <TileBlock key={i} tileInfo={tiles[j * 12 + i]}></TileBlock>
                ))}
              </Row>
            ))}
            <Row>
              <Button onClick={() => setPlay(true)}>Confirm</Button>
            </Row>
          </Container>
        </DndContext>
      )}
      {l2account && play && (
        <>
          <Container className="mt-5 text-white">
            <Row>
              <Col>Reward {reward}</Col>
              <Col>Monster Left {monsterLeft}</Col>
            </Row>
          </Container>
          <Row className="text-center">
            <Col>
              <canvas id="canvas" height="624" width="740"></canvas>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}
