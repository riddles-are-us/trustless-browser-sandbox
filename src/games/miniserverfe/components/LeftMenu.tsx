import React from "react";
import leftMiddleBar from "../images/backgrounds/left_middle_bar.png";
import leftCornerBar from "../images/backgrounds/left_corner_bar.png";
import "./LeftMenu.css";
import UpButton from "./Buttons/UpButton";
import DownButton from "./Buttons/DownButton";
import NewButton from "./Buttons/NewButton";
import Grid from "./Grid";

const LeftMenu = () => {
  return (
    <div className="left">
      <div className="left-top"></div>
      <div className="left-middle"></div>
      <div className="left-bottom"></div>
      <NewButton positionClass={"left-new-button-position"} />
      <UpButton positionClass={"left-up-button-position"} />
      <div className="left-grid">
        <Grid
          elementWidth={75}
          elementHeight={90}
          columnCount={2}
          rowCount={6}
        />
      </div>
      <img src={leftMiddleBar} className="left-middle-bar" />
      <img src={leftCornerBar} className="left-corner-bar" />
      <DownButton positionClass={"left-down-button-position"} />
    </div>
  );
};

export default LeftMenu;
