import React from "react";
import "./Creature.css";
import creatureBackground from "../images/backgrounds/creature_frame.png";
import creatureSelectingBackground from "../images/backgrounds/creature_frame_selecting.png";
import bot from "../images/CreatureBots/idle_robot.png";
import { UIState, setUIState } from "../../../data/automata/properties";
import {
  setSelectedCreatureIndex,
  selectSelectedCreatureListIndex,
  selectCreaturesCount,
} from "../../../data/automata/creatures";
import { selectIsLoading } from "../../../data/automata/properties";
import { CreatureModel } from "../../../data/automata/models";
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
      <img
        src={isSelected ? creatureSelectingBackground : creatureBackground}
        className="creature-background"
      />
      <img
        src={bot}
        className={
          creature.isLocked ? "lock-creature-image" : "normal-creature-image"
        }
      />
      <p className="creature-text">{creature.name}</p>
    </div>
  );
};

export default Creature;
