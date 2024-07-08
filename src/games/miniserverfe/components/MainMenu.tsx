import React, { useEffect, useState } from "react";
import circle from "../images/MainMenu/circle.png";
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
    <div className="main-background">
      <div className="main-content">
        <img src={circle} className="main-circle-background" />
        <ConfirmButton />
        {/* <RebootButton /> */}
        <MainMenuSelectingFrame order={0 /*selectingFrame*/} />
        {[...Array(8).keys()].map((order) => (
          <MainMenuBot order={order} />
        ))}
        <img src={display} className="main-display-image" />
        <MainMenuProgressBar />
      </div>
    </div>
  );
};

export default MainMenu;
