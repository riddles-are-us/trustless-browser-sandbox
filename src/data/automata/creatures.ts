import { createSlice } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";
import { CreatureModel, getRareResourceModel } from './models';
import { selectProgramByIndex } from "./programs"

interface CreatureRaw {
    entity: Array<number>;
    object_id: Array<string>;
    modifiers: Array<number>;
    modifier_info: string;
}

function rawToModel(raw: CreatureRaw): CreatureModel {
    const binary = BigInt(raw.modifier_info).toString(2).padStart(64, "0");
    const currentProgramIndex = parseInt(binary.slice(8, 16), 2);
    const isProgramStop = parseInt(binary.slice(0, 8), 2) == 1;
    const startTime = parseInt(binary.slice(16), 2);
    return {
        rareResources: getRareResourceModel(raw.entity),
        object_id: raw.object_id,
        programIndexes: raw.modifiers,
        currentProgramIndex: currentProgramIndex,
        isProgramStop: isProgramStop,
        startTime: startTime,
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
export const selectSelectedCreatureProgramProgress = (state: RootState) => {
    const selectedCreature = selectSelectedCreature(state);
    if (selectedCreature && selectedCreature.isProgramStop == false) {
        const programIndex = selectedCreature.programIndexes[selectedCreature.currentProgramIndex];
        if (programIndex) {
            const processTime = selectProgramByIndex(programIndex)(state)?.processingTime;
            if (processTime) {
                return ((state.automata.properties.globalTimer - selectedCreature.startTime) / processTime) * 100;
            }
        }
    }
    return 0;
}
    
export const { setSelectedCreatureIndex, setCreatures } = creaturesSlice.actions;
export default creaturesSlice.reducer;