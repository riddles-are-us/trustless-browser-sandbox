import BN from "bn.js";

export function getModifierIndex(modifierInfo: number) {
  const modifierInfoBN = new BN(modifierInfo.toString());
  const currentMInfoBinary = modifierInfoBN.toString(2, 64);
  const currentMIndex = parseInt(currentMInfoBinary.slice(1, 8), 2);
  return currentMIndex;
}

export function getHaltBit(modifierInfo: number) {
  const modifierInfoBN = new BN(modifierInfo.toString());
  const currentMInfoBinary = modifierInfoBN.toString(2, 64);
  const haltBit = Number(currentMInfoBinary.charAt(0));
  return haltBit;
}

export function getCounter(modifierInfo: number) {
  const modifierInfoBN = new BN(modifierInfo.toString());
  const currentMInfoBinary = modifierInfoBN.toString(2, 64);
  const counter = parseInt(currentMInfoBinary.slice(8), 2);
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