import React from "react";
import bot from ".../images/MainMenu/select_robot.png";

import "./MainMenuBot.css";
import {
  ProgramModel,
  getActionComponent,
} from "../../../data/automata/models";

import {
  selectIsSelectingUIState,
  selectIsLoading,
} from "../../../data/automata/properties";
import { setSelectingProgramIndex } from "../../../data/automata/creatures";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import XenoBloom from "./Actions/XenoBloom";

interface Props {
  isCurrent: boolean;
  order: number;
  program: ProgramModel | null;
}

const MainMenuBot = ({ isCurrent, order, program }: Props) => {
  const dispatch = useAppDispatch();
  const isSelectingUIState = useAppSelector(selectIsSelectingUIState);
  const isLoading = useAppSelector(selectIsLoading);

  const rotation = order * 45 + 22.5;
  const angle = 90 - rotation;

  const radius = 30;
  const yPosition = 50 - Math.sin((angle * Math.PI) / 180) * radius;
  const xPosition = 50 + Math.cos((angle * Math.PI) / 180) * radius;
  const onClick = () => {
    if (isSelectingUIState && !isLoading) {
      dispatch(setSelectingProgramIndex({ selectingIndex: order }));
    }
  };

  return (
    <div
      className="main-bot-container"
      onClick={onClick}
      style={{
        top: `${yPosition}%`,
        left: `${xPosition}%`,
      }}
    >
      {getActionComponent(program, isCurrent)}
    </div>
  );
};

export default MainMenuBot;
