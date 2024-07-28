import React, { useEffect, useState } from "react";
import circleBackground from "../images/backgrounds/circle.png";
import MainMenuSelectingFrame from "./MainMenuSelectingFrame";
import MainMenuBot from "./MainMenuBot";
import ConfirmButton from "./Buttons/ConfirmButton";
import "./MainMenu.css";
import RebootButton from "./Buttons/RebootButton";
import DiffResourcesInfo from "./DiffResourcesInfo";
import { getTransactionCommandArray } from "../rpc";
import { selectL2Account } from "../../../data/accountSlice";
import { sendTransaction } from "../request";
import {
  UIState,
  selectUIState,
  setUIState,
} from "../../../data/automata/properties";
import {
  isNotSelectingCreature,
  selectSelectedCreature,
  selectSelectedCreaturePrograms,
  selectSelectedCreatureListIndex,
} from "../../../data/automata/creatures";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import MainMenuWarning from "./MainMenuWarning";
import MainMenuProgramInfo from "./MainMenuProgramInfo";

const MainMenu = () => {
  const dispatch = useAppDispatch();
  const l2account = useAppSelector(selectL2Account);
  const uIState = useAppSelector(selectUIState);
  const notSelectingCreature = useAppSelector(isNotSelectingCreature);
  const selectedCreature = useAppSelector(selectSelectedCreature);
  const selectedCreaturePrograms = useAppSelector(
    selectSelectedCreaturePrograms
  );
  const showConfirmButton =
    (uIState == UIState.Creating || uIState == UIState.Reboot) &&
    selectedCreaturePrograms.every((program) => program !== null);
  console.log(selectedCreaturePrograms);
  const showRebootButton = uIState == UIState.Idle;
  const selectedCreatureIndexForRequestEncode = useAppSelector(
    selectSelectedCreatureListIndex
  );

  function onClickConfirm() {
    try {
      dispatch(
        sendTransaction({
          cmd: getTransactionCommandArray(
            selectedCreature.programIndexes.map((index) => index!),
            selectedCreatureIndexForRequestEncode,
            uIState == UIState.Creating
          ),
          prikey: l2account!.address,
        })
      );
    } catch (e) {
      console.log(`confirm ${uIState.toString()} error`);
    }
  }

  function onClickReboot() {
    dispatch(setUIState({ uIState: UIState.Reboot }));
  }

  return (
    <div className="main">
      <div className="main-content">
        <div className="main-info-container">
          <DiffResourcesInfo />
        </div>
        <div className="main-circle-container">
          <img src={circleBackground} className="main-circle-background" />
          {showConfirmButton && (
            <ConfirmButton onClick={() => onClickConfirm()} />
          )}
          {showRebootButton && <RebootButton onClick={() => onClickReboot()} />}
          <MainMenuSelectingFrame
            order={
              notSelectingCreature ? null : selectedCreature.currentProgramIndex
            }
            isStop={selectedCreature.isProgramStop}
          />
          {selectedCreaturePrograms.map((program, index) => (
            <MainMenuBot key={index} order={index} program={program} />
          ))}
          <MainMenuProgramInfo />
          <MainMenuWarning />
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
