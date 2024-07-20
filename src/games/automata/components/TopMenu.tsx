import React from "react";
import "./TopMenu.css";

import EnercoreIcon from "../images/Icons/Enercore.png";
import NexiumIcon from "../images/Icons/Nexium.png";
import SwiftexIcon from "../images/Icons/Swiftex.png";
import CognisurgeIcon from "../images/Icons/Cognisurge.png";
import VitalshieldIcon from "../images/Icons/Vitalshield.png";
import FlexonixIcon from "../images/Icons/Flexonix.png";
import SmallResourceDisplay from "./SmallResourceDisplay";
import AccountInfo from "./AccountInfo";
import MediumResources from "./MediumResources";
import { useAppSelector } from "../../../app/hooks";

import {
  selectCrystalAmount,
  selectInterstellarMineralAmount,
  selectBiomassAmount,
  selectQuantumFoamAmount,
  selectNecrodermisAmount,
  selectAlienFloralAmount,
  selectSpiceMelangeAmount,
  selectTitaniumAmount,
  selectSelectedCreature,
} from "../../../data/automata";

const TopMenu = () => {
  const crystalAmount = useAppSelector(selectCrystalAmount);
  const interstellarMineralAmount = useAppSelector(
    selectInterstellarMineralAmount
  );
  const biomassAmount = useAppSelector(selectBiomassAmount);
  const quantumFoamAmount = useAppSelector(selectQuantumFoamAmount);
  const necrodermisAmount = useAppSelector(selectNecrodermisAmount);
  const alienFloralAmount = useAppSelector(selectAlienFloralAmount);
  const spiceMelangeAmount = useAppSelector(selectSpiceMelangeAmount);
  const titaniumAmount = useAppSelector(selectTitaniumAmount);
  const selectedCreature = useAppSelector(selectSelectedCreature);

  return (
    <div className="top">
      <div className="top-left"></div>
      <div className="top-middle"></div>
      <div className="top-right"></div>
      <AccountInfo />
      <MediumResources />
      <SmallResourceDisplay
        order={0}
        iconImagePath={EnercoreIcon}
        amount={selectedCreature?.entity[0] ?? 0}
      />
      <SmallResourceDisplay
        order={1}
        iconImagePath={NexiumIcon}
        amount={selectedCreature?.entity[1] ?? 0}
      />
      <SmallResourceDisplay
        order={2}
        iconImagePath={SwiftexIcon}
        amount={selectedCreature?.entity[2] ?? 0}
      />
      <SmallResourceDisplay
        order={3}
        iconImagePath={CognisurgeIcon}
        amount={selectedCreature?.entity[3] ?? 0}
      />
      <SmallResourceDisplay
        order={4}
        iconImagePath={VitalshieldIcon}
        amount={selectedCreature?.entity[4] ?? 0}
      />
      <SmallResourceDisplay
        order={5}
        iconImagePath={FlexonixIcon}
        amount={selectedCreature?.entity[5] ?? 0}
      />
    </div>
  );
};

export default TopMenu;
