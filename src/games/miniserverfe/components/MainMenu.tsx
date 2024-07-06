import React from "react";
import circle from "../images/MainMenu/circle.png";
import confirmButtonImage from "../images/MainMenu/confirm.png";
import confirmButtonHoverImage from "../images/MainMenu/confirm_hover.png";
import rebootButtonImage from "../images/MainMenu/reboot.png";
import rebootButtonHoverImage from "../images/MainMenu/reboot_hover.png";
import display from "../images/MainMenu/display.png";
import "./MainMenu.css";
import MainMenuProgressBar from "./MainMenuProgressBar";
import MainMenuSelectingFrame from "./MainMenuSelectingFrame";

const MainMenu = () => {
  return (
    <div className="main-background">
      <div className="main-content">
        <img src={circle} className="main-circle-background" />
        <img src={display} className="main-display-image" />
        <MainMenuProgressBar />
        <MainMenuSelectingFrame />
        <img src={confirmButtonImage} className="main-button-image" />
      </div>
    </div>
  );
};

export default MainMenu;
