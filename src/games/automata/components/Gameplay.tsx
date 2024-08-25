import "./Gameplay.css";
import React, { useEffect, useState, useRef } from "react";
import { SERVER_TICK_TO_SECOND } from "../request";
import TopMenu from "./TopMenu";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import MainMenu from "./MainMenu";
import { UIState, selectUIState } from "../../../data/automata/properties";
import { selectGlobalTimer } from "../../../data/automata/properties";
import { useAppSelector } from "../../../app/hooks";
import GuidePopup from "./GuidePopup";
import ResourceAnimations from "./ResourceAnimations";

const Gameplay = () => {
  const uIState = useAppSelector(selectUIState);
  const showGuidePopup = uIState == UIState.Guide;

  //#region LocalTime
  const globalTimer = useAppSelector(selectGlobalTimer);
  const [globalTimerCache, setGlobalTimerCache] = useState(globalTimer);
  const [localTimer, setLocalTimer] = useState(globalTimer);
  const [visibilityChange, setVisibilityChange] = useState(false);
  const startTimeRef = useRef<number>(0);
  const animationFrameIdRef = useRef<number | null>(null);
  const elapsedTimeMultiplierRef = useRef<number>(1);
  const lastLocalTimerRef = useRef<number>(globalTimer);

  const resetStartTimeRef = () => {
    startTimeRef.current = 0;
    lastLocalTimerRef.current =
      Math.abs(globalTimerCache - localTimer) > SERVER_TICK_TO_SECOND
        ? globalTimerCache
        : localTimer;
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      setVisibilityChange(true);
    }
  };

  useEffect(() => {
    const updateProgress = (timestamp: DOMHighResTimeStamp) => {
      if (startTimeRef.current === 0) {
        startTimeRef.current = timestamp;
      }

      setLocalTimer(
        lastLocalTimerRef.current +
          ((timestamp - startTimeRef.current) / 1000) *
            elapsedTimeMultiplierRef.current
      );
      animationFrameIdRef.current = requestAnimationFrame(updateProgress);
    };

    resetStartTimeRef();
    elapsedTimeMultiplierRef.current = Math.max(
      Math.min(
        (globalTimerCache - lastLocalTimerRef.current + SERVER_TICK_TO_SECOND) /
          SERVER_TICK_TO_SECOND,
        1.2
      ),
      0.8
    );

    if (animationFrameIdRef.current !== null) {
      cancelAnimationFrame(animationFrameIdRef.current);
    }
    animationFrameIdRef.current = requestAnimationFrame(updateProgress);

    setVisibilityChange(false);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      resetStartTimeRef();
    };
  }, [uIState, globalTimerCache, visibilityChange]);

  useEffect(() => {
    setGlobalTimerCache(globalTimer);
  }, [globalTimer]);
  //#endregion

  return (
    <>
      <ResourceAnimations localTimer={localTimer} />
      <TopMenu />
      <div className="middle-container">
        <LeftMenu localTimer={localTimer} />
        <MainMenu localTimer={localTimer} />
        <RightMenu />
      </div>
      {showGuidePopup && <GuidePopup />}
    </>
  );
};

export default Gameplay;
