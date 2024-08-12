import { createSlice } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";
import { queryState } from "../../games/automata/request";
import { ResourceAmountPair, ResourceType, emptyCommonResources, getCommonResources } from './models';

interface ResourcesState {
    initResource: boolean;
    commonResources: ResourceAmountPair[];
    diffCommonResources: ResourceAmountPair[];
}

const initialState: ResourcesState = {
    initResource: true,
    commonResources: emptyCommonResources,
    diffCommonResources: emptyCommonResources,
};

export const resourcesSlice = createSlice({
    name: 'resources',
    initialState,
    reducers: {
      resetDiffCommonResources: (state, action) => {
          const index = state.diffCommonResources.findIndex(pair => pair.type == action.payload.type);
          if (index){
            state.diffCommonResources[index].amount = 0;
          }
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(queryState.fulfilled, (state, action) => {
            const newResources = getCommonResources(action.payload.player.data.local);
            state.diffCommonResources = 
              state.initResource ? emptyCommonResources :
                newResources.map(pair => ({
                  type: pair.type,
                  amount: Math.max(pair.amount - (state.commonResources.find(oldPair => oldPair.type == pair.type)?.amount ?? 0), 0),
                }));
            state.commonResources = newResources;
            state.initResource = false;
        });
    }
  },
);

export const selectCommonResource = (type: ResourceType) => (state: RootState) => state.automata.resources.commonResources.find(resource => resource.type == type)?.amount ?? 0;
export const selectDiffCommonResource = (type: ResourceType) => (state: RootState) => state.automata.resources.diffCommonResources.find(resource => resource.type == type)?.amount ?? 0;
    
export const { resetDiffCommonResources } = resourcesSlice.actions;
export default resourcesSlice.reducer;