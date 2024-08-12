import React from "react";
import SpendCommonResource from "./SpendCommonResource";
import { commonResourceTypes } from "../../../data/automata/models";
import "./SpendResources.css";

const SpendResources = () => {
  return (
    <div className="spend-resources-container">
      {commonResourceTypes.map((type, index) => (
        <SpendCommonResource key={index} type={type} order={index} />
      ))}
    </div>
  );
};

export default SpendResources;
