import init, * as gameplay from "./js";
import React, { useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {
  selectL2Account,
} from "../../data/accountSlice";

import {
  selectGameLoaded,
  setLoaded,
  appendCommand,
  setReadyToSubmit,
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

  const [state, setState]  = useState<string>("false");

  function initGame(_l2account: number) {
    (init as any)().then(() => {
            return
    });
  }

  function step(guessNumber: number) {
    (init as any)().then(() => {
        gameplay.step(BigInt(guessNumber));
        const globalstate = gameplay.get_state();
        if (globalstate == true) {
            setState("true");
            dispatch(appendCommand(BigInt(guessNumber)));
            console.log("end guessing");
            dispatch(setReadyToSubmit(true));
        } else {
            setState("false");
        }
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
           <h3>Guess Number</h3>
        </Col>

        <Col>
           <h3>Guesssed Number {state}</h3>
        </Col>

        <Col>
            <Button className="float-end" onClick={()=>step(1)}>Guess 1</Button>
            <Button className="float-end" onClick={()=>step(2)}>Guess 2</Button>
            <Button className="float-end" onClick={()=>step(11)}>Guess 11</Button>
        </Col>

      </Row>
      <Row className="text-center">
          <Col>
      <canvas id="canvas" height="500" width="740"></canvas>
          </Col>
      </Row>
    </>);
}
