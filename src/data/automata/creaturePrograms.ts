import { createSlice } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";
import { selectProgramsByIndexes } from "./programs"

interface creatureProgramsState {
    Indexes: Array<number | null>;
}

const initialState: creatureProgramsState = {
    Indexes: [null, null, null, null, null, null, null, null],
};

export const creatureProgramsSlice = createSlice({
    name: 'creaturePrograms',
    initialState,
    reducers: {
        setIndexes: (state, loaded) => {
            state.Indexes = loaded.payload.Indexes;
        },
        updateIndex: (state, loaded) => {
            const { Index, Value } = loaded.payload;
            state.Indexes[Index] = Value;
        },
    },
});

export const selectCreaturePrograms = (state: RootState) => 
    selectProgramsByIndexes(state.automata.creaturePrograms.Indexes)(state)

export const { setIndexes, updateIndex } = creatureProgramsSlice.actions;
export default creatureProgramsSlice.reducer;