import React, { useState, useEffect, useRef } from "react";
import GainCommonResource from "./GainCommonResource";
import SpendCommonResource from "./SpendCommonResource";
import {
  commonResourceTypes,
  ResourceAmountPair,
  emptyCommonResources,
  ProgramInfo,
} from "../../../data/automata/models";
import { selectIsSelectingUIState } from "../../../data/automata/properties";
import {
  selectSelectedCreatureIndex,
  selectSelectedCreatureCurrentProgram,
} from "../../../data/automata/creatures";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./ResourceAnimations.css";

interface Props {
  localTimer: number;
}

const ResourceAnimations = ({ localTimer }: Props) => {
  const dispatch = useAppDispatch();
  const isSelectingUIState = useAppSelector(selectIsSelectingUIState);
  const selectedCreatureIndex = useAppSelector(selectSelectedCreatureIndex);
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

  const getCenterPosition = (parentContainer: HTMLDivElement) => {
    return {
      x: parentContainer.clientWidth / 2,
      y: parentContainer.clientHeight / 2,
    };
  };

  const getCenterPositionString = (parentContainer: HTMLDivElement) => {
    const centerPosition = getCenterPosition(parentContainer);
    return `translate(-50%, -50%) translate(${centerPosition.x}px, ${centerPosition.y}px)`;
  };

  const getSplashEndPosition =
    (parentContainer: HTMLDivElement) => (index: number) => {
      const centerPosition = getCenterPosition(parentContainer);
      const resourceDisplayerPosition = getResourceDisplayerPosition(index);
      const vector = {
        x: centerPosition.x - resourceDisplayerPosition.x,
        y: centerPosition.y - resourceDisplayerPosition.y,
      };
      const length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
      return {
        x: parentContainer.clientWidth / 2 + (vector.x / length) * 25,
        y: parentContainer.clientHeight / 2 + (vector.y / length) * 25,
      };
    };

  const getResourceDisplayerPosition = (index: number) => {
    return {
      x: 90 * index + 30,
      y: 25,
    };
  };

  const getResourceDisplayerPositionString = (index: number) => {
    const resourceDisplayerPosition = getResourceDisplayerPosition(index);
    return `translate(-50%, -50%) translate(${resourceDisplayerPosition.x}px, ${resourceDisplayerPosition.y}px)`;
  };

  const PlayingResourceChangeAmountAnimation = () => {
    setPlayingGainingResourceChangeAmountAnimation(true);
    setPlayingGainingIconAnimation(false);
    setTimeout(() => {
      setPlayingAnimation(false);
      setPlayingGainingResourceChangeAmountAnimation(false);
    }, 1000);
  };

  const PlayIconAnimation = (diffResources: ResourceAmountPair[]) => {
    setPlayingGainingIconAnimation(true);
    setPlayingSpendingAnimation(false);
    setTimeout(() => {
      PlayingResourceChangeAmountAnimation();
    }, 1500);
  };

  const TriggerAnimation = (diffResources: ResourceAmountPair[]) => {
    const parentContainer = parentRef.current;
    if (parentContainer && !playingAnimation) {
      setPlayingAnimation(true);

      setDiffResourcesPair(
        commonResourceTypes.map((type) => ({
          type,
          amount:
            diffResources.find((resource) => resource.type == type)?.amount ??
            0,
        }))
      );
      setPlayingSpendingAnimation(true);
      setTimeout(() => {
        PlayIconAnimation(diffResources);
      }, 1000);
    }
  };

  const currentProgramInfo = useAppSelector(
    selectSelectedCreatureCurrentProgram(localTimer)
  );

  const [lastProgramInfo, setLastProgramInfo] = useState(currentProgramInfo);
  const [lastSelectedCreatureIndex, setLastSelectedCreatureIndex] = useState(
    selectedCreatureIndex
  );

  if (
    !isSelectingUIState &&
    selectedCreatureIndex == lastSelectedCreatureIndex &&
    lastProgramInfo.index != currentProgramInfo.index
  ) {
    setLastProgramInfo(currentProgramInfo);
    TriggerAnimation(lastProgramInfo.program?.resources ?? []);
  }

  useEffect(() => {
    setLastSelectedCreatureIndex(selectedCreatureIndex);
    setLastProgramInfo(currentProgramInfo);
  }, [selectedCreatureIndex]);

  return (
    <div ref={parentRef} className="resource-animations-container">
      {(playingGainingIconAnimation ||
        playingGainingResourceChangeAmountAnimation) &&
        commonResourceTypes.map((type, index) => {
          return (
            diffResourcesPair[index].amount > 0 && (
              <GainCommonResource
                key={index}
                type={type}
                playingIconAnimation={playingGainingIconAnimation}
                playingResourceChangeAmountAnimation={
                  playingGainingResourceChangeAmountAnimation
                }
                centerPosition={getCenterPosition(parentRef.current!)}
                splashEndPosition={getSplashEndPosition(parentRef.current!)(
                  index
                )}
                resourceDisplayerPosition={getResourceDisplayerPosition(index)}
                changeAmountTextPositionX={90 * index + 60}
                changeAmount={diffResourcesPair[index].amount}
              />
            )
          );
        })}
      {playingSpendingAnimation &&
        commonResourceTypes.map(
          (type, index) =>
            diffResourcesPair[index].amount < 0 && (
              <SpendCommonResource
                key={index}
                type={type}
                playingIconAnimation={playingSpendingAnimation}
                playingResourceChangeAmountAnimation={playingSpendingAnimation}
                startPositionString={getResourceDisplayerPositionString(index)}
                endPositionString={getCenterPositionString(parentRef.current!)}
                changeAmountTextPositionX={90 * index + 60}
                changeAmount={diffResourcesPair[index].amount}
              />
            )
        )}
    </div>
  );
};

export default ResourceAnimations;
