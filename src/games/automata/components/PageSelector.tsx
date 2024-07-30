import React from "react";
import number_display from "../images/backgrounds/number_display.png";
import PrevPageButton from "./Buttons/PrevPageButton";
import NextPageButton from "./Buttons/NextPageButton";
import "./PageSelector.css";

interface Props {
  currentPage: number;
  pageCount: number;
  onClickPrevPageButton: () => void;
  onClickNextPageButton: () => void;
}

const PageSelector = ({
  currentPage,
  pageCount,
  onClickPrevPageButton,
  onClickNextPageButton,
}: Props) => {
  const enableNextPageButton = currentPage < pageCount - 1;
  const enablePrevPageButton = currentPage > 0;

  return (
    <div className="page-selector-container">
      <div className="page-selector-prev-button">
        <PrevPageButton
          isDisabled={!enablePrevPageButton}
          onClick={onClickPrevPageButton}
        />
      </div>
      <img
        src={number_display}
        className={`page-selector-page-number-background`}
      ></img>

      <p className={`page-selector-page-number-text`}>{`${
        currentPage + 1
      }/${pageCount}`}</p>
      <div className="page-selector-next-button">
        <NextPageButton
          isDisabled={!enableNextPageButton}
          onClick={onClickNextPageButton}
        />
      </div>
    </div>
  );
};

export default PageSelector;
