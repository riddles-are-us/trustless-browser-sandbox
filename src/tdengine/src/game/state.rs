use crate::tile::map::Map;
use crate::tile::coordinate::HexCoordinate;
use super::object::Monster;
use super::object::Object;

// The global state
pub struct State {
    pub map: Map<HexCoordinate, Object>,

}

pub static mut GLOBAL: State = State {
    map: Map {
        tiles: vec![],
        objects: vec![]
    }
};

fn init_state() {
    let monster = Monster::new(10, 5, 1);
    let global = unsafe {&mut GLOBAL};
    global.map.spawn(Object::Monster(monster), HexCoordinate::new(0,0));
}
