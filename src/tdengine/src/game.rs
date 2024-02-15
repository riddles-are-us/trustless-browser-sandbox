use zkwasm_rust_sdk::wasm_dbg;
use zkwasm_rust_sdk::require;
use zkwasm_rust_sdk::merkle::Merkle;
use sha2::{Sha256, Digest};
use wasm_bindgen::prelude::*;

use crate::tile::coordinate::Coordinate;

use self::state::GLOBAL;

pub mod object;
pub mod state;

// This is a standalone game state manipulate module that connets with UI
// controllers and model handlers

static mut MERKLE: Merkle = Merkle { root: [0; 4] };

const CMD_TRANSPORT: u64 = 0;
const CMD_RECHARGE: u64 = 1;
const CMD_DIG: u64 = 2;

/// Step function receives a encoded command and changes the global state accordingly
#[wasm_bindgen]
pub fn step(command: u64) {
    unsafe {
        wasm_dbg(command);
    };
    let commands = command.to_le_bytes();
}

// load the game with user account
#[wasm_bindgen]
pub fn load(account: u64, r0: u64, r1:u64, r2:u64, r3:u64) {
    unsafe {
        MERKLE.root = [r0, r1, r2, r3];
    }
}


#[wasm_bindgen]
pub fn init(seed: u64) {
    //zkwasm_rust_sdk::dbg!("finish loading {:?}", merkle_root);
}


#[wasm_bindgen]
pub fn get_objects() -> String {
    //zkwasm_rust_sdk::dbg!("finish loading {:?}", merkle_root);
    let global = unsafe {&GLOBAL};
    let mut coordinates = vec![];
    for obj in global.map.objects.iter() {
        let (x,y) = obj.position.repr();
        coordinates.push(vec![x,y]);
    }
    "abc".to_string()
    //serde_json::to_string(&coordinates).unwrap()
}

#[wasm_bindgen]
pub fn get_num() -> u64 {
    123
}

#[wasm_bindgen]
pub fn get_string() -> String {
   "ac".to_string()
}





