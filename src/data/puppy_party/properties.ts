import { createSlice } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";
import { getConfig, sendTransaction, queryState } from "../../games/request"

export enum UIState{
  Init,
  QueryConfig,
  QueryState,
  CreatePlayer,
  Idle
}

interface PlayerState {
  nonce: number;
  data: {
    balance: number;
    action: bigint;
    last_lottery_timestamp: number;
    last_action_timestamp: number;
    progress: number;
  }
}

interface PlayerListElement {
  pid: string,
  data: {
    balance: number;
    action: bigint;
    last_lottery_timestamp: number;
    last_action_timestamp: number;
    progress: number;
  }
}

interface PropertiesState {
    uIState: UIState;
    player: PlayerState;
    globalTimer: number;
    playerList: PlayerListElement[];
}

const SWAY = 0n;

const initialState: PropertiesState = {
    uIState: UIState.Init,
    player: {
      nonce: 0,
      data: {
        balance: 0,
        action: SWAY,
        last_lottery_timestamp: 0,
        last_action_timestamp: 0,
        progress: 0,
      }
    },
    globalTimer: 0,
    playerList: []
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
        console.log("send transaction fulfilled. The command processed at:", action.payload);
      })
      .addCase(sendTransaction.rejected, (state, action) => {
        console.log(`send transaction rejected: ${action.payload}`);
      })
      .addCase(queryState.fulfilled, (state, action) => {
        if (state.uIState == UIState.QueryState){
          state.uIState = UIState.Idle;
        }

        state.playerList = action.payload.playerList;
        state.globalTimer = action.payload.globalTimer;
        state.player = action.payload.player;
        console.log("state player:", state.player);
        console.log("query state fulfilled");
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
export const selectNonce = (state: RootState) => BigInt(state.puppyParty.properties.player.nonce);
export const selectPlayerList = (state: RootState) => state.puppyParty.properties.playerList;
export const selectBalance = (state: RootState) => state.puppyParty.properties.player.data.balance;
export const selectAction = (state: RootState) => state.puppyParty.properties.player.data.action;
export const selectLastLotteryTimestamp = (state: RootState) => state.puppyParty.properties.player.data.last_lottery_timestamp;
export const selectLastActionTimestamp = (state: RootState) => state.puppyParty.properties.player.data.last_action_timestamp;
export const selectProgress = (state: RootState) => state.puppyParty.properties.player.data.progress;
export const { setUIState } = propertiesSlice.actions;
export default propertiesSlice.reducer;