import React from "react";
import background from "../images/backgrounds/guide_frame.png";
import SkipButton from "./Buttons/SkipButton";
import PageSelector from "./PageSelector";
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

  const onClickSkip = () => {
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
        {showPageSelector && (
          <div className="guide-page-selector">
            <PageSelector
              currentPage={currentPage}
              pageCount={totalPage}
              onClickPrevPageButton={onClickPrevPageButton}
              onClickNextPageButton={onClickNextPageButton}
            />
          </div>
        )}
        <div className="guide-popup-skip-button">
          <SkipButton isDisabled={!enableSkipButton} onClick={onClickSkip} />
        </div>
      </div>
    </div>
  );
};

export default GuidePopup;
