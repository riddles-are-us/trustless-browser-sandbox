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

export function createCommand(nonce: bigint, command: bigint, objindex: bigint) {
  return (nonce << 16n) + (objindex << 8n) + command;
}

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