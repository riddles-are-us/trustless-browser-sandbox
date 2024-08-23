import React from "react";
import { getNumberAbbr } from "../../../data/automata/models";
import "./DiffResourceDisplay.css";

interface Props {
  iconImagePath?: string | null;
  amount?: number | null;
}

const DiffResourceDisplay = ({
  iconImagePath = null,
  amount = null,
}: Props) => {
  return (
    <div className="diff-resource-display-container">
      {iconImagePath != null && amount != null ? (
        <>
          <img src={iconImagePath} className="diff-resource-display-image" />
          <p
            className={
              amount == 0
                ? "diff-resource-display-zero-text"
                : amount > 0
                ? "diff-resource-display-positive-text"
                : "diff-resource-display-negative-text"
            }
          >
            {amount == 0
              ? ""
              : amount > 0
              ? "+" + getNumberAbbr(amount)
              : getNumberAbbr(amount)}
          </p>
        </>
      ) : null}
    </div>
  );
};

export default DiffResourceDisplay;
