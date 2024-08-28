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


