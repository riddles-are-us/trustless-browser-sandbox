import React from "react";
import "./Creature.css";
import creatureBackground from "../images/backgrounds/creature_frame.png";
import creatureSelectingFrame from "../images/backgrounds/robot_select.png";
import creatureLock from "../images/backgrounds/robot_lock.png";
import { UIState, setUIState } from "../../../data/automata/properties";
import {
  setSelectedCreatureIndex,
  selectSelectedCreatureListIndex,
  selectCreaturesCount,
} from "../../../data/automata/creatures";
import { selectIsLoading } from "../../../data/automata/properties";
import {
  CreatureModel,
  getCreatureIconPath,
} from "../../../data/automata/models";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

interface Props {
  index: number;
  creature: CreatureModel;
}

const Creature = ({ index, creature }: Props) => {
  const dispatch = useAppDispatch();
  const selectedCreatureListIndex = useAppSelector(
    selectSelectedCreatureListIndex
  );
  const isSelected = selectedCreatureListIndex == index;
  const isLoading = useAppSelector(selectIsLoading);
  const creaturesCount = useAppSelector(selectCreaturesCount);
  const isLocked = index > creaturesCount;
  const creatureIconPath = getCreatureIconPath(creature.creatureType);

  const onSelect = () => {
    if (!isSelected && !isLoading) {
      if (index == creaturesCount) {
        dispatch(setUIState({ uIState: UIState.Unlock }));
      } else if (index < creaturesCount) {
        dispatch(setSelectedCreatureIndex({ index }));
        dispatch(setUIState({ uIState: UIState.Idle }));
      }
    }
  };

  return (
    <div className="creature-container" onClick={() => onSelect()}>
      <img src={creatureBackground} className="creature-background" />
      {isSelected && (
        <img
          src={creatureSelectingFrame}
          className="creature-selecting-image"
        />
      )}
      {creatureIconPath && (
        <img
          src={creatureIconPath}
          className={
            creature.isLocked ? "lock-creature-image" : "normal-creature-image"
          }
        />
      )}
      <p className="creature-text">{creature.name}</p>
      {isLocked && <img src={creatureLock} className="creature-lock-image" />}
    </div>
  );
};

export default Creature;
