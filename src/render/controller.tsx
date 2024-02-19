import gameimage from "../js/gameplay_bg.wasm";
import init, * as gameplay from "../js";
import { drawObjects, drawTiles } from "../render/tile";

import React, { createRef, useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { Button, Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from 'react-bootstrap/InputGroup';

import {
  selectL2Account,
} from "../data/accountSlice";

import {
  selectGameLoaded,
  setLoaded,
  appendCommand,
} from "../data/game";


export function GameController() {
  // Game Loading Status
  /* Test merkle root
     6411109203874391172
     12156582326191033569
     18190570047656100927
     2451350522329201736
  */

  const dispatch = useAppDispatch();

  let l2account = useAppSelector(selectL2Account);
  let gameLoaded = useAppSelector(selectGameLoaded);

  const [merkleRoot, setMerkleRoot] = useState<Array<number>>([0,0,0,0]);

  function updateMerkle(index: number, value: number) {
    let a = merkleRoot;
    a[index] = value;
    setMerkleRoot(a);
  }

  function loadGame(l2account: number) {
    (init as any)().then(() => {
      gameplay.load(
        BigInt(l2account),
        BigInt(merkleRoot[0]),
        BigInt(merkleRoot[1]),
        BigInt(merkleRoot[2]),
        BigInt(merkleRoot[3])
      );
      //setTargets([Number(target0), Number(target1), Number(target2)]);
      dispatch(setLoaded(true));
    });
  }

  function initGame(l2account: number) {
    (init as any)().then(() => {
      console.log("setting instance");
      console.log(gameplay);
      gameplay.init(BigInt(l2account));
      let objs = gameplay.get_objects();
      console.log("objs", objs);

      let tiles = gameplay.get_tiles();
      tiles = JSON.parse(tiles);
      console.log("tiles", tiles);
      drawTiles(tiles);

      let objects = JSON.parse(objs);
      drawObjects(objects);
    });
  }

  function stepMove() {
    (init as any)().then(() => {
      console.log("moving ");
      let command = (0n<<32n);
      dispatch(appendCommand(command));
      gameplay.step(command);
      let objs = gameplay.get_objects();
      console.log("objs", objs);
      let tiles = gameplay.get_tiles();
      tiles = JSON.parse(tiles);
      console.log("tiles", tiles);
      drawTiles(tiles);

      let objects = JSON.parse(objs);
      drawObjects(objects);
    });

  }

  useEffect(() => {
    if (l2account) {
        if (gameLoaded == false) {
            initGame(Number(BigInt("0x" + l2account.address)));
        }
    }
  }, [l2account]);


  return (
    <>
      <Row>
        <Col>
           <Form>
             <InputGroup className="mb-3">
               <InputGroup.Text>Merkle Root 0</InputGroup.Text>
               <Form.Control
                   as = "input"
                   onChange = {(event) => {updateMerkle(0, Number(event.target.value))}}
                />
               <Form.Control
                   as = "input"
                   onChange = {(event) => {updateMerkle(1, Number(event.target.value))}}
                />
               <Form.Control
                   as = "input"
                   onChange = {(event) => {updateMerkle(2, Number(event.target.value))}}
                />
               <Form.Control
                   as = "input"
                   onChange = {(event) => {updateMerkle(3, Number(event.target.value))}}
                />
               <InputGroup.Text
                   onClick = {() => {loadGame(Number(l2account!.toBigInt()))}}
                >
                Load Game</InputGroup.Text>
             </InputGroup>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
        <button className="sell-button" onClick={(e)=>{stepMove()}}>step move</button>
        </Col>
      </Row>
      <canvas id="canvas" height="350" width="1024"></canvas>
    </>);
}







