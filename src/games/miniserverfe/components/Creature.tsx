import React from "react";
import "./Creature.css";
import creatureBackground from "../images/backgrounds/creature_frame.png";
import bot from "../images/CreatureBots/idle_robot.png";

const Creature = () => {
  return (
    <div className="creature-container">
      <img src={creatureBackground} className="creature-background" />
      <img src={bot} className="creature-image" />
    </div>
  );
};

export default Creature;
