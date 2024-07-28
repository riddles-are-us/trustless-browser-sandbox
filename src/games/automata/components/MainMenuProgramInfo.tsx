import React from "react";
import MainMenuProgressBar from "./MainMenuProgressBar";
import "./MainMenuProgramInfo.css";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectSelectedCreatureProgramName,
  selectSelectedCreatureProgramProgress,
  selectSelectedCreatureProgramProcessTime,
} from "../../../data/automata/creatures";
import ProgramInfoBackground from "../images/MainMenu/display.png";

const MainMenuProgramInfo = () => {
  const programName = useAppSelector(selectSelectedCreatureProgramName);
  const programProgress = useAppSelector(selectSelectedCreatureProgramProgress);
  const programProcessingTime = useAppSelector(
    selectSelectedCreatureProgramProcessTime
  );
  return (
    <>
      <div className="main-menu-program-info-container">
        <img
          src={ProgramInfoBackground}
          className="main-menu-program-info-background"
        />
        <p className="main-menu-program-name-text">{programName}</p>
        <p className="main-menu-program-processing-time-text">
          {programProcessingTime}
        </p>
      </div>
      <MainMenuProgressBar progress={programProgress} />
    </>
  );
};

export default MainMenuProgramInfo;
