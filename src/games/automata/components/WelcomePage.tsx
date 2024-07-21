import React from "react";
import "./WelcomePage.css";
import PlayButton from "./Buttons/PlayButton";
import WelcomePageProgressBar from "./WelcomePageProgressBar";

interface Props {
  progress: number;
  onClick: () => void;
}

const WelcomePage = ({ progress, onClick }: Props) => {
  return (
    <div className="welcome-page-container">
      <div className="welcome-page-background"></div>
      <div className="welcome-page-play-button">
        <PlayButton onClick={onClick} />
      </div>
      {progress > 0 ? (
        <>
          <div className="welcome-page-background-filter"></div>
          <WelcomePageProgressBar progress={progress} />
        </>
      ) : null}
    </div>
  );
};

export default WelcomePage;
