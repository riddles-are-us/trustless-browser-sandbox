use wasm_bindgen::prelude::*;
// This is a standalone game state manipulate module that connets with UI
// controllers and model handlers


// The global state
struct State {
    location: u64,
    targets: [u64; 3],
    regenerate: u64,
    civil: u64,
    energy: u64,
    food: u64,
    reward: u64,
}


#[wasm_bindgen]
pub fn clip() -> Vec<u64> {
    vec![1,2,3,4]
}
