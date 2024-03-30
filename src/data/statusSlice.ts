import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import {
  Statistics,
  DeployParams,
  ProvingParams,
  StatusState,
  QueryParams,
  WithSignature,
} from "zkwasm-service-helper";

const initialState: StatusState = {
  tasks: [],
  loaded: false,
  statistics: {
    totalImages: 0,
    totalProofs: 0,
    totalDeployed: 0,
    totalTasks: 0,
  },
  config: {
    latest_server_checksum: new Uint8Array(4),
    deployer_address: "",
    receiver_address: "",
    task_fee_list: {
      setup_fee: "",
      prove_fee: "",
    },
    chain_info_list: [],
    deployments: [],
    topup_token_params: {
      token_address: "",
      network_id: 0,
      topup_conversion_rate: null
    },
    topup_token_data: {
      decimals: 0,
      symbol: ""
    },
    subscription_plans: [],
  },
};

export const loadStatus = createAsyncThunk(
  "status/fetchStatus",
  async (query: QueryParams, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const helper = state.endpoint.zkWasmServiceHelper;
    const tasksInfo = await helper.loadTasks(query);
    if (tasksInfo) {
       console.log("tasks is", tasksInfo.data);
       return tasksInfo.data;
    } else {
       return [];
    }
  }
);

export const addProvingTask = createAsyncThunk(
  "status/addProveTask",
  async (task: WithSignature<ProvingParams>, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const helper = state.endpoint.zkWasmServiceHelper;
    const response = await helper.addProvingTask(task);
    return response;
  }
);

export const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    updateState: (state, d) => {
      state.tasks = d.payload.tasks;
      state.loaded = d.payload.loaded;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadStatus.fulfilled, (state, c) => {
          console.log("payload", c.payload);
          state.tasks = c.payload;
          state.loaded = true;
      });
  },
});

export const { updateState } = statusSlice.actions;
export const selectTasks = (state:RootState) => state.status.tasks;
export const tasksLoaded = (state:RootState) => state.status.loaded;
export default statusSlice.reducer;
