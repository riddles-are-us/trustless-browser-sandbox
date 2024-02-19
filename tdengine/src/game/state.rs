use zkwasm_rust_sdk::wasm_dbg;

use crate::tile::coordinate::Tile;
use crate::tile::map::Map;
use crate::tile::coordinate::HexCoordinate;
use crate::tile::coordinate::HexDirection;
use crate::tile::coordinate::Coordinate;
use crate::tile::map::PositionedObject;
use super::object::Collector;
use super::object::Monster;
use super::object::Object;
use super::object::Spawner;
use super::object::Tower;

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
    let tower = Tower::new(5, 1);
    let spawner = Spawner::new(4, 4);
    let collector = Collector::new(5);
    let global = unsafe {&mut GLOBAL};
    for _ in 0..56 {
        global.map.tiles.push(
            Tile::new(HexCoordinate::new(0,0), None),
        )
    };

    global.map.set_feature(0, Some(HexDirection::BottomRight));
    global.map.set_feature(8, Some(HexDirection::BottomRight));
    global.map.set_feature(17, Some(HexDirection::BottomRight));
    global.map.set_feature(25, Some(HexDirection::TopRight));
    global.map.set_feature(18, Some(HexDirection::BottomRight));
    global.map.set_feature(26, Some(HexDirection::TopRight));
    global.map.set_feature(19, Some(HexDirection::BottomRight));
    global.map.set_feature(27, Some(HexDirection::TopRight));
    global.map.set_feature(20, Some(HexDirection::BottomRight));

    global.map.spawn_at(Object::Monster(monster), HexCoordinate::new(0,0));
    global.map.spawn_at(Object::Spawner(spawner), HexCoordinate::new(0,0));
    global.map.spawn_at(Object::Tower(tower.clone()), HexCoordinate::new(3,4));
    global.map.spawn_at(Object::Tower(tower), HexCoordinate::new(1,4));
    global.map.spawn_at(Object::Collector(collector), HexCoordinate::new(4,3));
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
    let mut collector = vec![];
    for obj in objs.iter() {
        if let Object::Collector(_) = obj.object.clone() {
            collector.push(obj.position.clone())
        }
    }
    let mut termination = vec![];
    let mut spawn = vec![];
    for (index, obj) in objs.iter_mut().enumerate() {
        if let Object::Monster(_) = obj.object {
            if collector.contains(&obj.position) {
                termination.push(index);
            } else {
                let index = map.index_of_tile_coordinate(&obj.position);
                let feature = map.get_feature(index);
                if let Some(f) = feature {
                    obj.position = obj.position.adjacent(f)
                }
            }
        }
        else if let Object::Spawner(spawner) = &mut obj.object {
            if spawner.count == 0 {
                spawn.push(PositionedObject::new(Object::Monster(Monster::new(10, 1, 1)), obj.position.clone()));
                spawner.count = spawner.rate
            } else {
                spawner.count -= 1
            }
        }
    }
    termination.reverse();
    for idx in termination {
        global.map.remove(idx);
    }

    for obj in spawn.into_iter() {
        global.map.spawn(obj);
    }
}
