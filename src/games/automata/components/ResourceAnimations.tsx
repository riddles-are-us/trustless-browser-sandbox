import React, { useState, useEffect, useRef } from "react";
import GainCommonResource from "./GainCommonResource";
import { commonResourceTypes } from "../../../data/automata/models";
import {
  ResourceType,
  getResourceIconPath,
} from "../../../data/automata/models";
import {
  selectSelectedCreatureDiffResources,
  resetSelectedCreatureDiffResources,
} from "../../../data/automata/properties";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./ResourceAnimations.css";
import ResourceChangeAmountAnimation from "./ResourceChangeAmountAnimation";

const ResourceAnimations = () => {
  const dispatch = useAppDispatch();
  const diffResources = useAppSelector(selectSelectedCreatureDiffResources);
  const gainingResources = diffResources.filter(
    (resource) => resource.amount > 0
  );
  const gainingResource = gainingResources.length > 0;
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [playingAnimation, setPlayingAnimation] = useState(false);
  const [playingIconAnimation, setPlayingIconAnimation] = useState(false);
  const [
    playingResourceChangeAmountAnimation,
    setPlayingResourceChangeAmountAnimation,
  ] = useState(false);

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

  const getEndPositionString = (index: number) => {
    const endPosition = {
      x: 90 * index + 30,
      y: 25,
    };
    return `translate(-50%, -50%) translate(${endPosition.x}px, ${endPosition.y}px)`;
  };

  const PlayingResourceChangeAmountAnimation = () => {
    setPlayingIconAnimation(false);
    setPlayingResourceChangeAmountAnimation(true);

    dispatch(resetSelectedCreatureDiffResources({}));

    setTimeout(() => {
      setPlayingAnimation(false);
      setPlayingResourceChangeAmountAnimation(false);
    }, 2000);
  };

  const PlayIconAnimation = () => {
    setPlayingIconAnimation(true);
    setTimeout(() => {
      PlayingResourceChangeAmountAnimation();
    }, 1500);
  };

  useEffect(() => {
    const parentContainer = parentRef.current;
    if (parentContainer && gainingResource && !playingAnimation) {
      setPlayingAnimation(true);
      setTimeout(() => {
        PlayIconAnimation();
      }, 1500);
    }
  }, [gainingResource]);

  return (
    <div ref={parentRef} className="resource-animations-container">
      {(playingIconAnimation || playingResourceChangeAmountAnimation) &&
        commonResourceTypes.map((type, index) => {
          const changeAmount = gainingResources.find(
            (resource) => resource.type == type
          )?.amount;
          return (
            changeAmount && (
              <GainCommonResource
                key={index}
                type={type}
                playingIconAnimation={playingIconAnimation}
                playingResourceChangeAmountAnimation={
                  playingResourceChangeAmountAnimation
                }
                startPositionString={getStartPositionString(parentRef.current!)}
                middlePositionString={getMiddlePositionString(
                  parentRef.current!
                )}
                endPositionString={getEndPositionString(index)}
                changeAmountTextPositionX={90 * index + 60}
                changeAmount={changeAmount}
              />
            )
          );
        })}
    </div>
  );
};

export default ResourceAnimations;
