import React, { useEffect, useMemo, useRef, useState, memo } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Container } from "react-bootstrap";
import { ClipRect, Clip, getBeat} from "./draw";
import { loadAudio, analyserInfo, AnalyserInfo} from "./audio";
import { scenario } from "./position";

import cover from "./images/towerdefence.jpg";

import {
  selectL2Account,
  selectL1Account,
  loginL2AccountAsync,
  loginL1AccountAsync
} from "../../data/accountSlice";

import "./style.scss";

function draw(): void {
  if (scenario.status == "play" && analyserInfo!=null) {
      const ratioArray = getBeat(analyserInfo!);
      scenario.draw(ratioArray);
      scenario.step(ratioArray);
  }
}

// Set the interval
const intervalId = setInterval(draw, 100); // 1000ms = 1 second

export function GameController() {
  const dispatch = useAppDispatch();
  const l2account = useAppSelector(selectL2Account);
  const [audio, setAudio] = useState<null|HTMLAudioElement>(null);

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

  return (
    <>
      {!l2account && account &&
        <Container className="mt-5">
          <div className="load-game">
            <img src={cover} width="100px"></img>
            <button className="btn btn-confirm"
              onClick={() => {
                dispatch(loginL2AccountAsync(account!))
                loadAudio((ele) => {setAudio(ele)});
              }}
            > Start Play </button>
          </div>
        </Container>
      }
      {l2account &&
        <div className="center">
          <canvas id="canvas"></canvas>
          <div className="stage-buttons">
          <div className="button1"></div>
          <div className="button2"></div>
          <div className="button3"></div>
          <div className="button4"></div>
          </div>
        </div>
      }

    </>
  );
}
