import React from "react";
import "./Program.css";
import programBackground from "../images/backgrounds/program_background.png";
import Grid from "./Grid";
import TinyResourceDisplay from "./TinyResourceDisplay";
import { ProgramModel } from "../../../data/automata/programs";

interface Props {
  data: ProgramModel;
  onSelect: () => void;
}

const Program = ({ data, onSelect }: Props) => {
  return (
    <div className="program-container" onClick={onSelect}>
      <img src={programBackground} className="program-background" />
      <p className="program-text">{data.name}</p>
      <div className="program-resource-grid">
        <Grid
          elementWidth={29}
          elementHeight={12}
          columnCount={2}
          rowCount={3}
          elements={data.resources.map((resource, index) => (
            <TinyResourceDisplay
              key={index}
              iconImagePath={resource.iconImagePath}
              amount={resource.amount}
            />
          ))}
        />
      </div>
    </div>
  );
};

export default Program;
