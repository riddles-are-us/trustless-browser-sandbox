import React from "react";
import GainCommonResource from "./GainCommonResource";
import { commonResourceTypes } from "../../../data/automata/models";
import "./GainResources.css";

const GainResources = () => {
  return (
    <div className="gain-resources-container">
      {commonResourceTypes.map((type, index) => (
        <GainCommonResource key={index} type={type} order={index} />
      ))}
    </div>
  );
};

export default GainResources;
