import React from "react";
import rightCornerBar from "../images/backgrounds/right_corner_bar.png";
import "./RightMenu.css";

const RightMenu = () => {
  return (
    <div className="right">
      <div className="right-top"></div>
      <div className="right-middle"></div>
      <div className="right-bottom"></div>
      <img src={rightCornerBar} className="right-corner-bar" />
    </div>
  );
};

export default RightMenu;
