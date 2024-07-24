import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";
import { query_config, send_transaction } from '../../games/automata/rpc';

export interface Modifier {
    delay: number;
    entity: Array<number>;
    local: Array<number>;
    name: string;
}

class ExternalState {
    userActivity: "browsing" | "creating" | "rebooting" | "loading";
    // idle -> queryingUpdate, queryingUpdate -> moniteringResut, moniteringResut-> queryingUpdate
    viewerActivity:
        | "monitoringResult"
        | "queryingUpdate"
        | "idle"
        | "queryConfig";
    errorMessage: string;

    constructor() {
        (this.userActivity = "loading"),
        (this.viewerActivity = "idle"),
        (this.errorMessage = "");
    }
}

interface SendTransactionRes {
    success: boolean;
    jobid: string | undefined;
}

interface SendTransactionParams {
    cmd: Array<bigint>;
    prikey: string;
}

interface PropertyState {
    modifiers: Modifier[];
    external: ExternalState;
    globalTimer: number,
}

const initialExternalState: ExternalState = {
    userActivity: "loading",
    viewerActivity: "idle",
    errorMessage: "",
};

const initialState: PropertyState = {
    external: initialExternalState,
    modifiers: [],
    globalTimer: 0,
};


export const getConfig = createAsyncThunk(
        'client/getConfig',
        async () => {
            const res = await query_config();
            const data = JSON.parse(res.data);
            return data;
        }
    )
    export const sendTransaction = createAsyncThunk<
        SendTransactionRes,
        SendTransactionParams,
        { rejectValue: string }
        >(
            'client/sendTransaction',
            async (params: {cmd: Array<bigint>, prikey: string }, { rejectWithValue }) => {
                try {
                const { cmd, prikey } = params;
                const res = await send_transaction(cmd, prikey);
                return res;
                } catch (err: any) {
                return rejectWithValue(err);
                }
    }
);


export function decodeModifiers(modifiers: any) {
    let delay: number;
    let entity: Array<number>;
    let local: Array<number>;
    let name: string;
    const modifierArray: Modifier[] = [];
    for(let i=0; i<modifiers.length; i++) {
        delay = modifiers[i][0];
        entity = modifiers[i][1];
        local = modifiers[i][2];
        name = modifiers[i][3];
        modifierArray.push({"delay": delay, "entity": entity, "local": local, "name": name});
    }
    return modifierArray;
}

export const propertiesSlice = createSlice({
    name: 'properties',
    initialState,
    reducers: {
        setUserActivity: (state, loaded) => {
          state.external.userActivity = loaded.payload;
        },
        setGlobalTimer: (state, loaded) => {
          state.globalTimer = loaded.payload;
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

export const selectExternal = (state: RootState) => state.automata.properties.external;
export const selectGlobalTimer = (state: RootState) => state.automata.properties.globalTimer;
export const selectModifier = (state: RootState) => state.automata.properties.modifiers;
    
export const { setGlobalTimer, setViewerActivity, setErrorMessage, setUserActivity } = propertiesSlice.actions;
export default propertiesSlice.reducer;