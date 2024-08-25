import React, { useRef, useEffect } from "react";
import {
  ResourceType,
  getResourceIconPath,
} from "../../../data/automata/models";
import "./GainCommonResource.css";
import ResourceChangeAmountAnimation from "./ResourceChangeAmountAnimation";

interface Props {
  type: ResourceType;
  playingIconAnimation: boolean;
  playingResourceChangeAmountAnimation: boolean;
  startPositionString: string;
  middlePositionString: string;
  endPositionString: string;
  changeAmountTextPositionX: number;
  changeAmount: number;
}

const GainCommonResource = ({
  type,
  playingIconAnimation,
  playingResourceChangeAmountAnimation,
  startPositionString,
  middlePositionString,
  endPositionString,
  changeAmountTextPositionX,
  changeAmount,
}: Props) => {
  const iconRef = useRef<HTMLDivElement | null>(null);
  const animationName = `gainResourceFlyAcross-${type}`;

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
            0% { transform: ${startPositionString}; }
            5% { transform: ${middlePositionString}; }
            35% { transform: ${middlePositionString}; }
            100% { transform: ${endPositionString}; }
          }
        `;
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
      iconContainer.style.transform = startPositionString;
      iconContainer.style.animation = `${animationName} 1.5s ease-in-out`;
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
      <div ref={iconRef} className="gain-common-resource-container">
        {playingIconAnimation && (
          <img
            src={getResourceIconPath(type)}
            className="gain-common-resource-image"
          />
        )}
      </div>
      {playingResourceChangeAmountAnimation && (
        <div
          className="gain-common-resource-amount-animation-container"
          style={{ left: `${changeAmountTextPositionX}px` }}
        >
          <ResourceChangeAmountAnimation amount={changeAmount} />
        </div>
      )}
    </>
  );
};

export default GainCommonResource;
