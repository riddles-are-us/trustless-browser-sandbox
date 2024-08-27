import React, { useRef, useEffect, useState } from "react";
import {
  ResourceType,
  getResourceIconPath,
} from "../../../data/automata/models";
import "./SpendCommonResource.css";
import ResourceChangeAmountAnimation from "./ResourceChangeAmountAnimation";

interface Props {
  type: ResourceType;
  animationIndex: number;
  delayTime: number;
  startPosition: { x: number; y: number };
  endPosition: { x: number; y: number };
  changeAmount: number;
}

const SpendCommonResource = ({
  type,
  animationIndex,
  delayTime,
  startPosition,
  endPosition,
  changeAmount,
}: Props) => {
  const getParabolaXStartPositionString = () => {
    return `translate(${startPosition.x}px, 0px)`;
  };

  const getParabolaXEndPositionString = () => {
    return `translate(${endPosition.x}px, 0px)`;
  };

  const getParabolaYStartPositionString = () => {
    return `translate(0px, ${startPosition.y}px)`;
  };

  const getParabolaYEndPositionString = () => {
    return `translate(0px, ${endPosition.y}px)`;
  };

  const parabolaXRef = useRef<HTMLDivElement | null>(null);
  const parabolaYRef = useRef<HTMLDivElement | null>(null);
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
        rule.name == parabolaXAnimationName ||
        rule.name == parabolaYAnimationName
      ) {
        styleSheet.deleteRule(i);
      }
    }
  };

  const onIconAnimationEnd = (setEndPosition: () => void) => {
    setPlayingIconAnimation(false);
    removeAnimation();
    setEndPosition();
  };

  const InitAnimation = () => {
    const parabolaXContainer = parabolaXRef.current;
    const parabolaYContainer = parabolaYRef.current;
    if (parabolaXContainer && parabolaYContainer) {
      setPlayingIconAnimation(true);
      const parabolaXStartPositionString = getParabolaXStartPositionString();
      const parabolaXEndPositionString = getParabolaXEndPositionString();
      const parabolaYStartPositionString = getParabolaYStartPositionString();
      const parabolaYEndPositionString = getParabolaYEndPositionString();
      const styleSheet = document.styleSheets[0] as CSSStyleSheet;
      const parabolaXKeyframes = `
          @keyframes ${parabolaXAnimationName} {
            from { transform: ${parabolaXStartPositionString}; }
            to { transform: ${parabolaXEndPositionString}; }
          }
        `;
      parabolaXContainer.style.transform = parabolaXStartPositionString;
      parabolaXContainer.style.animation = `${parabolaXAnimationName} 0.5s linear`;
      const parabolaYKeyframes = `
            @keyframes ${parabolaYAnimationName} {
              from { transform: ${parabolaYStartPositionString}; }
              to { transform: ${parabolaYEndPositionString}; }
            }
          `;
      parabolaYContainer.style.transform = parabolaYStartPositionString;
      parabolaYContainer.style.animation = `${parabolaYAnimationName} 0.5s ease-out`;

      styleSheet.insertRule(parabolaXKeyframes, styleSheet.cssRules.length);
      styleSheet.insertRule(parabolaYKeyframes, styleSheet.cssRules.length);

      const setEndPosition = () => {
        parabolaXContainer.style.transform = parabolaXEndPositionString;
        parabolaYContainer.style.transform = parabolaYEndPositionString;
      };

      parabolaXContainer.removeEventListener("animationend", () =>
        onIconAnimationEnd(setEndPosition)
      );
      parabolaXContainer.addEventListener("animationend", () =>
        onIconAnimationEnd(setEndPosition)
      );
    }
  };

  useEffect(() => {
    setPlayingResourceChangeAmountAnimation(false);
    setTimeout(() => {
      setPlayingResourceChangeAmountAnimation(true);
      InitAnimation();
    }, delayTime);
  }, [animationIndex]);
  return (
    <>
      <div className="spend-common-resource-container">
        <div
          ref={parabolaXRef}
          className="spend-common-resource-animation-container"
        >
          <div
            ref={parabolaYRef}
            className="spend-common-resource-animation-container"
          >
            {playingIconAnimation && (
              <img
                src={getResourceIconPath(type)}
                className="spend-common-resource-image"
              />
            )}
          </div>
        </div>
      </div>
      {playingResourceChangeAmountAnimation && (
        <div
          className="spend-common-resource-amount-animation-container"
          style={{
            left: `${startPosition.x + 30}px`,
            top: `${startPosition.y + 20}px`,
          }}
        >
          <ResourceChangeAmountAnimation amount={changeAmount} />
        </div>
      )}
    </>
  );
};

export default SpendCommonResource;
