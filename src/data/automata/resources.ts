import { createSlice } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";
import { CommonResourceModel, emptyCommonResources } from './models';

interface ResourcesState {
    common: CommonResourceModel;
}

const initialState: ResourcesState = {
    common: emptyCommonResources,
};

export const resourcesSlice = createSlice({
    name: 'resources',
    initialState,
    reducers: {
        setResources: (state, action) => {
            state.common.crystalAmount = action.payload.resources[0];
            state.common.interstellarMineralAmount = action.payload.resources[1];
            state.common.biomassAmount = action.payload.resources[2];
            state.common.quantumFoamAmount = action.payload.resources[3];
            state.common.necrodermisAmount = action.payload.resources[4];
            state.common.alienFloralAmount = action.payload.resources[5];
            state.common.spiceMelangeAmount = action.payload.resources[6];
            state.common.titaniumAmount = action.payload.resources[7];
        },
    },
  },
);

export const selectCrystalAmount = (state: RootState) => state.automata.resources.common.crystalAmount;
export const selectInterstellarMineralAmount = (state: RootState) => state.automata.resources.common.interstellarMineralAmount;
export const selectBiomassAmount = (state: RootState) => state.automata.resources.common.biomassAmount;
export const selectQuantumFoamAmount = (state: RootState) => state.automata.resources.common.quantumFoamAmount;
export const selectNecrodermisAmount = (state: RootState) => state.automata.resources.common.necrodermisAmount;
export const selectAlienFloralAmount = (state: RootState) => state.automata.resources.common.alienFloralAmount;
export const selectSpiceMelangeAmount = (state: RootState) => state.automata.resources.common.spiceMelangeAmount;
export const selectTitaniumAmount = (state: RootState) => state.automata.resources.common.titaniumAmount;
    
export const { setResources } = resourcesSlice.actions;
export default resourcesSlice.reducer;