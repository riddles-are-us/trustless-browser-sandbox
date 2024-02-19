/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form } from "react-bootstrap";
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
import { GameController } from "../render/controller";
import { selectCommands, selectMessageToSigned } from "../data/game";

import {
  selectL2Account,
} from "../data/accountSlice";

import { PrivateKey, PublicKey, bnToHexLe } from "delphinus-curves/src/altjubjub";

export function Main() {
  const dispatch = useAppDispatch();
  const [currentModal, setCurrentModal] = useState<ModalOptions | null>(null);

  // Game related handlers for state
  let commands = useAppSelector(selectCommands);
  const [instances, setInstances] = useState<Array<string>>([]);
  const [location, setLocation] = useState<string>("loading...");
  const [reward, setReward] = useState<number>(0);

  // Signature Related
  const [signature, setSignature] = useState<Array<string>>([]);
  const [pubkey, setPubkey] = useState<Array<string>>([]);
  const [witness, setWitness] = useState<Array<string>>([]);

  let l2account = useAppSelector(selectL2Account);
  let msgToSign = useAppSelector(selectMessageToSigned);

  useEffect(() => {
    if (l2account) {
            let msg = msgToSign;
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
  }, [l2account, commands]);

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

      <Container>
      <GameController/>
      </Container>

      {1 &&
          <Container style={{top: "10px"}}>
          </Container>
      }

      { 1 && (
        <>
          <Container style={{ position: "relative", top: "10px", paddingBottom:"100px"}}>
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
