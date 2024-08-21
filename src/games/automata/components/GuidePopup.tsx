import React from "react";
import background from "../images/backgrounds/guide_frame.png";
import EndGuideButton from "./Buttons/EndGuideButton";
import HorizontalPrevPageButton from "./Buttons/HorizontalPrevPageButton";
import HorizontalNextPageButton from "./Buttons/HorizontalNextPageButton";
import { UIState, setUIState } from "../../../data/automata/properties";
import {
  nextPage,
  prevPage,
  selectCurrentPage,
  selectTotalPage,
  selectGuideOnCurrentPage,
} from "../../../data/automata/guides";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./GuidePopup.css";

const GuidePopup = () => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(selectCurrentPage);
  const totalPage = useAppSelector(selectTotalPage);
  const currentGuide = useAppSelector(selectGuideOnCurrentPage);
  const showPageSelector = totalPage > 1;
  const enableSkipButton = currentPage >= totalPage - 1;
  const enablePrevPageButton = currentPage > 0;
  const enableNextPageButton = currentPage < totalPage - 1;

  const onClickEndGuide = () => {
    if (enableSkipButton) {
      dispatch(setUIState({ uIState: UIState.Idle }));
    }
  };

  const onClickPrevPageButton = () => {
    dispatch(prevPage({}));
  };

  const onClickNextPageButton = () => {
    dispatch(nextPage({}));
  };

  return (
    <div className="guide-popup-container">
      <div className="guide-popup-mask"></div>
      <div className="guide-popup-main-container">
        <img src={background} className="guide-popup-main-background" />
        {currentGuide}
        {!enableSkipButton && (
          <div className="guide-popup-prev-button">
            <HorizontalPrevPageButton
              isDisabled={!enablePrevPageButton}
              onClick={onClickPrevPageButton}
            />
          </div>
        )}
        {!enableSkipButton && (
          <div className="guide-popup-next-button">
            <HorizontalNextPageButton
              isDisabled={!enableNextPageButton}
              onClick={onClickNextPageButton}
            />
          </div>
        )}
        {enableSkipButton && (
          <div className="guide-popup-end-guide-button">
            <EndGuideButton onClick={onClickEndGuide} />
          </div>
        )}
      </div>
    </div>
  );
};

export default GuidePopup;
