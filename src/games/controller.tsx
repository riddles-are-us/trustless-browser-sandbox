import React, { useEffect, useMemo, useRef, useState, memo } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { Container } from "react-bootstrap";
import { Player } from "./api";
import { ClipRect, Clip } from "./draw";
import { scenario } from "./scenario";

import cover from "../images/logo.png";

import {
  selectL2Account,
  selectL1Account,
  loginL2AccountAsync,
  loginL1AccountAsync
} from "../data/accountSlice";

import "./style.scss";

function draw(): void {
  if (scenario.status == "play") {
      scenario.draw();
      scenario.step();
  }
}

// Set the interval
const intervalId = setInterval(draw, 100); // 1000ms = 1 second

export function GameController() {
  const dispatch = useAppDispatch();
  const l2account = useAppSelector(selectL2Account);
  const [state, setState] = useState<any|null>(null);
  const [player, setPlayer] = useState<Player|null>(null);
  const [random, setRandom] = useState<string>("");


  useEffect(() => {
    if (l2account) {
        //scenario.status = "play";
        console.log(l2account);
        setPlayer(new Player(l2account.address, "http://localhost:3000"))
    }
  }, [l2account]);

  useEffect(() => {
     dispatch(loginL1AccountAsync());
  }, []);

  const account = useAppSelector(selectL1Account);
  console.log("l1 account:", account);

  async function getState() {
    const state = await player!.getState();
    setState(state);
  }

  async function deposit() {
    await player!.deposit(100n);
    await getState();
  }

  async function bet() {
    await player!.place(10n);
    await getState();
  }





  return (
    <>
      {!l2account && account &&
        <Container className="mt-5">
          <div className="load-game">
            <img src={cover} width="100px"></img>
            <button className="btn btn-confirm"
              onClick={() => {
                dispatch(loginL2AccountAsync(account!))
              }}
            > Start Play </button>
          </div>
        </Container>
      }
      {l2account &&
        <div className="center">
          {state &&
            <>
            <div>current seed: {state!.global.rand_commitment}</div>
            <div>current balance: {state!.player?.data.balance}</div>
            <div>waiting for result: {state!.player?.data.placed}</div>
            <div>settled result: {state!.player?.data.previous}</div>
            </>
          }
          <button onClick={getState}>get state</button>
          <button onClick={deposit}>deposit</button>
          <button onClick={bet}>bet</button>
        </div>
      }
    </>
  );
}
