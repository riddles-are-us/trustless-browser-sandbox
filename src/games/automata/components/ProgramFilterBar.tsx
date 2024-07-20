import React from "react";
import background from "../images/backgrounds/right_bar_deco.png";
import CrystalIcon from "../images/Icons/Crystal.png";
import InterstellarMineralIcon from "../images/Icons/InterstellarMineral.png";
import BiomassIcon from "../images/Icons/Biomass.png";
import QuantumFoamIcon from "../images/Icons/QuantumFoam.png";
import NecrodermisIcon from "../images/Icons/Necrodermis.png";
import AlienFloralIcon from "../images/Icons/AlienFloral.png";
import SpiceMelangeIcon from "../images/Icons/SpiceMelange.png";
import TitaniumIcon from "../images/Icons/Titanium.png";
import EnercoreIcon from "../images/Icons/Enercore.png";
import NexiumIcon from "../images/Icons/Nexium.png";
import SwiftexIcon from "../images/Icons/Swiftex.png";
import CognisurgeIcon from "../images/Icons/Cognisurge.png";
import VitalshieldIcon from "../images/Icons/Vitalshield.png";
import FlexonixIcon from "../images/Icons/Flexonix.png";
import "./ProgramFilterBar.css";
import ProgramFilterButton from "./ProgramFilterButton";

const ProgramFilterBar = () => {
  return (
    <div className="program-filter-bar-container">
      <div className="program-filter-bar-filters-container">
        <ProgramFilterButton isSelected={true} text={"All"} />
        <ProgramFilterButton isSelected={false} iconImagePath={CrystalIcon} />
        <ProgramFilterButton
          isSelected={false}
          iconImagePath={InterstellarMineralIcon}
        />
        <ProgramFilterButton isSelected={false} iconImagePath={BiomassIcon} />
        <ProgramFilterButton
          isSelected={false}
          iconImagePath={QuantumFoamIcon}
        />
        <ProgramFilterButton
          isSelected={false}
          iconImagePath={NecrodermisIcon}
        />
        <ProgramFilterButton
          isSelected={false}
          iconImagePath={AlienFloralIcon}
        />
        <ProgramFilterButton
          isSelected={false}
          iconImagePath={SpiceMelangeIcon}
        />
        <ProgramFilterButton isSelected={false} iconImagePath={TitaniumIcon} />
        <ProgramFilterButton isSelected={false} iconImagePath={EnercoreIcon} />
        <ProgramFilterButton isSelected={false} iconImagePath={NexiumIcon} />
        <ProgramFilterButton isSelected={false} iconImagePath={SwiftexIcon} />
        <ProgramFilterButton
          isSelected={false}
          iconImagePath={CognisurgeIcon}
        />
        <ProgramFilterButton
          isSelected={false}
          iconImagePath={VitalshieldIcon}
        />
        <ProgramFilterButton isSelected={false} iconImagePath={FlexonixIcon} />
      </div>
      <img src={background} className="program-filter-bar-background" />
    </div>
  );
};

export default ProgramFilterBar;
