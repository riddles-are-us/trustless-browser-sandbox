import React from "react";
import "./Creature.css";
import creatureBackground from "../images/backgrounds/creature_frame.png";
import bot from "../images/CreatureBots/idle_robot.png";
import { setUIState } from "../../../data/automata/properties";
import {
  setSelectedCreatureIndex,
  selectSelectedCreatureListIndex,
} from "../../../data/automata/creatures";
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

  const onSelect = () => {
    if (!isSelected) {
      dispatch(setSelectedCreatureIndex({ index }));
    }
  };

  return (
    <div className="creature-container" onClick={() => onSelect()}>
      <img src={creatureBackground} className="creature-background" />
      <img
        src={bot}
        className={
          isSelected ? "selecting-creature-image" : "normal-creature-image"
        }
      />
      <p className="creature-text">{creature.name}</p>
    </div>
  );
};

export default Creature;
