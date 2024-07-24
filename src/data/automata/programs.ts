import { createSlice } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";
import { getConfig } from "./request"

export interface ProgramModel {
    delay: number;
    entity: Array<number>;
    local: Array<number>;
    name: string;
}

interface PropertiesState {
    programs: ProgramModel[];
}

const initialState: PropertiesState = {
    programs: [],
};

function decodePrograms(programRaws: any) {
    const programs: ProgramModel[] = [];
    for(let i=0; i<programRaws.length; i++) {
        const program: ProgramModel = {
            delay: programRaws[i][0],
            entity: programRaws[i][1],
            local: programRaws[i][2],
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

export const selectPrograms = (state: RootState) => state.automata.programs.programs;
    
// export const { } = programsSlice.actions;
export default programsSlice.reducer;