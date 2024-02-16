use super::coordinate::Coordinate;
pub struct PositionedObject<C:Coordinate, Object: Clone> {
    pub position: C,
    pub object: Object,
}

impl<C: Coordinate, O: Clone> PositionedObject<C, O> {
    fn new(obj: O, pos: C) -> Self {
        PositionedObject {
            object: obj,
            position: pos
        }
    }
}

pub struct Map<C:Coordinate, O: Clone> {
    pub width: usize,
    pub height: usize,
    pub tiles: Vec<C>,
    pub objects: Vec<PositionedObject<C, O>>,
}

impl<C:Coordinate, O: Clone> Map<C, O> {
    pub fn new(width: usize, height: usize, tiles: Vec<C>, objects: Vec<PositionedObject<C, O>>) -> Self {
        Map {
            width,
            height,
            tiles,
            objects,
        }

    }
    pub fn spawn(&mut self, object: O, position: C) -> &PositionedObject<C, O> {
        self.objects.push(PositionedObject::new(object, position));
        self.objects.get(self.objects.len()-1).unwrap()
    }
    pub fn remove(&mut self, index: usize) -> PositionedObject<C, O> {
        self.objects.swap_remove(index)
    }
    pub fn coordinate_of_tile_index(&self, index: usize) -> C{
        C::new((index % self.width) as i64, (index / self.height) as i64)
    }
    pub fn get_neighbours(
        &mut self,
        pos: &PositionedObject<C, O>,
        distance: u64,
        filter: impl Fn (&PositionedObject<C, O>) -> bool
        )
        -> Vec<&PositionedObject<C, O>> {
            let mut r = vec![];
            for obj in self.objects.iter() {
                if C::distance(&obj.position, &pos.position) < distance {
                    if filter(obj) {
                        r.push(obj)
                    }
                }
            }
            r
    }
}
