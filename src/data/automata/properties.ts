import { createSlice } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";
import { getConfig, sendTransaction } from "./request"

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

interface PropertiesState {
    external: ExternalState;
    globalTimer: number,
}

const initialExternalState: ExternalState = {
    userActivity: "loading",
    viewerActivity: "idle",
    errorMessage: "",
};

const initialState: PropertiesState = {
    external: initialExternalState,
    globalTimer: 0,
};

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
        console.log("query config fulfilled");
      })
      .addCase(sendTransaction.rejected, (state, c) => {
        if (c.payload) {
          state.external.errorMessage = c.payload;
        }
        console.log("send transaction rejected");
      });
    }
});

export const selectExternal = (state: RootState) => state.automata.properties.external;
export const selectGlobalTimer = (state: RootState) => state.automata.properties.globalTimer;
    
export const { setGlobalTimer, setViewerActivity, setErrorMessage, setUserActivity } = propertiesSlice.actions;
export default propertiesSlice.reducer;