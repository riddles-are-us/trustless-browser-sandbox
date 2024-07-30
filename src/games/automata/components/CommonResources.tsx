import React from "react";
import CommonResourceDisplay from "./CommonResourceDisplay";
import { useAppSelector } from "../../../app/hooks";
import "./CommonResources.css";

import { selectCommonResource } from "../../../data/automata/resources";
import {
  getResourceIconPath,
  commonResourceTypes,
} from "../../../data/automata/models";

const CommonResources = () => {
  return (
    <div className="top-common-resources-container">
      {commonResourceTypes.map((type, index) => (
        <CommonResourceDisplay
          key={index}
          iconImagePath={getResourceIconPath(type)}
          amount={useAppSelector(selectCommonResource(type))}
        />
      ))}
    </div>
  );
};

export default CommonResources;
