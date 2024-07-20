import React from "react";
import "./Program.css";
import programBackground from "../images/backgrounds/program_background.png";
import Grid from "./Grid";
import TinyResourceDisplay from "./TinyResourceDisplay";

import EnercoreIcon from "../images/Icons/Enercore.png";

interface Props {
  onSelect: () => void;
}

const Program = ({ onSelect }: Props) => {
  return (
    <div className="program-container" onClick={onSelect}>
      <img src={programBackground} className="program-background" />
      <p className="program-text">ROBOT</p>
      <div className="program-resource-grid">
        <Grid
          elementWidth={29}
          elementHeight={12}
          columnCount={2}
          rowCount={3}
          elements={[
            <TinyResourceDisplay iconImagePath={EnercoreIcon} amount={5} />,
            <TinyResourceDisplay iconImagePath={EnercoreIcon} amount={2} />,
            <TinyResourceDisplay iconImagePath={EnercoreIcon} amount={-3} />,
          ]}
        />
      </div>
    </div>
  );
};

export default Program;
