import axios from 'axios';
import { sign, query } from "./sign";

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' }
});

export async function send_transaction(cmd: Array<bigint>, prikey: string) {
  const data = sign(cmd, prikey);
  const response = await instance.post(
    "/send",
    JSON.stringify(data)
  );

  if (response.status === 201) {
    const jsonResponse = response.data;
    return jsonResponse;
  } else {
    throw "SendTransactionError";
  }
}

export async function query_state(cmd: Array<bigint>, prikey: string) {
  const data = query(prikey);
  console.log("query data", data);
  const response = await instance.post(
    "/query",
    JSON.stringify(data)
  );

  if (response.status === 201) {
    const jsonResponse = response.data;
    return jsonResponse;
  } else {
    throw "QueryStateError";
  }
}

export async function query_config() {
  const response = await instance("/config", {
    method: 'POST'
  });

  if (response.status === 201) {
    const jsonResponse = response.data;
    return jsonResponse;
  } else {
    throw "QueryConfigError";
  }
}