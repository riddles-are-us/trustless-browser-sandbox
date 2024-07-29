import { createSlice } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";
import { getConfig, sendTransaction, queryState } from "../../games/automata/request"

export enum UIState{
  Init,
  Idle,
  Creating,
  Reboot,
}

interface PropertiesState {
    uIState: UIState;
    globalTimer: number;
    getConfigFinished: boolean;
    queryStateFinished: boolean;
}

const initialState: PropertiesState = {
    uIState: UIState.Init,
    globalTimer: 0,
    getConfigFinished: false,
    queryStateFinished: false,
};

export const propertiesSlice = createSlice({
    name: 'properties',
    initialState,
    reducers: {
        setUIState: (state, action) => {
          state.uIState = action.payload.uIState;
        },
    },

  extraReducers: (builder) => {
    builder
      .addCase(getConfig.fulfilled, (state, action) => {
        state.getConfigFinished = true;
        if (state.uIState == UIState.Init && state.getConfigFinished && state.queryStateFinished){
          state.uIState = UIState.Idle;
        }
        console.log("query config fulfilled");
      })
      .addCase(getConfig.rejected, (state, action) => {
        console.log(`query config rejected: ${action.payload}`);
      })
      .addCase(sendTransaction.fulfilled, (state, action) => {
        console.log("send transaction fulfilled");
      })
      .addCase(sendTransaction.rejected, (state, action) => {
        console.log(`send transaction rejected: ${action.payload}`);
      })
      .addCase(queryState.fulfilled, (state, action) => {
        state.queryStateFinished = true;
        if (state.uIState == UIState.Init && state.getConfigFinished && state.queryStateFinished){
          state.uIState = UIState.Idle;
        }
        state.globalTimer = action.payload.globalTimer;
        console.log("send transaction fulfilled");
      })
      .addCase(queryState.rejected, (state, action) => {
        console.log(`query state rejected: ${action.payload}`);
      });
    }
});

export const selectIsSelectingUIState = (state: RootState) => state.automata.properties.uIState == UIState.Creating || state.automata.properties.uIState == UIState.Reboot;
export const selectUIState = (state: RootState) => state.automata.properties.uIState;
export const selectGlobalTimer = (state: RootState) => state.automata.properties.globalTimer;
    
export const { setUIState } = propertiesSlice.actions;
export default propertiesSlice.reducer;