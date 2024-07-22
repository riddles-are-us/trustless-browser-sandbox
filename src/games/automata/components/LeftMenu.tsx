import React, { useEffect, useRef, useState } from "react";
import leftMiddleBar from "../images/backgrounds/left_middle_bar.png";
import leftCornerBar from "../images/backgrounds/left_corner_bar.png";
import "./LeftMenu.css";
import UpButton from "./Buttons/UpButton";
import DownButton from "./Buttons/DownButton";
import NewButton from "./Buttons/NewButton";
import Grid from "./Grid";
import Creature from "./Creature";
import { useAppSelector } from "../../../app/hooks";
import { selectCreatures } from "../../../data/automata";

const LeftMenu = () => {
  const [creatureGridHeight, setCreatureGridHeight] = useState(0);
  const creatureGridRef = useRef<HTMLInputElement>(null);
  const updateCreatureGridHeight = () => {
    if (creatureGridRef.current) {
      setCreatureGridHeight(creatureGridRef.current.offsetHeight);
    }
  };
  const creatureGridElementWidth = 75;
  const creatureGridElementHeight = 90;
  const creatureGridColumnCount = 2;
  const creatureGridRowCount = Math.floor(
    creatureGridHeight / creatureGridElementHeight
  );

  const creatures = useAppSelector(selectCreatures);

  useEffect(() => {
    updateCreatureGridHeight();
    window.addEventListener("resize", updateCreatureGridHeight);
    return () => {
      window.removeEventListener("resize", updateCreatureGridHeight);
    };
  }, []);

  return (
    <div className="left">
      <div className="left-top"></div>
      <div className="left-middle"></div>
      <div className="left-bottom"></div>

      <div ref={creatureGridRef} className="left-creature-grid">
        <Grid
          elementWidth={creatureGridElementWidth}
          elementHeight={creatureGridElementHeight}
          columnCount={creatureGridColumnCount}
          rowCount={creatureGridRowCount}
          elements={creatures.map((creature, index) => (
            <Creature key={index} index={index} creature={creature} />
          ))}
        />
      </div>

      <img src={leftMiddleBar} className="left-middle-bar" />
      <img src={leftCornerBar} className="left-corner-bar" />

      <div className="left-new-button-position">
        <NewButton />
      </div>
      <div className="left-up-button-position">
        <UpButton />
      </div>
      <div className="left-down-button-position">
        <DownButton />
      </div>
    </div>
  );
};

export default LeftMenu;
