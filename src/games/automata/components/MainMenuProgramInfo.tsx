import React from "react";
import MainMenuProgressBar from "./MainMenuProgressBar";
import "./MainMenuProgramInfo.css";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectIsSelectingUIState } from "../../../data/automata/properties";
import {
  selectSelectedCreatureCurrentProgramName,
  selectSelectedCreatureSelectingProgramName,
  selectSelectedCreatureCurrentProgramProcessTime,
  selectSelectedCreatureSelectingProgramProcessTime,
  selectSelectedCreatureCurrentProgramProgress,
} from "../../../data/automata/creatures";
import ProgramInfoBackground from "../images/MainMenu/display.png";

const MainMenuProgramInfo = () => {
  const currentProgramName = useAppSelector(
    selectSelectedCreatureCurrentProgramName
  );
  const selectingProgramName = useAppSelector(
    selectSelectedCreatureSelectingProgramName
  );
  const currentProgramProcessingTime = useAppSelector(
    selectSelectedCreatureCurrentProgramProcessTime
  );
  const selectingProgramProcessingTime = useAppSelector(
    selectSelectedCreatureSelectingProgramProcessTime
  );
  const currentProgramProgress = useAppSelector(
    selectSelectedCreatureCurrentProgramProgress
  );
  const isSelectingUIState = useAppSelector(selectIsSelectingUIState);
  return (
    <>
      <div className="main-menu-program-info-container">
        <img
          src={ProgramInfoBackground}
          className="main-menu-program-info-background"
        />
        <p className="main-menu-program-name-text">
          {isSelectingUIState ? selectingProgramName : currentProgramName}
        </p>
        <p className="main-menu-program-processing-time-text">
          {isSelectingUIState
            ? selectingProgramProcessingTime
            : currentProgramProcessingTime}
        </p>
      </div>
      <MainMenuProgressBar progress={currentProgramProgress} />
    </>
  );
};

export default MainMenuProgramInfo;
