import init, * as gameplay from "./js";
import { drawObjects, drawTiles } from "./tile";
import cheems from "../../images/cheems.jpg";
import cheemM01 from "../../images/cheems-monster-01.jpg";

import React, { useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Button, Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from 'react-bootstrap/InputGroup';


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

  let l2account = useAppSelector(selectL2Account);
  let gameLoaded = useAppSelector(selectGameLoaded);
  let commands = useAppSelector(selectCommands);

  const [merklePostRoot, setPostMerkleRoot] = useState<Array<bigint>>([0n,0n,0n,0n]);
  const [merklePreRoot, setPreMerkleRoot] = useState<Array<bigint>>([0n,0n,0n,0n]);
  const [witness, setWitness] = useState<Array<string>>([]);
  const [instance, setInstance] = useState<Array<string>>([]);
  const [state, setState] = useState<any>(null);

  function updatePreMerkle(index: number, value: bigint) {
    let a = merklePreRoot;
    a[index] = value;
    setPreMerkleRoot(a);
  }

  function updatePostMerkle(index: number, value: bigint) {
    let a = merklePostRoot;
    a[index] = value;
    setPostMerkleRoot(a);
  }



  function loadGame(l2account: number) {
    (init as any)().then(() => {
      /*
      gameplay.load(
        BigInt(l2account),
        BigInt(merklePreRoot[0]),
        BigInt(merklePreRoot[1]),
        BigInt(merklePreRoot[2]),
        BigInt(merklePreRoot[3])
      );
      //setTargets([Number(target0), Number(target1), Number(target2)]);
      dispatch(setLoaded(true));
       */
    });
  }

  function initGame(l2account: number) {
    (init as any)().then(() => {
      console.log("setting instance");
      console.log(gameplay);
      gameplay.new_game();
      gameplay.challenge_next_floor();
      let stateStr = gameplay.state();
      let state = JSON.parse(stateStr);
            console.log(":state:", state);
      setState(state);
      dispatch(setLoaded(true));
      //drawObjects(objects);
    });
  }

  function pickCard(card_index: number) {
    (init as any)().then(() => {
      console.log("moving ");
      let command = (0n<<32n);
      gameplay.play_a_card(card_index)
      dispatch(appendCommand(command));
      let stateStr = gameplay.state();
      let state = JSON.parse(stateStr);
            console.log(":state:", state);
      setState(state);

      //gameplay.step(command);
      //let objs = gameplay.get_objects();
      //console.log("objs", objs);
    });

  }
  function endTurn() {
    (init as any)().then(() => {
      console.log("next round");
      let command = (0n<<32n);
      gameplay.end_turn();
      dispatch(appendCommand(command));
      let stateStr = gameplay.state();
      let state = JSON.parse(stateStr);
            console.log(":state:", state);
      setState(state);

      //gameplay.step(command);
      //let objs = gameplay.get_objects();
      //console.log("objs", objs);
    });

  }



  useEffect(() => {
    if (l2account) {
        if (gameLoaded == false) {
            initGame(Number(BigInt("0x" + l2account.address)));
        }
    }
  }, [l2account]);

  let msgToSign = useAppSelector(selectMessageToSigned);
  let msgHash = useAppSelector(selectMsgHash);

  useEffect(() => {
    if (l2account) {
       let msg = msgToSign;
       console.log(l2account);
       let prikey = PrivateKey.fromString(l2account.address);
       let signingWitness = new SignatureWitness(prikey, msg);
       let sig_witness:Array<string> = signingWitness.sig.map((v) => "0x" + v+ ":bytes-packed");
       let pubkey_witness:Array<string> = signingWitness.pkey.map((v) => "0x" + v+ ":bytes-packed");
       let witness = pubkey_witness;
       for (var s of sig_witness) {
           witness.push(s);
       }
       setWitness(witness);
            setInstance(["0x" + msgHash + ":bytes-packed"]);
       console.log("state is:", state);
    }
  }, [l2account, commands, state, gameLoaded]);



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
            {gameLoaded && state &&
            <>
              <Row>
                <Col>
                        <img src={cheems} width="100%"></img>
                </Col>
                <Col>
                        <p>Floor: {state.floor}</p>
                        <p>Hp: {state.hero_hp}</p>
                        <p>Block: {state.hero_block}</p>
                        <p>Power: {state.hero_power}</p>
                </Col>
                <Col>
                        <img src={cheemM01} width="100%"></img>

                </Col>
                <Col>
                        <p>Enemy: {state.enemy_name}</p>
                        <p>hp: {state.enemy_hp}</p>
                        <p>block: {state.enemy_block}</p>
                        <p>NextMove: {state.enemy_action.Myself.block}</p>
                </Col>
                <Col>
                      {state["hand_of_card"].map((card:any, i:number) => {
                    return <Button onClick={()=>{
                                  pickCard(i)
                          }}
                          >{card.name} (power {card.power})</Button>
                })}
                    <Button onClick={()=>endTurn()}>next round</Button>
                    </Col>

              </Row>
            </>
            }
      <Row>
        <Col>
            <NewProveTask
              md5="EDDF817B748715A7F2708873D7346941"
              inputs={instance}
              witness={witness}
              OnTaskSubmitSuccess={()=>{}}
            ></NewProveTask>
        </Col>


      </Row>
      <Row>
      </Row>
      <Row>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Movements</Form.Label>
            <Form.Control as="input" value = {
                      commands.map((x) => ` ${x}:i64`).join(";")
            } readOnly />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>PublicKey-X</Form.Label>
            <Form.Control as="input" value ={witness[0]} readOnly />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>PublicKey-Y</Form.Label>
            <Form.Control as="input" value ={witness[1]} readOnly />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Signature-X</Form.Label>
            <Form.Control as="input" value ={witness[2]} readOnly />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Signature-Y</Form.Label>
            <Form.Control as="input" value ={witness[3]} readOnly />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Signature-S</Form.Label>
            <Form.Control as="input" value ={witness[4]} readOnly />
          </Form.Group>
        </Form>

      </Row>
    </>);
}







