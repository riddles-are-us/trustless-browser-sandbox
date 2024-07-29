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
import { sendTransaction, queryState } from "../request";
import {
  UIState,
  selectIsSelectingUIState,
  selectUIState,
  setUIState,
} from "../../../data/automata/properties";
import {
  setSelectingProgramIndex,
  isNotSelectingCreature,
  selectSelectedCreature,
  selectSelectingProgramIndex,
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
  const selectingProgramIndex = useAppSelector(selectSelectingProgramIndex);
  const selectedCreaturePrograms = useAppSelector(
    selectSelectedCreaturePrograms
  );
  const isSelectingUIState = useAppSelector(selectIsSelectingUIState);
  const showConfirmButton =
    isSelectingUIState &&
    selectedCreaturePrograms.every((program) => program !== null);
  const showRebootButton = uIState == UIState.Idle;
  const selectedCreatureIndexForRequestEncode = useAppSelector(
    selectSelectedCreatureListIndex
  );

  function onClickConfirm() {
    try {
      // bugs here, after creating a new creature, the list will refresh unproperly.
      // fix it after UI done polishing creature list since it may change the layout of the creating creature.
      dispatch(
        sendTransaction({
          cmd: getTransactionCommandArray(
            selectedCreature.programIndexes.map((index) => index!),
            selectedCreatureIndexForRequestEncode,
            uIState == UIState.Creating
          ),
          prikey: l2account!.address,
        })
      ).then((action) => {
        if (sendTransaction.fulfilled.match(action)) {
          dispatch(queryState({ cmd: [], prikey: l2account!.address })).then(
            (action) => {
              if (sendTransaction.fulfilled.match(action)) {
                dispatch(setUIState({ uIState: UIState.Idle }));
              }
            }
          );
        }
      });
    } catch (e) {
      console.log(`confirm ${uIState.toString()} error`);
    }
  }

  function onClickReboot() {
    dispatch(setUIState({ uIState: UIState.Reboot }));
    dispatch(
      setSelectingProgramIndex({
        selectingIndex: selectedCreature.currentProgramIndex,
      })
    );
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
