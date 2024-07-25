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
