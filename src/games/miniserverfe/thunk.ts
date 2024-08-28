import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ZKWasmAppRpc } from "zkwasm-ts-server";
import { RootState } from "../../app/store";
import { ExternalState, Modifier, SendTransactionParams, SendTransactionRes } from './types';
import { decodeModifiers } from './helper';

const rpc = new ZKWasmAppRpc("http://localhost:3000");

export const getConfig = createAsyncThunk(
  'client/getConfig',
  async () => {
    // Get the configuration response
    const res = await rpc.query_config();

    // Parse the response to ensure it is a plain JSON object
    const parsedRes = JSON.parse(JSON.stringify(res));

    // Extract the data from the parsed response
    const data = JSON.parse(parsedRes.data);
    console.log(data);

    return parsedRes;
  }
)
export const sendTransaction = createAsyncThunk<
  number,
  SendTransactionParams,
  { rejectValue: string }
>(
  'client/sendTransaction',
  async (params: {cmd: Array<bigint>, prikey: string }, { rejectWithValue }) => {
    try {
      const { cmd, prikey } = params;
      const res = await rpc.sendTransaction(new BigUint64Array(cmd), prikey);
      return res;
    } catch (err: any) {
      return rejectWithValue(err);
    }
  }
);

interface ClientState {
  localAttributes: string[];
  entityAttributes: string[];
  modifiers: Modifier[];
  external: ExternalState;
  globalTimer: number,
}

const initialState: ClientState = {
  external: new ExternalState(),
  localAttributes: [],
  entityAttributes: [],
  modifiers: [],
  globalTimer: 0,
}

export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    setUserActivity: (state, loaded) => {
      state.external.userActivity = loaded.payload;
    },
    setGlobalTimer: (state, loaded) => {
      state.globalTimer = loaded.payload;
    },
    setSelectedCreatureIndex: (state, loaded) => {
      state.external.selectedCreatureIndex = loaded.payload;
    },
    setViewerActivity: (state, loaded) => {
      state.external.viewerActivity = loaded.payload;
    },
    setErrorMessage: (state, loaded) => {
      state.external.errorMessage = loaded.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConfig.pending, (state) => {
        //
        state.external.viewerActivity = "queryConfig";
    console.log("query config pending");
      })
      .addCase(getConfig.fulfilled, (state, c) => {
        state.external.viewerActivity = "idle";
        state.entityAttributes = c.payload.entity_attributes;
        state.localAttributes = c.payload.local_attributes;
    console.log(c.payload);
    state.modifiers = decodeModifiers(c.payload.modifiers);
        console.log("query config fulfilled");
      })
      .addCase(sendTransaction.rejected, (state, c) => {
        if (c.payload) {
          state.external.errorMessage = c.payload;
        }
        console.log("send transaction rejected");
      });
  },
});

export const selectExternal = (state: RootState) => state.client.external;
export const selectGlobalTimer = (state: RootState) => state.client.globalTimer;
export const selectLocalAttributes = (state: RootState) => state.client.localAttributes;
export const selectEntityAttributes = (state: RootState) => state.client.entityAttributes;
export const selectModifier = (state: RootState) => state.client.modifiers;
export const { setGlobalTimer, setViewerActivity, setErrorMessage, setSelectedCreatureIndex, setUserActivity} = clientSlice.actions;
export default clientSlice.reducer;