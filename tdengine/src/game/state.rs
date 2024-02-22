use zkwasm_rust_sdk::wasm_dbg;

use crate::tile::coordinate::Tile;
use crate::tile::map::Map;
use crate::tile::coordinate::RectCoordinate;
use crate::tile::coordinate::RectDirection;
use crate::tile::coordinate::Coordinate;
use crate::tile::map::PositionedObject;
use super::object::Collector;
use super::object::Monster;
use super::object::Object;
use super::object::Spawner;
use super::object::Tower;

// The global state
pub struct State {
    pub map: Map<RectCoordinate, Object>,

}

pub static mut GLOBAL: State = State {
    map: Map {
        width: 12,
        height: 8,
        tiles: vec![],
        objects: vec![]
    }
};

fn cor_to_index(x:usize, y:usize) -> usize {
    x + y*12
}

pub fn init_state() {
    let monster = Monster::new(10, 5, 1);
    let tower = Tower::new(5, 1);
    let spawner = Spawner::new(4, 4);
    let collector = Collector::new(5);
    let global = unsafe {&mut GLOBAL};
    for _ in 0..96 {
        global.map.tiles.push(
            Tile::new(RectCoordinate::new(0,0), None),
        )
    };

    global.map.set_feature(cor_to_index(0,0), Some(RectDirection::Bottom));
    global.map.set_feature(cor_to_index(0,1), Some(RectDirection::Right));
    global.map.set_feature(cor_to_index(1,1), Some(RectDirection::Right));
    global.map.set_feature(cor_to_index(2,1), Some(RectDirection::Bottom));
    global.map.set_feature(cor_to_index(2,2), Some(RectDirection::Bottom));
    global.map.set_feature(cor_to_index(2,3), Some(RectDirection::Right));
    global.map.set_feature(cor_to_index(3,3), Some(RectDirection::Right));
    global.map.set_feature(cor_to_index(4,3), Some(RectDirection::Bottom));

    global.map.spawn_at(Object::Monster(monster), RectCoordinate::new(0,0));
    global.map.spawn_at(Object::Spawner(spawner), RectCoordinate::new(0,0));
    global.map.spawn_at(Object::Tower(tower.clone()), RectCoordinate::new(3,4));
    global.map.spawn_at(Object::Tower(tower), RectCoordinate::new(1,4));
    global.map.spawn_at(Object::Collector(collector), RectCoordinate::new(4,4));
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
        if let Object::Monster(m) = &mut obj.object {
            let x = obj.position.repr().0;
            if x == 1 || x ==3 {
                if m.hp < 2 {
                    m.hp = 0;
                    termination.push(index);
                } else {
                    m.hp -= 2;
                }
            }

            if collector.contains(&obj.position) {
                termination.push(index);
            } else {
                let index = map.index_of_tile_coordinate(&obj.position);
                let feature = map.get_feature(index);
                if let Some(f) = feature {
                    unsafe {wasm_dbg(f.clone() as u64)};
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
