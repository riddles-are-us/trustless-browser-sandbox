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
  name: string;
  src: HTMLImageElement;
  top: number;
  left: number;
  vx: number;
  vy: number;
  boundry: ClipRect;
  clips: Map<string, Array<ClipRect>>;
  currentFrame: number | null;
  currentClip: string | null;
  ratio: number;
  focus: boolean;
  target: [number, number] | null;
  constructor(src: HTMLImageElement, boundry: ClipRect, ratio: number) {
    this.name = "NPC";
    this.src = src;
    this.boundry = boundry;
    this.vx = 0;
    this.vy = 0;
    this.top = 0;
    this.left = 0;
    this.currentFrame = null;
    this.currentClip = null;
    this.clips = new Map<string, Array<ClipRect>>();
    this.ratio = ratio;
    this.focus = false;
    this.target = null;
  }

  getBottom() {
    if (this.currentClip != null && this.currentFrame != null) {
      const rect = this.clips.get(this.currentClip)![this.currentFrame];
      return this.top + (rect.bottom - rect.top);
    }
    else {
      return 0;
    }
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
      ctx.drawImage(this.src, rect.left, rect.top, w, h, this.left, this.top, w * this.ratio, w * this.ratio);

      if (this.focus == false) {
        ctx.fillStyle = "black";  // Red color
      } else {
        ctx.fillStyle = "orange";  // Red color
      }
      ctx.fillRect(this.left+30, this.top - 13, 40, 15);
      ctx.fillStyle = "white";  // Red color
      ctx.font = "12px Arial";
      ctx.fillText(this.name, this.left+35, this.top); // text, x, y
      /*
      ctx.fillText(this.currentClip, this.left+10, this.top); // text, x, y
      ctx.fillText(this.currentFrame.toString(), this.left + 10, this.top+30); // text, x, y
      */
    }
  }


  incFrame() {
    if (this.currentFrame!=null && this.currentClip!=null) {
      const len = this.clips.get(this.currentClip)!.length;
      this.currentFrame = (this.currentFrame + 1) % len;
      this.top = this.vy + this.top;
      this.left = this.vx + this.left;
      if (this.target == null) {
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

  drawLight(ratioArray: Array<Beat>, ctx: CanvasRenderingContext2D) {
    // 900 width
    ctx.fillStyle = 'hsl(60, 100%, 90%, 30%)';
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

export class FixedLight {
  top: number;
  left: number;
  constructor(top: number, left: number) {
    this.top = top;
    this.left = left;
  }
  incFrame() {
    return;
  }

  drawLight(ratioArray: Array<Beat>, ctx: CanvasRenderingContext2D) {
    // 900 width
    let max = 0;
    let maxWeight = 0;
    for (let i=0; i<ratioArray.length; i++) {
      if(ratioArray[i].weight > maxWeight) {
        maxWeight = ratioArray[i].weight;
        max = i;
      }
    }
    //maxWeight = Math.floor(100 + maxWeight/4);
    maxWeight = Math.floor(100 + max * 3.5);
    const gradient = ctx.createLinearGradient(200, 0, 250, 250);
    const vue = `${(ratioArray[10].weight * 100 + 200)/1200}%`;
    const start = `hsl(${maxWeight}, 100%, ${vue})`;
    const end = `hsl(${maxWeight}, 100%, ${vue}, 0%)`;
    gradient.addColorStop(0, start);
    gradient.addColorStop(1, end);
    ctx.fillStyle = gradient;
    ctx.globalCompositeOperation = "screen";
    //ctx.fillStyle = 'hsl(20%, 100%, 15%)'; // Use 50% gray to desaturate
    //ctx.globalCompositeOperation = "saturation";
    //
    ctx.beginPath();
    ctx.moveTo(170, 75);
    ctx.lineTo(260, 300);
    ctx.lineTo(550, 210);
    ctx.lineTo(250, 8);
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
  channel: number;
  toggle: number;
  on: boolean;

  constructor(top: number, left: number, start: number, end: number, init:number, speed: number, channel: number) {
    this.top = top;
    this.left = left;
    this.startAngle = start;
    this.endAngle = end;
    this.currentAngle = init;
    this.speed = speed;
    this.direction = speed;
    this.channel = channel;
    this.toggle = 2;
    this.on = true;
  }
  incFrame() {
    if (this.currentAngle > this.endAngle) {
      this.direction = -this.speed;
    } else if (this.currentAngle < this.startAngle) {
      this.direction = this.speed;
    }
    this.currentAngle = this.currentAngle + this.direction;
  }
  drawLight(ratioArray: Array<Beat>, ctx: CanvasRenderingContext2D) {
    // 900 width
    //ctx.fillStyle = 'hsl(20%, 100%, 75%)'; // Use 50% gray to desaturate
    if (this.on) {
      const r = ratioHigh(ratioArray);
      //ctx.fillStyle = `hsl(${400*(r-1)}, 100%, 10%)`;
      const vue = `${(ratioArray[this.channel].weight * 100 + 200)/1200}%`;
      //ctx.fillStyle = `hsl(${this.channel * 10}, ${vue}, 10%)`;
      ctx.globalCompositeOperation = "screen";

      const left = this.left - 400  * Math.cos(Math.PI * this.currentAngle / 180);
      const gradient = ctx.createLinearGradient(this.left, this.top, left, 400);

      gradient.addColorStop(0, `hsl(${this.channel * 10}, 100%, ${vue})`);   // 顶点的颜色
      gradient.addColorStop(1, `hsl(${this.channel * 10}, 100%, ${vue}, 0%)`);
      ctx.fillStyle = gradient;

      ctx.beginPath();
      const deltaAngle = 12 * Math.sign(this.direction);
      //const right = this.left - 400  * Math.cos(Math.PI * ((this.currentAngle + deltaAngle) / 180));
      //const left = this.left;
      const right = left + 50;
      ctx.beginPath();
      ctx.moveTo(this.left, this.top);
      ctx.lineTo(left, 350 + this.channel*10);
      ctx.lineTo(right, 350 + this.channel*10);
      ctx.closePath();
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
    }
    if (this.toggle == 0) {
      this.toggle = 2;
      this.on = !this.on;
    }
    this.toggle --;
  }
}

export interface Beat {
  ratio: number;
  weight: number;
}


export function getBeat(analyser: AnalyserInfo): Array<Beat> {
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
    ratioArray.push({ratio: ratio, weight: weight/width});
  }
  return ratioArray;
}

function ratioHigh(ratioArray: Array<Beat>) {
  const cIndexH = 11;
  const ratioH = 1 + ((ratioArray[cIndexH].ratio - 1) / 40);
  return ratioH;
}

function ratioLow(ratioArray: Array<Beat>) {
  const cIndexL = 3;
  const ratioL = 1 + ((ratioArray[cIndexL].ratio - 1) / 40);
  return ratioL;

}

function averageBeat(ratioArray: Array<Beat>) {
  let total = 0;
  for(const b of ratioArray) {
    total += b.weight;
  }
  return Math.floor(total/ratioArray.length);
}

function maxRatio(ratioArray: Array<Beat>) {
  let max = 1;
  for(const b of ratioArray) {
    if(b.ratio > max) {
      max = b.ratio;
    }
  }
  return max;
}

let freeze = 0;
export function drawHorn(ratioArray: Array<Beat>, ctx: CanvasRenderingContext2D) {
  // 900 width
  const top = 80;
  const left = 60;
  const ratio = maxRatio(ratioArray);
  const avg = averageBeat(ratioArray);
  /*
  ctx.fillStyle = "blue";  // gray color
  ctx.fillRect(left, top, 80* ratioL, 100*ratioL);
  ctx.fillRect(600, top, 80* ratioH, 100*ratioH);
  */

  const x = 0;
  const y = 33;

  const rH = ratioHigh(ratioArray) + Math.random()/40;
  const rL = ratioLow(ratioArray) + Math.random()/40;

  /*
  if (hornRatio > 1.1) {
    hornRatio = 1.1;
  }
  if (hornRatio < 0.9) {
    hornRatio = 0.9;
  }
  */

  ctx.drawImage(spirites.horn, 0, 0, 177, 210, x, y, 88*rH, 105*rH);
  ctx.drawImage(spirites.horn, 0, 0, 177, 210, x, y+110, 88*rL, 105*rL);
  const ele = document.getElementById("stage");
  const height = window.document.body.offsetHeight - 100;
  const r = Math.floor(height/5.4)/100;
  const transform = `translate(50%, -50%) scale(${r})`;

  if (freeze==0 && (ratio > 1.08 && avg > 130)) {
    ele!.style.transition = 'transform 0.1s ease';
    ele!.style.transform = "translate(50%, -50%)" + " " + `scale(${r + 0.02})` + " " + "rotate(0.25deg)";
    ele!.style.transition = 'transform 0.1s ease';
    ele!.style.transform = "translate(50%, -50%)" + " " + `scale(${r + 0.02})` + " " + "rotate(-0.25deg)";
    freeze = 10;
  } else {
    ele!.style.transform = transform;
  }

  if (freeze >0) {
    freeze --;
  }
  return ratioArray;
}

export function drawScreen(ratioArray: Array<Beat>, ctx: CanvasRenderingContext2D) {
  ctx.drawImage(spirites.screenImage, 0, 0, WIDTH, HEIGHT);
}

export function drawBackground(ratioArray: Array<Beat>, ctx: CanvasRenderingContext2D) {
  ctx.drawImage(spirites.backgroundImage, 0, 0, WIDTH, HEIGHT);
}

export function drawProgress(progress: number, ctx: CanvasRenderingContext2D) {
  const ratio = 0.5;
  const width = 740 * progress * ratio;
  ctx.fillStyle = "#90D5FF";  // gray color
  ctx.fillRect(204, 34, 740 * ratio, 14);
  ctx.fillStyle = "orange";  // gray color
  ctx.fillRect(204, 34, width, 14);
  ctx.drawImage(spirites.progressBar, 200, 30, 753 * ratio, 45 * ratio);
  ctx.drawImage(spirites.giftbox, 200 + width - 10, 20, 90*ratio, 90 * ratio);
}

export class Audience {
  toggle: number;
  light: number;
  constructor() {
    this.toggle = 300;
    this.light = 0;
  }
  drawBeat(ratioArray: Array<Beat>, ctx: CanvasRenderingContext2D) {
    // 900 width
    ctx.fillStyle = "#000";  // gray color
    const avg = averageBeat(ratioArray);
    this.toggle = this.toggle - avg;
    if (this.toggle < 0) {
      this.light = 1 - this.light;
      this.toggle = 500;
    }
    ctx.drawImage(spirites.audience[this.light], 0, 0, WIDTH, HEIGHT);
    return ratioArray;
  }
}
