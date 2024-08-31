import { createSlice } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";
import { getConfig, SERVER_TICK_TO_SECOND } from "../../games/automata/request";
import { ProgramModel, FilterModel, allResourcesToggleFilter, getCommonResources, getRareResources, ResourceType, allResourceTypes
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
            type: i,
            processingTime: programRaws[i][0] * SERVER_TICK_TO_SECOND,
            resources: 
                [
                    ...getCommonResources(programRaws[i][2]), 
                    ...getRareResources(programRaws[i][1])
                ].filter(resource => resource.amount !== 0),
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
        toggleFilter: (state, action) => {
            state.currentPage = 0;
            const type = action.payload.type as ResourceType;
            state.filter.dict[type] = !(state.filter.dict[type] ?? true);
        },
        nextPage: (state, action) => {
            state.currentPage += 1;
        },
        prevPage: (state, action) => {
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
        selectIsAllResourcesToggled(state) || 
        allResourceTypes.every(type => 
            !selectIsResourceTypeToggled(type)(state) ||
            program.resources.some(resource => resource.type === type))
    );

export const selectProgramsByIndexes = (indexes: (number | null)[]) => (state: RootState) => 
    indexes.map(index => (index != null && 0 <= index && index < state.automata.programs.programs.length) ? state.automata.programs.programs[index] : null);
export const selectProgramByIndex = (index: (number | null)) => (state: RootState) => 
    (index != null && 0 <= index && index < state.automata.programs.programs.length) ? state.automata.programs.programs[index] : null
export const selectIsAllResourcesToggled = (state: RootState) => 
    Object.values(state.automata.programs.filter.dict).every(toggle => !toggle);
export const selectIsResourceTypeToggled = (type: ResourceType) => (state: RootState) => state.automata.programs.filter.dict[type] ?? false;

export const selectCurrentPage = (state: RootState) => state.automata.programs.currentPage;

export const {
    resetFilter,
    toggleFilter,
    nextPage,
    prevPage,
} = programsSlice.actions;
export default programsSlice.reducer;
