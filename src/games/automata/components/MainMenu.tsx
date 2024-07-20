import React, { useEffect, useState } from "react";
import circleBackground from "../images/backgrounds/circle.png";
import infoBackground from "../images/backgrounds/info_frame.png";
import display from "../images/MainMenu/display.png";
import MainMenuProgressBar from "./MainMenuProgressBar";
import MainMenuSelectingFrame from "./MainMenuSelectingFrame";
import MainMenuBot from "./MainMenuBot";
import ConfirmButton from "./Buttons/ConfirmButton";
import "./MainMenu.css";
import RebootButton from "./Buttons/RebootButton";

const MainMenu = () => {
  // for demo
  // const [selectingFrame, setSelectingFrame] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setSelectingFrame((prevSelectingFrame) => (prevSelectingFrame + 1) % 8);
  //   }, 500);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="main">
      <div className="main-content">
        <div className="main-info-container">
          <img src={infoBackground} className="main-info-background" />
        </div>
        <div className="main-circle-container">
          <img src={circleBackground} className="main-circle-background" />
          <ConfirmButton />
          {/* <RebootButton /> */}
          <MainMenuSelectingFrame order={0 /*selectingFrame*/} isStop={true} />
          {[...Array(8).keys()].map((order, index) => (
            <MainMenuBot key={index} order={order} />
          ))}
          <img src={display} className="main-display-image" />
          <MainMenuProgressBar />
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
