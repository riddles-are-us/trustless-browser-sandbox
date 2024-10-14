import React, { useEffect, useMemo, useRef, useState, memo } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { Container } from "react-bootstrap";
import { Player } from "./api";
import { ClipRect, Clip } from "./draw";
import { scenario } from "./scenario";

import { ReactComponent as GHOST} from "../images/mobs/ghost.svg";
import explorer from "../images/explorer.png";

import cover from "../images/logo.png";

import {
  selectL2Account,
  selectL1Account,
  loginL2AccountAsync,
  loginL1AccountAsync
} from "../data/accountSlice";

import "./style.scss";

function draw(): void {
        return;

}

// Set the interval
const intervalId = setInterval(draw, 100); // 1000ms = 1 second

export function GameController() {
  const dispatch = useAppDispatch();
  const l2account = useAppSelector(selectL2Account);
  const [state, setState] = useState<any|null>(null);
  const [player, setPlayer] = useState<Player|null>(null);
  const [waitingForSettle, setWaitingForSettle] = useState<boolean>(false);
  const [uiState, setUIState] = useState<"idle" | "waitingForSettle" | "waitingForConfirm">("idle");


  useEffect(() => {
    if (l2account) {
        //scenario.status = "play";
        console.log(l2account);
        const player = new Player(l2account.address, "http://localhost:3000");
        setPlayer(player)
        if(state == null) {
           initState(player);
        }
    }
  }, [l2account]);

  useEffect(() => {
     dispatch(loginL1AccountAsync());
  }, []);

  const account = useAppSelector(selectL1Account);
  console.log("l1 account:", account);

  async function initState(player: Player) {
    let state = await player.getState();
    if (state.player == null) {
      state = await player!.register();
    }
    setState(state);
  }


  async function getState() {
    const state = await player!.getState();
    setState(state);
  }

  async function chooseActivity(index: number) {
    try {
        setUIState("waitingForSettle");
        const state = await player!.place(BigInt(index));
        setState(state);
        setTimeout(()=>{fetchResult()}, 5000);
    } catch(e) {
        alert(e);
    }
  }

  async function resurrect() {
    try {
        const state = await player!.resurrect();
        setUIState("waitingForSettle");
        setState(state);
    } catch(e) {
        alert(e);
    }
  }


  async function fetchResult() {
    const newState = await player!.getState();
    if (newState.state.counter > state!.state.counter) {
      setState(newState);
      setUIState("idle");
    } else {
      setTimeout(()=>{fetchResult()}, 1000);
    }
  }

  interface Activity {
     name: string,
     value: string,
  }

  function getPlayerChoiceType(n: bigint): string {
    const BATTLE = 1n;
    const command = (n >> 32n) % 2n;
    if (command == BATTLE) {
      return "battle"
    } else {
      return "bounty"
    }
  }

  function getPlayerChoice (n: bigint): Array<Activity> {
      const CHOICE = 0n;
      const BATTLE = 1n;
      const command = (n >> 32n) % 2n;
      if (command == BATTLE) {
        return ([
          {
            name: "Fight !! Power -",
            value: ((n % 0xffn) + 1n).toString()
          },
          {
            name: "Escape !! Balance /",
            value: 2n.toString()
          }

        ]);
      } else {
        const bounty = (n >> 8n) % 256n;
        const supplier = n % 256n;
        return (
          [
            {name: "Balance +", value: bounty.toString()},
            {name: "Power +", value: supplier.toString()},
          ]);
      }
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
            { false && <div className="nav">current seed: {state!.state.rand_commitment}</div>}
            <div className="nav">current balance: {state!.player?.data.balance}</div>
            <div className="nav">current power: {state!.player?.data.power}</div>
            <div className="content">
            { uiState == "idle" && state!.player?.data.placed == 0 &&
              <>
              { getPlayerChoiceType(BigInt(state.player!.data.previous)) == "battle" &&
                <>
                <p className="mt-4 hint"> Spooky! </p>
                <GHOST></GHOST>
                </>
              }
              { getPlayerChoiceType(BigInt(state.player!.data.previous)) == "bounty" &&
                <>
                    <p className="mt-4 hint"> You have found a suspisious treasure box.</p>
                </>
              }
                <div className="foot">
                {getPlayerChoice(BigInt(state.player!.data.previous)).map((r,index) => {
                    return (<button onClick={()=>chooseActivity(index)}>{r.name} {r.value}</button>)
                })}
                { uiState == "idle" && state!.player?.data.power == 0 &&
                    <button onClick={()=>resurrect()}>resurrect</button>
                }
                </div>
              </>
            }
            {uiState == "waitingForSettle" &&
              <p className="mt-4 hint"> Continue Exploring</p>
            }
              <div className="explorer">
                <img  src={explorer}></img>
              </div>
            </div>
            </>
        }
        </div>

      }
    </>
  );
}
