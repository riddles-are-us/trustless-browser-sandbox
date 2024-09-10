import React, { useEffect, useMemo, useRef, useState, memo } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { Container, Row } from "react-bootstrap";
import { ClipRect, Clip, getBeat} from "./draw";
import { loadAudio2, loadAudio, AnalyserInfo, audioSystem} from "./audio";
import { scenario } from "./scenario";

import cover from "./images/towerdefence.jpg";

import {
  selectL2Account,
  selectL1Account,
  loginL2AccountAsync,
  loginL1AccountAsync
} from "../data/accountSlice";

import "./style.scss";

let progress = 0.001;

function draw(): void {
  const analyserInfo = audioSystem.play();
  if (scenario.status == "play" && analyserInfo!=null) {
      const ratioArray = getBeat(analyserInfo!);
      scenario.draw(ratioArray, {progress: progress});
      scenario.step(ratioArray);
  }
}

// Set the interval
const intervalId = setInterval(draw, 100); // 1000ms = 1 second

export function GameController() {
  const dispatch = useAppDispatch();
  const l2account = useAppSelector(selectL2Account);

  useEffect(() => {
    if (l2account) {
        scenario.status = "play";
        console.log(l2account);
    }
  }, [l2account]);

  useEffect(() => {
     dispatch(loginL1AccountAsync());
  }, []);

  const account = useAppSelector(selectL1Account);
  console.log("l1 account:", account);

  function handleDiscoShake() {
     progress += 0.02;
  }

  function handleDiscoJump() {
     progress += 0.02;
  }

  function handleDiscoSpin() {
     progress += 0.02;
  }

  function handleDiscoLFG() {
     progress += 0.02;
  }



  return (
    <>
      {!l2account && account &&
      <div className="center" id="stage">
        <Container className="mt-5">
            <button className="btn btn-confirm mb-5"
              onClick={() => {
                dispatch(loginL2AccountAsync(account!))
                loadAudio((ele) => {return ele;});
              }}
            > Connect and R.O.C.K</button>
        </Container>
      </div>
      }
      {l2account &&
        <div className="center" id="stage">
          <canvas id="canvas"></canvas>
          <div className="stage-buttons">
            <div className="button1" onClick={handleDiscoShake}></div>
            <div className="button2" onClick={handleDiscoJump}></div>
            <div className="button3" onClick={handleDiscoSpin}></div>
            <div className="button4" onClick={handleDiscoLFG}></div>
          </div>
        </div>

      }

    </>
  );
}
