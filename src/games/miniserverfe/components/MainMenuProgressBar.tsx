import React from "react";
import progressBarBackground from "../images/progress_bar.png";
import progressBarCover from "../images/highlight.png";
import "./MainMenuProgressBar.css";

const MainMenuProgressBar = () => {
  const progress = 0.7;

  return (
    <div className="main-progress-bar-container">
      <img
        src={progressBarBackground}
        className="main-progress-bar-background"
      />
      <div className="main-progress-container">
        <div
          className="main-progress-sector"
          style={{ width: `${progress * 100}%` }}
        ></div>
      </div>
      <img src={progressBarCover} className="main-progress-bar-cover" />
    </div>
  );
};

export default MainMenuProgressBar;
