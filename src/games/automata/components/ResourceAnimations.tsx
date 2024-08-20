import React, { useState, useEffect, useRef } from "react";
import GainCommonResource from "./GainCommonResource";
import SpendCommonResource from "./SpendCommonResource";
import {
  commonResourceTypes,
  ResourceAmountPair,
  emptyCommonResources,
} from "../../../data/automata/models";
import {
  selectSelectedCreatureDiffResources,
  resetSelectedCreatureDiffResources,
} from "../../../data/automata/properties";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./ResourceAnimations.css";

const ResourceAnimations = () => {
  const dispatch = useAppDispatch();
  const diffResources = useAppSelector(selectSelectedCreatureDiffResources);
  const gainingResources = diffResources.filter(
    (resource) => resource.amount > 0
  );
  const gainingResource = gainingResources.length > 0;
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [playingAnimation, setPlayingAnimation] = useState(false);
  const [playingGainingIconAnimation, setPlayingGainingIconAnimation] =
    useState(false);
  const [
    playingGainingResourceChangeAmountAnimation,
    setPlayingGainingResourceChangeAmountAnimation,
  ] = useState(false);
  const [playingSpendingAnimation, setPlayingSpendingAnimation] =
    useState(false);

  const [diffResourcesPair, setDiffResourcesPair] =
    useState<ResourceAmountPair[]>(emptyCommonResources);

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
    console.log("end");
    setPlayingGainingResourceChangeAmountAnimation(true);
    setPlayingGainingIconAnimation(false);
    setTimeout(() => {
      setPlayingAnimation(false);
      setPlayingGainingResourceChangeAmountAnimation(false);
    }, 2000);
  };

  const PlayIconAnimation = () => {
    setDiffResourcesPair(
      commonResourceTypes.map((type) => ({
        type,
        amount:
          diffResources.find((resource) => resource.type == type)?.amount ?? 0,
      }))
    );

    dispatch(resetSelectedCreatureDiffResources({}));
    setPlayingGainingIconAnimation(true);
    setPlayingSpendingAnimation(false);
    setTimeout(() => {
      PlayingResourceChangeAmountAnimation();
    }, 2000);
  };

  useEffect(() => {
    const parentContainer = parentRef.current;
    if (parentContainer && gainingResource && !playingAnimation) {
      setPlayingAnimation(true);
      setPlayingSpendingAnimation(true);
      setTimeout(() => {
        PlayIconAnimation();
      }, 1500);
    }
  }, [gainingResource]);

  return (
    <div ref={parentRef} className="resource-animations-container">
      {(playingGainingIconAnimation ||
        playingGainingResourceChangeAmountAnimation) &&
        commonResourceTypes.map(
          (type, index) =>
            diffResourcesPair[index].amount > 0 && (
              <GainCommonResource
                key={index}
                type={type}
                playingIconAnimation={playingGainingIconAnimation}
                playingResourceChangeAmountAnimation={
                  playingGainingResourceChangeAmountAnimation
                }
                startPositionString={getStartPositionString(parentRef.current!)}
                middlePositionString={getMiddlePositionString(
                  parentRef.current!
                )}
                endPositionString={getEndPositionString(index)}
                changeAmountTextPositionX={90 * index + 60}
                changeAmount={diffResourcesPair[index].amount}
              />
            )
        )}
      {playingSpendingAnimation &&
        commonResourceTypes.map(
          (type, index) =>
            diffResourcesPair[index].amount < 0 && (
              <SpendCommonResource
                key={index}
                type={type}
                playingIconAnimation={playingSpendingAnimation}
                playingResourceChangeAmountAnimation={playingSpendingAnimation}
                startPositionString={getEndPositionString(index)}
                endPositionString={getStartPositionString(parentRef.current!)}
                changeAmountTextPositionX={90 * index + 60}
                changeAmount={diffResourcesPair[index].amount}
              />
            )
        )}
    </div>
  );
};

export default ResourceAnimations;
