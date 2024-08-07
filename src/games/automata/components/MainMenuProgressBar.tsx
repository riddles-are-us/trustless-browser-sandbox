import React from "react";
import progressBarBackground from "../images/MainMenu/circle_bg.png";
import bot from "../images/MainMenu/select_robot.png";
import "./MainMenuProgressBar.css";
import {
  selectSelectedCreatureCurrentProgram,
  selectSelectedCreatureSelectingProgram,
  formatTime,
} from "../../../data/automata/creatures";
import { ProgramModel } from "../../../data/automata/models";

interface Props {
  program: ProgramModel | null;
  progress: number;
}

const MainMenuProgressBar = ({ program, progress }: Props) => {
  progress = 50;
  return (
    <div className="main-progress-bar-container">
      <img
        src={progressBarBackground}
        className="main-progress-bar-background"
      />
      <img src={bot} className="main-progress-bot-image" />
      <p className="main-progress-bar-program-name-text">
        {program?.name ?? ""}
      </p>
      <p className="main-progress-bar-program-processing-time-text">
        {formatTime(program?.processingTime ?? 0)}
      </p>
      <div className="main-progress-container">
        <div
          className="main-progress-sector"
          style={{ height: `${progress}%` }}
        >
          <div className="main-progress-sector-top" />
          <div className="main-progress-sector-repeat" />
        </div>
      </div>
    </div>
  );
};

export default MainMenuProgressBar;
