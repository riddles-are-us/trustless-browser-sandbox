import React from "react";
import "./Program.css";
import programBackground from "../images/backgrounds/program_button.png";
import programIdleBackground from "../images/backgrounds/program_idle.png";
import Grid from "./Grid";
import TinyResourceDisplay from "./TinyResourceDisplay";
import {
  ProgramModel,
  getResourceIconPath,
} from "../../../data/automata/models";

import { formatTime } from "../../../data/automata/creatures";

interface Props {
  data: ProgramModel;
  onSelect: () => void;
}

const Program = ({ data, onSelect }: Props) => {
  return (
    <div className="program-container" onClick={onSelect}>
      <img src={programBackground} className="program-background" />
      <p className="program-name-text">{data.name}</p>
      <p className="program-time-text">{formatTime(data.processingTime)}</p>
      <div className="program-resource-grid">
        <Grid
          elementWidth={23}
          elementHeight={11}
          columnCount={3}
          rowCount={3}
          elements={data.resources.map((resource, index) => (
            <TinyResourceDisplay
              key={index}
              iconImagePath={getResourceIconPath(resource.type)}
              amount={resource.amount}
            />
          ))}
        />
      </div>
    </div>
  );
};

export default Program;
