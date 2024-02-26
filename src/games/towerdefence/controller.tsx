import init, * as gameplay from "./js";
import { drawObjects, drawTiles } from "./tile";

import React, { useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Button, Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from 'react-bootstrap/InputGroup';
import {Transaction} from "../../components/Transaction";
import { ImageMD5 } from "./js/config";


// ZKWASM RELATED STUFF
import { NewProveTask } from "../../modals/addNewProveTask";
import { selectCommands, selectMessageToSigned, selectMsgHash } from "../../data/game";
import { numToUint8Array, SignatureWitness } from "../../utils/proof";
import { PrivateKey, PublicKey, bnToHexLe } from "delphinus-curves/src/altjubjub";

import {
  selectL2Account,
} from "../../data/accountSlice";

import {
  selectGameLoaded,
  setLoaded,
  appendCommand,
} from "../../data/game";


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

  const [merklePostRoot, setPostMerkleRoot] = useState<Array<bigint>>([0n,0n,0n,0n]);
  const [merklePreRoot, setPreMerkleRoot] = useState<Array<bigint>>([0n,0n,0n,0n]);
  const [witness, setWitness] = useState<Array<string>>([]);
  const [instance, setInstance] = useState<Array<string>>([]);

  function updatePreMerkle(index: number, value: bigint) {
    const a = merklePreRoot;
    a[index] = value;
    setPreMerkleRoot(a);
  }

  function updatePostMerkle(index: number, value: bigint) {
    const a = merklePostRoot;
    a[index] = value;
    setPostMerkleRoot(a);
  }



  function loadGame(l2account: number) {
    (init as any)().then(() => {
      gameplay.load(
        BigInt(l2account),
        BigInt(merklePreRoot[0]),
        BigInt(merklePreRoot[1]),
        BigInt(merklePreRoot[2]),
        BigInt(merklePreRoot[3])
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
      const objs = gameplay.get_objects();
      console.log("objs", objs);

      let tiles = gameplay.get_tiles();
      tiles = JSON.parse(tiles);
      console.log("tiles", tiles);
      drawTiles(tiles);

      const objects = JSON.parse(objs);
      drawObjects(objects);
      dispatch(setLoaded(true));
    });
  }

  function stepMove() {
    (init as any)().then(() => {
      console.log("moving ");
      const command = (0n<<32n);
      dispatch(appendCommand(command));
      gameplay.step(command);
      const objs = gameplay.get_objects();
      console.log("objs", objs);
      let tiles = gameplay.get_tiles();
      tiles = JSON.parse(tiles);
      console.log("tiles", tiles);
      drawTiles(tiles);

      const objects = JSON.parse(objs);
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
                   onChange = {(event) => {updatePreMerkle(0, BigInt(event.target.value))}}
                />
               <Form.Control
                   as = "input"
                   onChange = {(event) => {updatePreMerkle(1, BigInt(event.target.value))}}
                />
               <Form.Control
                   as = "input"
                   onChange = {(event) => {updatePreMerkle(2, BigInt(event.target.value))}}
                />
               <Form.Control
                   as = "input"
                   onChange = {(event) => {updatePreMerkle(3, BigInt(event.target.value))}}
                />
               <InputGroup.Text
                   onClick = {() => {loadGame(Number(l2account!.toBigInt()))}}
                >
                Load Game</InputGroup.Text>
             </InputGroup>
             <InputGroup className="mb-3">
               <InputGroup.Text>Instances</InputGroup.Text>
               <Form.Control
                   as = "input"
                   value = {instance}
                   readOnly
                />
             </InputGroup>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
                <h3>Tower Defence with 12 * 8</h3>
        </Col>

        <Col>
            <Button className="float-end" onClick={()=>stepMove()}>Step</Button>
        </Col>

      </Row>
      <Row className="text-center">
          <Col>
      <canvas id="canvas" height="500" width="740"></canvas>
          </Col>
      </Row>
      <Transaction md5={ImageMD5} ></Transaction>
    </>);
}
