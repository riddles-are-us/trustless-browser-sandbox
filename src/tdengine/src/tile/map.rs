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
    pub tiles: Vec<C>,
    pub objects: Vec<PositionedObject<C, O>>,
}

impl<C:Coordinate, O: Clone> Map<C, O> {
    pub fn new(tiles: Vec<C>, objects: Vec<PositionedObject<C, O>>) -> Self {
        Map {
            tiles,
            objects,
        }

    }
    pub fn spawn(&mut self, object: O, position: C) -> &PositionedObject<C, O> {
        self.objects.push(PositionedObject::new(object, position));
        self.objects.get(self.objects.len()).unwrap()
    }
    pub fn remove(&mut self, index: usize) -> PositionedObject<C, O> {
        self.objects.swap_remove(index)
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
