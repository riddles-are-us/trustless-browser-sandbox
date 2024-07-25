import { createSlice } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";
import { getConfig } from "./request"
import { ResourceViewData, getResourceViewDatas, getCommonResourceModel, getRareResourceModel } from "./models"
import { ProgramModel } from "./models"

interface ProgramsState {
    programs: ProgramModel[];
}

const initialState: ProgramsState = {
    programs: [],
};

function decodePrograms(programRaws: any) {
    const programs: ProgramModel[] = [];
    for(let i=0; i<programRaws.length; i++) {
        const program: ProgramModel = {
            delay: programRaws[i][0],
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
        
    },

    extraReducers: (builder) => {
      builder
        .addCase(getConfig.fulfilled, (state, c) => {
          state.programs = decodePrograms(c.payload.modifiers);
        });
      }
});

export const selectPrograms = (page = 0, amountPerPage = Infinity) => (state: RootState) => {
    const programs = state.automata.programs.programs;
    const startIndex = page * amountPerPage;
    const endIndex = startIndex + amountPerPage;

    return programs.slice(startIndex, endIndex);
};

    
// export const { } = programsSlice.actions;
export default programsSlice.reducer;