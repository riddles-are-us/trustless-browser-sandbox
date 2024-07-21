import React from "react";
import progressBarBackground from "../images/MainMenu/progress_bar.png";
import progressBarCover from "../images/MainMenu/highlight.png";
import "./MainMenuProgressBar.css";

const MainMenuProgressBar = () => {
  const progress = 70;

  return (
    <div className="main-progress-bar-container">
      <img
        src={progressBarBackground}
        className="main-progress-bar-background"
      />
      <div className="main-progress-container">
        <div
          className="main-progress-sector"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <img src={progressBarCover} className="main-progress-bar-cover" />
    </div>
  );
};

export default MainMenuProgressBar;
