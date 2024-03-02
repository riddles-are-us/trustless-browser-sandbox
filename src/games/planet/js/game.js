/* tslint:disable */
/* eslint-disable */
import { __wbg_set_wasm } from "./gameplay_bg.js";
import { MerkleEnv } from "../../../sdk/merkle.ts";

const {
  merkle_address,
  merkle_setroot,
  merkle_getroot,
  merkle_set,
  merkle_get,
  poseidon_new,
  poseidon_push,
  poseidon_finalize,
  cache_set_mode,
  cache_store_data,
  cache_set_hash,
  cache_fetch_data,
} = new MerkleEnv();

let _print_buf = [];

function print_result() {
  // Convert the array of numbers to a string
  const result = String.fromCharCode(..._print_buf);

  _print_buf = [];

  console.log("Wasm_dbg_char result",result);
}

var dbg_string = "";
const __wbg_star0 = {
    abort: () => {
      console.error("abort in wasm!");
      throw new Error("Unsupported wasm api: abort");
    },
    require: (b) => {
      if (!b) {
        console.error("require failed");
        throw new Error("Require failed");
      }
    },
    wasm_dbg: (c) => {
      console.log("wasm_dbg", c);
    },
      /**
     * - Convert the number to a character
     * - Check if the character is a newline
     * - Print the accumulated result when encountering a newline
     * - Append the character to the print buffer
     */
    wasm_dbg_char: (data) =>
    String.fromCharCode(Number(data)) === "\n"
      ? print_result()
      : _print_buf.push(Number(data)),

    wasm_input: () => {
      console.error("wasm_input should not been called in non-zkwasm mode");
      throw new Error("Unsupported wasm api: wasm_input");
    },
    wasm_output: () => {
      console.error("wasm_input should not been called in non-zkwasm mode");
      throw new Error("Unsupported wasm api: wasm_input");
    },
    merkle_address,
    merkle_setroot,
    merkle_getroot,
    merkle_set,
    merkle_get,
    poseidon_new,
    poseidon_push,
    poseidon_finalize,
    cache_set_mode,
    cache_store_data,
    cache_set_hash,
    cache_fetch_data,
    babyjubjub_sum_new: () => {
      console.error("baby_jubjub_sum_new");
      throw new Error("Unsupported wasm api: wasm_input");
    },
    babyjubjub_sum_push: () => {
      console.error("baby_jubjub_sum_new");
      throw new Error("Unsupported wasm api: wasm_input");
    },
    babyjubjub_sum_finalize: () => {
      console.error("baby_jubjub_sum_new");
      throw new Error("Unsupported wasm api: wasm_input");
    },
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports['env'] = __wbg_star0;

    return imports;
}

function __wbg_init_memory(imports, maybe_memory) {

}

let wasm = null;
let cachedBigUint64Memory0 = null;
let cachedInt32Memory0 = null;
let cachedUint8Memory0 = null;

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedBigUint64Memory0 = null;
    cachedInt32Memory0 = null;
    cachedUint8Memory0 = null;


    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(input) {
    if (wasm !== null) return wasm;

    if (typeof input === 'undefined') {
        input = new URL('gameplay_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    __wbg_init_memory(imports);

    const { instance, module } = await __wbg_load(await input, imports);

    let w = __wbg_finalize_init(instance, module);
    __wbg_set_wasm(w);
    return wasm
}

export { initSync }
export default __wbg_init;
export * from "./gameplay_bg.js";
