use zkwasm_rust_sdk::wasm_dbg;
use zkwasm_rust_sdk::require;
use zkwasm_rust_sdk::merkle::Merkle;
use sha2::{Sha256, Digest};
use wasm_bindgen::prelude::*;

// This is a standalone game state manipulate module that connets with UI
// controllers and model handlers

static mut GLOBAL_STATE: bool = false;

/// Step function receives a encoded command and changes the global state accordingly
#[wasm_bindgen]
pub fn step(command: u64) {
    let commands = command.to_le_bytes();
    unsafe {
        wasm_dbg(commands[0] as u64);
    };
    if commands[0] == 11 {
        unsafe { GLOBAL_STATE = true }
    } else {
        unsafe { GLOBAL_STATE = false}
    }
}

#[wasm_bindgen]
pub fn get_state() -> bool {
    unsafe { GLOBAL_STATE }
}



#[wasm_bindgen]
pub fn init(seed: u64) {
    //zkwasm_rust_sdk::dbg!("finish loading {:?}", merkle_root);
}

