import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import statusReducer from '../data/statusSlice';
import accountReducer from '../data/accountSlice';
import endpointReducer from "../data/endpoint";
import gameReducer from "../data/game";
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
    status: statusReducer,
    account: accountReducer,
    endpoint: endpointReducer,
    game: gameReducer,
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
