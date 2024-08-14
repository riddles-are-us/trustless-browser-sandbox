import React, { useState, useEffect, useRef } from "react";
import {
  ResourceType,
  getResourceIconPath,
} from "../../../data/automata/models";
import {
  selectDiffCommonResource,
  resetDiffCommonResources,
} from "../../../data/automata/resources";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./GainCommonResource.css";
import ResourceChangeAmountAnimation from "./ResourceChangeAmountAnimation";

interface Props {
  type: ResourceType;
  order: number;
}

const GainCommonResource = ({ type, order }: Props) => {
  const dispatch = useAppDispatch();
  const diffResource = useAppSelector(selectDiffCommonResource(type));
  const gainingResource = diffResource > 0;
  const resourceRef = useRef<HTMLDivElement | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [playingAnimation, setPlayingAnimation] = useState(false);
  const [
    playingResourceChangeAmountAnimation,
    setPlayingResourceChangeAmountAnimation,
  ] = useState(false);
  const [diffAmount, setDiffAmount] = useState(0);
  const animationName = `gainResourceFlyAcross-${type}`;

  const getStartPositionString = (parentContainer: HTMLDivElement) => {
    const startPosition = {
      x: parentContainer.clientWidth / 2,
      y: parentContainer.clientHeight / 2,
    };
    return `translate(-50%, -50%) translate(${startPosition.x}px, ${startPosition.y}px)`;
  };

  const getMiddlePositionString = (parentContainer: HTMLDivElement) => {
    const middlePosition = {
      x: parentContainer.clientWidth / 2 + (Math.random() * 100 - 50) * 2,
      y: parentContainer.clientHeight / 2 + (Math.random() * 100 - 50) * 2,
    };
    return `translate(-50%, -50%) translate(${middlePosition.x}px, ${middlePosition.y}px)`;
  };

  const getEndPositionString = () => {
    const endPosition = {
      x: 90 * order + 30,
      y: 25,
    };
    return `translate(-50%, -50%) translate(${endPosition.x}px, ${endPosition.y}px)`;
  };

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
      setPlayingAnimation(false);
      removeAnimation();
      resourceContainer.style.transform = endPositionString;
      dispatch(resetDiffCommonResources({ type }));

      setPlayingResourceChangeAmountAnimation(true);
      setTimeout(() => {
        setPlayingResourceChangeAmountAnimation(false);
      }, 2000);
    };

  const InitAnimation = () => {
    const parentContainer = parentRef.current;
    const resourceContainer = resourceRef.current;
    if (resourceContainer && parentContainer) {
      setPlayingAnimation(true);
      setDiffAmount(diffResource);
      const startPositionString = getStartPositionString(parentContainer);
      const middlePositionString = getMiddlePositionString(parentContainer);
      const endPositionString = getEndPositionString();
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
      resourceContainer.style.transform = startPositionString;
      resourceContainer.style.animation = `${animationName} 1.5s ease-in-out`;
      resourceContainer.removeEventListener("animationend", () =>
        onAnimationEnd(resourceContainer)(endPositionString)
      );
      resourceContainer.addEventListener("animationend", () =>
        onAnimationEnd(resourceContainer)(endPositionString)
      );
    }
  };

  useEffect(() => {
    if (gainingResource) {
      setTimeout(() => {
        InitAnimation();
      }, 1500);
    }
  }, [gainingResource]);

  return (
    <>
      <></>
      <div ref={parentRef} className="gain-common-resource-parent-container">
        <div ref={resourceRef} className="gain-common-resource-container">
          {playingAnimation && (
            <img
              src={getResourceIconPath(type)}
              className="gain-common-resource-image"
            />
          )}
        </div>
        {playingResourceChangeAmountAnimation && (
          <div
            className="gain-common-resource-amount-animation-container"
            style={{ left: `${90 * order + 60}px` }}
          >
            <ResourceChangeAmountAnimation amount={diffAmount} />
          </div>
        )}
      </div>
    </>
  );
};

export default GainCommonResource;
