import { query, ZKWasmAppRpc, LeHexBN } from "zkwasm-ts-server";
import BN from 'bn.js';

function bytesToHex(bytes: Array<number>): string  {
    return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
}

const CMD_WITHDRAW = 1n;
const CMD_DEPOSIT = 2n;
const CMD_PLACE = 3n;


function createCommand(nonce: bigint, command: bigint, feature: bigint) {
  return (nonce << 16n) + (feature << 8n) + command;
}

//const rpc = new ZKWasmAppRpc("http://114.119.187.224:8085");
//this.rpc = new ZKWasmAppRpc("http://localhost:3000");

export class Player {
  processingKey: string;
  rpc: ZKWasmAppRpc;
  constructor(key: string, rpc: string) {
    this.processingKey = key
    this.rpc = new ZKWasmAppRpc(rpc);
  }

  async deposit(balance: bigint) {
    let nonce = await this.getNonce();
    let accountInfo = new LeHexBN(query(this.processingKey).pkx).toU64Array();
    try {
      let finished = await this.rpc.sendTransaction(
        new BigUint64Array([createCommand(nonce, CMD_DEPOSIT, 0n), accountInfo[1], accountInfo[2], balance]),
        this.processingKey
      );
      console.log("deposit processed at:", finished);
    } catch(e) {
      if(e instanceof Error) {
        console.log(e.message);
      }
      console.log("deposit error at processing key:", this.processingKey);
    }
  }

  async getState(): Promise<any> {
    let state:any = await this.rpc.queryState(this.processingKey);
    return JSON.parse(state.data);
  }

  async getNonce(): Promise<bigint> {
    let state:any = await this.rpc.queryState(this.processingKey);
    let nonce = 0n;
    if (state.data) {
      let data = JSON.parse(state.data);
      if (data.player) {
        nonce = BigInt(data.player.nonce);
      }
    }
    return nonce;
  }

  async place(bet: bigint) {
    let nonce = await this.getNonce();
    try {
      let processStamp = await this.rpc.sendTransaction(
        new BigUint64Array([createCommand(nonce, CMD_PLACE, 0n), bet, 0n, 0n]),
        this.processingKey
      );
      console.log("place processed at:", processStamp);
    } catch(e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
      console.log("place error at id:", bet);
    }
  }

  async withdrawRewards(address: string, amount: bigint) {
    let nonce = await this.getNonce();
    let addressBN = new BN(address, 16);
    let a = addressBN.toArray("be", 20); // 20 bytes = 160 bits and split into 4, 8, 8

    console.log("address is", address);
    console.log("address be is", a);


    /*
  (32 bit amount | 32 bit highbit of address)
  (64 bit mid bit of address (be))
  (64 bit tail bit of address (be))
     */


    let firstLimb = BigInt('0x' + bytesToHex(a.slice(0,4).reverse()));
    let sndLimb = BigInt('0x' + bytesToHex(a.slice(4,12).reverse()));
    let thirdLimb = BigInt('0x' + bytesToHex(a.slice(12, 20).reverse()));


    console.log("first is", firstLimb);
    console.log("snd is", sndLimb);
    console.log("third is", thirdLimb);

    try {
      let processStamp = await this.rpc.sendTransaction(
        new BigUint64Array([
          createCommand(nonce, CMD_WITHDRAW, 0n),
          (firstLimb << 32n) + amount,
          sndLimb,
          thirdLimb
        ]), this.processingKey);
      console.log("withdraw rewards processed at:", processStamp);
    } catch(e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
      console.log("collect reward error at address:", address);
    }
  }
}

