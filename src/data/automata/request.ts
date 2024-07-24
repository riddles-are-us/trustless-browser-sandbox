import { query_config, send_transaction } from '../../games/automata/rpc';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface SendTransactionRes {
    success: boolean;
    jobid: string | undefined;
}

interface SendTransactionParams {
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
    SendTransactionRes,
    SendTransactionParams,
    { rejectValue: string }
    >(
        'client/sendTransaction',
        async (params: {cmd: Array<bigint>, prikey: string }, { rejectWithValue }) => {
            try {
            const { cmd, prikey } = params;
            const res = await send_transaction(cmd, prikey);
            return res;
            } catch (err: any) {
            return rejectWithValue(err);
            }
        }
);