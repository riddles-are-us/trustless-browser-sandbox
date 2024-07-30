import React from "react";
import "./DiffResourcesInfo.css";
import infoBackground from "../images/backgrounds/info_frame.png";
import Grid from "./Grid";
import DiffResourceDisplay from "./DiffResourceDisplay";

import {
  ResourceType,
  getResourceIconPath,
} from "../../../data/automata/models";

interface Props {
  diffResources: {
    [k: string]: number;
  };
}

const DiffResourcesInfo = ({ diffResources }: Props) => {
  const allResourceTypesWithBlanks = [
    ResourceType.Crystal,
    ResourceType.InterstellarMineral,
    ResourceType.Biomass,
    ResourceType.QuantumFoam,
    ResourceType.Necrodermis,
    ResourceType.AlienFloral,
    ResourceType.SpiceMelange,
    ResourceType.Titanium,
    ResourceType.Enercore,
    ResourceType.Nexium,
    null,
    null,
    ResourceType.Swiftex,
    ResourceType.Cognisurge,
    null,
    null,
    ResourceType.Vitalshield,
    ResourceType.Flexonix,
  ];
  return (
    <>
      <img src={infoBackground} className="main-info-background" />
      <div className="diff-resources-info-grid">
        <Grid
          columnCount={4}
          rowCount={5}
          elements={allResourceTypesWithBlanks.map((type, index) =>
            type != null ? (
              <DiffResourceDisplay
                key={index}
                iconImagePath={getResourceIconPath(type)}
                amount={diffResources[type]}
              />
            ) : (
              <DiffResourceDisplay key={index} />
            )
          )}
        />
      </div>
    </>
  );
};

export default DiffResourcesInfo;
