import React from "react";
import background from "../images/backgrounds/top_bar.png";
import "./MediumResourceDisplay.css";

interface Props {
  order: number;
  iconImagePath: string;
  amount: number;
}

const MediumResourceDisplay = ({ order, iconImagePath, amount }: Props) => {
  return (
    <div
      className="medium-resource-display-container"
      style={{
        left: `${9 * order + 9}%`,
      }}
    >
      <img src={background} className="medium-resource-display-background" />
      <img src={iconImagePath} className="medium-resource-display-image" />
      <p className="medium-resource-display-text">{amount.toString()}</p>
    </div>
  );
};

export default MediumResourceDisplay;
