import React from "react";
import "./Creature.css";
import creatureBackground from "../images/backgrounds/creature_frame.png";
import bot from "../images/CreatureBots/idle_robot.png";
import { setUserActivity } from "../../../data/automata/properties";
import {
  setSelectedCreatureIndex,
  selectSelectedCreatureIndex,
} from "../../../data/automata/creatures";
import { CreatureModel } from "../../../data/automata/models";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

interface Props {
  index: number;
  creature: CreatureModel;
}

const Creature = ({ index, creature }: Props) => {
  const dispatch = useAppDispatch();
  const selectedCreatureIndex = useAppSelector(selectSelectedCreatureIndex);
  const isSelected = selectedCreatureIndex == index;

  const onSelect = () => {
    if (!isSelected) {
      dispatch(setUserActivity("browsing"));
      dispatch(setSelectedCreatureIndex(index));
    }
  };

  return (
    <div className="creature-container" onClick={() => onSelect()}>
      <img
        src={creatureBackground}
        className="creature-background"
        style={{ backgroundColor: isSelected ? "Red" : "White" }} // test code
      />
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
