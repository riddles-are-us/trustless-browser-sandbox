import React from "react";
import arrow from "../images/MainMenu/arrow.png";
import selectingFrame from "../images/MainMenu/selecting_frame.png";

import "./MainMenuSelectingFrame.css";

const MainMenuSelectingFrame = () => {
  const order = 0;
  const rotation = order * 45 + 22.5;
  const angle = 90 - rotation;

  const selectingFrameRadius = 31.5;
  const selectingFrameYPosition =
    50 - Math.sin((angle * Math.PI) / 180) * selectingFrameRadius;
  const selectingFrameXPosition =
    50 + Math.cos((angle * Math.PI) / 180) * selectingFrameRadius;

  const arrowRadius = 15;
  const arrowYPosition = 50 - Math.sin((angle * Math.PI) / 180) * arrowRadius;
  const arrowXPposition = 50 + Math.cos((angle * Math.PI) / 180) * arrowRadius;
  return (
    <>
      <div
        className="main-selecting-frame-container"
        style={{
          top: `${selectingFrameYPosition}%`,
          left: `${selectingFrameXPosition}%`,
        }}
      >
        <img
          src={selectingFrame}
          className="main-selecting-frame-image"
          style={{ transform: `translate(-50%, -50%) rotate(${rotation}deg)` }}
        />
      </div>
      <div
        className="main-arrow-container"
        style={{ top: `${arrowYPosition}%`, left: `${arrowXPposition}%` }}
      >
        <img
          src={arrow}
          className="main-arrow-image"
          style={{ transform: `translate(-50%, -50%) rotate(${rotation}deg)` }}
        />
      </div>
    </>
  );
};

export default MainMenuSelectingFrame;
