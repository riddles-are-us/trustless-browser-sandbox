export function loadImage(src: string) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

export async function loadAllImages() {
  const droneImage = "./images/drone.gif";
  const droneUpImage = "./images/drone_up.gif";
  const droneLeftImage = "./images/drone_left.gif";
  const droneRightImage = "./images/drone_right.gif";
  const monsterImage = "./images/monster.png";
  const spawnImage = "./images/spawn.png";
  const endImage = "./images/end.png";
  const tileUp = "./images/tile_up.png";
  const tileDown = "./images/tile_down.png";
  const tileRight = "./images/tile_right.png";
  const tileLeft = "./images/tile_left.png";
  const stage = "./images/stage.png";
  try {
    // Load all necessary images
    const images = await Promise.all([
      loadImage(droneImage),
      loadImage(droneUpImage),
      loadImage(droneLeftImage),
      loadImage(droneRightImage),
      loadImage(monsterImage),
      loadImage(spawnImage),
      loadImage(endImage),
      loadImage(tileDown),
      loadImage(tileLeft),
      loadImage(tileUp),
      loadImage(tileRight),
      loadImage(stage),
    ]);
    return images;
  } catch (error) {
    console.error("Error loading images:", error);
  }
}
