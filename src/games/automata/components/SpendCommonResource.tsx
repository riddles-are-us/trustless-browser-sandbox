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
import "./SpendCommonResource.css";

interface Props {
  type: ResourceType;
  order: number;
}

const SpendCommonResource = ({ type, order }: Props) => {
  const dispatch = useAppDispatch();
  const diffResource = useAppSelector(selectDiffCommonResource(type));
  const spendingResource = diffResource < 0;
  const resourceRef = useRef<HTMLDivElement | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [playingAnimation, setPlayingAnimation] = useState(false);
  const animationName = `resourceflyAcross-${type}`;

  const getStartPositionString = () => {
    const startPosition = {
      x: 90 * order + 30,
      y: 25,
    };
    return `translate(-50%, -50%) translate(${startPosition.x}px, ${startPosition.y}px)`;
  };

  const getEndPositionString = (parentContainer: HTMLDivElement) => {
    const endPosition = {
      x: parentContainer.clientWidth / 2,
      y: parentContainer.clientHeight / 2,
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
    };

  const InitAnimation = () => {
    const parentContainer = parentRef.current;
    const resourceContainer = resourceRef.current;
    if (resourceContainer && parentContainer && playingAnimation == false) {
      setPlayingAnimation(true);
      dispatch(resetDiffCommonResources({ type }));
      const styleSheet = document.styleSheets[0] as CSSStyleSheet;
      const keyframes = `
          @keyframes ${animationName} {
            from { transform: ${getStartPositionString()}; }
            to { transform: ${getEndPositionString(parentContainer)}; }
          }
        `;
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
      resourceContainer.style.transform = getStartPositionString();
      resourceContainer.style.animation = `${animationName} 1s ease-in-out`;
      resourceContainer.removeEventListener("animationend", () =>
        onAnimationEnd(resourceContainer)(getEndPositionString(parentContainer))
      );
      resourceContainer.addEventListener("animationend", () =>
        onAnimationEnd(resourceContainer)(getEndPositionString(parentContainer))
      );
    }
  };

  useEffect(() => {
    if (spendingResource) {
      InitAnimation();
    }
  }, [spendingResource]);

  return (
    <>
      <></>
      <div ref={parentRef} className="spend-common-resource-parent-container">
        <div ref={resourceRef} className="spend-common-resource-container">
          {playingAnimation && (
            <img
              src={getResourceIconPath(type)}
              className="spend-common-resource-image"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SpendCommonResource;
