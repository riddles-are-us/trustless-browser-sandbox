import React from "react";
import SmallResourceDisplay from "./SmallResourceDisplay";
import { useAppSelector } from "../../../app/hooks";

import {
  getResourceIconPath,
  rareResourceTypes,
} from "../../../data/automata/models";
import { selectSelectedRareResources } from "../../../data/automata/creatures";
import "./SmallResources.css";

const SmallResources = () => {
  return (
    <div className="top-small-resources-container">
      {rareResourceTypes.map((type, index) => (
        <SmallResourceDisplay
          key={index}
          iconImagePath={getResourceIconPath(type)}
          amount={useAppSelector(selectSelectedRareResources(type))}
        />
      ))}
    </div>
  );
};

export default SmallResources;
