import React from "react";
import MediumResourceDisplay from "./MediumResourceDisplay";
import { useAppSelector } from "../../../app/hooks";
import "./MediumResources.css";

import { selectCommonResource } from "../../../data/automata/resources";
import {
  getResourceIconPath,
  commonResourceTypes,
} from "../../../data/automata/models";

const MediumResources = () => {
  return (
    <div className="top-medium-resources-container">
      {commonResourceTypes.map((type, index) => (
        <MediumResourceDisplay
          key={index}
          iconImagePath={getResourceIconPath(type)}
          amount={useAppSelector(selectCommonResource(type))}
        />
      ))}
    </div>
  );
};

export default MediumResources;
