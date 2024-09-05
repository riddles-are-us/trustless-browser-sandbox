import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import accountReducer from '../data/accountSlice';
import endpointReducer from "../data/endpoint";
import gameReducer from "../data/game";
import puppyPartyReducer from "../data/puppy_party/puppy_party";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['acccount/deriveL2Account/fulfilled'],
        ignoredActionPaths: ['payload.web3','payload.seed', 'payload.injector'],
        ignoredPaths: [
          "acccount/fetchAccount/fulfilled",
          "account.l1Account.web3",
          "endpoint.zkWasmServiceHelper",
          "status.config.latest_server_checksum",
          "game.preMerkleRoot",
          "game.postMerkleRoot",
          "account.l2account"
        ],
      },
    }),
  reducer: {
    account: accountReducer,
    endpoint: endpointReducer,
    game: gameReducer,
    puppyParty: puppyPartyReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
