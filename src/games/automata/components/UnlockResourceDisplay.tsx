import React from "react";
import "./UnlockResourceDisplay.css";

interface Props {
  iconImagePath: string;
  amount: number;
}

const UnlockResourceDisplay = ({ iconImagePath, amount }: Props) => {
  const getSign = (number: number) => (number > 0 ? "+" : "");

  return (
    <div className="unlock-resource-display-container">
      <img src={iconImagePath} className="unlock-resource-display-image" />
      <p
        className={
          amount == 0
            ? "unlock-resource-display-zero-text"
            : amount > 0
            ? "unlock-resource-display-positive-text"
            : "unlock-resource-display-negative-text"
        }
      >{`${getSign(amount)}${amount.toString()}`}</p>
    </div>
  );
};

export default UnlockResourceDisplay;
