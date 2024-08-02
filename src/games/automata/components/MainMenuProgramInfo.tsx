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
import ProgramInfoBackground from "../images/MainMenu/display.png";

const MainMenuProgramInfo = () => {
  const uIState = useAppSelector(selectUIState);
  const isSelectingUIState = useAppSelector(selectIsSelectingUIState);
  const globalTimer = useAppSelector(selectGlobalTimer);
  const [elapsedTime, setElapsedTime] = useState(0);
  const startTimeRef = useRef<number>(0);

  const resetElapsedTime = () => {
    startTimeRef.current = 0;
    setElapsedTime(0);
  };

  useEffect(() => {
    const updateProgress = (timestamp: DOMHighResTimeStamp) => {
      if (startTimeRef.current === 0) {
        startTimeRef.current = timestamp;
      }

      setElapsedTime((timestamp - startTimeRef.current) / 1000);
      if (uIState == UIState.Idle) {
        requestAnimationFrame(updateProgress);
      }
    };

    if (uIState == UIState.Idle) {
      resetElapsedTime();
      requestAnimationFrame(updateProgress);
    }

    return () => {
      resetElapsedTime();
    };
  }, [uIState]);

  useEffect(() => {
    resetElapsedTime();
  }, [globalTimer]);

  const { program, progress } = useAppSelector(
    isSelectingUIState
      ? selectSelectedCreatureSelectingProgram
      : selectSelectedCreatureCurrentProgram(elapsedTime)
  );

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
