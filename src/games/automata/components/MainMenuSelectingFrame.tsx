import React from "react";
import currentFrame from "../images/MainMenu/selecting_frame.png";
import currentFrameStop from "../images/MainMenu/selecting_frame_red.png";
import selectingFrame1 from "../images/MainMenu/select1.png";
import selectingFrame2 from "../images/MainMenu/select2.png";
import selectingFrame3 from "../images/MainMenu/select3.png";
import selectingFrame4 from "../images/MainMenu/select4.png";
import selectingFrame5 from "../images/MainMenu/select5.png";
import selectingFrame6 from "../images/MainMenu/select6.png";
import selectingFrame7 from "../images/MainMenu/select7.png";
import selectingFrame8 from "../images/MainMenu/select8.png";

import "./MainMenuSelectingFrame.css";

interface Props {
  order: number | null;
  isCurrentProgram: boolean;
  isStop: boolean;
}

function getSelectingFrameDiv(order: number) {
  const selectingFrames = [
    selectingFrame1,
    selectingFrame2,
    selectingFrame3,
    selectingFrame4,
    selectingFrame5,
    selectingFrame6,
    selectingFrame7,
    selectingFrame8,
  ];
  return (
    <img src={selectingFrames[order]} className="main-selecting-frame-image" />
  );
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
      <div className="main-selecting-frame-container">
        {getSelectingFrameDiv(order)}
      </div>
    );
  };

  return (
    <React.Fragment key={isCurrentProgram ? "current" : "selecting"}>
      {isCurrentProgram ? currentFrameDiv() : selectingFrameDiv()}
    </React.Fragment>
  );
};

export default MainMenuSelectingFrame;
