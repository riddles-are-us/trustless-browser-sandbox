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