import { createSlice } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";
import { getConfig } from "./request";
import { ProgramModel, FilterModel, allResourcesToggleFilter, getResourceViewDatas, getCommonResourceModel, getRareResourceModel,
    CRYSTAL_TYPE,
    INTERSTELLAR_MINERAL_TYPE,
    BIOMASS_TYPE,
    QUANTUM_FOAM_TYPE,
    NECRODERMIS_TYPE,
    ALIEN_FLORAL_TYPE,
    SPICE_MELANGE_TYPE,
    TITANIUM_TYPE,
    ENERCORE_TYPE,
    NEXIUM_TYPE,
    SWIFTEX_TYPE,
    COGNISURGE_TYPE,
    VITALSHIELD_TYPE,
    FLEXONIX_TYPE
 } from "./models";

interface ProgramsState {
    programs: Array<ProgramModel>;
    filter: FilterModel;
    currentPage: number;
}

const initialState: ProgramsState = {
    programs: [],
    filter: allResourcesToggleFilter,
    currentPage: 0,
};

function decodePrograms(programRaws: any) {
    const programs: ProgramModel[] = [];
    for(let i=0; i<programRaws.length; i++) {
        const program: ProgramModel = {
            index: i,
            processingTime: programRaws[i][0],
            resources: getResourceViewDatas(getCommonResourceModel(programRaws[i][1]), getRareResourceModel(programRaws[i][2])),
            name: programRaws[i][3],
        };
        
        programs.push(program);
    }
    return programs;
}

export const programsSlice = createSlice({
    name: 'programs',
    initialState,
    reducers: {
        resetFilter: (state, action) => {
            state.currentPage = 0;
            state.filter = allResourcesToggleFilter;
        },
        toggleCrystalFilter: (state, action) => {
            state.currentPage = 0;
            state.filter.crystalToggle = !state.filter.crystalToggle;
        },
        toggleInterstellarMineralFilter: (state, action) => {
            state.currentPage = 0;
            state.filter.interstellarMineralToggle = !state.filter.interstellarMineralToggle;
        },
        toggleBiomassFilter: (state, action) => {
            state.currentPage = 0;
            state.filter.biomassToggle = !state.filter.biomassToggle;
        },
        toggleQuantumFoamFilter: (state, action) => {
            state.currentPage = 0;
            state.filter.quantumFoamToggle = !state.filter.quantumFoamToggle;
        },
        toggleNecrodermisFilter: (state, action) => {
            state.currentPage = 0;
            state.filter.necrodermisToggle = !state.filter.necrodermisToggle;
        },
        toggleAlienFloralFilter: (state, action) => {
            state.currentPage = 0;
            state.filter.alienFloralToggle = !state.filter.alienFloralToggle;
        },
        toggleSpiceMelangeFilter: (state, action) => {
            state.currentPage = 0;
            state.filter.spiceMelangeToggle = !state.filter.spiceMelangeToggle;
        },
        toggleTitaniumFilter: (state, action) => {
            state.currentPage = 0;
            state.filter.titaniumToggle = !state.filter.titaniumToggle;
        },
        toggleEnercoreFilter: (state, action) => {
            state.currentPage = 0;
            state.filter.enercoreToggle = !state.filter.enercoreToggle;
        },
        toggleNexiumFilter: (state, action) => {
            state.currentPage = 0;
            state.filter.nexiumToggle = !state.filter.nexiumToggle;
        },
        toggleSwiftexFilter: (state, action) => {
            state.currentPage = 0;
            state.filter.swiftexToggle = !state.filter.swiftexToggle;
        },
        toggleCognisurgeFilter: (state, action) => {
            state.currentPage = 0;
            state.filter.cognisurgeToggle = !state.filter.cognisurgeToggle;
        },
        toggleVitalshieldFilter: (state, action) => {
            state.currentPage = 0;
            state.filter.vitalshieldToggle = !state.filter.vitalshieldToggle;
        },
        toggleFlexonixFilter: (state, action) => {
            state.currentPage = 0;
            state.filter.flexonixToggle = !state.filter.flexonixToggle;
        },
        pageUp: (state, action) => {
            state.currentPage += 1;
        },
        pageDown: (state, action) => {
            state.currentPage = Math.max(0, state.currentPage - 1);
        },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getConfig.fulfilled, (state, action) => {
          state.programs = decodePrograms(action.payload.modifiers);
        });
    }
});

export const selectProgramsOnCurrentPage = (programs: ProgramModel[]) => (amountPerPage: number) => (state: RootState) => {
    const startIndex = state.automata.programs.currentPage * amountPerPage;
    const endIndex = startIndex + amountPerPage;
    return programs.slice(startIndex, endIndex);
}

export const selectAllPrograms = (state: RootState) => state.automata.programs.programs;

export const selectFilteredPrograms = (state: RootState) => 
    state.automata.programs.programs.filter(program =>
        selectIsAllResourcesToggled(state) || (
            (!selectIsCrystalToggled(state) || program.resources.some(resource => resource.type === CRYSTAL_TYPE)) &&
            (!selectIsInterstellarMineralToggled(state) || program.resources.some(resource => resource.type === INTERSTELLAR_MINERAL_TYPE)) &&
            (!selectIsBiomassToggled(state) || program.resources.some(resource => resource.type === BIOMASS_TYPE)) &&
            (!selectIsQuantumFoamToggled(state) || program.resources.some(resource => resource.type === QUANTUM_FOAM_TYPE)) &&
            (!selectIsNecrodermisToggled(state) || program.resources.some(resource => resource.type === NECRODERMIS_TYPE)) &&
            (!selectIsAlienFloralToggled(state) || program.resources.some(resource => resource.type === ALIEN_FLORAL_TYPE)) &&
            (!selectIsSpiceMelangeToggled(state) || program.resources.some(resource => resource.type === SPICE_MELANGE_TYPE)) &&
            (!selectIsTitaniumToggled(state) || program.resources.some(resource => resource.type === TITANIUM_TYPE)) &&
            (!selectIsEnercoreToggled(state) || program.resources.some(resource => resource.type === ENERCORE_TYPE)) &&
            (!selectIsNexiumToggled(state) || program.resources.some(resource => resource.type === NEXIUM_TYPE)) &&
            (!selectIsSwiftexToggled(state) || program.resources.some(resource => resource.type === SWIFTEX_TYPE)) &&
            (!selectIsCognisurgeToggled(state) || program.resources.some(resource => resource.type === COGNISURGE_TYPE)) &&
            (!selectIsVitalshieldToggled(state) || program.resources.some(resource => resource.type === VITALSHIELD_TYPE)) &&
            (!selectIsFlexonixToggled(state) || program.resources.some(resource => resource.type === FLEXONIX_TYPE))));

export const selectProgramsByIndexes = (indexes: (number | null)[]) => (state: RootState) => 
    indexes.map(index => (index != null && 0 <= index && index < state.automata.programs.programs.length) ? state.automata.programs.programs[index] : null);
export const selectProgramByIndex = (index: (number | null)) => (state: RootState) => 
    (index != null && 0 <= index && index < state.automata.programs.programs.length) ? state.automata.programs.programs[index] : null
export const selectIsAllResourcesToggled = (state: RootState) => 
    !state.automata.programs.filter.crystalToggle &&
    !state.automata.programs.filter.interstellarMineralToggle &&
    !state.automata.programs.filter.biomassToggle &&
    !state.automata.programs.filter.quantumFoamToggle &&
    !state.automata.programs.filter.necrodermisToggle &&
    !state.automata.programs.filter.alienFloralToggle &&
    !state.automata.programs.filter.spiceMelangeToggle &&
    !state.automata.programs.filter.titaniumToggle &&
    !state.automata.programs.filter.enercoreToggle &&
    !state.automata.programs.filter.nexiumToggle &&
    !state.automata.programs.filter.swiftexToggle &&
    !state.automata.programs.filter.cognisurgeToggle &&
    !state.automata.programs.filter.vitalshieldToggle &&
    !state.automata.programs.filter.flexonixToggle;

export const selectIsCrystalToggled = (state: RootState) => state.automata.programs.filter.crystalToggle;
export const selectIsInterstellarMineralToggled = (state: RootState) => state.automata.programs.filter.interstellarMineralToggle;
export const selectIsBiomassToggled = (state: RootState) => state.automata.programs.filter.biomassToggle;
export const selectIsQuantumFoamToggled = (state: RootState) => state.automata.programs.filter.quantumFoamToggle;
export const selectIsNecrodermisToggled = (state: RootState) => state.automata.programs.filter.necrodermisToggle;
export const selectIsAlienFloralToggled = (state: RootState) => state.automata.programs.filter.alienFloralToggle;
export const selectIsSpiceMelangeToggled = (state: RootState) => state.automata.programs.filter.spiceMelangeToggle;
export const selectIsTitaniumToggled = (state: RootState) => state.automata.programs.filter.titaniumToggle;
export const selectIsEnercoreToggled = (state: RootState) => state.automata.programs.filter.enercoreToggle;
export const selectIsNexiumToggled = (state: RootState) => state.automata.programs.filter.nexiumToggle;
export const selectIsSwiftexToggled = (state: RootState) => state.automata.programs.filter.swiftexToggle;
export const selectIsCognisurgeToggled = (state: RootState) => state.automata.programs.filter.cognisurgeToggle;
export const selectIsVitalshieldToggled = (state: RootState) => state.automata.programs.filter.vitalshieldToggle;
export const selectIsFlexonixToggled = (state: RootState) => state.automata.programs.filter.flexonixToggle;
export const selectCurrentPage = (state: RootState) => state.automata.programs.currentPage;

export const {
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
    pageUp,
    pageDown,
} = programsSlice.actions;
export default programsSlice.reducer;
