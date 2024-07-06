import React, { useEffect, useState } from "react";
import circle from "../images/MainMenu/circle.png";
import confirmButtonImage from "../images/MainMenu/confirm.png";
import confirmButtonHoverImage from "../images/MainMenu/confirm_hover.png";
import rebootButtonImage from "../images/MainMenu/reboot.png";
import rebootButtonHoverImage from "../images/MainMenu/reboot_hover.png";
import display from "../images/MainMenu/display.png";
import "./MainMenu.css";
import MainMenuProgressBar from "./MainMenuProgressBar";
import MainMenuSelectingFrame from "./MainMenuSelectingFrame";
import MainMenuBot from "./MainMenuBot";

const MainMenu = () => {
  const [selectingFrame, setSelectingFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectingFrame((prevSelectingFrame) => (prevSelectingFrame + 1) % 8);
    }, 500); // Change interval to 1000ms (1 second)

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div className="main-background">
      <div className="main-content">
        <img src={circle} className="main-circle-background" />
        <img src={display} className="main-display-image" />
        <MainMenuProgressBar />
        <MainMenuSelectingFrame order={selectingFrame} />
        {[...Array(8).keys()].map((order) => (
          <MainMenuBot order={order} />
        ))}
        <img src={confirmButtonImage} className="main-button-image" />
      </div>
    </div>
  );
};

export default MainMenu;
