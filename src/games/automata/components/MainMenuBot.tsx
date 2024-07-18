import React from "react";
import bot from "../images/MainMenu/select_robot.png";

import "./MainMenuBot.css";

interface Props {
  order: number;
}

const MainMenuBot = ({ order }: Props) => {
  const rotation = order * 45 + 22.5;
  const angle = 90 - rotation;

  const radius = 30;
  const yPosition = 50 - Math.sin((angle * Math.PI) / 180) * radius;
  const xPosition = 50 + Math.cos((angle * Math.PI) / 180) * radius;
  return (
    <div
      className="main-bot-container"
      style={{
        top: `${yPosition}%`,
        left: `${xPosition}%`,
      }}
    >
      <img src={bot} className="main-bot-image" />
    </div>
  );
};

export default MainMenuBot;
