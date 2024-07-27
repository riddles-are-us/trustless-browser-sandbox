import { createSlice } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";
import { queryState } from "../../games/automata/request";
import { CommonResourceModel, emptyCommonResources, getCommonResourceModel } from './models';

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
    },
    extraReducers: (builder) => {
      builder
        .addCase(queryState.fulfilled, (state, action) => {
            state.common = getCommonResourceModel(action.payload.player.data.local);
        });
    }
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
    
export default resourcesSlice.reducer;