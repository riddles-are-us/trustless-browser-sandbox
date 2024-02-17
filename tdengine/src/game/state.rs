use zkwasm_rust_sdk::wasm_dbg;

use crate::tile::coordinate::Tile;
use crate::tile::map::Map;
use crate::tile::coordinate::HexCoordinate;
use crate::tile::coordinate::HexDirection;
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
    for _ in 0..56 {
        global.map.tiles.push(
            Tile::new(HexCoordinate::new(0,0), None),
        )
    };

    global.map.set_feature(0, Some(HexDirection::BottomRight));
    global.map.set_feature(8, Some(HexDirection::BottomRight));
    global.map.set_feature(17, Some(HexDirection::BottomRight));

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

pub fn handle_run() {
    let global = unsafe {&mut GLOBAL};
    let map = unsafe { &GLOBAL.map };
    let objs = &mut global.map.objects;
    for obj in objs.iter_mut() {
      let index = map.index_of_tile_coordinate(&obj.position);
      let feature = map.get_feature(index);
      if let Some(f) = feature {
          obj.position = obj.position.adjacent(f)
      }
    }
}
