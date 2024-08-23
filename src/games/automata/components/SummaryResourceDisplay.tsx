import React from "react";
import background from "../images/backgrounds/summary_resource_frame.png";
import { getNumberAbbr } from "../../../data/automata/models";
import "./SummaryResourceDisplay.css";

interface Props {
  type?: string;
  iconImagePath?: string | null;
  amount?: number | null;
}

const SummaryResourceDisplay = ({
  type = "",
  iconImagePath = null,
  amount = null,
}: Props) => {
  return (
    <div className="summary-resource-display-container">
      {iconImagePath != null && amount != null ? (
        <>
          <img
            src={background}
            className="summary-resource-display-background"
          />
          <img src={iconImagePath} className="summary-resource-display-image" />
          <p className="summary-resource-display-title-text">{type}</p>
          <p
            className={
              amount == 0
                ? "summary-resource-display-zero-text"
                : amount > 0
                ? "summary-resource-display-positive-text"
                : "summary-resource-display-negative-text"
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

export default SummaryResourceDisplay;
