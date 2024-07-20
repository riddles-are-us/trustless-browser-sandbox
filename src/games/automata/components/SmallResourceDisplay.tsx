import React from "react";
import background from "../images/backgrounds/bottom_bar.png";
import "./SmallResourceDisplay.css";

interface Props {
  order: number;
  iconImagePath: string;
  amount: number;
}

const SmallResourceDisplay = ({ order, iconImagePath, amount }: Props) => {
  return (
    <div className="small-resource-display-container">
      <img src={background} className="small-resource-display-background" />
      <img src={iconImagePath} className="small-resource-display-image" />
      <p className="small-resource-display-text">{amount.toString()}</p>
    </div>
  );
};

export default SmallResourceDisplay;
