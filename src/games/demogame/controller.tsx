import init, * as gameplay from "./js";
import React, { useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Button, ProgressBar, Container} from "react-bootstrap";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {
  selectL2Account,
  selectL1Account,
  loginL2AccountAsync,
} from "../../data/accountSlice";

import {
  selectGameLoaded,
  setLoaded,
  appendCommand,
  setReadyToSubmit,
  setMD5,
} from "../../data/game";

import { ImageMD5 } from "./js/config";

//--------------------------------------------
// Controller Related STUFF
// images:
import strtscrn from "./images/start_screen.png";
const stscrn = [strtscrn];

import backgnd from "./images/bg.png";
const bg = [backgnd];

import n0 from "./images/n0.png";
import n1 from "./images/n1.png";
import n2 from "./images/n2.png";
import n3 from "./images/n3.png";
import n4 from "./images/n4.png";
import n5 from "./images/n5.png";
import n6 from "./images/n6.png";
import n7 from "./images/n7.png";
import n8 from "./images/n8.png";
import n9 from "./images/n9.png";
const overlayNumbers = [n0,n1,n2,n3,n4,n5,n6,n7,n8,n9];


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
  const [currentNumber, setCurrentNumber] = useState(0);


  function initGame(l2account: number) {
    (init as any)().then(() => {
      console.log("setting instance");
      console.log(gameplay);
      setState(`Start guessing 🤔`);
      dispatch(setMD5(ImageMD5));
      dispatch(setLoaded(true));
      //drawObjects(objects);
    });
  }

  function guess_number(guessNumber: number) {
    (init as any)().then(() => {
        gameplay.step(BigInt(guessNumber));
        const globalstate = gameplay.get_state();
        if (globalstate == true) {
            setState(`Guessed Number: ${currentNumber} Correct! 🎉 `);
            dispatch(appendCommand(BigInt(guessNumber)));
            console.log("end guessing");
            dispatch(setReadyToSubmit(true));
        } else {
            setState(`Guessed Number: ${currentNumber} not correct - try again!`);
        }
    });

  }

  const account = useAppSelector(selectL1Account);

  useEffect(() => {
    if (l2account) {
        if (gameLoaded == false) {
            initGame(Number(BigInt("0x" + l2account.address)));
        }
    }
  }, [l2account]);


  return (
    <Container className="mt-5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {!l2account && (
        <div
        className="load-game"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <img
          src={stscrn[0]}
          style={{
            width: '794px',
            height: '529px',
          }}
        />
        <button
          className="btn btn-confirm"
          onClick={() => dispatch(loginL2AccountAsync(account!))}
        >
          Start Play
        </button>
      </div>
      )}
      {gameLoaded && state && 
        <div className="game-container" style={{ position: 'relative', width: '794px', height: '529px' }}>
          <div
            style={{
              backgroundImage: `url(${bg[0]})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              width: '100%',
              height: '100%',
              position: 'relative',
            }}
          >
            {/* Tens digit image */}
            <img
              src={overlayNumbers[Math.floor(currentNumber / 10)]}
              alt={`Tens Digit`}
              style={{
                position: 'absolute',
                top: '40%',
                left: '41%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
              }}
            />
            {/* Units digit image */}
            <img
              src={overlayNumbers[currentNumber % 10]}
              alt={`Units Digit`}
              style={{
                position: 'absolute',
                top: '40%',
                left: '59%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
              }}
            />
          </div>
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <input
              type="number"
              min="0"
              max="99"
              value={currentNumber}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                if (!isNaN(value) && value >= 0 && value <= 99) {
                  setCurrentNumber(value);
                }
              }}
              style={{ width: '100px', textAlign: 'center' }}
            />
            <Button className="mt-3" onClick={() => guess_number(currentNumber)}>
              Guess
            </Button>
            <Col>
              <h3 style={{ color: 'white' }}>{state}</h3>
            </Col>
          </div>
        </div>
      }
    </Container>
  );


}
