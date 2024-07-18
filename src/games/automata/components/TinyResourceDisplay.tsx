import React from "react";
import "./TinyResourceDisplay.css";

interface Props {
  iconImagePath: string;
  amount: number;
}

const TinyResourceDisplay = ({ iconImagePath, amount }: Props) => {
  return (
    <div className="tiny-resource-display-container">
      <img src={iconImagePath} className="tiny-resource-display-image" />
      <p className="tiny-resource-display-text">{`+${amount.toString()}`}</p>
    </div>
  );
};

export default TinyResourceDisplay;
