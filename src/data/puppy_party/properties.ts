import { createSlice } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";
import { getConfig, sendTransaction, queryState } from "../../games/request"
import { useAppSelector } from "../../app/hooks";
import { selectL2Account } from "../../data/accountSlice";

export enum UIState{
  Init,
  QueryConfig,
  QueryState,
  CreatePlayer,
  Idle
}

interface PropertiesState {
    uIState: UIState;
    globalTimer: number;
    nonce: number;
}

const initialState: PropertiesState = {
    uIState: UIState.Init,
    globalTimer: 0,
    nonce: 0,
};

export const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    setUIState: (state, action) => {
      state.uIState = action.payload.uIState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConfig.fulfilled, (state, action) => {
        state.uIState = UIState.CreatePlayer;
        console.log("query config fulfilled");
      })
      .addCase(getConfig.rejected, (state, action) => {
        console.log(`query config rejected: ${action.payload}`);
      })
      .addCase(sendTransaction.fulfilled, (state, action) => {
        if (state.uIState == UIState.CreatePlayer){
          state.uIState = UIState.QueryState;
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
        state.nonce = action.payload.player.nonce;
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

export const selectUIState = (state: RootState) => state.puppyParty.properties.uIState;
export const selectGlobalTimer = (state: RootState) => state.puppyParty.properties.globalTimer;
export const selectNonce = (state: RootState) => BigInt(state.puppyParty.properties.nonce);
    
export const { setUIState } = propertiesSlice.actions;
export default propertiesSlice.reducer;