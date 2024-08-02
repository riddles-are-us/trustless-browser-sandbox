import React, { useEffect, useState, useRef } from "react";
import MainMenuProgressBar from "./MainMenuProgressBar";
import "./MainMenuProgramInfo.css";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectIsSelectingUIState,
  selectGlobalTimer,
  UIState,
  selectUIState,
} from "../../../data/automata/properties";
import {
  selectSelectedCreatureCurrentProgram,
  selectSelectedCreatureSelectingProgram,
  formatTime,
} from "../../../data/automata/creatures";

import { ProgramModel } from "../../../data/automata/models";
import ProgramInfoBackground from "../images/MainMenu/display.png";

interface Props {
  program: ProgramModel | null;
  progress: number;
}

const MainMenuProgramInfo = ({ program, progress }: Props) => {
  return (
    <>
      <div className="main-menu-program-info-container">
        <img
          src={ProgramInfoBackground}
          className="main-menu-program-info-background"
        />
        <p className="main-menu-program-name-text">{program?.name ?? ""}</p>
        <p className="main-menu-program-processing-time-text">
          {formatTime(program?.processingTime ?? 0)}
        </p>
      </div>
      <MainMenuProgressBar progress={progress} />
    </>
  );
};

export default MainMenuProgramInfo;
