import React, { useState, useEffect } from "react";
import { query_state } from "./rpc";
import { selectL2Account } from "../../data/accountSlice";
import { createCommand } from "./helper";
import { query, LeHexBN } from "./sign";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./style.scss";
import "../style.scss";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import { selectL1Account, loginL2AccountAsync } from "../../data/accountSlice";
import Gameplay from "./components/Gameplay";
import WelcomePage from "./components/WelcomePage";

import { getConfig, sendTransaction } from "../../data/automata/request";
import {
  selectExternal,
  setErrorMessage,
  setViewerActivity,
  setUserActivity,
  setGlobalTimer,
} from "../../data/automata/properties";
import {
  setSelectedCreatureIndex,
  setCreatures,
  selectSelectedCreatureIndex,
} from "../../data/automata/creatures";
import { CreatureModel } from "../../data/automata/models";
import { setResources } from "../../data/automata/resources";

// clag
const CMD_INSTALL_PLAYER = 1n;

interface playerProperty {
  player_id: Array<string>;
  objects: Array<number>;
  local: Array<number>;
}

export function GameController() {
  const dispatch = useAppDispatch();
  const external = useAppSelector(selectExternal);

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
      dispatch(setErrorMessage("Error at create player " + e));
    }
  }

  function decodePlayerInfo(playerInfo: playerProperty) {
    dispatch(setResources({ resources: playerInfo.local }));
  }

  async function queryStateWithReboot() {
    if (l2account) {
      await queryState(external.viewerActivity);
    }
    setInc(inc + 1);
  }

  async function queryState(clientAction: string) {
    try {
      const playerAction = external.userActivity;

      const res = await query_state([], l2account!.address);
      const datas = JSON.parse(res.data);
      const [player, creatures, globalTimer] = datas;
      //console.log("query state data", datas.data);

      if (playerAction == "creating") {
        decodePlayerInfo(player.data);
        dispatch(setGlobalTimer(globalTimer));
        if (clientAction == "monitoringResult") {
          const selectedCreatureIndex = useAppSelector(
            selectSelectedCreatureIndex
          );
          // not too good
          if (selectedCreatureIndex == "Creating") {
            dispatch(setUserActivity("browsing"));
            dispatch(setViewerActivity("queryingUpdate"));
            dispatch(setCreatures({ creatures }));
          }
        } else {
          dispatch(setCreatures({ creatures }));
        }
      } else if (playerAction == "rebooting") {
        decodePlayerInfo(player.data);
        dispatch(setGlobalTimer(globalTimer));
        if (clientAction == "monitoringResult") {
          dispatch(setUserActivity("browsing"));
          dispatch(setViewerActivity("queryingUpdate"));
        }
        dispatch(setCreatures({ creatures }));
      } else if (playerAction == "loading") {
        decodePlayerInfo(player.data);
        dispatch(setGlobalTimer(globalTimer));
        dispatch(setUserActivity("browsing"));
      } else {
        decodePlayerInfo(player.data);
        dispatch(setGlobalTimer(globalTimer));
        dispatch(setCreatures({ creatures }));

        if (clientAction == "idle") {
          dispatch(setViewerActivity("queryingUpdate"));

          if (creatures.length != 0) {
            dispatch(setSelectedCreatureIndex({ index: 0 }));
          }
        }
      } /* Very hard to handle after rebooting status
         else if(playerAction == "afterRebootBrowsing") {
          dispatch(setCreatures({creatures}));
          setShowModal(false);
          decodeObjectInfo(creatures[Number(highlightedId)]);
          setPlayerAction("browsing");
        }
         */
    } catch (e) {
      if (e == "QueryStateError") {
        await createPlayer();
      } else {
        dispatch(setErrorMessage("Error at query state " + e));
      }
    }
  }

  function clientLoaded() {
    return external.userActivity != "loading";
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

  if (l2account && clientLoaded()) {
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
