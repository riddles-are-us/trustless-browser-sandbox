import { createSlice } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";
import { queryState } from "../../games/automata/request";
import { ResourceAmountPair, ResourceType, emptyCommonResources, getCommonResources } from './models';

interface ResourcesState {
    initResource: boolean;
    commonResources: ResourceAmountPair[];
    displayCommonResources: ResourceAmountPair[];
    diffCommonResources: ResourceAmountPair[];
}

const initialState: ResourcesState = {
    initResource: true,
    commonResources: emptyCommonResources,
    displayCommonResources: emptyCommonResources,
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
            state.displayCommonResources[index].amount = state.commonResources[index].amount;
          }
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(queryState.fulfilled, (state, action) => {
            const newResources = getCommonResources(action.payload.player.data.local);
            if (state.initResource){
              state.diffCommonResources = emptyCommonResources;
              state.displayCommonResources = newResources;
              state.initResource = false;
            } else {
              state.diffCommonResources =
                  newResources.map(pair => ({
                    type: pair.type,
                    amount: pair.amount - (state.commonResources.find(oldPair => oldPair.type == pair.type)?.amount ?? 0),
                  }));
              state.displayCommonResources = 
                newResources.map((pair, index) => ({
                  type: pair.type,
                  amount: Math.min(pair.amount, state.commonResources[index].amount),
                }));
            }
            state.commonResources = newResources;
        });
    }
  },
);

export const selectDisplayCommonResource = (type: ResourceType) => (state: RootState) => state.automata.resources.displayCommonResources.find(resource => resource.type == type)?.amount ?? 0;
export const selectDiffCommonResource = (type: ResourceType) => (state: RootState) => state.automata.resources.diffCommonResources.find(resource => resource.type == type)?.amount ?? 0;
    
export const { resetDiffCommonResources } = resourcesSlice.actions;
export default resourcesSlice.reducer;