import BN from "bn.js";
import { PrivateKey, PublicKey, bnToHexLe } from "delphinus-curves/src/altjubjub";

export function Inputs(inputs: Array<string>) {
  return inputs.join(";");
}

export function bytesToBN(data:Uint8Array) {
  const chunksize = 64;
  const bns = [];
  for (let i = 0; i < data.length; i += 32) {
    const chunk = data.slice(i, i + 32);
    const a = new BN(chunk,'le');
    bns.push(a);
    // do whatever
  }
  return bns;
}

export function u64ToHex(data:Array<bigint>) {
  let bn = new BN(0);
  for (let i = 0; i < data.length; i += 32) {
    bn = (bn.shln(64)).add(new BN(data[i].toString(16)));
  }
  return bn.toString(16);
}

export function bytesToU64Hex(data:Uint8Array) {
  const bns = [];
  for (let i = 0; i < data.length; i += 8) {
    const chunk = data.slice(i, i + 8);
    const a = new BN(chunk,'le');
    bns.push("0x" + a.toString(16));
    // do whatever
  }
  return bns;
}

export function BNtoBuffer(bn: BN) {
    const bytes = bn.toArray("le",16);
    const buf = new Uint8Array(bytes.length);
    return buf;
}

export function numToUint8Array(num: number): Uint8Array {
    const arr = new Uint8Array(8);
    for (let i = 0; i < 8; i++) {
       arr[i] = num % 256;
       num = Math.floor(num / 256);
    }
    return arr;
}

export function BNToUint8Array(num: bigint): Uint8Array {
    const arr = new Uint8Array(8);
    for (let i = 0; i < 8; i++) {
       arr[i] = Number(num % 256n);
       num = num >> 8n;
    }
    return arr;
}

export class SignatureWitness {
  pkey: Array<string>;
  sig: Array<string>;
  constructor(prikey: PrivateKey, msg: Uint8Array) {
    const sig = prikey.sign(msg);
    const pkey = prikey.publicKey;
    this.pkey = [bnToHexLe(pkey.key.x.v), bnToHexLe(pkey.key.y.v)];
    this.sig = [bnToHexLe(sig[0][0]), bnToHexLe(sig[0][1]), bnToHexLe(sig[1])];
  }
}
