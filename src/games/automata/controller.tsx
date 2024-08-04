import React, { useState, useEffect, useRef } from "react";
import { selectL2Account } from "../../data/accountSlice";
import { createCommand } from "./helper";
// import "bootstrap/dist/css/bootstrap.min.css";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import { selectL1Account, loginL2AccountAsync } from "../../data/accountSlice";
import Gameplay from "./components/Gameplay";
import WelcomePage from "./components/WelcomePage";

import { getConfig, sendTransaction, queryState } from "./request";
import {
  UIState,
  selectUIState,
  setUIState,
} from "../../data/automata/properties";

// clag
const CMD_INSTALL_PLAYER = 1n;

export function GameController() {
  const dispatch = useAppDispatch();
  const uIState = useAppSelector(selectUIState);

  const [inc, setInc] = useState(0);
  const l2account = useAppSelector(selectL2Account);

  function createPlayer() {
    try {
      const insPlayerCmd = createCommand(CMD_INSTALL_PLAYER, 0n);
      dispatch(
        sendTransaction({
          cmd: [insPlayerCmd, 0n, 0n, 0n],
          prikey: l2account!.address,
        })
      );
    } catch (e) {
      console.log("Error at create player " + e);
    }
  }

  function updateState() {
    if (uIState >= UIState.Idle) {
      dispatch(queryState({ cmd: [], prikey: l2account!.address }));
    }
    setInc(inc + 1);
  }

  function loginProcess() {
    if (uIState == UIState.QueryConfig) {
      dispatch(getConfig());
    } else if (uIState == UIState.QueryState) {
      dispatch(queryState({ cmd: [], prikey: l2account!.address }));
    } else if (uIState == UIState.CreatePlayer) {
      createPlayer();
    }
  }

  useEffect(() => {
    if (l2account && uIState == UIState.Init) {
      dispatch(setUIState({ uIState: UIState.QueryConfig }));
    }
  }, [l2account]);

  useEffect(() => {
    loginProcess();
  }, [uIState]);

  useEffect(() => {
    setTimeout(() => {
      updateState();
    }, 1000);
  }, [inc]);

  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    const updateProgress = (timestamp: DOMHighResTimeStamp) => {
      if (startTimeRef.current === 0) {
        startTimeRef.current = timestamp;
      }

      const elapsedTime = timestamp - startTimeRef.current;
      const newProgress = Math.min(
        Math.ceil((elapsedTime / 500) * 10000) / 100,
        100
      );

      setProgress(newProgress);

      if (
        newProgress < 100 &&
        UIState.Init < uIState &&
        uIState < UIState.Idle
      ) {
        requestAnimationFrame(updateProgress);
      }
    };

    if (UIState.Init < uIState && uIState < UIState.Idle) {
      startTimeRef.current = 0;
      requestAnimationFrame(updateProgress);
    }

    return () => {
      startTimeRef.current = 0;
      setProgress(0);
    };
  }, [uIState]);

  const account = useAppSelector(selectL1Account);

  if (l2account && uIState >= UIState.Idle) {
    return <Gameplay />;
  } else {
    return (
      <>
        <WelcomePage
          progress={progress}
          onClick={() => dispatch(loginL2AccountAsync(account!))}
        />
      </>
    );
  }
}
