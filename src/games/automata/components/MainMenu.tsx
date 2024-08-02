import React, { useEffect, useState, useRef } from "react";
import circleBackground from "../images/backgrounds/circle.png";
import MainMenuSelectingFrame from "./MainMenuSelectingFrame";
import MainMenuBot from "./MainMenuBot";
import ConfirmButton from "./Buttons/ConfirmButton";
import "./MainMenu.css";
import RebootButton from "./Buttons/RebootButton";
import DiffResourcesInfo from "./DiffResourcesInfo";
import { getTransactionCommandArray } from "../rpc";
import { selectL2Account } from "../../../data/accountSlice";
import { sendTransaction, queryState } from "../request";
import {
  UIState,
  selectIsLoading,
  selectIsSelectingUIState,
  selectUIState,
  setUIState,
} from "../../../data/automata/properties";
import {
  startRebootCreature,
  clearRebootCreature,
  isNotSelectingCreature,
  selectSelectedCreature,
  selectSelectingProgramIndex,
  selectSelectedCreaturePrograms,
  selectSelectedCreatureDiffResources,
  selectSelectedCreatureListIndex,
} from "../../../data/automata/creatures";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import MainMenuWarning from "./MainMenuWarning";
import MainMenuProgramInfo from "./MainMenuProgramInfo";
import { query } from "express";

const MainMenu = () => {
  const dispatch = useAppDispatch();
  const l2account = useAppSelector(selectL2Account);
  const uIState = useAppSelector(selectUIState);
  const notSelectingCreature = useAppSelector(isNotSelectingCreature);
  const selectedCreature = useAppSelector(selectSelectedCreature);
  const selectingProgramIndex = useAppSelector(selectSelectingProgramIndex);
  const selectedCreaturePrograms = useAppSelector(
    selectSelectedCreaturePrograms
  );
  const selectedCreatureDiffResources = useAppSelector(
    selectSelectedCreatureDiffResources
  );
  const isSelectingUIState = useAppSelector(selectIsSelectingUIState);
  const showConfirmButton = isSelectingUIState;
  const enableConfirmButton = selectedCreaturePrograms.every(
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

  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef<number>(0);
  useEffect(() => {
    const updateProgress = (timestamp: DOMHighResTimeStamp) => {
      if (startTimeRef.current === 0) {
        startTimeRef.current = timestamp;
      }

      const elapsedTime = timestamp - startTimeRef.current;
      const newProgress = Math.min(
        Math.ceil((elapsedTime / 500) * 10000) / 100,
        100
      );

      setProgress(newProgress);

      if (
        newProgress < 100 &&
        UIState.Init < uIState &&
        uIState < UIState.Idle
      ) {
        requestAnimationFrame(updateProgress);
      }
    };

    if (UIState.Init < uIState && uIState < UIState.Idle) {
      startTimeRef.current = 0;
      requestAnimationFrame(updateProgress);
    }

    return () => {
      startTimeRef.current = 0;
      setProgress(0);
    };
  }, [uIState, UIState]);

  return (
    <div className="main">
      <div className="main-content">
        <div className="main-info-container">
          <DiffResourcesInfo diffResources={selectedCreatureDiffResources} />
        </div>
        <div className="main-circle-container">
          <img src={circleBackground} className="main-circle-background" />
          {showConfirmButton && (
            <ConfirmButton
              isDisabled={!enableConfirmButton}
              onClick={() => onClickConfirm()}
            />
          )}
          {showRebootButton && <RebootButton onClick={() => onClickReboot()} />}
          <MainMenuSelectingFrame
            order={
              notSelectingCreature
                ? null
                : isSelectingUIState
                ? selectingProgramIndex
                : selectedCreature.currentProgramIndex
            }
            isCurrentProgram={!isSelectingUIState}
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
