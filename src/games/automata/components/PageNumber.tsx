import React from "react";
import number_display from "../images/backgrounds/number_display.png";
import "./PageNumber.css";

interface Props {
  page: number;
  maxPage: number;
  positionClass: string;
}

const PageNumber = ({ page, maxPage, positionClass }: Props) => {
  return (
    <>
      <img
        src={number_display}
        className={`page-number-background ${positionClass}`}
      ></img>

      <p
        className={`page-number-text ${positionClass}`}
      >{`${page}/${maxPage}`}</p>
    </>
  );
};

export default PageNumber;
