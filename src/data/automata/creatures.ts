import { createSlice } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";
import { queryState } from "../../games/automata/request";
import { CreatureModel, getRareResourceModel, emptyCreatingCreature } from './models';
import { selectProgramByIndex, selectProgramsByIndexes } from "./programs"

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
        name: raw.object_id.join(""),
        programIndexes: raw.modifiers,
        currentProgramIndex: currentProgramIndex,
        isProgramStop: isProgramStop,
        startTime: startTime,
    };
}

const NOT_SELECTING_CREATURE = "NotSelecting"
const CREATING_CREATURE = "Creating"
interface CreaturesState {
    selectedCreatureIndex: number | typeof NOT_SELECTING_CREATURE | typeof CREATING_CREATURE;
    creatures: CreatureModel[];
    creatingCreature: CreatureModel;
}

const initialState: CreaturesState = {
    selectedCreatureIndex: NOT_SELECTING_CREATURE,
    creatures: [],
    creatingCreature: emptyCreatingCreature,
};

export const creaturesSlice = createSlice({
    name: 'creatures',
    initialState,
    reducers: {
        setSelectedCreatureIndex: (state, loaded) => {
            state.selectedCreatureIndex = 
                (loaded.payload.index >= state.creatures.length)
                    ? CREATING_CREATURE
                    : loaded.payload.index;
        },
        startCreatingCreature: (state, action) => {
            state.selectedCreatureIndex = CREATING_CREATURE;
            state.creatingCreature = emptyCreatingCreature;
        },
        trySetProgramForCreatingCreature: (state, action) => {
            if (state.selectedCreatureIndex == CREATING_CREATURE){
                state.creatingCreature.programIndexes[state.creatingCreature.currentProgramIndex] = action.payload.index;
                state.creatingCreature.currentProgramIndex = (state.creatingCreature.currentProgramIndex + 1) % 8;
            }
        }
    },
    extraReducers: (builder) => {
      builder
        .addCase(queryState.fulfilled, (state, action) => {
            state.creatures = action.payload.creatures.map(rawToModel);
        });
    }
  },
);

export const isSelectingCreatedCreature = (state: RootState) => state.automata.creatures.selectedCreatureIndex != CREATING_CREATURE && state.automata.creatures.selectedCreatureIndex != NOT_SELECTING_CREATURE;
export const selectSelectedCreatureIndex = (state: RootState) => state.automata.creatures.selectedCreatureIndex;
export const selectSelectedCreatureListIndex = (state: RootState) => 
    state.automata.creatures.selectedCreatureIndex === NOT_SELECTING_CREATURE || state.automata.creatures.selectedCreatureIndex === CREATING_CREATURE
        ? state.automata.creatures.creatures.length
        : state.automata.creatures.selectedCreatureIndex
export const selectCreatures = (state: RootState) => 
    state.automata.creatures.selectedCreatureIndex === CREATING_CREATURE
        ? [...state.automata.creatures.creatures, state.automata.creatures.creatingCreature]
        : state.automata.creatures.creatures;
export const selectSelectedCreature = (state: RootState) => 
    state.automata.creatures.selectedCreatureIndex === NOT_SELECTING_CREATURE
        ? emptyCreatingCreature :
    state.automata.creatures.selectedCreatureIndex === CREATING_CREATURE
        ? state.automata.creatures.creatingCreature
        : state.automata.creatures.creatures[state.automata.creatures.selectedCreatureIndex]

export const selectSelectedCreaturePrograms = (state: RootState) => 
    selectProgramsByIndexes(selectSelectedCreature(state).programIndexes)(state)

export const selectSelectedCreatureProgramProgress = (state: RootState) => {
    const selectedCreature = selectSelectedCreature(state);
    const programIndex = selectedCreature.programIndexes[selectedCreature.currentProgramIndex];
    if (selectedCreature.isProgramStop == false && programIndex) {
        const processTime = selectProgramByIndex(programIndex)(state)?.processingTime;
        if (processTime) {
            return ((state.automata.properties.globalTimer - selectedCreature.startTime) / processTime) * 100;
        }
    }
    return 0;
}
    
export const { setSelectedCreatureIndex, startCreatingCreature, trySetProgramForCreatingCreature } = creaturesSlice.actions;
export default creaturesSlice.reducer;