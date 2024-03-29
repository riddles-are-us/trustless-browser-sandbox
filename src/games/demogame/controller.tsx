import init, * as gameplay from "./js";
import React, { useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Button, ProgressBar, Container} from "react-bootstrap";

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


//--------------------------------------------
// Controller Related STUFF
// images:
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

  function initGame(_l2account: number) {
    (init as any)().then(() => {
            return
    });
  }

  function guess_number(guessNumber: number) {
    (init as any)().then(() => {
        gameplay.step(BigInt(guessNumber));
        const globalstate = gameplay.get_state();
        if (globalstate == true) {
            setState("🎉 Correct!");
            dispatch(appendCommand(BigInt(guessNumber)));
            console.log("end guessing");
            dispatch(setReadyToSubmit(true));
        } else {
            setState("Not correct - try again!");
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

  const [currentNumber, setCurrentNumber] = useState(0);

    return (
        <Container className="mt-5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div 
            className="game-container" 
            style={{
              position: 'relative',
              backgroundImage: `url(${bg[0]})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              width: '794px',
              height: '529px',
            }}
          >
            {/* Tens digit image */}
            <img 
              src={overlayNumbers[Math.floor(currentNumber / 10)]}
              alt={`Tens Digit`} 
              style={{
                position: 'absolute',
                top: '40%', // Center vertically
                left: '41%', // Center horizontally
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
                top: '40%', // Center vertically
                left: '59%', // Center horizontally
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
              }}
            />
          </div>
          
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
            className="mt-3"
            style={{width: '100px', textAlign: 'center'}}
          />
    
          {/* Button to trigger the step function */}
          <Button className="mt-3" onClick={() => guess_number(currentNumber)}>Guess</Button>

        <Col>
            <h3>Guessed Number {state}</h3>
        </Col>

        </Container>
      );



}
