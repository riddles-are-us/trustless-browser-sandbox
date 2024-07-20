import React from "react";
import "./DiffResourcesInfo.css";
import infoBackground from "../images/backgrounds/info_frame.png";
import Grid from "./Grid";
import DiffResourceDisplay from "./DiffResourceDisplay";

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

const DiffResourcesInfo = () => {
  return (
    <>
      <img src={infoBackground} className="main-info-background" />
      <div className="diff-resources-info-grid">
        <Grid
          columnCount={4}
          rowCount={5}
          elements={[
            <DiffResourceDisplay iconImagePath={CrystalIcon} amount={5} />,
            <DiffResourceDisplay
              iconImagePath={InterstellarMineralIcon}
              amount={5}
            />,
            <DiffResourceDisplay iconImagePath={BiomassIcon} amount={5} />,
            <DiffResourceDisplay iconImagePath={QuantumFoamIcon} amount={5} />,
            <DiffResourceDisplay iconImagePath={NecrodermisIcon} amount={5} />,
            <DiffResourceDisplay iconImagePath={AlienFloralIcon} amount={5} />,
            <DiffResourceDisplay iconImagePath={SpiceMelangeIcon} amount={5} />,
            <DiffResourceDisplay iconImagePath={TitaniumIcon} amount={5} />,
            <DiffResourceDisplay iconImagePath={EnercoreIcon} amount={5} />,
            <DiffResourceDisplay iconImagePath={NexiumIcon} amount={5} />,
            <DiffResourceDisplay />,
            <DiffResourceDisplay />,
            <DiffResourceDisplay iconImagePath={SwiftexIcon} amount={5} />,
            <DiffResourceDisplay iconImagePath={CognisurgeIcon} amount={5} />,
            <DiffResourceDisplay />,
            <DiffResourceDisplay />,
            <DiffResourceDisplay iconImagePath={VitalshieldIcon} amount={5} />,
            <DiffResourceDisplay iconImagePath={FlexonixIcon} amount={5} />,
            <DiffResourceDisplay />,
            <DiffResourceDisplay />,
          ]}
        />
      </div>
    </>
  );
};

export default DiffResourcesInfo;
