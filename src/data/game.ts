import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState, store } from "../app/store";
import { BNToUint8Array, SignatureWitness } from "../utils/proof";
import sha256 from "sha256";
import BN from "bn.js";
import {bnToHexLe} from 'delphinus-curves/src/altjubjub';

export interface GameState {
  loaded: boolean;
  readyToSubmit: boolean;
  md5: string | null,
  preMerkleRoot: Array<bigint>;
  postMerkleRoot: Array<bigint>;
  msgHash: string; //start with 0x little end
  commands: Array<bigint>;
}

const initialState: GameState = {
  loaded: false,
  readyToSubmit: false,
  md5: null,
  preMerkleRoot: [0n, 0n, 0n, 0n],
  postMerkleRoot: [0n, 0n, 0n, 0n],
  commands: [],
  msgHash: "0x0" //
};

export const getMerkleRoot = createAsyncThunk(
  'game/getMerkleRoot',
  async (thunkApi) => {
    //let l2account = await loginL2Account(l1account.address);
    return [0,0,0,0];
  }
);

function  hashMessage(msg: Uint8Array): string {
    const hash = sha256(Buffer.from(msg));
    const bn = new BN(hash, "hex");
    return bnToHexLe(bn)
  }

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setLoaded: (state, loaded) => {
      state.loaded = loaded.payload;
    },
    setMD5: (state, loaded) => {
      state.md5 = loaded.payload;
    },

    setReadyToSubmit: (state, loaded) => {
      state.readyToSubmit = loaded.payload;
    },
    setPreMerkleRoot: (state, loaded) => {
      state.preMerkleRoot = loaded.payload;
    },
    setPostMerkleRoot: (state, loaded) => {
      state.preMerkleRoot = loaded.payload;
    },

    appendCommand: (state, command) => {
      console.log("command loaded");
      state.commands.push(command.payload);
      const buf = new Uint8Array(state.commands.length * 8);
      state.commands.map((v, i) => {
          buf.set(BNToUint8Array(v), 8*i);
      });
      state.msgHash = hashMessage(buf);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMerkleRoot.pending, (state) => {
        console.log("getMerkleRoot pending");
      })
      .addCase(getMerkleRoot.fulfilled, (state, c) => {
        console.log("getMerkleRoot fulfilled");
      })
  },
});

export const selectGameLoaded = (state: RootState) => state.game.loaded;
export const selectMD5 = (state: RootState) => state.game.md5;
export const selectReadyToSubmit = (state: RootState) => state.game.readyToSubmit;
export const selectCommands = (state: RootState) => state.game.commands;
export const selectPreMerkleRoot = (state: RootState) => state.game.preMerkleRoot;
export const selectPostMerkleRoot = (state: RootState) => state.game.postMerkleRoot;
export const selectMsgHash = (state: RootState) => state.game.msgHash;
export const { setLoaded, appendCommand, setReadyToSubmit, setMD5 } = gameSlice.actions;
export const selectMessageToSigned = (state: RootState) => {
    const buf = new Uint8Array(state.game.commands.length * 8);
    state.game.commands.map((v, i) => {
      buf.set(BNToUint8Array(v), 8*i);
    });
    console.log(buf);
    return buf;
}
export default gameSlice.reducer;
