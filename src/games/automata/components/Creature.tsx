import React from "react";
import "./Creature.css";
import creatureBackground from "../images/backgrounds/creature_frame.png";
import bot from "../images/CreatureBots/idle_robot.png";
import { setUserActivity } from "../../../data/automata/properties";
import {
  CreatureModel,
  setSelectedCreatureIndex,
  selectSelectedCreatureIndex,
} from "../../../data/automata/creatures";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

interface Props {
  index: number;
  creature: CreatureModel;
}

const Creature = ({ index, creature }: Props) => {
  const dispatch = useAppDispatch();
  const selectedCreatureIndex = useAppSelector(selectSelectedCreatureIndex);
  const isSelected = selectedCreatureIndex == index;

  const onSelect = (index: number) => {
    if (isSelected) {
      return;
    } else {
      dispatch(setUserActivity("browsing"));
      dispatch(setSelectedCreatureIndex(index));
    }
  };

  return (
    <div className="creature-container" onClick={() => onSelect(5)}>
      <img src={creatureBackground} className="creature-background" />
      <img src={bot} className="creature-image" />
      <p className="creature-text">
        {creature.object_id.length == 0
          ? "Creating"
          : creature.object_id.join("")}
      </p>
    </div>
  );
};

export default Creature;
