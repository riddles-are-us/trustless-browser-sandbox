import React from "react";
import "./ProgramResourceDisplay.css";

interface Props {
  iconImagePath: string;
  amount: number;
}

const ProgramResourceDisplay = ({ iconImagePath, amount }: Props) => {
  const getSign = (number: number) => (number > 0 ? "+" : "");

  return (
    <div className="program-resource-display-container">
      <img src={iconImagePath} className="program-resource-display-image" />
      <p className="program-resource-display-text">{`${getSign(
        amount
      )}${amount.toString()}`}</p>
    </div>
  );
};

export default ProgramResourceDisplay;
