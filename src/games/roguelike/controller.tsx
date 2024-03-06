import init, * as gameplay from "./js";
import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Button, Form, ProgressBar } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from 'react-bootstrap/InputGroup';
import {Transaction} from "../../components/Transaction";

// Controller Related STUFF
import { Card, Move } from "./card";
import cheems from "../../images/cheems.jpg";
import cheemM01 from "../../images/cheems-monster-01.jpg";
import gameover from "../../images/gameover.png";


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

      //gameplay.step(command);
      //let objs = gameplay.get_objects();
      //console.log("objs", objs);
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
      if (state.enemy_hp <= 0) {
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

  useEffect(() => {
    if (l2account) {
        if (gameLoaded == false) {
            initGame(Number(BigInt("0x" + l2account.address)));
        }
    }
  }, [l2account]);



  return (
    <>
            {gameLoaded && state  &&
            <>
              {state.hero_hp > 0 &&
              <>
              <Row className="mb-3">
                <Col>
                    <h3 className="float-start">Floor: {state.floor}</h3>
                    <Button className="float-end" onClick={()=>endTurn()}>next round</Button>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                        <img src={cheems} width="100%"></img>
                </Col>
                <Col>
                        <h4>Hp</h4>
                        <ProgressBar now={state.hero_hp} label={`${state.hero_hp}`} />
                        <h4 className="mt-2">Block</h4>
                        <ProgressBar now={state.hero_block * 3} label={`${state.hero_block}`} />
                        <h4 className="mt-2">Power</h4>
                        <ProgressBar now={state.hero_power * 10} label={`${state.hero_power}`} />
                </Col>
                <Col>
                        <img src={cheemM01} width="100%"></img>

                </Col>
                <Col>
                        <h4>Hp: {state.enemy_name}</h4>
                        <ProgressBar now={state.enemy_hp} label={`${state.enemy_hp}`} />
                        <h4 className="mt-2">Block</h4>
                        <ProgressBar now={state.enemy_block * 3} label={`${state.enemy_block}`} />
                        <h4 className="mt-2">NextMove:
                                <Move obj ={state.enemy_action}></Move>
                        </h4>
                </Col>
              </Row>
              <Row className="mb-5 text-center">
                <Col className="shadow-lg p-2">
                    {state["hand_of_card"].map((card:any, i:number) => {
                        return <button className="btn btn-light" onClick={()=>{pickCard(i)}}><Card obj={card}></Card></button>
                    })}
                </Col>
              </Row>
              </>
              }
              {state.hero_hp <= 0 &&
              <Row>
                <Col>
                  <img src={gameover} width="500px"></img>
                </Col>
              </Row>
              }
            </>
            }
      <Row>
        <Transaction md5={ImageMD5} ></Transaction>
      </Row>
    </>);
}
