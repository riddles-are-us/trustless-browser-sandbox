import { createSlice } from '@reduxjs/toolkit';
import { RootState, store } from "../app/store";

export interface CreatureModel {
    entity: Array<number>;
    object_id: Array<string>;
    modifiers: Array<number>;
    modifier_info: string;
  }

interface AutomataState {
  crystalAmount: number;
  interstellarMineralAmount: number;
  biomassAmount: number;
  quantumFoamAmount: number;
  necrodermisAmount: number;
  alienFloralAmount: number;
  spiceMelangeAmount: number;
  titaniumAmount: number;
  enercoreAmount: number;
  nexiumAmount: number;
  swiftexAmount: number;
  cognisurgeAmount: number;
  vitalshieldAmount: number;
  flexonixAmount: number;
  creatures: Array<CreatureModel>;
}

const initialState: AutomataState = {
  crystalAmount: 0,
  interstellarMineralAmount: 0,
  biomassAmount: 0,
  quantumFoamAmount: 0,
  necrodermisAmount: 0,
  alienFloralAmount: 0,
  spiceMelangeAmount: 0,
  titaniumAmount: 0,
  enercoreAmount: 0,
  nexiumAmount: 0,
  swiftexAmount: 0,
  cognisurgeAmount: 0,
  vitalshieldAmount: 0,
  flexonixAmount: 0,
  creatures: [],
};

export const automataSlice = createSlice({
  name: 'automata',
  initialState,
  reducers: {
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
  }
});

export const selectCrystalAmount = (state: RootState) => state.automata.crystalAmount;
export const selectInterstellarMineralAmount = (state: RootState) => state.automata.interstellarMineralAmount;
export const selectBiomassAmount = (state: RootState) => state.automata.biomassAmount;
export const selectQuantumFoamAmount = (state: RootState) => state.automata.quantumFoamAmount;
export const selectNecrodermisAmount = (state: RootState) => state.automata.necrodermisAmount;
export const selectAlienFloralAmount = (state: RootState) => state.automata.alienFloralAmount;
export const selectSpiceMelangeAmount = (state: RootState) => state.automata.spiceMelangeAmount;
export const selectTitaniumAmount = (state: RootState) => state.automata.titaniumAmount;
export const selectEnercoreAmount = (state: RootState) => state.automata.enercoreAmount;
export const selectNexiumAmount = (state: RootState) => state.automata.nexiumAmount;
export const selectSwiftexAmount = (state: RootState) => state.automata.swiftexAmount;
export const selectCognisurgeAmount = (state: RootState) => state.automata.cognisurgeAmount;
export const selectVitalshieldAmount = (state: RootState) => state.automata.vitalshieldAmount;
export const selectFlexonixAmount = (state: RootState) => state.automata.flexonixAmount;
export const selectCreatures = (state: RootState) => state.automata.creatures;

export const { setResources, setCreatures } = automataSlice.actions;
export default automataSlice.reducer;
