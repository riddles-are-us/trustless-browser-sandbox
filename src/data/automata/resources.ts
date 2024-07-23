import { createSlice } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";

interface AutomataState {
    crystalAmount: number;
    interstellarMineralAmount: number;
    biomassAmount: number;
    quantumFoamAmount: number;
    necrodermisAmount: number;
    alienFloralAmount: number;
    spiceMelangeAmount: number;
    titaniumAmount: number;
}

const initialState: AutomataState = {
    crystalAmount: 0,
    interstellarMineralAmount: 0,
    biomassAmount: 0,
    quantumFoamAmount: 0,
    necrodermisAmount: 0,
    alienFloralAmount: 0,
    spiceMelangeAmount: 0,
    titaniumAmount: 0,
};

export const resourcesSlice = createSlice({
    name: 'resources',
    initialState,
    reducers: {
        setResources: (state, action) => {
            state.crystalAmount = action.payload.resources[0];
            state.interstellarMineralAmount = action.payload.resources[1];
            state.biomassAmount = action.payload.resources[2];
            state.quantumFoamAmount = action.payload.resources[3];
            state.necrodermisAmount = action.payload.resources[4];
            state.alienFloralAmount = action.payload.resources[5];
            state.spiceMelangeAmount = action.payload.resources[6];
            state.titaniumAmount = action.payload.resources[7];
        },
    },
  },
);

export const selectCrystalAmount = (state: RootState) => state.automata.resources.crystalAmount;
export const selectInterstellarMineralAmount = (state: RootState) => state.automata.resources.interstellarMineralAmount;
export const selectBiomassAmount = (state: RootState) => state.automata.resources.biomassAmount;
export const selectQuantumFoamAmount = (state: RootState) => state.automata.resources.quantumFoamAmount;
export const selectNecrodermisAmount = (state: RootState) => state.automata.resources.necrodermisAmount;
export const selectAlienFloralAmount = (state: RootState) => state.automata.resources.alienFloralAmount;
export const selectSpiceMelangeAmount = (state: RootState) => state.automata.resources.spiceMelangeAmount;
export const selectTitaniumAmount = (state: RootState) => state.automata.resources.titaniumAmount;
    
export const { setResources } = resourcesSlice.actions;
export default resourcesSlice.reducer;