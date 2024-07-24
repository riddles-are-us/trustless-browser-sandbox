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
            <DiffResourceDisplay
              key={0}
              iconImagePath={CrystalIcon}
              amount={5}
            />,
            <DiffResourceDisplay
              key={1}
              iconImagePath={InterstellarMineralIcon}
              amount={5}
            />,
            <DiffResourceDisplay
              key={2}
              iconImagePath={BiomassIcon}
              amount={5}
            />,
            <DiffResourceDisplay
              key={3}
              iconImagePath={QuantumFoamIcon}
              amount={5}
            />,
            <DiffResourceDisplay
              key={4}
              iconImagePath={NecrodermisIcon}
              amount={5}
            />,
            <DiffResourceDisplay
              key={5}
              iconImagePath={AlienFloralIcon}
              amount={5}
            />,
            <DiffResourceDisplay
              key={6}
              iconImagePath={SpiceMelangeIcon}
              amount={5}
            />,
            <DiffResourceDisplay
              key={7}
              iconImagePath={TitaniumIcon}
              amount={5}
            />,
            <DiffResourceDisplay
              key={8}
              iconImagePath={EnercoreIcon}
              amount={5}
            />,
            <DiffResourceDisplay
              key={9}
              iconImagePath={NexiumIcon}
              amount={5}
            />,
            <DiffResourceDisplay key={10} />,
            <DiffResourceDisplay key={11} />,
            <DiffResourceDisplay
              key={12}
              iconImagePath={SwiftexIcon}
              amount={5}
            />,
            <DiffResourceDisplay
              key={13}
              iconImagePath={CognisurgeIcon}
              amount={5}
            />,
            <DiffResourceDisplay key={14} />,
            <DiffResourceDisplay key={15} />,
            <DiffResourceDisplay
              key={16}
              iconImagePath={VitalshieldIcon}
              amount={5}
            />,
            <DiffResourceDisplay
              key={17}
              iconImagePath={FlexonixIcon}
              amount={5}
            />,
            <DiffResourceDisplay key={18} />,
            <DiffResourceDisplay key={19} />,
          ]}
        />
      </div>
    </>
  );
};

export default DiffResourcesInfo;
