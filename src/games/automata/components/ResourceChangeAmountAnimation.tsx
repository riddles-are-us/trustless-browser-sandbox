import React from "react";
import "./ResourceChangeAmountAnimation.css";

interface Props {
  amount: number;
}

const ResourceChangeAmountAnimation = ({ amount }: Props) => {
  return (
    <div className="resource-change-amount-animation-container">
      <p
        className={
          amount > 0
            ? "resource-change-amount-animation-positive-text"
            : "resource-change-amount-animation-negative-text"
        }
      >
        {amount > 0 ? `+${amount.toString()}` : `${amount.toString()}`}
      </p>
    </div>
  );
};

export default ResourceChangeAmountAnimation;
