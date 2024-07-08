import React from "react";
import leftMiddleBar from "../images/backgrounds/left_middle_bar.png";
import leftCornerBar from "../images/backgrounds/left_corner_bar.png";
import "./LeftMenu.css";
import UpButton from "./Buttons/UpButton";
import DownButton from "./Buttons/DownButton";

const LeftMenu = () => {
  return (
    <div className="left">
      <div className="left-top"></div>
      <div className="left-middle"></div>
      <div className="left-bottom"></div>
      <img src={leftMiddleBar} className="left-middle-bar" />
      <img src={leftCornerBar} className="left-corner-bar" />
      <UpButton positionClass={"left-up-button-position"} />
      <DownButton positionClass={"left-down-button-position"} />
    </div>
  );
};

export default LeftMenu;
