import React from "react";
import background from "../images/backgrounds/bg_1.png";
import frame from "../images/backgrounds/frame.png";
import "./WelcomePageProgressBar.css";

interface Props {
  progress: number;
}

const WelcomePageProgressBar = ({ progress }: Props) => {
  return (
    <>
      <div className="welcome-page-progress-bar-container">
        <p className="welcome-page-progress-bar-text">{`${progress}%`}</p>
        <img
          src={background}
          className="welcome-page-progress-bar-background"
        />
        <div className="welcome-page-progress-container">
          <div
            className="welcome-page-progress-sector"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <img src={frame} className="welcome-page-progress-bar-frame" />
      </div>
    </>
  );
};

export default WelcomePageProgressBar;
