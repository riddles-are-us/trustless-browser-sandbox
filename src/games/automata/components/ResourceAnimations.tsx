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
