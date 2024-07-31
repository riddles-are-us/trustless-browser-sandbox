import { createSlice } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";
import { queryState } from "../../games/automata/request";
import { CreatureModel, getRareResources, emptyRareResources, emptyCreatingCreature, ResourceType, allResourceTypes } from './models';
import { selectProgramByIndex, selectProgramsByIndexes } from "./programs"

interface CreatureRaw {
    entity: Array<number>;
    object_id: Array<string>;
    modifiers: Array<number>;
    modifier_info: string;
}

export function formatTime(seconds: number) {
    if (seconds == 0){
        return "";
    }

    const pad = (num: number) => String(num).padStart(2, '0');
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
}

function rawToModel(raw: CreatureRaw, index: number): CreatureModel {
    const binary = BigInt(raw.modifier_info).toString(2).padStart(64, "0");
    const currentProgramIndex = parseInt(binary.slice(8, 16), 2);
    const isProgramStop = parseInt(binary.slice(0, 8), 2) == 1;
    const startTime = parseInt(binary.slice(16), 2);
    return {
        rareResources: getRareResources(raw.entity),
        name: raw.object_id.join(""),
        creatureType: index,
        isLocked: false,
        programIndexes: raw.modifiers,
        currentProgramIndex: currentProgramIndex,
        isProgramStop: isProgramStop,
        startTime: startTime,
    };
}

function createLockedCreature(creatureType: number): CreatureModel {
    return {
        rareResources: emptyRareResources,
        name: "Lock",
        isLocked: true,
        creatureType: creatureType,
        programIndexes: [null, null, null, null, null, null, null, null],
        currentProgramIndex: 0,
        isProgramStop: false,
        startTime: 0,
    }
}

const CREATURE_MAX_COUNT = 24;
function fillCreaturesWithLocked(origin: CreatureModel[]): CreatureModel[] {
    const start = origin.length;
    const end = CREATURE_MAX_COUNT;
    const addArray = Array.from({ length: end - start }, (_, index) => start + index).map((index) => createLockedCreature(index));
    return [...origin, ...addArray];
}

const NOT_SELECTING_CREATURE = "NotSelecting"
interface CreaturesState {
    selectedCreatureIndex: number | typeof NOT_SELECTING_CREATURE;
    creatures: CreatureModel[];
    creatingCreature: CreatureModel;
    rebootCreature: CreatureModel | null;
    selectingProgramIndex: number;
    currentPage: number;
}

const initialState: CreaturesState = {
    selectedCreatureIndex: NOT_SELECTING_CREATURE,
    creatures: [],
    creatingCreature: emptyCreatingCreature,
    rebootCreature: null,
    selectingProgramIndex: 0,
    currentPage: 0,
};

export const creaturesSlice = createSlice({
    name: 'creatures',
    initialState,
    reducers: {
        setSelectedCreatureIndex: (state, action) => {
            if (action.payload.index < state.creatures.length){
                state.selectedCreatureIndex = action.payload.index;
            }
        },
        startCreatingCreature: (state, action) => {
            state.selectedCreatureIndex = state.creatures.length;
            state.creatingCreature = emptyCreatingCreature;
            state.selectingProgramIndex = 0;
        },
        startRebootCreature: (state, action) => {
            if (state.selectedCreatureIndex != NOT_SELECTING_CREATURE){
                state.rebootCreature = state.creatures[state.selectedCreatureIndex];
                state.selectingProgramIndex = 0;
            }
        },
        clearRebootCreature: (state, action) => {
            state.rebootCreature = null;
        },
        setProgramIndex: (state, action) => {
            if (state.selectedCreatureIndex != NOT_SELECTING_CREATURE){
                const selectedCreature = 
                    state.selectedCreatureIndex === state.creatures.length
                        ? state.creatingCreature
                        : state.rebootCreature;

                selectedCreature!.programIndexes[state.selectingProgramIndex] = action.payload.programIndex;
                state.selectingProgramIndex = (state.selectingProgramIndex + 1) % 8;
            }
        },
        setSelectingProgramIndex: (state, action) => {
            state.selectingProgramIndex = action.payload.selectingIndex;
        },
        nextPage: (state, action) => {
            state.currentPage += 1;
        },
        prevPage: (state, action) => {
            state.currentPage = Math.max(0, state.currentPage - 1);
        },
    },
    extraReducers: (builder) => {
      builder
        .addCase(queryState.fulfilled, (state, action) => {
            const creatures = action.payload.creatures as CreatureRaw[];
            state.creatures =creatures .map((creature, index) => rawToModel(creature, index));
        });
    }
  },
);

export const selectCreaturesOnCurrentPage = (creatures: CreatureModel[]) => (amountPerPage: number) => (state: RootState) => {
    const startIndex = state.automata.creatures.currentPage * amountPerPage;
    const endIndex = startIndex + amountPerPage;
    return creatures.slice(startIndex, endIndex);
}

export const isNotSelectingCreature = (state: RootState) => state.automata.creatures.selectedCreatureIndex == NOT_SELECTING_CREATURE;
export const selectSelectedCreatureIndex = (state: RootState) => state.automata.creatures.selectedCreatureIndex;
export const selectSelectingProgramIndex = (state: RootState) => state.automata.creatures.selectingProgramIndex;
export const selectSelectedCreatureListIndex = (state: RootState) => 
    state.automata.creatures.selectedCreatureIndex === NOT_SELECTING_CREATURE
        ? -1
        : state.automata.creatures.selectedCreatureIndex;
export const selectCreaturesCount = (state: RootState) => state.automata.creatures.creatures.length
export const selectCreatures = (state: RootState) => 
    state.automata.creatures.selectedCreatureIndex === state.automata.creatures.creatures.length
        ? fillCreaturesWithLocked([...state.automata.creatures.creatures, state.automata.creatures.creatingCreature])
        : fillCreaturesWithLocked(state.automata.creatures.creatures);
export const selectSelectedCreature = (state: RootState) => 
    state.automata.creatures.selectedCreatureIndex === NOT_SELECTING_CREATURE
        ? emptyCreatingCreature :
    state.automata.creatures.selectedCreatureIndex === state.automata.creatures.creatures.length
        ? state.automata.creatures.creatingCreature :
    state.automata.creatures.rebootCreature != null
        ? state.automata.creatures.rebootCreature 
        : state.automata.creatures.creatures[state.automata.creatures.selectedCreatureIndex]

export const selectSelectedRareResources = (type: ResourceType) => (state: RootState) => 
    selectSelectedCreature(state).rareResources.find(resource => resource.type == type)?.amount ?? 0;

export const selectSelectedCreaturePrograms = (state: RootState) => 
    selectProgramsByIndexes(selectSelectedCreature(state).programIndexes)(state)

export const selectSelectedCreatureDiffResources = (state: RootState) => {
    const programs = selectProgramsByIndexes(selectSelectedCreature(state).programIndexes)(state).filter(program => program != null);
    const diffResources = Object.fromEntries(allResourceTypes.map(type => [type, 0]));
    programs.forEach(program => program?.resources?.forEach(resource => diffResources[resource.type] += resource.amount));
    return diffResources;
}

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

export const selectCurrentPage = (state: RootState) => state.automata.creatures.currentPage;
    
export const { setSelectedCreatureIndex, startCreatingCreature, startRebootCreature, clearRebootCreature, setProgramIndex, setSelectingProgramIndex, nextPage, prevPage } = creaturesSlice.actions;
export default creaturesSlice.reducer;