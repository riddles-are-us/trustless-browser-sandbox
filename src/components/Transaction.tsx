import React, { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// ZKWASM RELATED STUFF
import { NewProveTask } from "../modals/addNewProveTask";
import {
    selectCommands,
    selectMessageToSigned,
    selectMsgHash,
    selectGameLoaded,
} from "../data/game";
import { SignatureWitness } from "../utils/proof";
import { Form } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';
import { PrivateKey } from "delphinus-curves/src/altjubjub";

import {
  selectL2Account,
} from "../data/accountSlice";

interface IProp {
    md5: string;
}

export function Transaction(prop: IProp) {
  const l2account = useAppSelector(selectL2Account);
  const gameLoaded = useAppSelector(selectGameLoaded);
  const commands = useAppSelector(selectCommands);

  const [merklePostRoot, setPostMerkleRoot] = useState<Array<bigint>>([0n,0n,0n,0n]);
  const [merklePreRoot, setPreMerkleRoot] = useState<Array<bigint>>([0n,0n,0n,0n]);
  const [witness, setWitness] = useState<Array<string>>([]);
  const [sigWitness, setSigWitness] = useState<Array<string>>([]);
  const [instance, setInstance] = useState<Array<string>>([]);


  const msgToSign = useAppSelector(selectMessageToSigned);
  const msgHash = useAppSelector(selectMsgHash);

  useEffect(() => {
    if (l2account && gameLoaded) {
       const msg = msgToSign;
       console.log(l2account);
       const prikey = PrivateKey.fromString(l2account.address);
       const signingWitness = new SignatureWitness(prikey, msg);
       const sig_witness:Array<string> = signingWitness.sig.map((v) => "0x" + v+ ":bytes-packed");
       const pubkey_witness:Array<string> = signingWitness.pkey.map((v) => "0x" + v+ ":bytes-packed");
       const commands_info = [`${commands.length}:i64`].concat(commands.map((v) => `${v}:i64`));
       const witness = pubkey_witness;
       for (const s of sig_witness) {
           witness.push(s);
       }
       setSigWitness(witness);
       setWitness(commands_info.concat(witness));
       setInstance(
           ["0x" + msgHash + ":bytes-packed"]
               .concat(merklePreRoot.map((x)=>`${x}:i64`))
               .concat(merklePostRoot.map((x)=>`${x}:i64`))
       );
    }
  }, [l2account, gameLoaded, commands]);

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
    return;
  }

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
            <NewProveTask
              md5={prop.md5}
              inputs={instance}
              witness={witness}
              OnTaskSubmitSuccess={()=>{return}}
            ></NewProveTask>
        </Col>
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
            <Form.Control as="input" value ={sigWitness[0]} readOnly />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>PublicKey-Y</Form.Label>
            <Form.Control as="input" value ={sigWitness[1]} readOnly />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Signature-X</Form.Label>
            <Form.Control as="input" value ={sigWitness[2]} readOnly />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Signature-Y</Form.Label>
            <Form.Control as="input" value ={sigWitness[3]} readOnly />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Signature-S</Form.Label>
            <Form.Control as="input" value ={sigWitness[4]} readOnly />
          </Form.Group>
        </Form>
      </Row>
    </>);
}
