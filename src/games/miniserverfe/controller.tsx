import React, { useState, useEffect, useRef, memo } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { query_state } from "./rpc";
import { Col, Row, OverlayTrigger, Tooltip, Container } from "react-bootstrap";
import { selectL2Account } from "../../data/accountSlice";
import { CreateObjectModal } from "./createObject";
import { createCommand } from "./helper";
import { query, LeHexBN } from "./sign";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./style.scss";
import "../style.scss";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectExternal,
  selectLocalAttributes,
  selectModifier,
  setErrorMessage,
  setViewerActivity,
  setUserActivity,
  setGlobalTimer,
} from "./thunk";
import { ObjectProperty } from "./types";
import { Creature } from "./creature";
import { ProgramInfo } from "./modifier";
import { CreateButton } from "./opbutton";
import { ErrorAlert } from "./error";
import { Explore } from "./explore";
import { getConfig, sendTransaction, setSelectedCreatureIndex } from "./thunk";

import cover from "./images/cover.jpg";

import { selectL1Account, loginL2AccountAsync } from "../../data/accountSlice";
import Loading from "./load";
import Gameplay from "./Gameplay";
import OldGameplay from "./OldGameplay";

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

  // player related information
  const [playerIds, setPlayerIds] = useState("");
  const [localValues, setLocalValues] = useState<number[]>([]);
  const [objects, setObjects] = useState<Array<ObjectProperty>>([]);

  const [inc, setInc] = useState(0);
  const l2account = useAppSelector(selectL2Account);
  //const exploreBoxRef = useRef<HTMLDivElement>(null);

  async function createPlayer() {
    try {
      // Get player id
      const data = query(l2account!.address);
      const playerId = new LeHexBN(data.pkx).toU64Array().join("");
      const playerIdHex = "0x" + BigInt(playerId).toString(16);
      setPlayerIds(playerIdHex);

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
    setLocalValues(playerInfo.local);
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

      const data = JSON.parse(res.data);
      console.log("query state data", data);
      if (playerAction == "creating") {
        decodePlayerInfo(data[0]);
        dispatch(setGlobalTimer(data[2]));
        if (clientAction == "monitoringResult") {
          if (data[1].length == external.getSelectedIndex()! + 1) {
            dispatch(setUserActivity("browsing"));
            dispatch(setViewerActivity("queryingUpdate"));
            setObjects(data[1]);
          }
        } else {
          setObjects(data[1]);
        }
      } else if (playerAction == "rebooting") {
        decodePlayerInfo(data[0]);
        dispatch(setGlobalTimer(data[2]));
        if (clientAction == "monitoringResult") {
          dispatch(setUserActivity("browsing"));
          dispatch(setViewerActivity("queryingUpdate"));
        }
        setObjects(data[1]);
      } else if (playerAction == "loading") {
        decodePlayerInfo(data[0]);
        dispatch(setGlobalTimer(data[2]));
        dispatch(setUserActivity("browsing"));
      } else {
        decodePlayerInfo(data[0]);
        dispatch(setGlobalTimer(data[2]));
        setObjects(data[1]);

        if (clientAction == "idle") {
          dispatch(setViewerActivity("queryingUpdate"));

          if (data[1].length != 0) {
            dispatch(setSelectedCreatureIndex(0));
          }
        }
      } /* Very hard to handle after rebooting status
         else if(playerAction == "afterRebootBrowsing") {
          setObjects(data[1]);
          setShowModal(false);
          decodeObjectInfo(data[1][Number(highlightedId)]);
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

  const account = useAppSelector(selectL1Account);

  if (l2account && clientLoaded()) {
    return (
      <Gameplay
        playerIds={playerIds}
        address={l2account?.address}
        localValues={localValues}
        objects={objects}
      />
    );
    // return (
    //   <OldGameplay
    //     playerIds={playerIds}
    //     address={l2account?.address}
    //     localValues={localValues}
    //     objects={objects}
    //   />
    // );
  } else if (l2account) {
    return (
      <Container className="mt-5">
        <Loading />
      </Container>
    );
  } else {
    return (
      <Container className="mt-5">
        <div className="load-game">
          <img src={cover} width="100%"></img>
          <button
            className="btn btn-confirm"
            onClick={() => dispatch(loginL2AccountAsync(account!))}
          >
            {" "}
            Start Play{" "}
          </button>
        </div>
      </Container>
    );
  }
}
