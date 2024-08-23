import React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import background from "../images/backgrounds/guide_frame.png";
import GuideButton from "./Buttons/GuideButton";
import Grid from "./Grid";
import SummaryResourceDisplay from "./SummaryResourceDisplay";
import { setUIState, UIState } from "../../../data/automata/properties";
import "./SummaryMenu.css";
import {
  ResourceType,
  getResourceIconPath,
  getResourceNameText,
} from "../../../data/automata/models";

const SummaryMenu = () => {
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
    ResourceType.Swiftex,
    null,
    ResourceType.Cognisurge,
    ResourceType.Vitalshield,
    ResourceType.Flexonix,
  ];

  const dispatch = useAppDispatch();
  const onClickGuide = () => {
    dispatch(setUIState({ uIState: UIState.Guide }));
  };
  return (
    <div className="summary-menu-container">
      <img src={background} className="summary-menu-background" />
      <p className="summary-resource-title-text">Total resources generated</p>
      <div className="summary-menu-grid">
        <Grid
          columnCount={4}
          rowCount={5}
          elements={allResourceTypesWithBlanks.map((type, index) =>
            type != null ? (
              <SummaryResourceDisplay
                key={index}
                type={getResourceNameText(type)}
                iconImagePath={getResourceIconPath(type)}
                amount={500000}
              />
            ) : (
              <SummaryResourceDisplay key={index} />
            )
          )}
        />
      </div>
      <div className="summary-menu-guide-button">
        <GuideButton onClick={onClickGuide} />
      </div>
    </div>
  );
};

export default SummaryMenu;
