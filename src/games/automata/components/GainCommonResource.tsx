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
  const animationName = `resourceflyAcross-${type}`;

  const getStartPositionString = (parentContainer: HTMLDivElement) => {
    const startPosition = {
      x: parentContainer.clientWidth / 2,
      y: parentContainer.clientHeight / 2,
    };
    return `translate(-50%, -50%) translate(${startPosition.x}px, ${startPosition.y}px)`;
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

  const onAnimationEnd = (resourceContainer: HTMLDivElement) => {
    setPlayingAnimation(false);
    removeAnimation();
    resourceContainer.style.transform = getEndPositionString();
    dispatch(resetDiffCommonResources({ type }));
  };

  const InitAnimation = () => {
    const parentContainer = parentRef.current;
    const resourceContainer = resourceRef.current;
    if (resourceContainer && parentContainer && playingAnimation == false) {
      setPlayingAnimation(true);
      const startPosition = {
        x: parentContainer.clientWidth / 2,
        y: parentContainer.clientHeight / 2,
      };
      const endPosition = {
        x: 90 * order + 30,
        y: 25,
      };
      const styleSheet = document.styleSheets[0] as CSSStyleSheet;
      const keyframes = `
          @keyframes ${animationName} {
            from { transform: ${getStartPositionString(parentContainer)}; }
            to { transform: ${getEndPositionString()}; }
          }
        `;
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
      resourceContainer.style.transform =
        getStartPositionString(parentContainer);
      resourceContainer.style.animation = `${animationName} 1s linear`;
      resourceContainer.removeEventListener("animationend", () =>
        onAnimationEnd(resourceContainer)
      );
      resourceContainer.addEventListener("animationend", () =>
        onAnimationEnd(resourceContainer)
      );
    }
  };

  useEffect(() => {
    if (gainingResource) {
      InitAnimation();
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
      </div>
    </>
  );
};

export default GainCommonResource;
