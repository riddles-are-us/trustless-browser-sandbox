import React, { useEffect, useState } from "react";
import circleBackground from "../images/backgrounds/circle.png";
import display from "../images/MainMenu/display.png";
import MainMenuProgressBar from "./MainMenuProgressBar";
import MainMenuSelectingFrame from "./MainMenuSelectingFrame";
import MainMenuBot from "./MainMenuBot";
import ConfirmButton from "./Buttons/ConfirmButton";
import "./MainMenu.css";
import RebootButton from "./Buttons/RebootButton";
import DiffResourcesInfo from "./DiffResourcesInfo";
import { selectCreaturePrograms } from "../../../data/automata/creaturePrograms";
import { selectSelectedCreature } from "../../../data/automata/creatures";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";

const MainMenu = () => {
  const creaturePrograms = useAppSelector(selectCreaturePrograms);
  const selectedCreature = useAppSelector(selectSelectedCreature);

  return (
    <div className="main">
      <div className="main-content">
        <div className="main-info-container">
          <DiffResourcesInfo />
        </div>
        <div className="main-circle-container">
          <img src={circleBackground} className="main-circle-background" />
          <ConfirmButton />
          {/* <RebootButton /> */}
          <MainMenuSelectingFrame
            order={selectedCreature?.currentProgramIndex ?? null}
            isStop={selectedCreature?.isProgramStop ?? true}
          />
          {creaturePrograms.map((program, index) => (
            <MainMenuBot key={index} order={index} program={program} />
          ))}
          <img src={display} className="main-display-image" />
          <MainMenuProgressBar />
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
