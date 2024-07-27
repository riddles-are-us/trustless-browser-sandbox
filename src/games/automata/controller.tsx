import React, { useState, useEffect } from "react";
import { selectL2Account } from "../../data/accountSlice";
import { createCommand } from "./helper";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./style.scss";
import "../style.scss";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import { selectL1Account, loginL2AccountAsync } from "../../data/accountSlice";
import Gameplay from "./components/Gameplay";
import WelcomePage from "./components/WelcomePage";

import { getConfig, sendTransaction, queryState } from "./request";
import { UIState, selectUIState } from "../../data/automata/properties";

// clag
const CMD_INSTALL_PLAYER = 1n;

interface playerProperty {
  player_id: Array<string>;
  objects: Array<number>;
  local: Array<number>;
}

export function GameController() {
  const dispatch = useAppDispatch();
  const uIState = useAppSelector(selectUIState);

  const [inc, setInc] = useState(0);
  const l2account = useAppSelector(selectL2Account);

  async function createPlayer() {
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

  async function queryStateWithReboot() {
    if (l2account) {
      try {
        dispatch(queryState({ cmd: [], prikey: l2account!.address }));
      } catch (e) {
        if (e == "QueryStateError") {
          await createPlayer();
        } else {
          console.log("Error at query state " + e);
        }
      }
    }
    setInc(inc + 1);
  }

  useEffect(() => {
    dispatch(getConfig());
  }, [l2account]);

  useEffect(() => {
    setTimeout(() => {
      queryStateWithReboot();
    }, 1000);
  }, [inc]);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (l2account) {
        setProgress((p) => Math.min(p + 10, 100)); // 2% progress every 100ms for a total of 5 seconds
      }
    }, 100);
    return () => {
      clearInterval(interval);
      setProgress(0);
    };
  }, [l2account]);

  const account = useAppSelector(selectL1Account);

  if (l2account && uIState != UIState.Init) {
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
