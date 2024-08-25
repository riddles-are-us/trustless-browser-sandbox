import React, { useRef, useEffect } from "react";
import {
  ResourceType,
  getResourceIconPath,
} from "../../../data/automata/models";
import "./SpendCommonResource.css";
import ResourceChangeAmountAnimation from "./ResourceChangeAmountAnimation";

interface Props {
  type: ResourceType;
  playingIconAnimation: boolean;
  playingResourceChangeAmountAnimation: boolean;
  startPositionString: string;
  endPositionString: string;
  changeAmountTextPositionX: number;
  changeAmount: number;
}

const SpendCommonResource = ({
  type,
  playingIconAnimation,
  playingResourceChangeAmountAnimation,
  startPositionString,
  endPositionString,
  changeAmountTextPositionX,
  changeAmount,
}: Props) => {
  const iconRef = useRef<HTMLDivElement | null>(null);
  const animationName = `spendResourceFlyAcross-${type}`;

  const removeAnimation = () => {
    const styleSheet = document.styleSheets[0] as CSSStyleSheet;
    for (let i = 0; i < styleSheet.cssRules.length; i++) {
      const rule = styleSheet.cssRules[i] as CSSKeyframesRule;
      if (rule.name == animationName) {
        styleSheet.deleteRule(i);
      }
    }
  };

  const onAnimationEnd =
    (resourceContainer: HTMLDivElement) => (endPositionString: string) => {
      removeAnimation();
      resourceContainer.style.transform = endPositionString;
    };

  const InitAnimation = () => {
    const iconContainer = iconRef.current;
    if (iconContainer) {
      const styleSheet = document.styleSheets[0] as CSSStyleSheet;
      const keyframes = `
          @keyframes ${animationName} {
            from { transform: ${startPositionString}; }
            to { transform: ${endPositionString}; }
          }
        `;
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
      iconContainer.style.transform = startPositionString;
      iconContainer.style.animation = `${animationName} 1s ease-in-out`;
      iconContainer.removeEventListener("animationend", () =>
        onAnimationEnd(iconContainer)(endPositionString)
      );
      iconContainer.addEventListener("animationend", () =>
        onAnimationEnd(iconContainer)(endPositionString)
      );
    }
  };

  useEffect(() => {
    if (playingIconAnimation) {
      InitAnimation();
    }
  }, [playingIconAnimation]);
  return (
    <>
      <div ref={iconRef} className="spend-common-resource-container">
        {playingIconAnimation && (
          <img
            src={getResourceIconPath(type)}
            className="spend-common-resource-image"
          />
        )}
      </div>
      {playingResourceChangeAmountAnimation && (
        <div
          className="spend-common-resource-amount-animation-container"
          style={{ left: `${changeAmountTextPositionX}px` }}
        >
          <ResourceChangeAmountAnimation amount={changeAmount} />
        </div>
      )}
    </>
  );
};

export default SpendCommonResource;
