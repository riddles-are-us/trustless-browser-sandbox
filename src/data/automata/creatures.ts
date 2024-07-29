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

function formatTime(seconds: number) {
    if (seconds == 0){
        return "";
    }

    const pad = (num: number) => String(num).padStart(2, '0');
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
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
    selectingProgramIndex: number;
}

const initialState: CreaturesState = {
    selectedCreatureIndex: NOT_SELECTING_CREATURE,
    creatures: [],
    creatingCreature: emptyCreatingCreature,
    selectingProgramIndex: 0,
};

export const creaturesSlice = createSlice({
    name: 'creatures',
    initialState,
    reducers: {
        setSelectedCreatureIndex: (state, action) => {
            state.selectedCreatureIndex = 
                (action.payload.index >= state.creatures.length)
                    ? CREATING_CREATURE
                    : action.payload.index;
        },
        startCreatingCreature: (state, action) => {
            state.selectedCreatureIndex = CREATING_CREATURE;
            state.creatingCreature = emptyCreatingCreature;
            state.selectingProgramIndex = 0;
        },
        setProgramIndex: (state, action) => {
            const selectedCreature = state.selectedCreatureIndex === NOT_SELECTING_CREATURE
                ? emptyCreatingCreature :
            state.selectedCreatureIndex === CREATING_CREATURE
                ? state.creatingCreature
                : state.creatures[state.selectedCreatureIndex]

            selectedCreature.programIndexes[state.selectingProgramIndex] = action.payload.programIndex;
            state.selectingProgramIndex = (state.selectingProgramIndex + 1) % 8;
        },
        setSelectingProgramIndex: (state, action) => {
            state.selectingProgramIndex = action.payload.selectingIndex;
        },
    },
    extraReducers: (builder) => {
      builder
        .addCase(queryState.fulfilled, (state, action) => {
            state.creatures = action.payload.creatures.map(rawToModel);
        });
    }
  },
);

export const isNotSelectingCreature = (state: RootState) => state.automata.creatures.selectedCreatureIndex == NOT_SELECTING_CREATURE;
export const selectSelectedCreatureIndex = (state: RootState) => state.automata.creatures.selectedCreatureIndex;
export const selectSelectingProgramIndex = (state: RootState) => state.automata.creatures.selectingProgramIndex;
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

export const selectSelectedCreatureCurrentProgramName = (state: RootState) => {
    const selectedCreature = selectSelectedCreature(state);
    const programIndex = selectedCreature.programIndexes[selectedCreature.currentProgramIndex];
    return selectProgramByIndex(programIndex)(state)?.name ?? "";
}

export const selectSelectedCreatureSelectingProgramName = (state: RootState) => {
    const selectedCreature = selectSelectedCreature(state);
    const programIndex = selectedCreature.programIndexes[state.automata.creatures.selectingProgramIndex];
    return selectProgramByIndex(programIndex)(state)?.name ?? "";
}

export const selectSelectedCreatureCurrentProgramProcessTime = (state: RootState) => {
    const selectedCreature = selectSelectedCreature(state);
    const programIndex = selectedCreature.programIndexes[selectedCreature.currentProgramIndex];
    return formatTime(selectProgramByIndex(programIndex)(state)?.processingTime ?? 0) ;
}

export const selectSelectedCreatureSelectingProgramProcessTime = (state: RootState) => {
    const selectedCreature = selectSelectedCreature(state);
    const programIndex = selectedCreature.programIndexes[state.automata.creatures.selectingProgramIndex];
    return formatTime(selectProgramByIndex(programIndex)(state)?.processingTime ?? 0) ;
}

export const selectSelectedCreatureCurrentProgramProgress = (state: RootState) => {
    const selectedCreature = selectSelectedCreature(state);
    const programIndex = selectedCreature.programIndexes[selectedCreature.currentProgramIndex];
    if (selectedCreature.isProgramStop == false && programIndex) {
        const processTime = selectProgramByIndex(programIndex)(state)?.processingTime;
        if (processTime) {
            return Math.min(((state.automata.properties.globalTimer - selectedCreature.startTime) / processTime) * 100, 100);
        }
    }
    return 0;
}
    
export const { setSelectedCreatureIndex, startCreatingCreature, setProgramIndex, setSelectingProgramIndex } = creaturesSlice.actions;
export default creaturesSlice.reducer;