import { createSlice } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";

export interface CreatureModel {
    entity: Array<number>;
    object_id: Array<string>;
    modifiers: Array<number>;
    modifier_info: string;
}

interface CreaturesState {
    selectedCreatureIndex: number | null;
    creatures: Array<CreatureModel>;
}

const initialState: CreaturesState = {
    selectedCreatureIndex: null,
    creatures: [],
};

export const creaturesSlice = createSlice({
    name: 'creatures',
    initialState,
    reducers: {
        setSelectedCreatureIndex: (state, loaded) => {
          state.selectedCreatureIndex = loaded.payload;
        },
        setCreatures: (state, action) => {
            state.creatures = action.payload.creatures;
        }
    },
  },
);

export const selectSelectedCreatureIndex = (state: RootState) => state.automata.creatures.selectedCreatureIndex;
export const selectCreatures = (state: RootState) => state.automata.creatures.creatures;
export const selectSelectedCreature = (state: RootState) => 
    state.automata.creatures.selectedCreatureIndex != null
        ? state.automata.creatures.creatures[state.automata.creatures.selectedCreatureIndex]
        : null;
    
export const { setSelectedCreatureIndex, setCreatures } = creaturesSlice.actions;
export default creaturesSlice.reducer;