import React from "react";
import "./TopMenu.css";
import MediumResourceDisplay from "./MediumResourceDisplay";
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
import SmallResourceDisplay from "./SmallResourceDisplay";
import AccountInfo from "./AccountInfo";

const TopMenu = () => {
  return (
    <div className="top">
      <div className="top-left"></div>
      <div className="top-middle"></div>
      <div className="top-right"></div>
      <AccountInfo />
      <MediumResourceDisplay
        order={0}
        iconImagePath={CrystalIcon}
        amount={999}
      />
      <MediumResourceDisplay
        order={1}
        iconImagePath={InterstellarMineralIcon}
        amount={999}
      />
      <MediumResourceDisplay
        order={2}
        iconImagePath={BiomassIcon}
        amount={999}
      />
      <MediumResourceDisplay
        order={3}
        iconImagePath={QuantumFoamIcon}
        amount={999}
      />
      <MediumResourceDisplay
        order={4}
        iconImagePath={NecrodermisIcon}
        amount={999}
      />
      <MediumResourceDisplay
        order={5}
        iconImagePath={AlienFloralIcon}
        amount={999}
      />
      <MediumResourceDisplay
        order={6}
        iconImagePath={SpiceMelangeIcon}
        amount={999}
      />
      <MediumResourceDisplay
        order={7}
        iconImagePath={TitaniumIcon}
        amount={999}
      />
      <SmallResourceDisplay
        order={0}
        iconImagePath={EnercoreIcon}
        amount={999}
      />
      <SmallResourceDisplay order={1} iconImagePath={NexiumIcon} amount={999} />
      <SmallResourceDisplay
        order={2}
        iconImagePath={SwiftexIcon}
        amount={999}
      />
      <SmallResourceDisplay
        order={3}
        iconImagePath={CognisurgeIcon}
        amount={999}
      />
      <SmallResourceDisplay
        order={4}
        iconImagePath={VitalshieldIcon}
        amount={999}
      />
      <SmallResourceDisplay
        order={5}
        iconImagePath={FlexonixIcon}
        amount={999}
      />
    </div>
  );
};

export default TopMenu;
