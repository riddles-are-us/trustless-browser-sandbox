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
    name: string;
    programIndexes: Array<number>;
    currentProgramIndex: number;
    isProgramStop: boolean;
    startTime: number;
}

export interface ProgramModel {
    index: number;
    processingTime: number;
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

export const CRYSTAL_TYPE = "crystal";
export const INTERSTELLAR_MINERAL_TYPE = "interstellarMineral";
export const BIOMASS_TYPE = "biomass";
export const QUANTUM_FOAM_TYPE = "quantumFoam";
export const NECRODERMIS_TYPE = "necrodermis";
export const ALIEN_FLORAL_TYPE = "alienFloral";
export const SPICE_MELANGE_TYPE = "spiceMelange";
export const TITANIUM_TYPE = "titanium";
export const ENERCORE_TYPE = "enercore";
export const NEXIUM_TYPE = "nexium";
export const SWIFTEX_TYPE = "swiftex";
export const COGNISURGE_TYPE = "cognisurge";
export const VITALSHIELD_TYPE = "vitalshield";
export const FLEXONIX_TYPE = "flexonix";

export type ResourceType = 
    typeof CRYSTAL_TYPE | 
    typeof INTERSTELLAR_MINERAL_TYPE | 
    typeof BIOMASS_TYPE | 
    typeof QUANTUM_FOAM_TYPE | 
    typeof NECRODERMIS_TYPE | 
    typeof ALIEN_FLORAL_TYPE | 
    typeof SPICE_MELANGE_TYPE | 
    typeof TITANIUM_TYPE | 
    typeof ENERCORE_TYPE | 
    typeof NEXIUM_TYPE | 
    typeof SWIFTEX_TYPE | 
    typeof COGNISURGE_TYPE | 
    typeof VITALSHIELD_TYPE | 
    typeof FLEXONIX_TYPE;
export interface ResourceViewData {
    type: ResourceType;
    iconImagePath: string;
    amount: number;
}


export interface FilterModel{
    crystalToggle: boolean;
    interstellarMineralToggle: boolean;
    biomassToggle: boolean;
    quantumFoamToggle: boolean;
    necrodermisToggle: boolean;
    alienFloralToggle: boolean;
    spiceMelangeToggle: boolean;
    titaniumToggle: boolean;
    enercoreToggle: boolean;
    nexiumToggle: boolean;
    swiftexToggle: boolean;
    cognisurgeToggle: boolean;
    vitalshieldToggle: boolean;
    flexonixToggle: boolean;
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

export const emptyCreatingCreature: CreatureModel = {
    rareResources: emptyRareResources,
    name: "Creating",
    programIndexes: [],
    currentProgramIndex: 0,
    isProgramStop: false,
    startTime: 0,
}

export const allResourcesToggleFilter: FilterModel = {
    crystalToggle: false,
    interstellarMineralToggle: false,
    biomassToggle: false,
    quantumFoamToggle: false,
    necrodermisToggle: false,
    alienFloralToggle: false,
    spiceMelangeToggle: false,
    titaniumToggle: false,
    enercoreToggle: false,
    nexiumToggle: false,
    swiftexToggle: false,
    cognisurgeToggle: false,
    vitalshieldToggle: false,
    flexonixToggle: false
};



export function getCommonResourceModel(array: Array<number>){
    return {
        crystalAmount: array[0] ?? 0,
        interstellarMineralAmount: array[1] ?? 0,
        biomassAmount: array[2] ?? 0,
        quantumFoamAmount: array[3] ?? 0,
        necrodermisAmount: array[4] ?? 0,
        alienFloralAmount: array[5] ?? 0,
        spiceMelangeAmount: array[6] ?? 0,
        titaniumAmount: array[7] ?? 0,
    }
}

export function getRareResourceModel(array: Array<number>){
    return {
        enercoreAmount: array[0] ?? 0,
        nexiumAmount: array[1] ?? 0,
        swiftexAmount: array[2] ?? 0,
        cognisurgeAmount: array[3] ?? 0,
        vitalshieldAmount: array[4] ?? 0,
        flexonixAmount: array[5] ?? 0,
    }
}
export function getResourceViewDatas(commonResources: CommonResourceModel, rareResources: RareResourceModel): ResourceViewData[] {
    return [
        { type: CRYSTAL_TYPE, iconImagePath: CrystalIcon, amount: commonResources.crystalAmount } as ResourceViewData,
        { type: INTERSTELLAR_MINERAL_TYPE, iconImagePath: InterstellarMineralIcon, amount: commonResources.interstellarMineralAmount } as ResourceViewData,
        { type: BIOMASS_TYPE, iconImagePath: BiomassIcon, amount: commonResources.biomassAmount } as ResourceViewData,
        { type: QUANTUM_FOAM_TYPE, iconImagePath: QuantumFoamIcon, amount: commonResources.quantumFoamAmount } as ResourceViewData,
        { type: NECRODERMIS_TYPE, iconImagePath: NecrodermisIcon, amount: commonResources.necrodermisAmount } as ResourceViewData,
        { type: ALIEN_FLORAL_TYPE, iconImagePath: AlienFloralIcon, amount: commonResources.alienFloralAmount } as ResourceViewData,
        { type: SPICE_MELANGE_TYPE, iconImagePath: SpiceMelangeIcon, amount: commonResources.spiceMelangeAmount } as ResourceViewData,
        { type: TITANIUM_TYPE, iconImagePath: TitaniumIcon, amount: commonResources.titaniumAmount } as ResourceViewData,
        { type: ENERCORE_TYPE, iconImagePath: EnercoreIcon, amount: rareResources.enercoreAmount } as ResourceViewData,
        { type: NEXIUM_TYPE, iconImagePath: NexiumIcon, amount: rareResources.nexiumAmount } as ResourceViewData,
        { type: SWIFTEX_TYPE, iconImagePath: SwiftexIcon, amount: rareResources.swiftexAmount } as ResourceViewData,
        { type: COGNISURGE_TYPE, iconImagePath: CognisurgeIcon, amount: rareResources.cognisurgeAmount } as ResourceViewData,
        { type: VITALSHIELD_TYPE, iconImagePath: VitalshieldIcon, amount: rareResources.vitalshieldAmount } as ResourceViewData,
        { type: FLEXONIX_TYPE, iconImagePath: FlexonixIcon, amount: rareResources.flexonixAmount } as ResourceViewData
    ].filter(resource => resource.amount !== 0);
}