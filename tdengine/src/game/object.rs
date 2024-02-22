use serde::Serialize;

#[derive (Clone, Serialize)]
pub struct Monster {
    pub hp: u64,
    pub range: u64,
    pub power: u64,
}

impl Monster {
    pub fn new(hp: u64, range: u64, power: u64) -> Self {
        Monster {
            hp,
            range,
            power
        }
    }
}

#[derive (Clone, Serialize)]
pub struct Tower{
    range: u64,
    power: u64,
}

impl Tower {
    pub fn new(range: u64, power: u64) -> Self {
        Tower {
            range,
            power
        }
    }
}

#[derive (Clone, Serialize)]
pub struct Spawner{
    pub rate: u64,
    pub count: u64
}

impl Spawner {
    pub fn new(rate: u64, count: u64) -> Self {
        Spawner {
            rate,
            count
        }
    }
}

#[derive (Clone, Serialize)]
pub struct Collector{
    buf: u64,
}

impl Collector {
    pub fn new(buf: u64) -> Self {
        Collector {
           buf
        }
    }
}



#[derive (Clone, Serialize)]
pub enum Object {
    Monster(Monster),
    Tower(Tower),
    Spawner(Spawner),
    Collector(Collector),
}





