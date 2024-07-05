import React from "react";
import circle from "../images/MainMenu/circle.png";
import confirmButtonImage from "../images/MainMenu/confirm.png";
import confirmButtonHoverImage from "../images/MainMenu/confirm_hover.png";
import rebootButtonImage from "../images/MainMenu/reboot.png";
import rebootButtonHoverImage from "../images/MainMenu/reboot_hover.png";
import "./MainMenu.css";

const MainMenu = () => {
  return (
    <div className="main-background">
      <div className="main-content">
        <img src={circle} className="main-circle-background" />
        <img src={confirmButtonImage} className="main-button-image" />
      </div>
    </div>
  );
};

export default MainMenu;
