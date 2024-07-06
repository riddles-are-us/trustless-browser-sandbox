import React from "react";
import arrow from "../images/MainMenu/arrow.png";
import "./MainMenuArrow.css";

const MainMenuArrow = () => {
  const order = 6;
  const rotation = order * 45 + 22.5;
  const radius = 15.5;
  const angle = 90 - rotation;
  const y_offset = -Math.sin((angle * Math.PI) / 180) * radius;
  const x_offset = Math.cos((angle * Math.PI) / 180) * radius;
  return (
    <div
      className="main-arrow-container"
      style={{ top: `${50 + y_offset}%`, left: `${50 + x_offset}%` }}
    >
      <img
        src={arrow}
        className="main-arrow-image"
        style={{ transform: `translate(-50%, -50%) rotate(${rotation}deg)` }}
      />
    </div>
  );
};

export default MainMenuArrow;
