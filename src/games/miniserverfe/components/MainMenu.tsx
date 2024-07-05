import React from "react";
import circle from "../images/MainMenu/circle.png";
import "./MainMenu.css";

const MainMenu = () => {
  return (
    <div className="main-background">
      <div className="main-content">
        <img src={circle} className="circle-background" />
      </div>
    </div>
  );
};

export default MainMenu;
