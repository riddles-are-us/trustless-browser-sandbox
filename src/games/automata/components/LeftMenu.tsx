import React, { useEffect, useRef, useState } from "react";
import leftMiddleBar from "../images/backgrounds/left_middle_bar.png";
import leftCornerBar from "../images/backgrounds/left_corner_bar.png";
import "./LeftMenu.css";
import PageSelector from "./PageSelector";
import Grid from "./Grid";
import Creature from "./Creature";
import { selectIsLoading } from "../../../data/automata/properties";
import {
  selectCreatures,
  selectCurrentPage,
  selectCreaturesOnCurrentPage,
  selectCreaturesCurrentProgressOnCurrentPage,
  nextPage,
  prevPage,
} from "../../../data/automata/creatures";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

interface Props {
  localTimer: number;
}

const LeftMenu = ({ localTimer }: Props) => {
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
  const progress = useAppSelector(
    selectCreaturesCurrentProgressOnCurrentPage(creaturesBeforePaging)(
      amountPerPage
    )(localTimer)
  );
  const pageCount = Math.max(
    Math.ceil(creaturesBeforePaging.length / amountPerPage),
    1
  );
  const isLoading = useAppSelector(selectIsLoading);

  const onClickPrevPageButton = () => {
    if (!isLoading) {
      dispatch(prevPage({}));
    }
  };

  const onClickNextPageButton = () => {
    if (!isLoading) {
      dispatch(nextPage({}));
    }
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
            <Creature
              key={index}
              index={currentPage * amountPerPage + index}
              creature={creature}
              progress={progress[index]}
            />
          ))}
        />
      </div>

      <img src={leftMiddleBar} className="left-middle-bar" />
      <img src={leftCornerBar} className="left-corner-bar" />
      <div className="left-creature-page-selector">
        <PageSelector
          currentPage={currentPage}
          pageCount={pageCount}
          onClickPrevPageButton={onClickPrevPageButton}
          onClickNextPageButton={onClickNextPageButton}
        />
      </div>
    </div>
  );
};

export default LeftMenu;
