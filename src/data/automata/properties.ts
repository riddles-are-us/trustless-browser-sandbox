import { createSlice } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";
import { getConfig, sendTransaction, queryState } from "../../games/automata/request"
import { ResourceAmountPair, emptyCommonResources } from "./models"

export enum UIState{
  Init,
  QueryConfig,
  QueryState,
  CreatePlayer,
  Idle,
  Loading,
  Guide,
  Creating,
  Reboot,
}

interface PropertiesState {
    uIState: UIState;
    globalTimer: number;
    hasRocket: boolean;
    selectedCreatureDiffResources: ResourceAmountPair[];
}

const initialState: PropertiesState = {
    uIState: UIState.Init,
    globalTimer: 0,
    hasRocket: false,
    selectedCreatureDiffResources: [],
};

export const propertiesSlice = createSlice({
    name: 'properties',
    initialState,
    reducers: {
      setUIState: (state, action) => {
        state.uIState = action.payload.uIState;
      },
      setHasRocket: (state, action) => {
        state.hasRocket = action.payload.hasRocket;
      },
      setSelectedCreatureDiffResources: (state, action) => {
        state.selectedCreatureDiffResources = action.payload.resources;
      },
      resetSelectedCreatureDiffResources: (state, action) => {
        state.selectedCreatureDiffResources = [];
      },
    },

  extraReducers: (builder) => {
    builder
      .addCase(getConfig.fulfilled, (state, action) => {
        state.uIState = UIState.QueryState;
        console.log("query config fulfilled");
      })
      .addCase(getConfig.rejected, (state, action) => {
        console.log(`query config rejected: ${action.payload}`);
      })
      .addCase(sendTransaction.fulfilled, (state, action) => {
        if (state.uIState == UIState.CreatePlayer){
          state.uIState = UIState.Guide;
        }
        console.log("send transaction fulfilled");
      })
      .addCase(sendTransaction.rejected, (state, action) => {
        console.log(`send transaction rejected: ${action.payload}`);
      })
      .addCase(queryState.fulfilled, (state, action) => {
        if (state.uIState == UIState.QueryState){
          state.uIState = UIState.Idle;
        }
        state.globalTimer = action.payload.globalTimer;
        console.log("send transaction fulfilled");
      })
      .addCase(queryState.rejected, (state, action) => {
        if (state.uIState == UIState.QueryState){
          state.uIState = UIState.CreatePlayer;
        }
        console.log(`query state rejected: ${action.payload}`);
      });
    }
});

export const selectIsLoading = (state: RootState) => state.automata.properties.uIState == UIState.Loading;
export const selectIsSelectingUIState = (state: RootState) => state.automata.properties.uIState == UIState.Creating || state.automata.properties.uIState == UIState.Reboot;
export const selectUIState = (state: RootState) => state.automata.properties.uIState;
export const selectGlobalTimer = (state: RootState) => state.automata.properties.globalTimer;
export const selectHasRocket = (state: RootState) => state.automata.properties.hasRocket;
export const selectSelectedCreatureDiffResources = (state: RootState) => state.automata.properties.selectedCreatureDiffResources;
    
export const { setUIState, setHasRocket, setSelectedCreatureDiffResources, resetSelectedCreatureDiffResources } = propertiesSlice.actions;
export default propertiesSlice.reducer;