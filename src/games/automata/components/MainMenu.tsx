import React, { useEffect, useState } from "react";
import circleBackground from "../images/backgrounds/circle.png";
import display from "../images/MainMenu/display.png";
import MainMenuProgressBar from "./MainMenuProgressBar";
import MainMenuSelectingFrame from "./MainMenuSelectingFrame";
import MainMenuBot from "./MainMenuBot";
import ConfirmButton from "./Buttons/ConfirmButton";
import "./MainMenu.css";
import RebootButton from "./Buttons/RebootButton";
import DiffResourcesInfo from "./DiffResourcesInfo";
import { getTransactionCommandArray } from "../rpc";
import { selectL2Account } from "../../../data/accountSlice";
import { sendTransaction } from "../../../data/automata/request";
import {
  selectExternal,
  setErrorMessage,
  setUserActivity,
  setViewerActivity,
} from "../../../data/automata/properties";
import {
  isCreatingCreature,
  isSelectingCreatedCreature,
  selectSelectedCreature,
  selectSelectedCreaturePrograms,
  selectSelectedCreatureProgramProgress,
  selectSelectedCreatureListIndex,
} from "../../../data/automata/creatures";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

const MainMenu = () => {
  const dispatch = useAppDispatch();
  const external = useAppSelector(selectExternal);
  const l2account = useAppSelector(selectL2Account);
  const selectedCreature = useAppSelector(selectSelectedCreature);
  const selectedCreaturePrograms = useAppSelector(
    selectSelectedCreaturePrograms
  );
  const progress = useAppSelector(selectSelectedCreatureProgramProgress);
  const showConfirmButton = useAppSelector(isCreatingCreature);
  const showRebootButton = useAppSelector(isSelectingCreatedCreature);
  const selectedCreatureIndexForRequestEncode = useAppSelector(
    selectSelectedCreatureListIndex
  );

  function onClickConfirm() {
    try {
      dispatch(
        sendTransaction({
          cmd: getTransactionCommandArray(
            selectedCreature.programIndexes,
            selectedCreatureIndexForRequestEncode,
            external.userActivity == "creating"
          ),
          prikey: l2account!.address,
        })
      );
      dispatch(setViewerActivity("monitoringResult"));
    } catch (e) {
      dispatch(setErrorMessage(`confirm ${external.userActivity} error`));
    }
  }

  function onClickReboot() {
    dispatch(setUserActivity("rebooting"));
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
            order={selectedCreature.currentProgramIndex}
            isStop={selectedCreature.isProgramStop}
          />
          {selectedCreaturePrograms.map((program, index) => (
            <MainMenuBot key={index} order={index} program={program} />
          ))}
          <img src={display} className="main-display-image" />
          <MainMenuProgressBar progress={progress} />
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
