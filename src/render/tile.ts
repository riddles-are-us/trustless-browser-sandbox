const tileRadius = 40;
const tileHeight = 34;

function hexagon(x: number, y: number, r:number, color: string, context: CanvasRenderingContext2D) {
        context.beginPath();
        var xd = tileRadius/2;
        var yd = tileHeight;
        context.lineTo(x - xd, y - yd);
        context.lineTo(x + xd, y - yd);
        context.lineTo(x + r, y);
        context.lineTo(x + xd, y + yd);
        context.lineTo(x - xd, y + yd);
        context.lineTo(x - r, y);
        context.lineTo(x - xd, y - yd);
        context.stroke();
}

function toX(xcor: number, ycor: number): number {
        return (ycor % 2)*((tileRadius*3)/2) + tileRadius + xcor *(tileRadius * 3);
}

function toY(xcor: number, ycor: number): number {
        return tileHeight + tileHeight*ycor;
}

export function drawTiles() {
        console.log("drawing Tiles");
        let c = document.getElementById("canvas")! as HTMLCanvasElement;
        let context = c.getContext("2d")!;
        for (var i = 0; i<6; i++) {
            for (var j = 0; j<7; j++) {
                hexagon((j % 2)*((tileRadius*3)/2) + tileRadius + i *(tileRadius * 3), tileHeight + tileHeight*j, tileRadius, "gray", context)
            }
        }
}

function drawObject(xcor:number, ycor:number, context: CanvasRenderingContext2D) {
        let x = toX(xcor, ycor);
        let y = toY(xcor, ycor);
        context.beginPath();
        context.arc(x, y, 10, 0, 2 * Math.PI);
        context.stroke();
}

export function drawObjects(attrs: Array<number>) {
        console.log("drawing Objects");
        let c = document.getElementById("canvas")! as HTMLCanvasElement;
        let context = c.getContext("2d")!;
        drawObject(attrs[0], attrs[1], context);
}

