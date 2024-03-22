let wasm;
export function __wbg_set_wasm(val) {
    wasm = val;
}

/**
* Step function receives a encoded command and changes the global state accordingly
* @param {bigint} command
*/
export function step(command) {
    wasm.step(command);
}

/**
* @returns {boolean}
*/
export function get_state() {
    const ret = wasm.get_state();
    return ret !== 0;
}

/**
* @param {bigint} seed
*/
export function init(seed) {
    wasm.init(seed);
}

/**
* @returns {bigint}
*/
export function zkmain() {
    const ret = wasm.zkmain();
    return ret;
}

