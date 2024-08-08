import React from "react";
import currentFrame from "../images/MainMenu/selecting_frame.png";
import currentFrameStop from "../images/MainMenu/selecting_frame_red.png";
import selectingFrame from "../images/MainMenu/select.png";

import "./MainMenuSelectingFrame.css";

interface Props {
  order: number | null;
  isCurrentProgram: boolean;
  isStop: boolean;
}

const MainMenuSelectingFrame = ({ order, isCurrentProgram, isStop }: Props) => {
  if (order == null) {
    return <></>;
  }

  const rotation = order * 45 + 22.5;
  const angle = 90 - rotation;

  const currentFrameRadius = 30;
  const currentFrameYPosition =
    50 - Math.sin((angle * Math.PI) / 180) * currentFrameRadius;
  const currentFrameXPosition =
    50 + Math.cos((angle * Math.PI) / 180) * currentFrameRadius;

  const selectingRadius = 29;
  const selectingYPosition =
    50 - Math.sin((angle * Math.PI) / 180) * selectingRadius;
  const selectingXPosition =
    50 + Math.cos((angle * Math.PI) / 180) * selectingRadius;

  const currentFrameDiv = () => {
    return (
      <div
        className="main-current-frame-container"
        style={{
          top: `${currentFrameYPosition}%`,
          left: `${currentFrameXPosition}%`,
        }}
      >
        <img
          src={isStop ? currentFrameStop : currentFrame}
          className="main-current-frame-image"
          style={{
            transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
          }}
        />
      </div>
    );
  };

  const selectingFrameDiv = () => {
    return (
      <div
        className="main-selecting-frame-container"
        style={{
          top: `${selectingYPosition}%`,
          left: `${selectingXPosition}%`,
        }}
      >
        <img
          src={selectingFrame}
          className="main-selecting-frame-image"
          style={{
            transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
          }}
        />
      </div>
    );
  };

  return <>{isCurrentProgram ? currentFrameDiv() : selectingFrameDiv()}</>;
};

export default MainMenuSelectingFrame;
