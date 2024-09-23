import { query_config, send_transaction, query_state, queryJobStatus, delay } from './rpc';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const SERVER_TICK_TO_SECOND = 5;

interface SendTransactionError {
    name: string;
    message: string;
    stack?: string;
}

interface SendTransactionParams {
    cmd: Array<bigint>;
    prikey: string;
}

interface QueryStateRes {
    player: any;
    playerList: any;
    globalTimer: any;
}

interface QueryStateParams {
    cmd: Array<bigint>;
    prikey: string;
}

export const getConfig = createAsyncThunk(
    'client/getConfig',
    async () => {
        const res = await query_config();
        const data = JSON.parse(res.data);
        return data;
    }
)

export const sendTransaction = createAsyncThunk<
    number,
    SendTransactionParams,
    { rejectValue: SendTransactionError }
    >(
        'client/sendTransaction',
        async (params: {cmd: Array<bigint>, prikey: string }, { rejectWithValue }) => {
            try {
                const { cmd, prikey } = params;
                const res = await send_transaction(cmd, prikey);
                for (let i=0; i<5; i++) {//detect job status with 1 sec delay
                    await delay(1000);
                    let jobStatus;
                    try {
                        jobStatus = await queryJobStatus(res.jobid);
                        if(jobStatus.finishedOn == undefined) {
                            throw Error("WaitingForProcess");
                        }
                    } catch(e) {
                        continue
                    }
                    if (jobStatus) {
                        if (jobStatus.finishedOn != undefined && jobStatus.failedReason == undefined ) {
                            return jobStatus.finishedOn;
                        } else {
                            throw Error(jobStatus.failedReason)
                        }
                    }
                }
                throw Error("MonitorTransactionFail");
            } catch (err: any) {
                return rejectWithValue(err);
            }
        }
);

export const queryState = createAsyncThunk<
    QueryStateRes,
    QueryStateParams,
    { rejectValue: string }
    >(
        'client/queryState',
        async (params: {cmd: Array<bigint>, prikey: string }, { rejectWithValue }) => {
            try {
                const { cmd, prikey } = params;
                const res = await query_state(cmd, prikey);
                const datas = JSON.parse(res.data);
                console.log("query state data", datas);

                const player = datas.player;
                const playerList = datas.state.player_list;
                const counter = datas.state.counter;
                return {
                    player,
                    playerList,
                    globalTimer: counter,
                };
            } catch (err: any) {
                return rejectWithValue(err);
            }
        }
);
