import React, { useState } from "react";
import "./ImageButton.css";

interface Props {
  isDisabled: boolean;
  positionClass: string;
  scaleClass: string;
  defaultImagePath: string;
  hoverImagePath: string;
  clickedImagePath: string;
  disabledImagePath: string;
}

const ImageButton = ({
  isDisabled,
  positionClass,
  scaleClass,
  defaultImagePath,
  hoverImagePath,
  clickedImagePath,
  disabledImagePath,
}: Props) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseDown = () => {
    if (!isDisabled) {
      setIsClicked(true);
    }
  };

  const handleMouseUp = () => {
    if (!isDisabled) {
      setIsClicked(false);
    }
  };

  const handleMouseLeave = () => {
    if (!isDisabled) {
      setIsClicked(false);
      setIsHovered(false);
    }
  };

  const handleMouseEnter = () => {
    if (!isDisabled) {
      setIsHovered(true);
    }
  };

  return (
    <button
      className={`image-button ${positionClass} ${scaleClass}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      disabled={isDisabled}
    >
      <img
        src={
          isDisabled
            ? disabledImagePath
            : isClicked
            ? clickedImagePath
            : isHovered
            ? hoverImagePath
            : defaultImagePath
        }
      />
    </button>
  );
};

export default ImageButton;
