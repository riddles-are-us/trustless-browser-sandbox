import React, { useEffect, useState, useRef } from "react";
import circleBackground from "../images/backgrounds/circle.png";
import MainMenuSelectingFrame from "./MainMenuSelectingFrame";
import MainMenuBot from "./MainMenuBot";
import ConfirmButton from "./Buttons/ConfirmButton";
import UnlockButton from "./Buttons/UnlockButton";
import "./MainMenu.css";
import RebootButton from "./Buttons/RebootButton";
import DiffResourcesInfo from "./DiffResourcesInfo";
import Rocket from "./Rocket";
import { getTransactionCommandArray } from "../rpc";
import { selectL2Account } from "../../../data/accountSlice";
import { sendTransaction, queryState } from "../request";
import { getCreatureIconPath } from "../../../data/automata/models";
import {
  UIState,
  selectIsLoading,
  selectIsSelectingUIState,
  selectUIState,
  setUIState,
  selectGlobalTimer,
  setSelectedCreatureDiffResources,
} from "../../../data/automata/properties";
import {
  startRebootCreature,
  clearRebootCreature,
  selectIsNotSelectingCreature,
  selectSelectedCreature,
  selectSelectedCreaturePrograms,
  selectSelectedCreatureDiffResources,
  selectSelectedCreatureListIndex,
  selectSelectedCreatureCurrentProgram,
  selectSelectedCreatureSelectingProgram,
} from "../../../data/automata/creatures";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import MainMenuWarning from "./MainMenuWarning";
import MainMenuProgressBar from "./MainMenuProgressBar";
import SummaryMenu from "./SummaryMenu";

const MainMenu = () => {
  const dispatch = useAppDispatch();
  const l2account = useAppSelector(selectL2Account);
  const uIState = useAppSelector(selectUIState);
  const globalTimer = useAppSelector(selectGlobalTimer);
  const isNotSelectingCreature = useAppSelector(selectIsNotSelectingCreature);
  const selectedCreature = useAppSelector(selectSelectedCreature);
  const selectedCreaturePrograms = useAppSelector(
    selectSelectedCreaturePrograms
  );
  const selectedCreatureDiffResources = useAppSelector(
    selectSelectedCreatureDiffResources
  );
  const isSelectingUIState = useAppSelector(selectIsSelectingUIState);
  const showConfirmButton = uIState == UIState.Reboot;
  const enableConfirmButton = selectedCreaturePrograms.every(
    (program) => program !== null
  );
  const showUnlockButton = uIState == UIState.Creating;
  const enableUnlockButton = selectedCreaturePrograms.every(
    (program) => program !== null
  );
  const isLoading = useAppSelector(selectIsLoading);
  const showRebootButton = uIState == UIState.Idle;
  const selectedCreatureIndexForRequestEncode = useAppSelector(
    selectSelectedCreatureListIndex
  );

  function onClickConfirm() {
    if (!isLoading) {
      // bugs here, after creating a new creature, the list will refresh unproperly.
      // fix it after UI done polishing creature list since it may change the layout of the creating creature.
      const isCreating = uIState == UIState.Creating;
      dispatch(setUIState({ uIState: UIState.Loading }));
      dispatch(
        sendTransaction({
          cmd: getTransactionCommandArray(
            selectedCreature.programIndexes.map((index) => index!),
            selectedCreatureIndexForRequestEncode,
            isCreating
          ),
          prikey: l2account!.address,
        })
      ).then((action) => {
        if (sendTransaction.fulfilled.match(action)) {
          dispatch(queryState({ cmd: [], prikey: l2account!.address })).then(
            (action) => {
              if (queryState.fulfilled.match(action)) {
                dispatch(setUIState({ uIState: UIState.Idle }));
                dispatch(clearRebootCreature({}));
              } else {
                dispatch(setUIState({ uIState: UIState.Idle }));
                dispatch(clearRebootCreature({}));
              }
            }
          );
        } else if (sendTransaction.rejected.match(action)) {
          dispatch(setUIState({ uIState: UIState.Idle }));
        }
      });
    }
  }

  function onClickReboot() {
    if (!isLoading) {
      dispatch(setUIState({ uIState: UIState.Reboot }));
      dispatch(startRebootCreature({}));
    }
  }

  const [elapsedTime, setElapsedTime] = useState(0);
  const [globalTimerCache, setGlobalTimerCache] = useState(0);
  const [hasSetDiffResources, setHasSetDiffResources] = useState(false);
  const startTimeRef = useRef<number>(0);

  const resetElapsedTime = () => {
    startTimeRef.current = 0;
    setElapsedTime(0);
    setHasSetDiffResources(false);
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
    setGlobalTimerCache(globalTimer);
  }, [globalTimer]);

  const lastUpdatedProgramInfo = useAppSelector(
    isSelectingUIState
      ? selectSelectedCreatureSelectingProgram
      : selectSelectedCreatureCurrentProgram(0)(globalTimerCache)
  );
  const currentProgramInfo = useAppSelector(
    isSelectingUIState
      ? selectSelectedCreatureSelectingProgram
      : selectSelectedCreatureCurrentProgram(elapsedTime)(globalTimerCache)
  );

  if (
    !isSelectingUIState &&
    !hasSetDiffResources &&
    lastUpdatedProgramInfo.index !== currentProgramInfo.index &&
    lastUpdatedProgramInfo.program
  ) {
    setHasSetDiffResources(true);
    dispatch(
      setSelectedCreatureDiffResources({
        resources: lastUpdatedProgramInfo.program.resources,
      })
    );
  }

  return (
    <div className="main">
      <Rocket />
      {!isNotSelectingCreature && (
        <div className="main-content">
          <div className="main-info-container">
            <DiffResourcesInfo diffResources={selectedCreatureDiffResources} />
          </div>
          <div className="main-circle-container">
            <MainMenuProgressBar
              programName={currentProgramInfo.program?.name ?? ""}
              remainTime={currentProgramInfo.remainTime}
              progress={currentProgramInfo.progress}
              iconPath={getCreatureIconPath(selectedCreature.creatureType)}
            />
            <img src={circleBackground} className="main-circle-background" />
            {showConfirmButton && (
              <ConfirmButton
                isDisabled={!enableConfirmButton}
                onClick={() => onClickConfirm()}
              />
            )}
            {showUnlockButton && (
              <UnlockButton
                isDisabled={!enableUnlockButton}
                onClick={() => onClickConfirm()}
              />
            )}
            {showRebootButton && (
              <RebootButton onClick={() => onClickReboot()} />
            )}
            <MainMenuSelectingFrame
              order={currentProgramInfo.index}
              isCurrentProgram={!isSelectingUIState}
              isStop={selectedCreature.isProgramStop}
            />
            {selectedCreaturePrograms.map((program, index) => (
              <MainMenuBot key={index} order={index} program={program} />
            ))}
            <MainMenuWarning />
          </div>
        </div>
      )}
      {isNotSelectingCreature && <SummaryMenu />}
    </div>
  );
};

export default MainMenu;
