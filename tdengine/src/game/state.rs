use zkwasm_rust_sdk::wasm_dbg;

use crate::tile::map::Map;
use crate::tile::coordinate::HexCoordinate;
use crate::tile::coordinate::Coordinate;
use super::object::Monster;
use super::object::Object;

// The global state
pub struct State {
    pub map: Map<HexCoordinate, Object>,

}

pub static mut GLOBAL: State = State {
    map: Map {
        width: 8,
        height: 7,
        tiles: vec![],
        objects: vec![]
    }
};

pub fn init_state() {
    let monster = Monster::new(10, 5, 1);
    let global = unsafe {&mut GLOBAL};
    global.map.spawn(Object::Monster(monster.clone()), HexCoordinate::new(0,0));
    global.map.spawn(Object::Monster(monster), HexCoordinate::new(4,3));
}

pub fn handle_move(obj_index: usize, pos: usize) {
    let global = unsafe {&mut GLOBAL};
    let position = global.map.coordinate_of_tile_index(pos);
    let mut obj = global.map.objects.get_mut(obj_index).unwrap();
    obj.position = position;
    unsafe {
        wasm_dbg(obj.position.repr().0 as u64);
        wasm_dbg(obj.position.repr().1 as u64);
    }
}
