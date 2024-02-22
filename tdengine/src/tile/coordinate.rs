use serde::Serialize;
pub trait Coordinate: Sized + PartialEq {
    type Direction: Clone;
    fn adjacents(&self) -> Vec<Self>;
    fn directions() -> Vec<Self::Direction>;
    fn adjacent(&self, direction: Self::Direction) -> Self;
    fn distance(p1: &Self, p2: &Self) -> u64;
    fn repr(&self) -> (i64, i64);
    fn new(x: i64, y: i64) -> Self;
}

#[derive (Clone, Serialize)]
pub enum HexDirection {
    TopLeft,
    TopRight,
    Right,
    BottomRight,
    BottomLeft,
    Left,
}

#[derive (Clone, Serialize, PartialEq)]
pub struct HexCoordinate {
    x: i64,
    y: i64,
}

impl Coordinate for HexCoordinate {
    type Direction = HexDirection;

    fn new(x: i64, y: i64) -> Self {
        HexCoordinate {
            x,
            y,
        }
    }
    fn repr(&self) -> (i64, i64) {
        (self.x, self.y)
    }
    fn distance(p1: &Self, p2: &Self) -> u64 {
        let diff_y = (p1.y - p2.y).abs() as u64;
        let x1 = p1.x * 2 + p1.y % 2;
        let x2 = p2.x * 2 + p2.y % 2;
        let diff_x = (x1 - x2).abs() as u64;
        // there are only two cases
        // \
        //  \
        //   \
        //    \ ------ figure out the range of y when x become the same
        if diff_x > diff_y {
            diff_x as u64
        } else {
            let extra = diff_y - diff_x;
            let extra_move = (extra % 2) + (extra/2);
            diff_x + extra_move
        }
    }
    fn adjacents(&self) -> Vec<Self> {
        vec![
            self.adjacent(Self::Direction::TopLeft),
            self.adjacent(Self::Direction::TopRight),
            self.adjacent(Self::Direction::Right),
            self.adjacent(Self::Direction::BottomRight),
            self.adjacent(Self::Direction::BottomLeft),
            self.adjacent(Self::Direction::Left),
        ]
    }
    fn directions() -> Vec<Self::Direction> {
        vec![
            Self::Direction::TopLeft,
            Self::Direction::TopRight,
            Self::Direction::Right,
            Self::Direction::BottomRight,
            Self::Direction::BottomLeft,
            Self::Direction::Left,
        ]
    }
    fn adjacent(&self, direction: Self::Direction) -> Self {
        use HexDirection::*;
        let y = match direction {
            TopLeft => {
                self.y - 1
            },
            TopRight => {
                self.y - 1
            },
            Left => {
                self.y
            },
            Right => {
                self.y
            },
            BottomRight => {
                self.y + 1
            },
            BottomLeft => {
                self.y + 1
            },
        };
        let left_start = y % 2;  // for y=0,1,2, ... start with 0 else start with 1
        let x = match direction {
            TopLeft => {
                self.x - left_start
            },
            TopRight => {
                self.x + 1 - left_start
            },
            Left => {
                self.x - 1
            },
            Right => {
                self.x + 1
            },
            BottomRight => {
                self.x + 1 - left_start
            },
            BottomLeft => {
                self.x - left_start
            },
        };

        Self::new(x, y)
    }
}


#[derive (Clone, Serialize)]
pub enum RectDirection {
    Top,
    Right,
    Bottom,
    Left,
}

#[derive (Clone, Serialize, PartialEq)]
pub struct RectCoordinate {
    x: i64,
    y: i64,
}

impl Coordinate for RectCoordinate {
    type Direction = RectDirection;

    fn new(x: i64, y: i64) -> Self {
        RectCoordinate {
            x,
            y,
        }
    }
    fn repr(&self) -> (i64, i64) {
        (self.x, self.y)
    }
    fn distance(p1: &Self, p2: &Self) -> u64 {
        let diff_y = (p1.y - p2.y).abs() as u64;
        let diff_x = (p1.x - p2.x).abs() as u64;
        diff_y + diff_x
    }
    fn adjacents(&self) -> Vec<Self> {
        vec![
            self.adjacent(Self::Direction::Top),
            self.adjacent(Self::Direction::Right),
            self.adjacent(Self::Direction::Bottom),
            self.adjacent(Self::Direction::Left),
        ]
    }
    fn directions() -> Vec<Self::Direction> {
        vec![
            Self::Direction::Top,
            Self::Direction::Right,
            Self::Direction::Bottom,
            Self::Direction::Left,
        ]
    }
    fn adjacent(&self, direction: Self::Direction) -> Self {
        use RectDirection::*;
        let y = match direction {
            Top=> {
                self.y - 1
            },
            Right => {
                self.y
            },
            Left => {
                self.y
            },
            Bottom => {
                self.y + 1
            },
        };
        let x = match direction {
            Top => {
                self.x
            },
            Left => {
                self.x - 1
            },
            Right => {
                self.x + 1
            },
            Bottom=> {
                self.x
            },
        };

        Self::new(x, y)
    }
}


#[derive (Serialize)]
pub struct Tile<C: Coordinate, F: Clone> {
    cor: C,
    pub feature: F,
}

impl<C: Coordinate, F: Clone> Tile<C, F> {
    pub fn new(c: C, f: F) -> Self {
        Tile {
            cor: c,
            feature: f
        }
    }
    pub fn set_feature(&mut self, f: F) {
        self.feature = f
    }
}



#[cfg(test)]
mod tests {
    use super::HexCoordinate;
    use super::Coordinate;

    #[test]
    fn test_distance() {
        let p1 = HexCoordinate::new(0,0);
        let p2 = HexCoordinate::new(1,2);
        let p3 = HexCoordinate::new(1,3);
        let p4 = HexCoordinate::new(0,3);
        let p5 = HexCoordinate::new(2,3);
        let dis12 = HexCoordinate::distance(&p1, &p2);
        let dis13 = HexCoordinate::distance(&p1, &p3);
        let dis14 = HexCoordinate::distance(&p1, &p4);
        let dis15 = HexCoordinate::distance(&p1, &p5);
        assert_eq!(dis12, 2);
        assert_eq!(dis13, 3);
        assert_eq!(dis14, 2);
        assert_eq!(dis15, 5);
    }
}


