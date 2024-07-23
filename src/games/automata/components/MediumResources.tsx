import React from "react";
import MediumResourceDisplay from "./MediumResourceDisplay";
import CrystalIcon from "../images/Icons/Crystal.png";
import InterstellarMineralIcon from "../images/Icons/InterstellarMineral.png";
import BiomassIcon from "../images/Icons/Biomass.png";
import QuantumFoamIcon from "../images/Icons/QuantumFoam.png";
import NecrodermisIcon from "../images/Icons/Necrodermis.png";
import AlienFloralIcon from "../images/Icons/AlienFloral.png";
import SpiceMelangeIcon from "../images/Icons/SpiceMelange.png";
import TitaniumIcon from "../images/Icons/Titanium.png";
import { useAppSelector } from "../../../app/hooks";
import "./MediumResources.css";

import {
  selectCrystalAmount,
  selectInterstellarMineralAmount,
  selectBiomassAmount,
  selectQuantumFoamAmount,
  selectNecrodermisAmount,
  selectAlienFloralAmount,
  selectSpiceMelangeAmount,
  selectTitaniumAmount,
} from "../../../data/automata/resources";

const MediumResources = () => {
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

  return (
    <div className="top-medium-resources-container">
      <MediumResourceDisplay
        order={0}
        iconImagePath={CrystalIcon}
        amount={crystalAmount}
      />
      <MediumResourceDisplay
        order={1}
        iconImagePath={InterstellarMineralIcon}
        amount={interstellarMineralAmount}
      />
      <MediumResourceDisplay
        order={2}
        iconImagePath={BiomassIcon}
        amount={biomassAmount}
      />
      <MediumResourceDisplay
        order={3}
        iconImagePath={QuantumFoamIcon}
        amount={quantumFoamAmount}
      />
      <MediumResourceDisplay
        order={4}
        iconImagePath={NecrodermisIcon}
        amount={necrodermisAmount}
      />
      <MediumResourceDisplay
        order={5}
        iconImagePath={AlienFloralIcon}
        amount={alienFloralAmount}
      />
      <MediumResourceDisplay
        order={6}
        iconImagePath={SpiceMelangeIcon}
        amount={spiceMelangeAmount}
      />
      <MediumResourceDisplay
        order={7}
        iconImagePath={TitaniumIcon}
        amount={titaniumAmount}
      />
    </div>
  );
};

export default MediumResources;
