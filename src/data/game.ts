import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState, store } from "../app/store";
import { BNToUint8Array, SignatureWitness } from "../utils/proof";

export interface GameState {
  loaded: boolean;
  merkleRoot: Array<number>;
  commands: Array<bigint>;
}

const initialState: GameState = {
  loaded: false,
  merkleRoot: [0, 0, 0, 0],
  commands: []
};

export const getMerkleRoot = createAsyncThunk(
  'game/getMerkleRoot',
  async (thunkApi) => {
    //let l2account = await loginL2Account(l1account.address);
    return [0,0,0,0];
  }
);

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setLoaded: (state, loaded) => {
      state.loaded = loaded.payload;
    },
    appendCommand: (state, command) => {
      state.commands.push(command.payload);
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(getMerkleRoot.pending, (state) => {
      })
      .addCase(getMerkleRoot.fulfilled, (state, c) => {
      })
  },
});

export const selectGameLoaded = (state: RootState) => state.game.loaded;
export const { setLoaded, appendCommand } = gameSlice.actions;
export const selectSignedCommand = (state: RootState) => {
    const buf = new Uint8Array(state.game.commands.length * 8);
    state.game.commands.map((v, i) => {
      buf.set(BNToUint8Array(v), 8*i);
    });
    console.log(buf);
    return buf;
}
export default gameSlice.reducer;
