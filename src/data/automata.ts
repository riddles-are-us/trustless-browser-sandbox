import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from "../app/store";
import { query_config, send_transaction } from '../games/automata/rpc';

export interface Modifier {
    delay: number;
    entity: Array<number>;
    local: Array<number>;
    name: string;
}

class ExternalState {
    selectedCreatureIndex: number | null;
    userActivity: "browsing" | "creating" | "rebooting" | "loading";
    // idle -> queryingUpdate, queryingUpdate -> moniteringResut, moniteringResut-> queryingUpdate
    viewerActivity:
        | "monitoringResult"
        | "queryingUpdate"
        | "idle"
        | "queryConfig";
    errorMessage: string;

    constructor() {
        this.selectedCreatureIndex = null;
        (this.userActivity = "loading"),
        (this.viewerActivity = "idle"),
        (this.errorMessage = "");
    }

    isMonitorResult() {
        return this.viewerActivity == "monitoringResult";
    }

    hasError() {
        return this.errorMessage != "";
    }

    getSelectedIndex(): number | null {
        return this.selectedCreatureIndex;
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

export interface CreatureModel {
    entity: Array<number>;
    object_id: Array<string>;
    modifiers: Array<number>;
    modifier_info: string;
}

interface AutomataState {
    modifiers: Modifier[];
    external: ExternalState;
    globalTimer: number,

    crystalAmount: number;
    interstellarMineralAmount: number;
    biomassAmount: number;
    quantumFoamAmount: number;
    necrodermisAmount: number;
    alienFloralAmount: number;
    spiceMelangeAmount: number;
    titaniumAmount: number;
    creatures: Array<CreatureModel>;
}

const initialState: AutomataState = {
    external: new ExternalState(),
    modifiers: [],
    globalTimer: 0,

    crystalAmount: 0,
    interstellarMineralAmount: 0,
    biomassAmount: 0,
    quantumFoamAmount: 0,
    necrodermisAmount: 0,
    alienFloralAmount: 0,
    spiceMelangeAmount: 0,
    titaniumAmount: 0,
    creatures: [],
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

export const automataSlice = createSlice({
    name: 'automata',
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
        setResources: (state, action) => {
            state.crystalAmount = action.payload.resources[0];
            state.interstellarMineralAmount = action.payload.resources[1];
            state.biomassAmount = action.payload.resources[2];
            state.quantumFoamAmount = action.payload.resources[3];
            state.necrodermisAmount = action.payload.resources[4];
            state.alienFloralAmount = action.payload.resources[5];
            state.spiceMelangeAmount = action.payload.resources[6];
            state.titaniumAmount = action.payload.resources[7];
        },
        setCreatures: (state, action) => {
            state.creatures = action.payload.creatures;
        }
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

export const selectExternal = (state: RootState) => state.automata.external;
export const selectGlobalTimer = (state: RootState) => state.automata.globalTimer;
export const selectModifier = (state: RootState) => state.automata.modifiers;
export const selectCrystalAmount = (state: RootState) => state.automata.crystalAmount;
export const selectInterstellarMineralAmount = (state: RootState) => state.automata.interstellarMineralAmount;
export const selectBiomassAmount = (state: RootState) => state.automata.biomassAmount;
export const selectQuantumFoamAmount = (state: RootState) => state.automata.quantumFoamAmount;
export const selectNecrodermisAmount = (state: RootState) => state.automata.necrodermisAmount;
export const selectAlienFloralAmount = (state: RootState) => state.automata.alienFloralAmount;
export const selectSpiceMelangeAmount = (state: RootState) => state.automata.spiceMelangeAmount;
export const selectTitaniumAmount = (state: RootState) => state.automata.titaniumAmount;
export const selectCreatures = (state: RootState) => state.automata.creatures;

export const selectSelectedCreature = (state: RootState) => 
    state.automata.external.selectedCreatureIndex != null
        ? state.automata.creatures[state.automata.external.selectedCreatureIndex]
        : null;
    
export const { setGlobalTimer, setViewerActivity, setErrorMessage, setSelectedCreatureIndex, setUserActivity, setResources, setCreatures } = automataSlice.actions;
export default automataSlice.reducer;