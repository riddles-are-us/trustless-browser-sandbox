import axios from "axios";
import { sign, query } from "./sign";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});

export async function send_transaction(cmd: Array<bigint>, prikey: string) {
  try {
    const data = sign(cmd, prikey);
    const response = await instance.post("/send", JSON.stringify(data));

    if (response.status === 201) {
      const jsonResponse = response.data;
      return jsonResponse;
    } else {
      throw "SendTransactionError";
    }
  } catch (error) {
    throw "SendTransactionError " + error;
  }
}

export async function query_state(cmd: Array<bigint>, prikey: string) {
  try {
    const data = query(prikey);
    console.log("query data", data);
    const response = await instance.post("/query", JSON.stringify(data));
    console.log("query response", response);
    if (response.status === 201) {
      const jsonResponse = response.data;
      return jsonResponse;
    }
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 500) {
        throw "QueryStateError";
      } else {
        throw "UnknownError";
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      throw "No response was received from the server, please check your network connection.";
    } else {
      throw "UnknownError";
    }
  }
}

export async function query_config() {
  try {
    const response = await instance("/config", {
      method: "POST",
    });

    if (response.status === 201) {
      const jsonResponse = response.data;
      return jsonResponse;
    } else {
      throw "QueryConfigError";
    }
  } catch (error) {
    throw "QueryStateError " + error;
  }
}

function encode_modifier(modifiers: Array<bigint>) {
  let c = 0n;
  for (const m of modifiers) {
    c = (c << 8n) + m;
  }
  return c;
}

export function createCommand(
  nonce: bigint,
  command: bigint,
  objindex: bigint
) {
  return (nonce << 16n) + (objindex << 8n) + command;
}

const CMD_INSTALL_PLAYER = 1n;
const CMD_INSTALL_OBJECT = 2n;
const CMD_RESTART_OBJECT = 3n;
export function getTransactionCommandArray(
  nonce: bigint,
  programIndexes: number[],
  selectingCreatureIndex: number,
  isCreating: boolean
) {
  const mslice = programIndexes.slice();
  const index = mslice.reverse().map((id) => {
    return BigInt(id);
  });
  const modifiers: bigint = encode_modifier(index);
  const objIndex = BigInt(selectingCreatureIndex);
  const command = createCommand(
    nonce,
    isCreating ? CMD_INSTALL_OBJECT : CMD_RESTART_OBJECT,
    objIndex
  );
  return [command, modifiers, 0n, 0n];
}

export function getInsPlayerTransactionCommandArray(nonce: bigint) {
  const command = createCommand(nonce, CMD_INSTALL_PLAYER, 0n);
  return [command, 0n, 0n, 0n];
}
