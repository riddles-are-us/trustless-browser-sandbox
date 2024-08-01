import React from "react";
import background from "../images/backgrounds/unlock_frame.png";
import bot from "../images/CreatureBots/idle_robot.png";
import UnlockButton from "./Buttons/UnlockButton";
import Grid from "./Grid";
import UnlockResourceDisplay from "./UnlockResourceDisplay";
import { UIState, setUIState } from "../../../data/automata/properties";
import {
  emptyRareResources,
  getResourceIconPath,
} from "../../../data/automata/models";
import { startCreatingCreature } from "../../../data/automata/creatures";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./CreatureUnlockPopup.css";

const CreatureUnlockPopup = () => {
  const dispatch = useAppDispatch();
  function onClickUnlock() {
    dispatch(startCreatingCreature({}));
    dispatch(setUIState({ uIState: UIState.Creating }));
  }

  return (
    <div className="creature-unlock-popup-container">
      <div className="creature-unlock-popup-mask"></div>
      <div className="creature-unlock-popup-main-container">
        <img
          src={background}
          className="creature-unlock-popup-main-background"
        />
        <img src={bot} className="creature-unlock-popup-main-creature-image" />
        <p className="creature-unlock-popup-main-creature-text">{"Lock"}</p>
        <div className="creature-unlock-popup-resource-grid">
          <Grid
            elementWidth={80}
            elementHeight={27}
            columnCount={2}
            rowCount={3}
            elements={emptyRareResources.map((resource, index) => (
              <UnlockResourceDisplay
                key={index}
                iconImagePath={getResourceIconPath(resource.type)}
                amount={resource.amount}
              />
            ))}
          />
        </div>
        <div className="creature-unlock-popup-unlock-button">
          <UnlockButton onClick={onClickUnlock} />
        </div>
      </div>
    </div>
  );
};

export default CreatureUnlockPopup;
