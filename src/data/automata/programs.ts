import { createSlice } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";
import { getConfig } from "./request";
import { ProgramModel, getResourceViewDatas, getCommonResourceModel, getRareResourceModel } from "./models";

interface ProgramsState {
    programs: Array<ProgramModel>;
}

const initialState: ProgramsState = {
    programs: [],
};

function decodePrograms(programRaws: any) {
    const programs: ProgramModel[] = [];
    for(let i=0; i<programRaws.length; i++) {
        const program: ProgramModel = {
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
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getConfig.fulfilled, (state, action) => {
          state.programs = decodePrograms(action.payload.modifiers);
        });
    }
});

export const selectAllPrograms = (page = 0, amountPerPage = Infinity) => (state: RootState) => {
    const programsArray = Object.values(state.automata.programs.programs);
    const startIndex = page * amountPerPage;
    const endIndex = startIndex + amountPerPage;

    return programsArray.slice(startIndex, endIndex);
};
export const selectProgramsByIndexes = (indexes: (number | null)[]) => (state: RootState) => 
    indexes.map(index => (index != null && 0 <= index && index < state.automata.programs.programs.length) ? state.automata.programs.programs[index] : null);
export const selectProgramsByIndex = (index: (number | null)) => (state: RootState) => 
    (index != null && 0 <= index && index < state.automata.programs.programs.length) ? state.automata.programs.programs[index] : null

export default programsSlice.reducer;
