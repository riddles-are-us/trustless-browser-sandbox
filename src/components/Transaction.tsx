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
import { PrivateKey } from "delphinus-curves/src/altjubjub";

import {
  selectL2Account,
} from "../data/accountSlice";

interface IProp {
    md5: string;
}

export function Transaction(prop: IProp) {
  let l2account = useAppSelector(selectL2Account);
  let gameLoaded = useAppSelector(selectGameLoaded);
  let commands = useAppSelector(selectCommands);

  const [merklePostRoot, setPostMerkleRoot] = useState<Array<bigint>>([0n,0n,0n,0n]);
  const [merklePreRoot, setPreMerkleRoot] = useState<Array<bigint>>([0n,0n,0n,0n]);
  const [witness, setWitness] = useState<Array<string>>([]);
  const [sigWitness, setSigWitness] = useState<Array<string>>([]);
  const [instance, setInstance] = useState<Array<string>>([]);


  let msgToSign = useAppSelector(selectMessageToSigned);
  let msgHash = useAppSelector(selectMsgHash);

  useEffect(() => {
    if (l2account && gameLoaded) {
       let msg = msgToSign;
       console.log(l2account);
       let prikey = PrivateKey.fromString(l2account.address);
       let signingWitness = new SignatureWitness(prikey, msg);
       let sig_witness:Array<string> = signingWitness.sig.map((v) => "0x" + v+ ":bytes-packed");
       let pubkey_witness:Array<string> = signingWitness.pkey.map((v) => "0x" + v+ ":bytes-packed");
       let commands_info = [`${commands.length}:i64`].concat(commands.map((v) => `${v}:i64`));
       let witness = pubkey_witness;
       for (var s of sig_witness) {
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


  return (
    <>
      <Row>
        <Col>
            <NewProveTask
              md5={prop.md5}
              inputs={instance}
              witness={witness}
              OnTaskSubmitSuccess={()=>{}}
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
