/* eslint-disable no-var */
/* eslint-disable prefer-const */
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import initGameInstance from "./js/game";

import lotimage from "../../images/lot.jpg";

// ZKWASM RELATED STUFF
import { PrivateKey } from "delphinus-curves/src/altjubjub";
import { SignatureWitness, numToUint8Array } from "../../utils/proof";

import { selectL2Account } from "../../data/accountSlice";

export function GameController() {
  const dispatch = useAppDispatch();
  const [wasmInstance, setWasmInstance] = useState(null);
  const [currentModal, setCurrentModal] = useState(null);
  const [energy, setEnergy] = useState<number>(0);
  const [food, setFood] = useState<number>(0);
  const [targets, setTargets] = useState<Array<number>>([]);
  const [witness, setWitness] = useState<Array<string>>([]);
  const [commands, setCommands] = useState<Array<number>>([]);
  const [instances, setInstances] = useState<Array<string>>([]);
  const [location, setLocation] = useState<string>("loading...");
  const [reward, setReward] = useState<number>(0);
  const [signature, setSignature] = useState<Array<string>>([]);
  const [pubkey, setPubkey] = useState<Array<string>>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  let l2account = useAppSelector(selectL2Account);

  function updateState(ins: any) {
    let location = ins.get_location();
    let energy = ins.get_energy();
    let food = ins.get_food();
    console.log("location is", location);
    setLocation(location.toString());
    setEnergy(Number(energy));
    setFood(Number(food));
    let target0 = ins.get_target(0);
    let target1 = ins.get_target(1);
    let target2 = ins.get_target(2);
    setTargets([Number(target0), Number(target1), Number(target2)]);
  }

  function initGame(l2account: bigint) {
    initGameInstance().then((ins) => {
      console.log("setting instance");
      setWasmInstance(ins);
      ins.init(l2account);
      let location = ins.get_location();
      let energy = ins.get_energy();
      let food = ins.get_food();
      let reward = ins.get_reward();
      console.log("location is", location);
      setLocation(location.toString());
      setEnergy(Number(energy));
      setFood(Number(food));
      setReward(Number(reward));
      let target0 = ins.get_target(0);
      let target1 = ins.get_target(1);
      let target2 = ins.get_target(2);
      setTargets([Number(target0), Number(target1), Number(target2)]);
    });
  }

  const pickTarget = (i: number) => {
    console.log("pick location", i);
    let cmd = BigInt(0 + i * 256);
    initGameInstance().then((ins) => {
      ins.step(cmd);
      updateState(ins);
    });
    let cmds = commands;
    cmds.push(Number(cmd));
    setCommands(cmds);
  };

  const dig = () => {
    console.log("dig dig...");
    initGameInstance().then((ins) => {
      ins.step(BigInt(2));
      updateState(ins);
    });
    let cmds = commands;
    cmds.push(2);
    setCommands(cmds);
  };

  const regenerate = () => {
    console.log("dig dig...");
    initGameInstance().then((ins) => {
      ins.step(BigInt(1));
      updateState(ins);
    });
    let cmds = commands;
    cmds.push(1);
    setCommands(cmds);
  };

  const msgToSign = () => {
    const buf = new Uint8Array(commands.length * 8);
    commands.map((v, i) => {
      buf.set(numToUint8Array(v), 8 * i);
    });
    console.log(buf);
    return buf;
  };

  useEffect(() => {
    if (l2account) {
      if (loaded == false) {
        initGame(l2account.toBigInt());
        setLoaded(true);
      }
      let msg = msgToSign();
      console.log(l2account);
      let prikey = PrivateKey.fromString(l2account.address);
      let signingWitness = new SignatureWitness(prikey, msg);
      setPubkey(signingWitness.pkey);
      setSignature(signingWitness.sig);
      let sig_witness: Array<string> = signingWitness.sig.map(
        (v: string) => "0x" + v + ":bytes-packed"
      );
      let pubkey_witness: Array<string> = signingWitness.pkey.map(
        (v: string) => "0x" + v + ":bytes-packed"
      );
      let witness = pubkey_witness;
      for (var s of sig_witness) {
        witness.push(s);
      }
      setWitness(witness);
    }
  }, [l2account, location]);

  // Start or stop scrolling the background when the 'scroll' state changes

  return (
    <>
      {1 && (
        <>
          <Container
            style={{
              position: "relative",
              top: "10px",
              paddingBottom: "100px",
            }}
          >
            <Row>
              <Col>
                <img
                  style={{ width: "400px", display: "inline-block" }}
                  src={lotimage}
                ></img>
              </Col>
              <Col>
                {targets.map((o, i) => (
                  <InputGroup className="mb-2">
                    <Button onClick={() => pickTarget(i)}>
                      move to planet {o}{" "}
                    </Button>
                  </InputGroup>
                ))}
                <InputGroup className="mb-2">
                  <Button onClick={() => dig()}> Dig </Button>
                  <Button onClick={() => regenerate()}> Regenerate </Button>
                </InputGroup>
              </Col>
              <Col>
                <Form>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                      Current Location
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="location"
                      aria-label="location"
                      aria-describedby="basic-addon1"
                      value={location}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                      Energy:{" "}
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="energy"
                      aria-label="energy"
                      aria-describedby="basic-addon1"
                      value={energy}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Food: </InputGroup.Text>
                    <Form.Control
                      placeholder="food"
                      aria-label="food"
                      aria-describedby="basic-addon1"
                      value={food}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                      Reward:{" "}
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="reward"
                      aria-label="reward"
                      aria-describedby="basic-addon1"
                      value={reward}
                    />
                  </InputGroup>
                </Form>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
}
