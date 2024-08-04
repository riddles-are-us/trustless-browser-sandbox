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

export interface CreatureModel {
    rareResources: ResourceAmountPair[];
    name: string;
    isLocked: boolean;
    creatureType: number; // can change to enum later to show different types of pictures
    programIndexes: Array<(number | null)>;
    currentProgramIndex: number;
    isProgramStop: boolean;
    startTime: number;
}

export interface ProgramModel {
    index: number;
    processingTime: number;
    resources: Array<ResourceAmountPair>;
    name: string;
}

export enum ResourceType{
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

export interface FilterModel{
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
]

export const rareResourceTypes = [
    ResourceType.Enercore,
    ResourceType.Nexium,
    ResourceType.Swiftex,
    ResourceType.Cognisurge,
    ResourceType.Vitalshield,
    ResourceType.Flexonix,
]

export const allResourceTypes = [...commonResourceTypes, ...rareResourceTypes];

export const emptyCommonResources = commonResourceTypes.map(type => ({
    type,
    amount: 0
}));

export const emptyRareResources = rareResourceTypes.map(type => ({
    type,
    amount: 0
}));

export const emptyCreatingCreature: CreatureModel = {
    rareResources: emptyRareResources,
    name: "Creating",
    isLocked: false,
    creatureType: 0,
    programIndexes: [null, null, null, null, null, null, null, null],
    currentProgramIndex: 0,
    isProgramStop: false,
    startTime: 0,
}

export const allResourcesToggleFilter: FilterModel = {
    dict: allResourceTypes.reduce((acc, type) => {
        acc[type] = false;
        return acc;
    }, {} as { [key in ResourceType]?: boolean })
};

export function getCommonResources(array: Array<number>){
    return commonResourceTypes.map((type, index) => ({
        type,
        amount: array[index]
    }));
}

export function getRareResources(array: Array<number>){
    return rareResourceTypes.map((type, index) => ({
        type,
        amount: array[index]
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
            throw new Error('Unknown ResourceType');
    }
}