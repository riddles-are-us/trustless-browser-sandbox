/* eslint-disable */
import React, { createRef, useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Form } from "react-bootstrap";
import * as gameplay from "../tdengine/pkg";
import HistoryTasks from "../components/History";
import { NewProveTask } from "../modals/addNewProveTask";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.scss";
import "bootswatch/dist/slate/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { MainNavBar } from "../components/Nav";
import InputGroup from 'react-bootstrap/InputGroup';
import { ModalOptions } from "../types/layout";
import { numToUint8Array, SignatureWitness } from "../utils/proof";
import { drawObjects, drawTiles } from "../render/tile";

import {
  //selectL1Account,
  selectL2Account,
} from "../data/accountSlice";
import BN from "bn.js";
import { PrivateKey, PublicKey, bnToHexLe } from "delphinus-curves/src/altjubjub";

export function Main() {
  const dispatch = useAppDispatch();
  const [currentModal, setCurrentModal] = useState<ModalOptions | null>(null);

  // Game related handlers for state
  const [commands, setCommands] = useState<Array<number>>([]);
  const [instances, setInstances] = useState<Array<string>>([]);
  const [location, setLocation] = useState<string>("loading...");
  const [reward, setReward] = useState<number>(0);

  // Signature Related
  const [signature, setSignature] = useState<Array<string>>([]);
  const [pubkey, setPubkey] = useState<Array<string>>([]);
  const [witness, setWitness] = useState<Array<string>>([]);

  // Game Loading Status
  const [merkleRoot, setMerkleRoot] = useState<Array<number>>([0,0,0,0]);
  const [loaded, setLoaded] = useState<boolean>(false);

  let l2account = useAppSelector(selectL2Account);

  function updateMerkle(index: number, value: number) {
    let a = merkleRoot;
    a[index] = value;
    setMerkleRoot(a);
  }

  function updateState() {
      //setTargets([Number(target0), Number(target1), Number(target2)]);
  }

  /* Test merkle root
     6411109203874391172
     12156582326191033569
     18190570047656100927
     2451350522329201736
  */

  function loadGame(l2account: number) {
          /*
      init().then((gameplay) => {
      gameplay.load(
          BigInt(l2account),
          BigInt(merkleRoot[0]),
          BigInt(merkleRoot[1]),
          BigInt(merkleRoot[2]),
          BigInt(merkleRoot[3])
      );
      //setTargets([Number(target0), Number(target1), Number(target2)]);
      setLoaded(true);
      }
           */
  }

  function initGame(l2account: number) {
      console.log("setting instance");
      console.log(gameplay);
      gameplay.init(BigInt(l2account));
      let objs = gameplay.get_objects();
      let num = gameplay.get_string();
      drawTiles();
      console.log("objs", objs);
      console.log("num", num);
      //drawObjects(objs[0]);
  };

  const msgToSign = () => {
    const buf = new Uint8Array(commands.length * 8);
    commands.map((v, i) => {
      buf.set(numToUint8Array(v), 8*i);
    });
    console.log(buf);
    return buf;
  }

  useEffect(() => {
    if (l2account) {
        if (loaded == false) {
            initGame(Number(BigInt("0x" + l2account.address)));
        } else {
            let msg = msgToSign();
            console.log(l2account);
            let prikey = PrivateKey.fromString(l2account.address);
            let signingWitness = new SignatureWitness(prikey, msg);
            setPubkey(signingWitness.pkey);
            setSignature(signingWitness.sig);
            let sig_witness:Array<string> = signingWitness.sig.map((v) => "0x" + v+ ":bytes-packed");
            let pubkey_witness:Array<string> = signingWitness.pkey.map((v) => "0x" + v+ ":bytes-packed");
            let witness = pubkey_witness;
            for (var s of sig_witness) {
                witness.push(s);
            }
            setWitness(witness);
        }
    }
  }, [l2account, location]);

  // Start or stop scrolling the background when the 'scroll' state changes

  return (
    <>
      <MainNavBar currency={0} handleRestart={()=>{}}></MainNavBar>
      <Container className="d-flex justify-content-center"></Container>
      <Container className="justify-content-center">
        <Row className="mt-3">
          <Col>
          </Col>
        </Row>
      </Container>

      {1 &&
          <Container style={{top: "10px"}}>
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
          </Container>
      }

      { 1 && (
        <>
          <Container style={{ position: "relative", top: "10px", paddingBottom:"100px"}}>
            <Row>
              <Col>
                  <canvas id="canvas" height="350" width="750"></canvas>
              </Col>
            </Row>
            <Form>
               <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">Reward: </InputGroup.Text>
                  <Form.Control
                      placeholder="reward"
                      aria-label="reward"
                      aria-describedby="basic-addon1"
                      value = {reward}
                      readOnly
                  />
              </InputGroup>

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
            <NewProveTask
              md5="EDDF817B748715A7F2708873D7346941"
              inputs={instances}
              witness={witness}
              OnTaskSubmitSuccess={()=>{}}
            ></NewProveTask>
          </Container>
          <Container>
            <HistoryTasks md5="EDDF817B748715A7F2708873D7346941"></HistoryTasks>
          </Container>
        </>
      )}
    </>
  );
}
