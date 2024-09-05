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

function createCommand(command: bigint, nonce: bigint) {
  return (nonce << 16n) + command;
}

export function getTransactionCommandArray(
  action: bigint,
  nonce: bigint,
) {
  const command = createCommand(action, nonce);
  return [command, 0n, 0n, 0n];
}
