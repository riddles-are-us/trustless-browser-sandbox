import Spirites from "./spirite";
import {AnalyserInfo} from "./audio";
import spirites from "./spirite";

export const HEIGHT = 540;
export const WIDTH = 960;

export class ClipRect {
  top: number;
  left: number;
  right: number;
  bottom: number;
  constructor(top: number, left: number, right: number, bottom: number) {
    this.top = top;
    this.left = left;
    this.right = right;
    this.right = right;
    this.bottom = bottom;
  }
}

export class Clip {
  src: HTMLImageElement;
  top: number;
  left: number;
  vx: number;
  vy: number;
  boundry: ClipRect;
  clips: Map<string, Array<ClipRect>>;
  currentFrame: number | null;
  currentClip: string | null;
  constructor(src: HTMLImageElement, boundry: ClipRect) {
    this.src = src;
    this.boundry = boundry;
    this.vx = 0;
    this.vy = 0;
    this.top = 0;
    this.left = 0;
    this.currentFrame = null;
    this.currentClip = null;
    this.clips = new Map<string, Array<ClipRect>>();
  }
  setSpeed(vx: number, vy: number) {
    this.vx = vx;
    this.vy = vy;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.currentClip != null && this.currentFrame != null) {
      //Set the fill color
      const rect = this.clips.get(this.currentClip)![this.currentFrame];
      const w = rect.right-rect.left;
      const h = rect.bottom - rect.top;
      ctx.drawImage(this.src, rect.left, rect.top, w, h, this.left, this.top, 90, 120);
      ctx.fillStyle = "#000000";  // Red color
      ctx.font = "12px Arial";
      ctx.fillText(this.currentClip, this.left+10, this.top); // text, x, y
      ctx.fillText(this.currentFrame.toString(), this.left + 10, this.top+30); // text, x, y
    }
  }


  incFrame() {
    if (this.currentFrame!=null && this.currentClip!=null) {
      const len = this.clips.get(this.currentClip)!.length;
      this.currentFrame = (this.currentFrame + 1) % len;
      this.top = this.vy + this.top;
      this.left = this.vx + this.left;
      if (this.top < this.boundry.top) {
        this.top = this.boundry.top;
      }
      if (this.top > this.boundry.bottom) {
        this.top = this.boundry.bottom;
      }
      if (this.left < this.boundry.left) {
        this.left = this.boundry.left;
      }
      if (this.left > this.boundry.right) {
        this.left = this.boundry.right;
      }
    }
  }
}

export class Torch {
  top: number;
  left: number;
  vx: number;
  vy: number;
  speed: number;
  constructor(top: number, left: number, vx: number, vy: number, speed: number) {
    this.top = top;
    this.left = left;
    this.vx = vx;
    this.vy = vy;
    this.speed = speed;
  }
  incFrame() {
    if (this.top < 50) {
      this.vy = Math.abs(this.vy);
    } else if (this.top > HEIGHT - 100) {
      this.vy = -Math.abs(this.vy);
    }
    if (this.left < 50) {
      this.vx = Math.abs(this.vx);
    } else if (this.left > WIDTH - 100) {
      this.vx = -Math.abs(this.vx);
    }
    this.top += this.vy;
    this.left += this.vx;
  }

  drawLight(ratioArray: Array<number>, ctx: CanvasRenderingContext2D) {
    // 900 width
    ctx.fillStyle = 'hsl(60, 100%, 20%)';
    ctx.globalCompositeOperation = "screen";
    //ctx.fillStyle = 'hsl(20%, 100%, 15%)'; // Use 50% gray to desaturate
    //ctx.globalCompositeOperation = "saturation";
    ctx.beginPath();
    ctx.arc(this.left, this.top, 70, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
  }

}

export class Light {
  top: number;
  left: number;
  startAngle: number;
  endAngle: number;
  currentAngle: number;
  direction: number;
  speed: number;
  constructor(top: number, left: number, start: number, end: number, init:number, speed: number) {
    this.top = top;
    this.left = left;
    this.startAngle = start;
    this.endAngle = end;
    this.currentAngle = init;
    this.speed = speed;
    this.direction = speed;
  }
  incFrame() {
    if (this.currentAngle > this.endAngle) {
      this.direction = -this.speed;
    } else if (this.currentAngle < this.startAngle) {
      this.direction = this.speed;
    }
    this.currentAngle = this.currentAngle + this.direction;
  }
  drawLight(ratioArray: Array<number>, ctx: CanvasRenderingContext2D) {
    // 900 width
    //ctx.fillStyle = 'hsl(20%, 100%, 75%)'; // Use 50% gray to desaturate
    ctx.fillStyle = 'hsl(120, 100%, 10%)';
    ctx.globalCompositeOperation = "screen";

    ctx.beginPath();
    const left = this.left - 400  * Math.cos(Math.PI * this.currentAngle / 180);
    const deltaAngle = 12 * Math.sign(this.direction);
    //const right = this.left - 400  * Math.cos(Math.PI * ((this.currentAngle + deltaAngle) / 180));
    //const left = this.left;
    const right = left + 50;
    ctx.beginPath();
    ctx.moveTo(this.left, this.top);
    ctx.lineTo(left, 400);
    ctx.lineTo(right, 400);
    ctx.closePath();
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
  }
}


export function getBeat(analyser: AnalyserInfo): Array<number> {
  const numPoints = analyser.numPoints;
  const audioDataArray = analyser.audioDataArray;
  analyser.analyser.getByteFrequencyData(audioDataArray);
  const channels = 16;
  const width = numPoints / channels;
  const ratioArray = [];
  for (let x = 0; x < channels; x += 1) {
    let weight = 0;
    for (let c = x * width; c < x * width + width; c++) {
      if (!isNaN(audioDataArray[c])) {
        weight += audioDataArray[c];
      }
    }
    let ratio = weight / (1 + analyser.avgDataArray[x]); // avoid zero
    if (ratio > 1.5) {
      ratio = 1.5;
    } else if (ratio < 0.8) {
      ratio = 0.8;
    }
    analyser.avgDataArray[x] = (analyser.avgDataArray[x] * 5 +  weight)/6;
    ratioArray.push(ratio);
  }
  return ratioArray;
}

export function drawHorn(ratioArray: Array<number>, ctx: CanvasRenderingContext2D) {
  // 900 width
  const top = 30;
  const left = 60;
  const channels = ratioArray.length;
  const cIndexH = 11;
  const cIndexL = 3;
  const ratioH = 1 + ((ratioArray[cIndexH] - 1) / 3);
  const ratioL = 1 + ((ratioArray[cIndexL] - 1) / 3);
  ctx.fillStyle = "blue";  // gray color
  ctx.fillRect(left, top, 80* ratioL, 100*ratioL);
  ctx.fillRect(600, top, 80* ratioH, 100*ratioH);
  return ratioArray;
}

export function drawBackground(ratioArray: Array<number>, ctx: CanvasRenderingContext2D) {
  ctx.drawImage(spirites.backgroundImage, 0, 0, WIDTH, HEIGHT);
}


export function drawBeat(ratioArray: Array<number>, ctx: CanvasRenderingContext2D) {
  // 900 width
  const top = HEIGHT;
  const channels = ratioArray.length;
  const width = WIDTH/channels;
  ctx.fillStyle = "#000";  // gray color
  for(let w=0; w<channels; w++) {
    const height = (ratioArray[w] - 1) * 100 + 100;
    ctx.fillRect(w * width, top - height, width, height);
  }
  return ratioArray;
}
