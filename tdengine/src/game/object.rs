#[derive (Clone)]
pub struct Monster {
    hp: u64,
    range: u64,
    power: u64,
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

#[derive (Clone)]
pub struct Tower{
    range: u64,
    power: u64,
}

impl Tower {
    pub fn new(hp: u64, range: u64, power: u64) -> Self {
        Tower {
            range,
            power
        }
    }
}

#[derive (Clone)]
pub enum Object {
    Monster(Monster),
    Tower(Tower),
}





