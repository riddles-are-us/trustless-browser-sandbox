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
    rareResources: RareResourceModel;
    object_id: Array<string>;
    programIndexes: Array<number>;
    currentProgramIndex: number;
    isProgramStop: boolean;
}

export interface ProgramModel {
    delay: number;
    resources: Array<ResourceViewData>;
    name: string;
}

export interface CommonResourceModel {
    crystalAmount: number;
    interstellarMineralAmount: number;
    biomassAmount: number;
    quantumFoamAmount: number;
    necrodermisAmount: number;
    alienFloralAmount: number;
    spiceMelangeAmount: number;
    titaniumAmount: number;
}

export interface RareResourceModel {
    enercoreAmount: number;
    nexiumAmount: number;
    swiftexAmount: number;
    cognisurgeAmount: number;
    vitalshieldAmount: number;
    flexonixAmount: number;
}

export interface ResourceViewData {
    iconImagePath: string;
    amount: number;
}

export const emptyCommonResources: CommonResourceModel = {
    crystalAmount: 0,
    interstellarMineralAmount: 0,
    biomassAmount: 0,
    quantumFoamAmount: 0,
    necrodermisAmount: 0,
    alienFloralAmount: 0,
    spiceMelangeAmount: 0,
    titaniumAmount: 0,
};

export const emptyRareResources: RareResourceModel = {
    enercoreAmount: 0,
    nexiumAmount: 0,
    swiftexAmount: 0,
    cognisurgeAmount: 0,
    vitalshieldAmount: 0,
    flexonixAmount: 0,
};

export function getCommonResourceModel(array: Array<number>){
    return {
        crystalAmount: array[0],
        interstellarMineralAmount: array[1],
        biomassAmount: array[2],
        quantumFoamAmount: array[3],
        necrodermisAmount: array[4],
        alienFloralAmount: array[5],
        spiceMelangeAmount: array[6],
        titaniumAmount: array[7]
    }
}

export function getRareResourceModel(array: Array<number>){
    return {
        enercoreAmount: array[0],
        nexiumAmount: array[1],
        swiftexAmount: array[2],
        cognisurgeAmount: array[3],
        vitalshieldAmount: array[4],
        flexonixAmount: array[5]
    }
}

export function getResourceViewDatas(commonResources: CommonResourceModel, rareResources: RareResourceModel) {
    const resources = [
        { iconImagePath: CrystalIcon, amount: commonResources.crystalAmount },
        { iconImagePath: InterstellarMineralIcon, amount: commonResources.interstellarMineralAmount },
        { iconImagePath: BiomassIcon, amount: commonResources.biomassAmount },
        { iconImagePath: QuantumFoamIcon, amount: commonResources.quantumFoamAmount },
        { iconImagePath: NecrodermisIcon, amount: commonResources.necrodermisAmount },
        { iconImagePath: AlienFloralIcon, amount: commonResources.alienFloralAmount },
        { iconImagePath: SpiceMelangeIcon, amount: commonResources.spiceMelangeAmount },
        { iconImagePath: TitaniumIcon, amount: commonResources.titaniumAmount },
        { iconImagePath: EnercoreIcon, amount: rareResources.enercoreAmount },
        { iconImagePath: NexiumIcon, amount: rareResources.nexiumAmount },
        { iconImagePath: SwiftexIcon, amount: rareResources.swiftexAmount },
        { iconImagePath: CognisurgeIcon, amount: rareResources.cognisurgeAmount },
        { iconImagePath: VitalshieldIcon, amount: rareResources.vitalshieldAmount },
        { iconImagePath: FlexonixIcon, amount: rareResources.flexonixAmount }
    ];

    return resources.filter(resource => resource.amount != null && resource.amount != 0);
}