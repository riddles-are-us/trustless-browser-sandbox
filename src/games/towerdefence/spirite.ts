import TowerImage from "./images/tower.png";
import CaveImage1 from "./images/cave01.png";

const towerImage = new Image();
towerImage.src = TowerImage;

const caveImage = new Image();
caveImage.src = CaveImage1;

const towerSpirites = [towerImage];
const caveSpirites = [caveImage];

export default {
  towerSpirites: towerSpirites,
  caveSpirites: caveSpirites
}
