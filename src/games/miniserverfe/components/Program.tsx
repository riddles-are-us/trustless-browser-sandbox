import React from "react";
import "./Program.css";
import programBackground from "../images/backgrounds/program_background.png";
import Grid from "./Grid";
import TinyResourceDisplay from "./TinyResourceDisplay";

import EnercoreIcon from "../images/Icons/Enercore.png";

const Program = () => {
  return (
    <div className="program-container">
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
          ]}
        />
      </div>
    </div>
  );
};

export default Program;
