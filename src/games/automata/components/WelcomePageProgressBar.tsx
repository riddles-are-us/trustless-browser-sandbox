import React from "react";
import background from "../images/backgrounds/bg_1.png";
import frame from "../images/backgrounds/frame.png";
import "./WelcomePageProgressBar.css";

interface Props {
  progress: number;
  message: string;
}

const WelcomePageProgressBar = ({ progress, message }: Props) => {
  return (
    <>
      <div className="welcome-page-progress-bar-container">
        <p className="welcome-page-progress-bar-progress-text">{`${progress}%`}</p>
        <p className="welcome-page-progress-bar-message-text">{message}</p>
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
