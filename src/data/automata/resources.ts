import { createSlice } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";
import { queryState } from "../../games/automata/request";
import { ResourceAmountPair, ResourceType, emptyCommonResources, getCommonResources } from './models';

interface ResourcesState {
    commonResources: ResourceAmountPair[];
}

const initialState: ResourcesState = {
    commonResources: emptyCommonResources,
};

export const resourcesSlice = createSlice({
    name: 'resources',
    initialState,
    reducers: {
      
    },
    extraReducers: (builder) => {
      builder
        .addCase(queryState.fulfilled, (state, action) => {
            state.commonResources = getCommonResources(action.payload.player.data.local);
        });
    }
  },
);

export const selectCommonResource = (type: ResourceType) => (state: RootState) => state.automata.resources.commonResources.find(resource => resource.type == type)?.amount ?? 0;
    
// export const { } = resourcesSlice.actions;
export default resourcesSlice.reducer;