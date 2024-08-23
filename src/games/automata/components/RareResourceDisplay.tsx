import React from "react";
import background from "../images/backgrounds/bottom_bar.png";
import { getNumberAbbr } from "../../../data/automata/models";
import "./RareResourceDisplay.css";

interface Props {
  iconImagePath: string;
  amount: number;
}

const RareResourceDisplay = ({ iconImagePath, amount }: Props) => {
  return (
    <div className="rare-resource-display-container">
      <img src={background} className="rare-resource-display-background" />
      <img src={iconImagePath} className="rare-resource-display-image" />
      <p className="rare-resource-display-text">{getNumberAbbr(amount)}</p>
    </div>
  );
};

export default RareResourceDisplay;
