export function BigInttoHex(value: bigint) {
  const base = BigInt(16);
  const map = ["a", "b", "c", "d", "e", "f"];
  const array: string[] = [];
  let res = "";
  while(value > 0){
    const rem = value % base;
    value = value / base;
    if (rem >= 10) {
      res = map[Number(rem)-10];
      array.push(res);
    } else {
      array.push(rem.toString());
    }
  }
  array.reverse();
  if(array.length == 0) {
    return "0x0";
  }
  return "0x"+array.join("");
}