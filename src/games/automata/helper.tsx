import { Modifier } from "./types";

export function getModifierIndex(modifierInfo: string) {
  const currentMInfoBinary = BigInt(modifierInfo).toString(2).padStart(64, "0");
  const currentMIndex = parseInt(currentMInfoBinary.slice(8, 16), 2);
  return currentMIndex;
}

export function getHaltBit(modifierInfo: string) {
  const currentMInfoBinary = BigInt(modifierInfo).toString(2).padStart(64, "0");
  const haltBit = parseInt(currentMInfoBinary.slice(0, 8), 2);
  return haltBit;
}

export function getCounter(modifierInfo: string) {
  const currentMInfoBinary = BigInt(modifierInfo).toString(2).padStart(64, "0");
  const counter = parseInt(currentMInfoBinary.slice(16), 2);
  return counter;
}

/* The modifier must less than eight */
export function encode_modifier(modifiers: Array<bigint>) {
  let c = 0n;
  for (const m of modifiers) {
    c = (c << 8n) + m;
  }
  return c;
}

export function createCommand(command: bigint, objindex: bigint) {
  return (command << 32n) + objindex;
}
