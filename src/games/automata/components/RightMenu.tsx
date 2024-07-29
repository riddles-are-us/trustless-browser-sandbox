import React, { useEffect, useRef, useState } from "react";
import rightCornerBar from "../images/backgrounds/right_corner_bar.png";
import "./RightMenu.css";
import UpButton from "./Buttons/UpButton";
import DownButton from "./Buttons/DownButton";
import PageNumber from "./PageNumber";
import Grid from "./Grid";
import Program from "./Program";
import ProgramFilterBar from "./ProgramFilterBar";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { selectIsSelectingUIState } from "../../../data/automata/properties";
import {
  selectFilteredPrograms,
  selectProgramsOnCurrentPage,
  selectCurrentPage,
  pageUp,
  pageDown,
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
  const programGridElementWidth = 75;
  const programGridElementHeight = 70;
  const programGridColumnCount = 2;
  const programGridRowCount = Math.floor(
    programGridHeight / programGridElementHeight
  );
  const amountPerPage = programGridColumnCount * programGridRowCount;
  const currentPage = useAppSelector(selectCurrentPage);
  const programsBeforePage = useAppSelector(selectFilteredPrograms);
  const programs = useAppSelector(
    selectProgramsOnCurrentPage(programsBeforePage)(amountPerPage)
  );
  const pageCount = Math.max(
    Math.ceil(programsBeforePage.length / amountPerPage),
    1
  );
  const showDownButton = currentPage > 0;
  const showUpButton = currentPage < pageCount - 1;
  const isSelectingUIState = useAppSelector(selectIsSelectingUIState);

  useEffect(() => {
    updateProgramGridHeight();
    window.addEventListener("resize", updateProgramGridHeight);
    return () => {
      window.removeEventListener("resize", updateProgramGridHeight);
    };
  }, []);

  const onSelectProgram = (programIndex: number) => {
    if (isSelectingUIState) {
      dispatch(setProgramIndex({ programIndex }));
    }
  };

  const onClickUpButton = () => {
    dispatch(pageUp({}));
  };

  const onClickDownButton = () => {
    dispatch(pageDown({}));
  };

  return (
    <div className="right">
      <div className="right-top"></div>
      <div className="right-middle"></div>
      <div className="right-bottom"></div>
      <PageNumber
        page={currentPage + 1}
        maxPage={pageCount}
        positionClass={"right-page-number-position"}
      />
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
      <img src={rightCornerBar} className="right-corner-bar" />
      <div className="right-program-filter-bar-position">
        <ProgramFilterBar />
      </div>
      <div className="right-up-button-position">
        {showUpButton && <UpButton onClick={onClickUpButton} />}
      </div>

      <div className="right-down-button-position">
        {showDownButton && <DownButton onClick={onClickDownButton} />}
      </div>
    </div>
  );
};

export default RightMenu;
