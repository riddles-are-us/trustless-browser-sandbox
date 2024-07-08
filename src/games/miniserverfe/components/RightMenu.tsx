import React from "react";
import rightCornerBar from "../images/backgrounds/right_corner_bar.png";
import "./RightMenu.css";
import UpButton from "./Buttons/UpButton";
import DownButton from "./Buttons/DownButton";

const RightMenu = () => {
  return (
    <div className="right">
      <div className="right-top"></div>
      <div className="right-middle"></div>
      <div className="right-bottom"></div>
      <img src={rightCornerBar} className="right-corner-bar" />
      <UpButton positionClass={"right-up-button-position"} />
      <DownButton positionClass={"right-down-button-position"} />
    </div>
  );
};

export default RightMenu;
