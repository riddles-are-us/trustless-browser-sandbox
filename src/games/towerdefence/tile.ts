import droneImage from "./images/drone.gif";
import droneUpImage from "./images/drone_up.gif";
import droneLeftImage from "./images/drone_left.gif";
import droneRightImage from "./images/drone_right.gif";
import monsterImage from "./images/monster.png";
import spawnImage from "./images/spawn.png";
import endImage from "./images/end.png";
import tileDown from "./images/tile_down.png";
import tileUp from "./images/tile_up.png";
import tileLeft from "./images/tile_left.png";
import tileRight from "./images/tile_right.png";
import stage from "./images/stage.png";

const imageCache: any = {
  drone: droneImage,
  droneUp: droneUpImage,
  droneLeft: droneLeftImage,
  droneRight: droneRightImage,
  monster: monsterImage,
  spawn: spawnImage,
  end: endImage,
  tileDown: tileDown,
  tileUp: tileUp,
  tileLeft: tileLeft,
  tileRight: tileRight,
  stage: stage,
};

const tileWidth = 60;
const tileHeight = 60;
const width = 12;
const height = 8;
function rect(
  x: number,
  y: number,
  color: string,
  context: CanvasRenderingContext2D
) {
  context.beginPath();
  const xd = tileWidth / 2;
  const yd = tileHeight / 2;
  /*
        context.fillStyle = color;
        context.lineTo(x - xd, y - yd);
        context.lineTo(x + xd, y - yd);
        context.lineTo(x + xd, y + yd);
        context.lineTo(x - xd, y + yd);
        context.stroke();
        */
}

function direction(
  x: number,
  y: number,
  direction: string,
  context: CanvasRenderingContext2D
) {
  if (direction == "Top") {
    const negateX = 150 - tileWidth - 67;
    const negateY = 150 - tileHeight - 62;
    const newX = x - negateX;
    const newY = y - negateY;
    loadAndDrawImage(tileUp, newX, newY, context, 45, 55);
  } else if (direction == "Right") {
    const negateX = 150 - tileWidth - 67;
    const negateY = 150 - tileHeight - 70;
    const newX = x - negateX;
    const newY = y - negateY;
    loadAndDrawImage(tileRight, newX, newY, context, 55, 45);
  } else if (direction == "Bottom") {
    const negateX = 150 - tileWidth - 67;
    const negateY = 150 - tileHeight - 70;
    const newX = x - negateX;
    const newY = y - negateY;
    loadAndDrawImage(tileDown, newX, newY, context, 45, 55);
  } else {
    const negateX = 150 - tileWidth - 60;
    const negateY = 150 - tileHeight - 70;
    const newX = x - negateX;
    const newY = y - negateY;
    loadAndDrawImage(tileLeft, newX, newY, context, 55, 45);
  }
}

function toX(xcor: number, ycor: number): number {
  return tileWidth * xcor + tileWidth / 2;
}

function toY(xcor: number, ycor: number): number {
  return tileHeight / 2 + tileHeight * ycor;
}

export function drawTiles(tiles: any) {
  console.log("drawing Tiles");
  const c = document.getElementById("canvas")! as HTMLCanvasElement;
  const context = c.getContext("2d")!;
  loadAndDrawImage(stage, 0, 0, context, c.width, c.height);
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      rect(toX(i, j), toY(i, j), "gray", context);
      if (tiles[j * width + i].feature != null) {
        direction(toX(i, j), toY(i, j), tiles[j * width + i].feature, context);
      }
    }
  }
}

function drawObject(obj: any, context: CanvasRenderingContext2D) {
  const x = toX(obj.position.x, obj.position.y);
  const y = toY(obj.position.x, obj.position.y);
  switch (Object.keys(obj.object)[0]) {
    case "Monster": {
      const negateX = 150 - tileWidth - 75;
      const negateY = 150 - tileHeight - 75;
      const newX = x - negateX;
      const newY = y - negateY;
      loadAndDrawImage(monsterImage, newX, newY, context, 30, 30);
      break;
    }
    case "Dropped": {
      context.fillStyle = "blue";
      context.arc(x, y, 13, 0, 2 * Math.PI);
      context.fill();
      context.fillStyle = "white";
      context.fillText(obj.object.Dropped.delta, x, y - 10);
      break;
    }
    case "Tower": {
      const negateX = 150 - tileWidth - 15;
      const negateY = 150 - tileHeight - 18;
      const newX = x - negateX;
      const newY = y - negateY;
      if (obj.object.Tower.direction == "Top") {
        loadAndDrawImage(droneUpImage, newX, newY, context, 150, 150);
      } else if (obj.object.Tower.direction == "Left") {
        loadAndDrawImage(droneLeftImage, newX, newY, context, 150, 150);
      } else if (obj.object.Tower.direction == "Right") {
        loadAndDrawImage(droneRightImage, newX, newY, context, 150, 150);
      } else {
        loadAndDrawImage(droneImage, newX, newY, context, 150, 150);
      }
      break;
    }
    case "Spawner": {
      const negateX = 150 - tileWidth - 67;
      const negateY = 150 - tileHeight - 65;
      const newX = x - negateX;
      const newY = y - negateY;
      loadAndDrawImage(spawnImage, newX, newY, context, 45, 45);
      break;
    }
    case "Collector": {
      const negateX = 150 - tileWidth - 67;
      const negateY = 150 - tileHeight - 65;
      const newX = x - negateX;
      const newY = y - negateY;
      loadAndDrawImage(endImage, newX, newY, context, 45, 45);
      break;
    }
  }
}

function loadAndDrawImage(
  src: string,
  x: number,
  y: number,
  context: any,
  sizeX: number,
  sizeY: number
) {
  if (!imageCache[src]) {
    // Image not in cache, load and cache it
    const image = new Image();
    image.src = src;
    image.onload = () => {
      context.drawImage(image, x, y, sizeX, sizeY);
      imageCache[src] = image; // Cache the loaded image
    };
    image.onerror = () => {
      console.log("Error loading the image", src);
    };
  } else {
    // Image is in cache, use it directly
    context.drawImage(imageCache[src], x, y, sizeX, sizeY);
  }
}

export function drawObjects(objs: Array<any>) {
  console.log("drawing Objects");
  const c = document.getElementById("canvas")! as HTMLCanvasElement;
  const context = c.getContext("2d")!;

  for (const obj of objs) {
    drawObject(obj, context);
  }
}
