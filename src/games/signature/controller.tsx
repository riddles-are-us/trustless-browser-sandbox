import init, * as gameplay from "./js";
import React, { useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import { ImageMD5 } from "./js/config";

import {
  selectL2Account,
} from "../../data/accountSlice";

import {
  selectGameLoaded,
  setLoaded,
  appendCommand,
  setReadyToSubmit,
  setMD5,
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

  function initGame(_l2account: number) {
    (init as any)().then(() => {
        dispatch(setMD5(ImageMD5));
        return
    });
  }

  function step(witness: number) {
    (init as any)().then(() => {
        //gameplay.step(BigInt(witness));
        dispatch(setLoaded(true));
        dispatch(appendCommand(BigInt(witness)));
        dispatch(setReadyToSubmit(true));
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
    <Container>
      <Row>
        <Col>
           <h3>Signataure Generator</h3>
        </Col>
      </Row>
      <Row>
        <Col>
            <Button className="float-end" onClick={()=>step(1)}>Add To Signature</Button>
        </Col>
      </Row>

    </Container>);
}
