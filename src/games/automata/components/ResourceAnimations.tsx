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
  const [animationCount, setAnimationCount] = useState(0);
  const [finishedAnimationCount, setFinishedAnimationCount] = useState(0);
  const [gainAnimations, setGainAnimations] = useState<GainAnimationProps[]>(
    []
  );
  const [spendAnimations, setSpendAnimations] = useState<SpendAnimationProps[]>(
    []
  );

  interface GainAnimationProps {
    entity: ResourceAmountPair;
    delayTime: number;
    centerPosition: { x: number; y: number };
    splashEndPosition: { x: number; y: number };
    resourceDisplayerPosition: { x: number; y: number };
    changeAmountTextPositionX: number;
  }

  interface SpendAnimationProps {
    entity: ResourceAmountPair;
    delayTime: number;
    startPosition: { x: number; y: number };
    endPosition: { x: number; y: number };
    changeAmountTextPositionX: number;
  }

  const getCenterPosition = (parentContainer: HTMLDivElement) => {
    return {
      x: parentContainer.clientWidth / 2,
      y: parentContainer.clientHeight / 2,
    };
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

  const onAllAnimationEnd = () => {
    setPlayingAnimation(false);
  };

  const onAnimationEnd = () => {
    if (animationCount == finishedAnimationCount + 1) {
      onAllAnimationEnd();
    }
    setFinishedAnimationCount(finishedAnimationCount + 1);
  };

  const triggerAnimation = (diffResources: ResourceAmountPair[]) => {
    const parentContainer = parentRef.current;
    if (parentContainer && !playingAnimation) {
      setPlayingAnimation(true);

      const delayTimePerItem = 500;
      const gainResources = diffResources.filter(
        (pair) =>
          commonResourceTypes.find((type) => type == pair.type) != null &&
          pair.amount > 0
      );
      const spendResources = diffResources.filter(
        (pair) =>
          commonResourceTypes.find((type) => type == pair.type) != null &&
          pair.amount < 0
      );

      setGainAnimations(
        gainResources.map((pair, index) => ({
          entity: pair,
          delayTime: index * delayTimePerItem,
          centerPosition: getCenterPosition(parentRef.current!),
          splashEndPosition: getSplashEndPosition(parentRef.current!)(
            commonResourceTypes.findIndex((type) => type == pair.type)
          ),
          resourceDisplayerPosition: getResourceDisplayerPosition(
            commonResourceTypes.findIndex((type) => type == pair.type)
          ),
          changeAmountTextPositionX:
            90 * commonResourceTypes.findIndex((type) => type == pair.type) +
            60,
        }))
      );
      setSpendAnimations(
        spendResources.map((pair, index) => ({
          entity: pair,
          delayTime: (index + gainResources.length + 1) * delayTimePerItem,
          startPosition: getResourceDisplayerPosition(
            commonResourceTypes.findIndex((type) => type == pair.type)
          ),
          endPosition: getCenterPosition(parentRef.current!),
          changeAmountTextPositionX:
            90 * commonResourceTypes.findIndex((type) => type == pair.type) +
            60,
        }))
      );
      setAnimationCount(gainResources.length + spendResources.length);
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
    triggerAnimation(lastProgramInfo.program?.resources ?? []);
  }

  useEffect(() => {
    setLastSelectedCreatureIndex(selectedCreatureIndex);
    setLastProgramInfo(currentProgramInfo);
  }, [selectedCreatureIndex]);

  return (
    <div ref={parentRef} className="resource-animations-container">
      {playingAnimation &&
        gainAnimations.map((prop, index) => (
          <GainCommonResource
            key={index}
            type={prop.entity.type}
            playingAnimation={playingAnimation}
            delayTime={prop.delayTime}
            centerPosition={prop.centerPosition}
            splashEndPosition={prop.splashEndPosition}
            resourceDisplayerPosition={prop.resourceDisplayerPosition}
            changeAmountTextPositionX={prop.changeAmountTextPositionX}
            changeAmount={prop.entity.amount}
            onAnimationEnd={onAnimationEnd}
          />
        ))}
      {playingAnimation &&
        spendAnimations.map((prop, index) => (
          <SpendCommonResource
            key={index}
            type={prop.entity.type}
            playingAnimation={playingAnimation}
            delayTime={prop.delayTime}
            startPosition={prop.startPosition}
            endPosition={prop.endPosition}
            changeAmountTextPositionX={prop.changeAmountTextPositionX}
            changeAmount={prop.entity.amount}
            onAnimationEnd={onAnimationEnd}
          />
        ))}
    </div>
  );
};

export default ResourceAnimations;
