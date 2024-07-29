import React from "react";
import background from "../images/backgrounds/right_bar_deco.png";
import "./ProgramFilterBar.css";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import ProgramFilterButton from "./ProgramFilterButton";
import {
  resetFilter,
  toggleFilter,
  selectIsAllResourcesToggled,
  selectIsResourceTypeToggled,
} from "../../../data/automata/programs";

import {
  allResourceTypes,
  getResourceIconPath,
  ResourceType,
} from "../../../data/automata/models";

const ProgramFilterBar = () => {
  const dispatch = useAppDispatch();
  const onClickAllResourcesToggle = () => dispatch(resetFilter({}));
  const onClickResourceTypeToggle = (type: ResourceType) => () =>
    dispatch(toggleFilter({ type: type }));

  return (
    <div className="program-filter-bar-container">
      <div className="program-filter-bar-filters-container">
        <ProgramFilterButton
          isSelected={useAppSelector(selectIsAllResourcesToggled)}
          text={"All"}
          onClick={onClickAllResourcesToggle}
        />

        {allResourceTypes.map((type, index) => (
          <ProgramFilterButton
            key={index}
            isSelected={useAppSelector(selectIsResourceTypeToggled(type))}
            iconImagePath={getResourceIconPath(type)}
            onClick={onClickResourceTypeToggle(type)}
          />
        ))}
      </div>
      <img src={background} className="program-filter-bar-background" />
    </div>
  );
};

export default ProgramFilterBar;
