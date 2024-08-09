import React from "react";
import "./Program.css";
import Grid from "./Grid";
import ProgramResourceDisplay from "./ProgramResourceDisplay";
import {
  ProgramModel,
  getResourceIconPath,
} from "../../../data/automata/models";
import ProgramButton from "./Buttons/ProgramButton";

import { formatTime } from "../../../data/automata/creatures";

interface Props {
  data: ProgramModel;
  onSelect: () => void;
}

const Program = ({ data, onSelect }: Props) => {
  return (
    <div className="program-container">
      <ProgramButton isDisabled={false} onClick={onSelect} />
      <p className="program-name-text">{data.name}</p>
      <p className="program-time-text">{formatTime(data.processingTime)}</p>
      <div className="program-resource-grid">
        <Grid
          elementWidth={35}
          elementHeight={14}
          columnCount={2}
          rowCount={4}
          elements={data.resources.map((resource, index) => (
            <ProgramResourceDisplay
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
