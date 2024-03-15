import init, * as gameplay from "./js";
import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Button, ProgressBar, Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../style.scss";
import "./style.scss";

// Controller Related STUFF
import { Card, Move } from "./card";
import cheems from "./images/cheems.jpg";
import cheemM01 from "./images/cheems-monster-01.jpg";
import cheemM02 from "./images/cheems-monster-02.jpg";
import gameover from "./images/gameover.png";
import d0 from "./images/d0.png";
import d1 from "./images/d1.png";
import d2 from "./images/d2.png";
import d3 from "./images/d3.png";
import d4 from "./images/d4.png";

export const LandingImage = cheems;


import {
  selectL2Account,
  selectL1Account,
  loginL2AccountAsync
} from "../../data/accountSlice";

import {
  selectGameLoaded,
  setLoaded,
  appendCommand,
  setReadyToSubmit,
  setMD5,
} from "../../data/game";

import { ImageMD5 } from "./js/config";

const bg = [d0,d1,d2,d3,d4];


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
  const [state, setState] = useState<any>(null);

  function loadGame(l2account: number) {
    (init as any)().then(() => {
      /*
      gameplay.load(
        BigInt(l2account),
        BigInt(merklePreRoot[0]),
        BigInt(merklePreRoot[1]),
        BigInt(merklePreRoot[2]),
        BigInt(merklePreRoot[3])
      );
      //setTargets([Number(target0), Number(target1), Number(target2)]);
      dispatch(setLoaded(true));
       */
    });
  }

  function initGame(l2account: number) {
    (init as any)().then(() => {
      console.log("setting instance");
      console.log(gameplay);
      gameplay.new_game();
      gameplay.challenge_next_floor();
      const stateStr = gameplay.state();
      const state = JSON.parse(stateStr);
            console.log(":state:", state);
      setState(state);
      dispatch(setMD5(ImageMD5));
      dispatch(setLoaded(true));
      //drawObjects(objects);
    });
  }

  function pickCard(card_index: number) {
    (init as any)().then(() => {
      console.log("moving ");
      const command = BigInt(card_index + 1);
      gameplay.play_a_card(card_index)
      dispatch(appendCommand(command));
      const stateStr = gameplay.state();
      const state = JSON.parse(stateStr);
            console.log(":state:", state);
      setState(state);
    });

  }
  function endTurn() {
    (init as any)().then(() => {
      console.log("next round");
      const command = (0n);
      gameplay.end_turn();
      dispatch(appendCommand(command));
      const stateStr = gameplay.state();
      const state = JSON.parse(stateStr);
            console.log(":state:", state);
      setState(state);
      if (state.hero_hp <= 0) {
          dispatch(setReadyToSubmit(true));
      } else if (state.enemy_hp <= 0) {
          gameplay.challenge_next_floor();
          const stateStr = gameplay.state();
          const state = JSON.parse(stateStr);
          console.log(":state:", state);
          setState(state);
      }

      //gameplay.step(command);
      //let objs = gameplay.get_objects();
      //console.log("objs", objs);
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
    <Container className="mt-5">
       {!l2account &&
          <div className="load-game">
              <img src={cheemM01} width="100%"></img>
              <button className="btn btn-confirm"
                  onClick={() => dispatch(loginL2AccountAsync(account!))}
               > Start Play </button>
          </div>
       }
       {gameLoaded && state &&
       <div className="game-container" style={{backgroundImage: `url(${bg[state.floor]})`}}>
         {state.hero_hp > 0 &&
         <>
         <Row className="mb-3 text-center">
           <Col>
               <h3>Floor: {state.floor}</h3>
           </Col>
         </Row>
         <Row className="mb-1 text-center">
           <Col className="p-2">
               {state["hand_of_card"].map((card:any, i:number) => {
                   return <button className="btn btn-light m-2" onClick={()=>{pickCard(i)}}><Card obj={card}></Card></button>
               })}
           </Col>
         </Row>
         <Row className="mb-1 text-center">
           <Col>
               <Button onClick={()=>endTurn()}>next round</Button>
           </Col>
         </Row>

         <Row className="mb-1">
           <Col></Col>
           <Col>
              <div className="status">
                      <div className="title">Hp:</div>
                 <ProgressBar now={state.hero_hp} label={`${state.hero_hp}`} />
              </div>

              <div className="status">
                      <div className="title">Block:</div>
                   <ProgressBar now={state.hero_block * 3} label={`${state.hero_block}`} />
              </div>
              <img className="mt-2" src={cheems} width="100%"></img>
              <div className="status mt-2">
                   <div className="title">Power</div>
                   <ProgressBar now={state.hero_power * 10} label={`${state.hero_power}`} />
              </div>

           </Col>
           <Col>
           </Col>
           <Col>
              <div className="status">
                   <div className="title">Hp: </div>
                   <ProgressBar now={state.enemy_hp} label={`${state.enemy_hp}`} />
              </div>
              <div className="status">
                      <div className="title">Block:</div>
                   <ProgressBar now={state.enemy_block * 3} label={`${state.enemy_block}`} />
              </div>
                   { state.floor %2 == 1 &&
                   <img src={cheemM01} className="mt-2" width="100%"></img>
                   }

                   { state.floor %2 == 0 &&
                   <img src={cheemM02} className="mt-2" width="100%"></img>
                   }
                   <div className="mt-2">{state.enemy_name}:
                           <Move obj ={state.enemy_action}></Move>
                   </div>


           </Col>
                 <Col></Col>

         </Row>

         </>
         }
         {state.hero_hp <= 0 &&
         <Row className="mb-3 text-center">
           <Col>
             <img src={gameover} width="500px"></img>
           </Col>
         </Row>
         }

       </div>
       }
    </Container>);
}
