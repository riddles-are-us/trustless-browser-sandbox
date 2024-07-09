import React from "react";
import rightCornerBar from "../images/backgrounds/right_corner_bar.png";
import "./RightMenu.css";
import UpButton from "./Buttons/UpButton";
import DownButton from "./Buttons/DownButton";
import PageNumber from "./PageNumber";

const RightMenu = () => {
  return (
    <div className="right">
      <div className="right-top"></div>
      <div className="right-middle"></div>
      <div className="right-bottom"></div>
      <img src={rightCornerBar} className="right-corner-bar" />
      <PageNumber
        page={1}
        maxPage={8}
        positionClass={"right-page-number-position"}
      />
      <UpButton positionClass={"right-up-button-position"} />
      <DownButton positionClass={"right-down-button-position"} />
    </div>
  );
};

export default RightMenu;
