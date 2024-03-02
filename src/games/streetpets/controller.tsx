import init, * as gameplay from "./js";
import cheems from "../../images/cheems.jpg";
import cheemM01 from "../../images/cheems-monster-01.jpg";
import gameover from "../../images/gameover.png";

import React, { useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Button, Form, ProgressBar } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from 'react-bootstrap/InputGroup';
import {Transaction} from "../../components/Transaction";


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

import { ImageMD5 } from "./js/config";


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
  const commands = useAppSelector(selectCommands);

  const [merklePostRoot, setPostMerkleRoot] = useState<Array<bigint>>([0n,0n,0n,0n]);
  const [merklePreRoot, setPreMerkleRoot] = useState<Array<bigint>>([0n,0n,0n,0n]);
  const [witness, setWitness] = useState<Array<string>>([]);
  const [sigWitness, setSigWitness] = useState<Array<string>>([]);
  const [instance, setInstance] = useState<Array<string>>([]);
  const [state, setState] = useState<any>(null);

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

  function initGame(l2account: number) {
    (init as any)().then(() => {
      console.log("setting instance");
      console.log(gameplay);
      gameplay.init(BigInt(0));
      const tilesJsonStr = gameplay.get_tiles();
      const tiles = JSON.parse(tilesJsonStr);
      console.log(":tile:", tiles);
      dispatch(setLoaded(true));
      //drawObjects(objects);
    });
  }

  function move() {
    (init as any)().then(() => {
      console.log("moving ");
      const command = BigInt(1);
      gameplay.step(command)
      dispatch(appendCommand(command));
      const tilesJsonStr = gameplay.get_tiles();
      const tiles = JSON.parse(tilesJsonStr);
      console.log(":tile:", tiles);
    });

  }

  useEffect(() => {
    if (l2account) {
        if (gameLoaded == false) {
            initGame(Number(BigInt("0x" + l2account.address)));
        }
    }
  }, [l2account]);

  const msgToSign = useAppSelector(selectMessageToSigned);
  const msgHash = useAppSelector(selectMsgHash);

  useEffect(() => {
    if (l2account) {
        if (gameLoaded == false) {
            initGame(Number(BigInt("0x" + l2account.address)));
        }
    }
  }, [l2account]);


  return (
    <>
      <Button onClick={()=>{move()}}> Move</Button>
      <Row>
            {gameLoaded && state  &&
            <>
              Game Loaded
            </>
            }
      </Row>
      <Transaction md5={ImageMD5} ></Transaction>
    </>);
}
