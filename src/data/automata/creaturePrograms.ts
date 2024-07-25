import { createSlice } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";
import { selectProgramsByIndexes } from "./programs"

interface creatureProgramsState {
    currentIndex: number;
    Indexes: Array<number | null>;
}

const initialState: creatureProgramsState = {
    currentIndex: 0,
    Indexes: [null, null, null, null, null, null, null, null],
};

export const creatureProgramsSlice = createSlice({
    name: 'creaturePrograms',
    initialState,
    reducers: {
        setCurrentIndex: (state, loaded) => {
            state.currentIndex = loaded.payload.currentIndex;
        },
        setIndexes: (state, loaded) => {
            state.Indexes = loaded.payload.Indexes;
        },
        updateIndex: (state, loaded) => {
            const { Index, Value } = loaded.payload;
            state.Indexes[Index] = Value;
        },
    },
});

export const selectCurrentIndex = (state: RootState) => state.automata.creaturePrograms.currentIndex;
export const selectCreaturePrograms = (state: RootState) => 
    selectProgramsByIndexes(state.automata.creaturePrograms.Indexes)(state)

export const { setCurrentIndex, setIndexes, updateIndex } = creatureProgramsSlice.actions;
export default creatureProgramsSlice.reducer;