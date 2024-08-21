import React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import background from "../images/backgrounds/guide_frame.png";
import GuideButton from "./Buttons/GuideButton";
import { setUIState, UIState } from "../../../data/automata/properties";
import "./SummaryMenu.css";

const SummaryMenu = () => {
  const dispatch = useAppDispatch();
  const onClickGuide = () => {
    dispatch(setUIState({ uIState: UIState.Guide }));
  };
  return (
    <div className="summary-menu-container">
      <img src={background} className="summary-menu-background" />
      <div className="summary-menu-guide-button">
        <GuideButton onClick={onClickGuide} />
      </div>
    </div>
  );
};

export default SummaryMenu;
