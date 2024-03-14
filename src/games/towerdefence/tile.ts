const tileWidth = 60;
const tileHeight = 60;
const width = 12;
const height = 8;

function rect(x: number, y: number, color: string, context: CanvasRenderingContext2D) {
        context.beginPath();
        const xd = tileWidth/2;
        const yd = tileHeight/2;
        context.fillStyle = color;
        context.lineTo(x - xd, y - yd);
        context.lineTo(x + xd, y - yd);
        context.lineTo(x + xd, y + yd);
        context.lineTo(x - xd, y + yd);
        context.stroke();
}


function direction(x: number, y: number, direction: string, color: string, context: CanvasRenderingContext2D) {
        context.beginPath();
        const xd = tileWidth/2;
        const yd = tileHeight/2;
        context.fillStyle = color;
        context.lineTo(x - xd + 1, y - yd + 1);
        context.lineTo(x + xd - 1, y - yd + 1);
        context.lineTo(x + xd - 1, y + yd - 1);
        context.lineTo(x - xd + 1, y + yd - 1);
        context.fill();
        context.fillStyle = "white";
        context.fillText(direction, x-10, y);

}

function toX(xcor: number, ycor: number): number {
        return tileWidth * xcor + tileWidth/2;
}

function toY(xcor: number, ycor: number): number {
        return tileHeight/2 + tileHeight*ycor;
}

export function drawTiles(tiles: any) {
        console.log("drawing Tiles");
        const c = document.getElementById("canvas")! as HTMLCanvasElement;
        const context = c.getContext("2d")!;
        context.clearRect(0, 0, c.width, c.height);
        for (let i = 0; i<width; i++) {
            for (let j = 0; j<height; j++) {
              rect(toX(i, j), toY(i, j), "gray", context)
              if (tiles[j * width + i].feature != null) {
                direction(toX(i, j), toY(i, j), tiles[j * width + i].feature, "gray", context)
              }
            }
        }
}

function drawObject(obj:any, context: CanvasRenderingContext2D) {
        const x = toX(obj.position.x, obj.position.y);
        const y = toY(obj.position.x, obj.position.y);
        context.beginPath();
        switch (Object.keys(obj.object)[0]) {
          case "Monster": {
            context.fillStyle = "orange";
            context.arc(x, y, 15, 0, 2 * Math.PI);
            context.fill();
            context.fillStyle = "white";
            context.fillText(obj.object.Monster.hp, x, y-10);
            break;
          }
          case "Dropped": {
            context.fillStyle = "blue";
            context.arc(x, y, 13, 0, 2 * Math.PI);
            context.fill();
            context.fillStyle = "white";
            context.fillText(obj.object.Dropped.delta, x, y-10);
            break;
          }
          case "Tower": {
            context.fillStyle = "black";
            context.arc(x, y, 15, 0, 2 * Math.PI);
            context.fill();
            context.fillStyle = "white";
            context.fillText(obj.object.Tower.count, x, y-10);
            break;
          }
          case "Spawner": {
            context.fillStyle = "white";
            context.arc(x, y, 10, 0, 2 * Math.PI);
            context.fill();
            break;
          }
          case "Collector": {
            context.fillStyle = "green";
            context.arc(x, y, 10, 0, 2 * Math.PI);
            context.fill();
            break;
          }
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

