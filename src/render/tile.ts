const tileRadius = 40;
const tileHeight = 34;

function hexagon(x: number, y: number, color: string, context: CanvasRenderingContext2D) {
        context.beginPath();
        var r = tileRadius;
        var xd = tileRadius/2;
        var yd = tileHeight;
        context.fillStyle = color;
        context.lineTo(x - xd, y - yd);
        context.lineTo(x + xd, y - yd);
        context.lineTo(x + r, y);
        context.lineTo(x + xd, y + yd);
        context.lineTo(x - xd, y + yd);
        context.lineTo(x - r, y);
        context.lineTo(x - xd, y - yd);
        context.fill();
}

function direction(x: number, y: number, direction: string, color: string, context: CanvasRenderingContext2D) {
        context.beginPath();
        var r = tileRadius;
        var xd = tileRadius/2;
        var yd = tileHeight;
        context.fillStyle = color;
        context.lineTo(x - xd, y - yd);
        context.lineTo(x + xd, y - yd);
        context.lineTo(x + r, y);
        context.lineTo(x + xd, y + yd);
        context.lineTo(x - xd, y + yd);
        context.lineTo(x - r, y);
        context.lineTo(x - xd, y - yd);
        context.fill();

}

function toX(xcor: number, ycor: number): number {
        return (ycor % 2)*((tileRadius*3)/2) + tileRadius + xcor *(tileRadius * 3);
}

function toY(xcor: number, ycor: number): number {
        return tileHeight + tileHeight*ycor;
}

export function drawTiles(tiles: any) {
        console.log("drawing Tiles");
        let c = document.getElementById("canvas")! as HTMLCanvasElement;
        let context = c.getContext("2d")!;
        context.clearRect(0, 0, c.width, c.height);
        for (var i = 0; i<8; i++) {
            for (var j = 0; j<7; j++) {
              hexagon((j % 2)*((tileRadius*3)/2) + tileRadius + i *(tileRadius * 3), tileHeight + tileHeight*j, "gray", context)
              if (tiles[j * 8 + i].feature != null) {
                direction((j % 2)*((tileRadius*3)/2) + tileRadius + i *(tileRadius * 3), tileHeight + tileHeight*j, tiles[j*8 + i].feature, "green", context)
              }
            }
        }
}

function drawObject(xcor:number, ycor:number, context: CanvasRenderingContext2D) {
        let x = toX(xcor, ycor);
        let y = toY(xcor, ycor);
        context.fillStyle = "orange";
        context.beginPath();
        context.arc(x, y, 15, 0, 2 * Math.PI);
        context.fill();
}

export function drawObjects(attrs: Array<number>) {
        console.log("drawing Objects");
        let c = document.getElementById("canvas")! as HTMLCanvasElement;
        let context = c.getContext("2d")!;
        drawObject(attrs[0], attrs[1], context);
}

