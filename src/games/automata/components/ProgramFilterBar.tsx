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
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import ProgramFilterButton from "./ProgramFilterButton";
import {
  resetFilter,
  toggleCrystalFilter,
  toggleInterstellarMineralFilter,
  toggleBiomassFilter,
  toggleQuantumFoamFilter,
  toggleNecrodermisFilter,
  toggleAlienFloralFilter,
  toggleSpiceMelangeFilter,
  toggleTitaniumFilter,
  toggleEnercoreFilter,
  toggleNexiumFilter,
  toggleSwiftexFilter,
  toggleCognisurgeFilter,
  toggleVitalshieldFilter,
  toggleFlexonixFilter,
  selectIsAllResourcesToggled,
  selectIsCrystalToggled,
  selectIsInterstellarMineralToggled,
  selectIsBiomassToggled,
  selectIsQuantumFoamToggled,
  selectIsNecrodermisToggled,
  selectIsAlienFloralToggled,
  selectIsSpiceMelangeToggled,
  selectIsTitaniumToggled,
  selectIsEnercoreToggled,
  selectIsNexiumToggled,
  selectIsSwiftexToggled,
  selectIsCognisurgeToggled,
  selectIsVitalshieldToggled,
  selectIsFlexonixToggled,
} from "../../../data/automata/programs";

const ProgramFilterBar = () => {
  const dispatch = useAppDispatch();
  const isAllResourcesToggled = useAppSelector(selectIsAllResourcesToggled);
  const isCrystalToggled = useAppSelector(selectIsCrystalToggled);
  const isInterstellarMineralToggled = useAppSelector(
    selectIsInterstellarMineralToggled
  );
  const isBiomassToggled = useAppSelector(selectIsBiomassToggled);
  const isQuantumFoamToggled = useAppSelector(selectIsQuantumFoamToggled);
  const isNecrodermisToggled = useAppSelector(selectIsNecrodermisToggled);
  const isAlienFloralToggled = useAppSelector(selectIsAlienFloralToggled);
  const isSpiceMelangeToggled = useAppSelector(selectIsSpiceMelangeToggled);
  const isTitaniumToggled = useAppSelector(selectIsTitaniumToggled);
  const isEnercoreToggled = useAppSelector(selectIsEnercoreToggled);
  const isNexiumToggled = useAppSelector(selectIsNexiumToggled);
  const isSwiftexToggled = useAppSelector(selectIsSwiftexToggled);
  const isCognisurgeToggled = useAppSelector(selectIsCognisurgeToggled);
  const isVitalshieldToggled = useAppSelector(selectIsVitalshieldToggled);
  const isFlexonixToggled = useAppSelector(selectIsFlexonixToggled);

  const onClickAllResourcesToggle = () => dispatch(resetFilter({}));
  const onClickCrystalToggle = () => dispatch(toggleCrystalFilter({}));
  const onClickInterstellarMineralToggle = () =>
    dispatch(toggleInterstellarMineralFilter({}));
  const onClickBiomassToggle = () => dispatch(toggleBiomassFilter({}));
  const onClickQuantumFoamToggle = () => dispatch(toggleQuantumFoamFilter({}));
  const onClickNecrodermisToggle = () => dispatch(toggleNecrodermisFilter({}));
  const onClickAlienFloralToggle = () => dispatch(toggleAlienFloralFilter({}));
  const onClickSpiceMelangeToggle = () =>
    dispatch(toggleSpiceMelangeFilter({}));
  const onClickTitaniumToggle = () => dispatch(toggleTitaniumFilter({}));
  const onClickEnercoreToggle = () => dispatch(toggleEnercoreFilter({}));
  const onClickNexiumToggle = () => dispatch(toggleNexiumFilter({}));
  const onClickSwiftexToggle = () => dispatch(toggleSwiftexFilter({}));
  const onClickCognisurgeToggle = () => dispatch(toggleCognisurgeFilter({}));
  const onClickVitalshieldToggle = () => dispatch(toggleVitalshieldFilter({}));
  const onClickFlexonixToggle = () => dispatch(toggleFlexonixFilter({}));

  return (
    <div className="program-filter-bar-container">
      <div className="program-filter-bar-filters-container">
        <ProgramFilterButton
          isSelected={isAllResourcesToggled}
          text={"All"}
          onClick={onClickAllResourcesToggle}
        />
        <ProgramFilterButton
          isSelected={isCrystalToggled}
          iconImagePath={CrystalIcon}
          onClick={onClickCrystalToggle}
        />

        <ProgramFilterButton
          isSelected={isInterstellarMineralToggled}
          iconImagePath={InterstellarMineralIcon}
          onClick={onClickInterstellarMineralToggle}
        />

        <ProgramFilterButton
          isSelected={isBiomassToggled}
          iconImagePath={BiomassIcon}
          onClick={onClickBiomassToggle}
        />

        <ProgramFilterButton
          isSelected={isQuantumFoamToggled}
          iconImagePath={QuantumFoamIcon}
          onClick={onClickQuantumFoamToggle}
        />

        <ProgramFilterButton
          isSelected={isNecrodermisToggled}
          iconImagePath={NecrodermisIcon}
          onClick={onClickNecrodermisToggle}
        />

        <ProgramFilterButton
          isSelected={isAlienFloralToggled}
          iconImagePath={AlienFloralIcon}
          onClick={onClickAlienFloralToggle}
        />

        <ProgramFilterButton
          isSelected={isSpiceMelangeToggled}
          iconImagePath={SpiceMelangeIcon}
          onClick={onClickSpiceMelangeToggle}
        />

        <ProgramFilterButton
          isSelected={isTitaniumToggled}
          iconImagePath={TitaniumIcon}
          onClick={onClickTitaniumToggle}
        />

        <ProgramFilterButton
          isSelected={isEnercoreToggled}
          iconImagePath={EnercoreIcon}
          onClick={onClickEnercoreToggle}
        />

        <ProgramFilterButton
          isSelected={isNexiumToggled}
          iconImagePath={NexiumIcon}
          onClick={onClickNexiumToggle}
        />

        <ProgramFilterButton
          isSelected={isSwiftexToggled}
          iconImagePath={SwiftexIcon}
          onClick={onClickSwiftexToggle}
        />

        <ProgramFilterButton
          isSelected={isCognisurgeToggled}
          iconImagePath={CognisurgeIcon}
          onClick={onClickCognisurgeToggle}
        />

        <ProgramFilterButton
          isSelected={isVitalshieldToggled}
          iconImagePath={VitalshieldIcon}
          onClick={onClickVitalshieldToggle}
        />

        <ProgramFilterButton
          isSelected={isFlexonixToggled}
          iconImagePath={FlexonixIcon}
          onClick={onClickFlexonixToggle}
        />
      </div>
      <img src={background} className="program-filter-bar-background" />
    </div>
  );
};

export default ProgramFilterBar;
