import React from "react";
import RareResourceDisplay from "./RareResourceDisplay";
import { useAppSelector } from "../../../app/hooks";

import {
  getResourceIconPath,
  rareResourceTypes,
} from "../../../data/automata/models";
import { selectSelectedRareResources } from "../../../data/automata/creatures";
import "./RareResources.css";

const RareResources = () => {
  return (
    <div className="top-rare-resources-container">
      {rareResourceTypes.map((type, index) => (
        <RareResourceDisplay
          key={index}
          iconImagePath={getResourceIconPath(type)}
          amount={useAppSelector(selectSelectedRareResources(type))}
        />
      ))}
    </div>
  );
};

export default RareResources;
