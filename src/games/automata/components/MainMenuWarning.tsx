import React from "react";
import "./MainMenuWarning.css";
import { UIState, selectUIState } from "../../../data/automata/properties";
import {
  selectIsNotSelectingCreature,
  selectSelectedCreaturePrograms,
} from "../../../data/automata/creatures";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

const MainMenuWarning = () => {
  const uIState = useAppSelector(selectUIState);
  const notSelectingCreature = useAppSelector(selectIsNotSelectingCreature);
  const selectedCreaturePrograms = useAppSelector(
    selectSelectedCreaturePrograms
  );
  const notFillInAllSlots =
    (uIState == UIState.Creating || uIState == UIState.Reboot) &&
    selectedCreaturePrograms.some((program) => program == null);
  const isLoading = uIState == UIState.Loading;
  return (
    <div className="main-menu-warning-container">
      {notSelectingCreature && (
        <p className="main-menu-warning-text">Select a creature to continue</p>
      )}
      {notFillInAllSlots && (
        <p className="main-menu-warning-text">Install all program slots</p>
      )}
      {isLoading && <p className="main-menu-warning-text">Loading...</p>}
    </div>
  );
};

export default MainMenuWarning;
