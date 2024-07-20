import React from "react";
import "./TinyResourceDisplay.css";

interface Props {
  iconImagePath: string;
  amount: number;
}

const TinyResourceDisplay = ({ iconImagePath, amount }: Props) => {
  const getSign = (number: number) => (number > 0 ? "+" : "");

  return (
    <div className="tiny-resource-display-container">
      <img src={iconImagePath} className="tiny-resource-display-image" />
      <p className="tiny-resource-display-text">{`${getSign(
        amount
      )}${amount.toString()}`}</p>
    </div>
  );
};

export default TinyResourceDisplay;
