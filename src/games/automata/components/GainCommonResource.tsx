import React, { useRef, useEffect, useState } from "react";
import {
  ResourceType,
  getResourceIconPath,
} from "../../../data/automata/models";
import "./GainCommonResource.css";
import ResourceChangeAmountAnimation from "./ResourceChangeAmountAnimation";

interface Props {
  type: ResourceType;
  animationIndex: number;
  delayTime: number;
  centerPosition: { x: number; y: number };
  splashEndPosition: { x: number; y: number };
  resourceDisplayerPosition: { x: number; y: number };
  changeAmount: number;
}

const GainCommonResource = ({
  type,
  animationIndex,
  delayTime,
  centerPosition,
  splashEndPosition,
  resourceDisplayerPosition,
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

  const [playingIconAnimation, setPlayingIconAnimation] = useState(false);
  const [
    playingResourceChangeAmountAnimation,
    setPlayingResourceChangeAmountAnimation,
  ] = useState(false);

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

  const onIconAnimationEnd = (setEndPosition: () => void) => {
    setPlayingResourceChangeAmountAnimation(true);
    setPlayingIconAnimation(false);
    removeAnimation();
    setEndPosition();
  };

  const InitAnimation = () => {
    const splashContainer = splashRef.current;
    const parabolaXContainer = parabolaXRef.current;
    const parabolaYContainer = parabolaYRef.current;
    if (splashContainer && parabolaXContainer && parabolaYContainer) {
      setPlayingIconAnimation(true);
      const splashStartPositionString = getSplashStartPositionString();
      const splashEndPositionString = getSplashEndPositionString();
      const parabolaXStartPositionString = getParabolaXStartPositionString();
      const parabolaXEndPositionString = getParabolaXEndPositionString();
      const parabolaYStartPositionString = getParabolaYStartPositionString();
      const parabolaYEndPositionString = getParabolaYEndPositionString();
      const styleSheet = document.styleSheets[0] as CSSStyleSheet;
      const splashKeyframes = `
          @keyframes ${splashAnimationName} {
            0% { transform: ${splashStartPositionString}; }
            10% { transform: ${splashEndPositionString}; }
            100% { transform: ${splashEndPositionString}; }
          }
        `;
      splashContainer.style.transform = splashStartPositionString;
      splashContainer.style.animation = `${splashAnimationName} 0.5s linear`;
      const parabolaXKeyframes = `
          @keyframes ${parabolaXAnimationName} {
            0% { transform: ${parabolaXStartPositionString}; }
            10% { transform: ${parabolaXStartPositionString}; }
            100% { transform: ${parabolaXEndPositionString}; }
          }
        `;
      parabolaXContainer.style.transform = parabolaXStartPositionString;
      parabolaXContainer.style.animation = `${parabolaXAnimationName} 0.5s linear`;
      const parabolaYKeyframes = `
          @keyframes ${parabolaYAnimationName} {
            0% { transform: ${parabolaYStartPositionString}; }
            10% { transform: ${parabolaYStartPositionString}; }
            100% { transform: ${parabolaYEndPositionString}; }
          }
        `;
      parabolaYContainer.style.transform = parabolaYStartPositionString;
      parabolaYContainer.style.animation = `${parabolaYAnimationName} 0.5s cubic-bezier(.5,0,.8,.5)`;

      styleSheet.insertRule(splashKeyframes, styleSheet.cssRules.length);
      styleSheet.insertRule(parabolaXKeyframes, styleSheet.cssRules.length);
      styleSheet.insertRule(parabolaYKeyframes, styleSheet.cssRules.length);

      const setEndPosition = () => {
        splashContainer.style.transform = splashEndPositionString;
        parabolaXContainer.style.transform = parabolaXEndPositionString;
        parabolaYContainer.style.transform = parabolaYEndPositionString;
      };

      splashContainer.removeEventListener("animationend", () =>
        onIconAnimationEnd(setEndPosition)
      );
      splashContainer.addEventListener("animationend", () =>
        onIconAnimationEnd(setEndPosition)
      );
    }
  };

  useEffect(() => {
    setPlayingResourceChangeAmountAnimation(false);
    setTimeout(() => {
      InitAnimation();
    }, delayTime);
  }, [animationIndex]);

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
          style={{
            left: `${resourceDisplayerPosition.x + 30}px`,
            top: `${resourceDisplayerPosition.y + 20}px`,
          }}
        >
          <ResourceChangeAmountAnimation amount={changeAmount} />
        </div>
      )}
    </>
  );
};

export default GainCommonResource;
