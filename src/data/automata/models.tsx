import CrystalIcon from "../../games/automata/images/Icons/Crystal.png";
import InterstellarMineralIcon from "../../games/automata/images/Icons/InterstellarMineral.png";
import BiomassIcon from "../../games/automata/images/Icons/Biomass.png";
import QuantumFoamIcon from "../../games/automata/images/Icons/QuantumFoam.png";
import NecrodermisIcon from "../../games/automata/images/Icons/Necrodermis.png";
import AlienFloralIcon from "../../games/automata/images/Icons/AlienFloral.png";
import SpiceMelangeIcon from "../../games/automata/images/Icons/SpiceMelange.png";
import TitaniumIcon from "../../games/automata/images/Icons/Titanium.png";
import EnercoreIcon from "../../games/automata/images/Icons/Enercore.png";
import NexiumIcon from "../../games/automata/images/Icons/Nexium.png";
import SwiftexIcon from "../../games/automata/images/Icons/Swiftex.png";
import CognisurgeIcon from "../../games/automata/images/Icons/Cognisurge.png";
import VitalshieldIcon from "../../games/automata/images/Icons/Vitalshield.png";
import FlexonixIcon from "../../games/automata/images/Icons/Flexonix.png";
import Bot1 from "../../games/automata/images/CreatureBots/robot1.png";
import Bot2 from "../../games/automata/images/CreatureBots/robot2.png";
import Bot3 from "../../games/automata/images/CreatureBots/robot3.png";
import Bot4 from "../../games/automata/images/CreatureBots/robot4.png";
import QuantumScribe from "../../games/automata/components/Programs/QuantumScribe";
import QuantumFrost from "../../games/automata/components/Programs/QuantumFrost";
import QuantumSurge from "../../games/automata/components/Programs/QuantumSurge";
import QuantaForge from "../../games/automata/components/Programs/QuantaForge";
import Aespa from "../../games/automata/components/Programs/Aespa";
import BioGen from "../../games/automata/components/Programs/BioGen";
import BioFusion from "../../games/automata/components/Programs/BioFusion";
import AstroMine from "../../games/automata/components/Programs/AstroMine";
import TitaniumBoost from "../../games/automata/components/Programs/TitaniumBoost";
import QuantumLeap from "../../games/automata/components/Programs/QuantumLeap";
import BioSurge from "../../games/automata/components/Programs/BioSurge";
import BioHarvest from "../../games/automata/components/Programs/BioHarvest";
import EnerGex from "../../games/automata/components/Programs/EnerGex";
import EtherWeave from "../../games/automata/components/Programs/EtherWeave";
import BioCast from "../../games/automata/components/Programs/BioCast";
import AstroCharge from "../../games/automata/components/Programs/AstroCharge";
import BioSynthesis from "../../games/automata/components/Programs/BioSynthesis";
import XenoFloral from "../../games/automata/components/Programs/XenoFloral";
import FoamTap from "../../games/automata/components/Programs/FoamTap";
import CrystaBloom from "../../games/automata/components/Programs/CrystaBloom";
import EnerGate from "../../games/automata/components/Programs/EnerGate";
import EnerFusion from "../../games/automata/components/Programs/EnerFusion";
import QuantumCore from "../../games/automata/components/Programs/QuantumCore";
import XenoBloom from "../../games/automata/components/Programs/XenoBloom";

export interface CreatureModel {
  rareResources: ResourceAmountPair[];
  name: string;
  isLocked: boolean;
  creatureType: number;
  programIndexes: Array<number | null>;
  currentProgramIndex: number;
  isProgramStop: boolean;
  startTime: number;
}

export enum ProgramType {
  BioGen,
  CrysTara,
  AstroMine,
  CrystaBloom,
  EnerGex,
  StellarCharge,
  FoamTap,
  EnerFusion,
  EnerPlex,
  TTgenesis,
  QuantaForge,
  FortiFyx,
  SynTitan,
  SwiftForge,
  XenoFloral,
  TitaniumBoost,
  CerebraSpark,
  QuiFoam,
  AstroCharge,
  EnerGate,
  CogniMelt,
  NexiMine,
  XenoBloom,
  ResoNex,
  Fortivest,
  CogniFy,
  FortiGen,
  Abracadabra,
  MegaBoost,
  NexuMax,
  SpicenRich,
  EvolviFy,
  NexroVest,
  QuantumScribe,
  NeuroForge,
  CyberPulse,
  PlasmaShift,
  IlluGen,
  Aespa,
  SuperNova,
  NeuroCharge,
  QuantumLeap,
  BioSynthesis,
  PlasmaForge,
  NanoWeave,
  EtherPulse,
  StarLight,
  NovaBurst,
  BioHarvest,
  EtherForge,
  TitanBloom,
  QuantumFrost,
  BioFusion,
  NexusField,
  StarForge,
  PlasmaCharge,
  BioCast,
  EtherWeave,
  NovaFlux,
  QuantumCore,
  BioSurge,
  EtherPulse2,
  StarlightForge,
  QuantumSurge,
}

export interface ProgramModel {
  index: number;
  type: ProgramType;
  processingTime: number;
  resources: Array<ResourceAmountPair>;
  name: string;
}

export interface ProgramInfo {
  program: ProgramModel | null;
  index: number | null;
  remainTime: number;
  progress: number;
}

export enum ResourceType {
  Crystal,
  InterstellarMineral,
  Biomass,
  QuantumFoam,
  Necrodermis,
  AlienFloral,
  SpiceMelange,
  Titanium,
  Enercore,
  Nexium,
  Swiftex,
  Cognisurge,
  Vitalshield,
  Flexonix,
}

export interface ResourceAmountPair {
  type: ResourceType;
  amount: number;
}

export interface FilterModel {
  dict: { [key in ResourceType]?: boolean };
}

export enum GuideType {
  None,
  First,
}

export const commonResourceTypes = [
  ResourceType.Crystal,
  ResourceType.InterstellarMineral,
  ResourceType.Biomass,
  ResourceType.QuantumFoam,
  ResourceType.Necrodermis,
  ResourceType.AlienFloral,
  ResourceType.SpiceMelange,
  ResourceType.Titanium,
];

export const rareResourceTypes = [
  ResourceType.Enercore,
  ResourceType.Nexium,
  ResourceType.Swiftex,
  ResourceType.Cognisurge,
  ResourceType.Vitalshield,
  ResourceType.Flexonix,
];

export const allResourceTypes = [...commonResourceTypes, ...rareResourceTypes];

export const emptyCommonResources = commonResourceTypes.map((type) => ({
  type,
  amount: 0,
}));

export const emptyRareResources = rareResourceTypes.map((type) => ({
  type,
  amount: 0,
}));

export const emptyCreature: CreatureModel = {
  rareResources: emptyRareResources,
  name: "",
  isLocked: false,
  creatureType: -1,
  programIndexes: [null, null, null, null, null, null, null, null],
  currentProgramIndex: 0,
  isProgramStop: false,
  startTime: 0,
};

export function getCreatingCreature(creatureType: number): CreatureModel {
  return {
    rareResources: emptyRareResources,
    name: "Creating",
    isLocked: false,
    creatureType: creatureType,
    programIndexes: [null, null, null, null, null, null, null, null],
    currentProgramIndex: 0,
    isProgramStop: false,
    startTime: 0,
  };
}

export const allResourcesToggleFilter: FilterModel = {
  dict: allResourceTypes.reduce((acc, type) => {
    acc[type] = false;
    return acc;
  }, {} as { [key in ResourceType]?: boolean }),
};

export function getCommonResources(array: Array<number>) {
  return commonResourceTypes.map((type, index) => ({
    type,
    amount: array[index],
  }));
}

export function getRareResources(array: Array<number>) {
  return rareResourceTypes.map((type, index) => ({
    type,
    amount: array[index],
  }));
}

export function getResourceIconPath(type: ResourceType): string {
  switch (type) {
    case ResourceType.Crystal:
      return CrystalIcon;
    case ResourceType.InterstellarMineral:
      return InterstellarMineralIcon;
    case ResourceType.Biomass:
      return BiomassIcon;
    case ResourceType.QuantumFoam:
      return QuantumFoamIcon;
    case ResourceType.Necrodermis:
      return NecrodermisIcon;
    case ResourceType.AlienFloral:
      return AlienFloralIcon;
    case ResourceType.SpiceMelange:
      return SpiceMelangeIcon;
    case ResourceType.Titanium:
      return TitaniumIcon;
    case ResourceType.Enercore:
      return EnercoreIcon;
    case ResourceType.Nexium:
      return NexiumIcon;
    case ResourceType.Swiftex:
      return SwiftexIcon;
    case ResourceType.Cognisurge:
      return CognisurgeIcon;
    case ResourceType.Vitalshield:
      return VitalshieldIcon;
    case ResourceType.Flexonix:
      return FlexonixIcon;
    default:
      throw new Error("Unknown ResourceType");
  }
}

export function getResourceNameText(type: ResourceType): string {
  switch (type) {
    case ResourceType.Crystal:
      return "Crystal";
    case ResourceType.InterstellarMineral:
      return "Interstellar Mineral";
    case ResourceType.Biomass:
      return "Biomass";
    case ResourceType.QuantumFoam:
      return "Quantum Foam";
    case ResourceType.Necrodermis:
      return "Necrodermis";
    case ResourceType.AlienFloral:
      return "Alien Floral";
    case ResourceType.SpiceMelange:
      return "Spice Melange";
    case ResourceType.Titanium:
      return "Titanium";
    case ResourceType.Enercore:
      return "Enercore";
    case ResourceType.Nexium:
      return "Nexium";
    case ResourceType.Swiftex:
      return "Swiftex";
    case ResourceType.Cognisurge:
      return "Cognisurge";
    case ResourceType.Vitalshield:
      return "Vitalshield";
    case ResourceType.Flexonix:
      return "Flexonix";
    default:
      throw new Error("Unknown ResourceType");
  }
}

export function getNumberAbbr(num: number): string {
  const abbr = [
    { value: 1e12, suffix: "T" },
    { value: 1e9, suffix: "B" },
    { value: 1e6, suffix: "M" },
    { value: 1e3, suffix: "K" },
  ];
  const sign = num < 0 ? "-" : "";

  num = Math.abs(num);
  for (let i = 0; i < abbr.length; i++) {
    if (num >= abbr[i].value) {
      let formattedNumber = (num / abbr[i].value).toFixed(1);
      if (formattedNumber.endsWith(".0")) {
        formattedNumber = formattedNumber.slice(0, -2);
      }
      return sign + formattedNumber + abbr[i].suffix;
    }
  }

  return sign + num.toString();
}

const botIconPaths = [Bot1, Bot2, Bot3, Bot4];

export function getCreatureIconPath(creatureType: number): string {
  return creatureType == -1
    ? ""
    : botIconPaths[creatureType % botIconPaths.length];
}

export function getProgramComponent(
  program: ProgramModel | null,
  showAnimation: boolean
): JSX.Element | null {
  if (program == null) {
    return null;
  }

  switch (program.type) {
    case ProgramType.QuantumScribe:
      return <QuantumScribe showAnimation={showAnimation} />;
    case ProgramType.QuantumFrost:
      return <QuantumFrost showAnimation={showAnimation} />;
    case ProgramType.QuantumSurge:
      return <QuantumSurge showAnimation={showAnimation} />;
    case ProgramType.QuantaForge:
      return <QuantaForge showAnimation={showAnimation} />;
    case ProgramType.Aespa:
      return <Aespa showAnimation={showAnimation} />;
    case ProgramType.BioGen:
      return <BioGen showAnimation={showAnimation} />;
    case ProgramType.BioFusion:
      return <BioFusion showAnimation={showAnimation} />;
    case ProgramType.AstroMine:
      return <AstroMine showAnimation={showAnimation} />;
    case ProgramType.TitaniumBoost:
      return <TitaniumBoost showAnimation={showAnimation} />;
    case ProgramType.QuantumLeap:
      return <QuantumLeap showAnimation={showAnimation} />;
    case ProgramType.BioSurge:
      return <BioSurge showAnimation={showAnimation} />;
    case ProgramType.BioHarvest:
      return <BioHarvest showAnimation={showAnimation} />;
    case ProgramType.EnerGex:
      return <EnerGex showAnimation={showAnimation} />;
    case ProgramType.EtherWeave:
      return <EtherWeave showAnimation={showAnimation} />;
    case ProgramType.BioCast:
      return <BioCast showAnimation={showAnimation} />;
    case ProgramType.AstroCharge:
      return <AstroCharge showAnimation={showAnimation} />;
    case ProgramType.BioSynthesis:
      return <BioSynthesis showAnimation={showAnimation} />;
    case ProgramType.XenoFloral:
      return <XenoFloral showAnimation={showAnimation} />;
    case ProgramType.FoamTap:
      return <FoamTap showAnimation={showAnimation} />;
    case ProgramType.CrystaBloom:
      return <CrystaBloom showAnimation={showAnimation} />;
    case ProgramType.EnerGate:
      return <EnerGate showAnimation={showAnimation} />;
    case ProgramType.EnerFusion:
      return <EnerFusion showAnimation={showAnimation} />;
    case ProgramType.QuantumCore:
      return <QuantumCore showAnimation={showAnimation} />;
    case ProgramType.XenoBloom:
      return <XenoBloom showAnimation={showAnimation} />;
  }

  return <BioGen showAnimation={showAnimation} />;
}
