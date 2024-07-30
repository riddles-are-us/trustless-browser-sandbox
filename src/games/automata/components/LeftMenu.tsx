import React, { useEffect, useRef, useState } from "react";
import leftMiddleBar from "../images/backgrounds/left_middle_bar.png";
import leftCornerBar from "../images/backgrounds/left_corner_bar.png";
import "./LeftMenu.css";
import PrevPageButton from "./Buttons/PrevPageButton";
import NextPageButton from "./Buttons/NextPageButton";
import Grid from "./Grid";
import Creature from "./Creature";
import {
  selectCreatures,
  selectCurrentPage,
  selectCreaturesOnCurrentPage,
  nextPage,
  prevPage,
} from "../../../data/automata/creatures";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

const LeftMenu = () => {
  const dispatch = useAppDispatch();
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
  const amountPerPage = creatureGridColumnCount * creatureGridRowCount;

  const currentPage = useAppSelector(selectCurrentPage);
  const creaturesBeforePaging = useAppSelector(selectCreatures);
  const creatures = useAppSelector(
    selectCreaturesOnCurrentPage(creaturesBeforePaging)(amountPerPage)
  );
  const pageCount = Math.max(
    Math.ceil(creaturesBeforePaging.length / amountPerPage),
    1
  );
  const enableNextPageButton = currentPage < pageCount - 1;
  const enablePrevPageButton = currentPage > 0;

  const onClickPrevPageButton = () => {
    dispatch(prevPage({}));
  };

  const onClickNextPageButton = () => {
    dispatch(nextPage({}));
  };

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
      <div className="left-up-button-position">
        <PrevPageButton
          isDisabled={!enablePrevPageButton}
          onClick={onClickPrevPageButton}
        />
      </div>
      <div className="left-down-button-position">
        <NextPageButton
          isDisabled={!enableNextPageButton}
          onClick={onClickNextPageButton}
        />
      </div>
    </div>
  );
};

export default LeftMenu;
