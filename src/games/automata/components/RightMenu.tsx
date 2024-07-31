import React, { useEffect, useRef, useState } from "react";
import rightCornerBar from "../images/backgrounds/right_corner_bar.png";
import "./RightMenu.css";
import PageSelector from "./PageSelector";
import Grid from "./Grid";
import Program from "./Program";
import ProgramFilterBar from "./ProgramFilterBar";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  selectIsSelectingUIState,
  selectIsLoading,
} from "../../../data/automata/properties";
import {
  selectFilteredPrograms,
  selectProgramsOnCurrentPage,
  selectCurrentPage,
  prevPage,
  nextPage,
} from "../../../data/automata/programs";
import { setProgramIndex } from "../../../data/automata/creatures";

const RightMenu = () => {
  const dispatch = useAppDispatch();
  const [programGridHeight, setProgramGridHeight] = useState(0);
  const programGridRef = useRef<HTMLInputElement>(null);
  const updateProgramGridHeight = () => {
    if (programGridRef.current) {
      setProgramGridHeight(programGridRef.current.offsetHeight);
    }
  };
  const programGridElementWidth = 85;
  const programGridElementHeight = 92;
  const programGridColumnCount = 2;
  const programGridRowCount = Math.floor(
    programGridHeight / programGridElementHeight
  );
  const amountPerPage = programGridColumnCount * programGridRowCount;
  const currentPage = useAppSelector(selectCurrentPage);
  const programsBeforePaging = useAppSelector(selectFilteredPrograms);
  const programs = useAppSelector(
    selectProgramsOnCurrentPage(programsBeforePaging)(amountPerPage)
  );
  const pageCount = Math.max(
    Math.ceil(programsBeforePaging.length / amountPerPage),
    1
  );
  const isSelectingUIState = useAppSelector(selectIsSelectingUIState);
  const isLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    updateProgramGridHeight();
    window.addEventListener("resize", updateProgramGridHeight);
    return () => {
      window.removeEventListener("resize", updateProgramGridHeight);
    };
  }, []);

  const onSelectProgram = (programIndex: number) => {
    if (isSelectingUIState && !isLoading) {
      dispatch(setProgramIndex({ programIndex }));
    }
  };

  const onClickPrevPageButton = () => {
    dispatch(prevPage({}));
  };

  const onClickNextPageButton = () => {
    dispatch(nextPage({}));
  };

  return (
    <div className="right">
      <div className="right-top"></div>
      <div className="right-middle"></div>
      <div className="right-bottom"></div>
      <img src={rightCornerBar} className="right-corner-bar" />
      <div ref={programGridRef} className="right-program-grid">
        <Grid
          elementWidth={programGridElementWidth}
          elementHeight={programGridElementHeight}
          columnCount={programGridColumnCount}
          rowCount={programGridRowCount}
          elements={programs.map((program, index) => (
            <Program
              key={index}
              data={program}
              onSelect={() => onSelectProgram(program.index)}
            />
          ))}
        />
      </div>
      <div className="right-program-filter-bar-position">
        <ProgramFilterBar />
      </div>
      <div className="right-program-page-selector">
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

export default RightMenu;
