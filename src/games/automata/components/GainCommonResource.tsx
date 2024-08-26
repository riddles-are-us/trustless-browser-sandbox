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
  centerPosition: { x: number; y: number };
  splashEndPosition: { x: number; y: number };
  resourceDisplayerPosition: { x: number; y: number };
  changeAmountTextPositionX: number;
  changeAmount: number;
}

const GainCommonResource = ({
  type,
  playingIconAnimation,
  playingResourceChangeAmountAnimation,
  centerPosition,
  splashEndPosition,
  resourceDisplayerPosition,
  changeAmountTextPositionX,
  changeAmount,
}: Props) => {
  const getSplashStartPositionString = () => {
    return `translate(${centerPosition.x - splashEndPosition.x}px, ${
      centerPosition.y - splashEndPosition.y
    }px)`;
  };

  const getSplashEndPositionString = () => {
    return `translate(0px, 0px)`;
  };

  const getParabolaXStartPositionString = () => {
    return `translate(${splashEndPosition.x}px, 0px)`;
  };

  const getParabolaXEndPositionString = () => {
    return `translate(${resourceDisplayerPosition.x}px, 0px)`;
  };

  const getParabolaYStartPositionString = () => {
    return `translate(0px, ${splashEndPosition.y}px)`;
  };

  const getParabolaYEndPositionString = () => {
    return `translate(0px, ${resourceDisplayerPosition.y}px)`;
  };

  const splashRef = useRef<HTMLDivElement | null>(null);
  const parabolaXRef = useRef<HTMLDivElement | null>(null);
  const parabolaYRef = useRef<HTMLDivElement | null>(null);
  const splashAnimationName = `gainResourceSplash-${type}`;
  const parabolaXAnimationName = `gainResourceParabolaX-${type}`;
  const parabolaYAnimationName = `gainResourceParabolaY-${type}`;

  const removeAnimation = () => {
    const styleSheet = document.styleSheets[0] as CSSStyleSheet;
    for (let i = 0; i < styleSheet.cssRules.length; i++) {
      const rule = styleSheet.cssRules[i] as CSSKeyframesRule;
      if (
        rule.name == splashAnimationName ||
        rule.name == parabolaXAnimationName ||
        rule.name == parabolaYAnimationName
      ) {
        styleSheet.deleteRule(i);
      }
    }
  };

  const onAnimationEnd = (setEndPosition: () => void) => {
    removeAnimation();
    setEndPosition();
  };

  const InitAnimation = () => {
    const splashContainer = splashRef.current;
    const parabolaXContainer = parabolaXRef.current;
    const parabolaYContainer = parabolaYRef.current;
    if (splashContainer && parabolaXContainer && parabolaYContainer) {
      const splashStartPositionString = getSplashStartPositionString();
      const splashEndPositionString = getSplashEndPositionString();
      const parabolaXStartPositionString = getParabolaXStartPositionString();
      const parabolaXEndPositionString = getParabolaXEndPositionString();
      const parabolaYStartPositionString = getParabolaYStartPositionString();
      const parabolaYEndPositionString = getParabolaYEndPositionString();

      console.log("(t):", splashStartPositionString);
      console.log("(t):", splashEndPositionString);
      console.log("(t):", parabolaXStartPositionString);
      console.log("(t):", parabolaXEndPositionString);
      console.log("(t):", parabolaYStartPositionString);
      console.log("(t):", parabolaYEndPositionString);

      const styleSheet = document.styleSheets[0] as CSSStyleSheet;
      const splashKeyframes = `
          @keyframes ${splashAnimationName} {
            0% { transform: ${splashStartPositionString}; }
            10% { transform: ${splashEndPositionString}; }
            100% { transform: ${splashEndPositionString}; }
          }
        `;
      splashContainer.style.transform = splashStartPositionString;
      splashContainer.style.animation = `${splashAnimationName} 1s linear`;
      const parabolaXKeyframes = `
          @keyframes ${parabolaXAnimationName} {
            0% { transform: ${parabolaXStartPositionString}; }
            10% { transform: ${parabolaXStartPositionString}; }
            100% { transform: ${parabolaXEndPositionString}; }
          }
        `;
      parabolaXContainer.style.transform = parabolaXStartPositionString;
      parabolaXContainer.style.animation = `${parabolaXAnimationName} 1s linear`;
      const parabolaYKeyframes = `
          @keyframes ${parabolaYAnimationName} {
            0% { transform: ${parabolaYStartPositionString}; }
            10% { transform: ${parabolaYStartPositionString}; }
            100% { transform: ${parabolaYEndPositionString}; }
          }
        `;
      parabolaYContainer.style.transform = parabolaYStartPositionString;
      parabolaYContainer.style.animation = `${parabolaYAnimationName} 1s ease-in`;

      styleSheet.insertRule(splashKeyframes, styleSheet.cssRules.length);
      styleSheet.insertRule(parabolaXKeyframes, styleSheet.cssRules.length);
      styleSheet.insertRule(parabolaYKeyframes, styleSheet.cssRules.length);

      const setEndPosition = () => {
        splashContainer.style.transform = splashEndPositionString;
        parabolaXContainer.style.transform = parabolaXEndPositionString;
        parabolaYContainer.style.transform = parabolaYEndPositionString;
      };

      splashContainer.removeEventListener("animationend", () =>
        onAnimationEnd(setEndPosition)
      );
      splashContainer.addEventListener("animationend", () =>
        onAnimationEnd(setEndPosition)
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
      <div className="gain-common-resource-container">
        <div
          ref={parabolaXRef}
          className="gain-common-resource-animation-container"
        >
          <div
            ref={parabolaYRef}
            className="gain-common-resource-animation-container"
          >
            <div
              ref={splashRef}
              className="gain-common-resource-animation-container"
            >
              {playingIconAnimation && (
                <img
                  src={getResourceIconPath(type)}
                  className="gain-common-resource-image"
                />
              )}
            </div>
          </div>
        </div>
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
