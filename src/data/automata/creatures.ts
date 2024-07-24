import { createSlice } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";
import { RareResourceModel } from './models';

export interface CreatureRaw {
    entity: Array<number>;
    object_id: Array<string>;
    modifiers: Array<number>;
    modifier_info: string;
}

export interface CreatureModel {
    rareResources: RareResourceModel;
    object_id: Array<string>;
    modifiers: Array<number>;
    modifier_info: string;
}

function rawToModel(raw: CreatureRaw): CreatureModel {
    return {
        rareResources: {
            enercoreAmount: raw.entity[0],
            nexiumAmount: raw.entity[1],
            swiftexAmount: raw.entity[2],
            cognisurgeAmount: raw.entity[3],
            vitalshieldAmount: raw.entity[4],
            flexonixAmount: raw.entity[5],
        },
        object_id: raw.object_id,
        modifiers: raw.modifiers,
        modifier_info: raw.modifier_info
    };
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
            state.creatures = action.payload.creatures.map(rawToModel);
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