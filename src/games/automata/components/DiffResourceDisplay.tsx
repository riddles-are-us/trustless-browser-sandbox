import React from "react";
import "./DiffResourceDisplay.css";

interface Props {
  iconImagePath?: string | null;
  amount?: number | null;
}

const DiffResourceDisplay = ({
  iconImagePath = null,
  amount = null,
}: Props) => {
  const getSign = (number: number) => (number > 0 ? "+" : "");

  return (
    <div className="diff-resource-display-container">
      {iconImagePath != null && amount != null ? (
        <>
          <img src={iconImagePath} className="diff-resource-display-image" />
          <p className="diff-resource-display-text">{`${getSign(
            amount
          )}${amount.toString()}`}</p>
        </>
      ) : null}
    </div>
  );
};

export default DiffResourceDisplay;
