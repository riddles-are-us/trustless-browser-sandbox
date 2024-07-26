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
import { selectAllPrograms } from "../../../data/automata/programs";
import { trySetProgramForCreatingCreature } from "../../../data/automata/creatures";

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
  const programs = useAppSelector(
    selectAllPrograms(0, programGridColumnCount * programGridRowCount)
  );

  useEffect(() => {
    updateProgramGridHeight();
    window.addEventListener("resize", updateProgramGridHeight);
    return () => {
      window.removeEventListener("resize", updateProgramGridHeight);
    };
  }, []);

  const onSelectProgram = (index: number) => {
    dispatch(trySetProgramForCreatingCreature({ index }));
  };

  return (
    <div className="right">
      <div className="right-top"></div>
      <div className="right-middle"></div>
      <div className="right-bottom"></div>
      <PageNumber
        page={1}
        maxPage={8}
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
        <UpButton
          onClick={() => {
            /**/
          }}
        />
      </div>

      <div className="right-down-button-position">
        <DownButton
          onClick={() => {
            /**/
          }}
        />
      </div>
    </div>
  );
};

export default RightMenu;
