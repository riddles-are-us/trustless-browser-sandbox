import {
  ClipRect, Clip,
  HEIGHT, WIDTH,
}  from "./draw";

import spirits from "./spirite";


function getRandomNumber(range: number): number {
    return Math.floor(Math.random() * range);
}

class Scenario {
  status: string;
  clips: Array<Clip>;
  constructor() {
    this.status = "pause";
    this.clips = [];
  }

  draw() {
    const c = document.getElementById("canvas")! as HTMLCanvasElement;
    //c.width = window.innerWidth;
    //c.height = window.innerHeight;
    c.width = WIDTH;
    c.height = HEIGHT;
    const context = c.getContext("2d")!;
    context.clearRect(0, 0, c.width, c.height);
    for (const obj of this.clips) {
        obj.draw(context);
    }
  }

  step() {
    for (let i=0; i<this.clips.length; i++) {
      const obj = this.clips[i];
      obj.incFrame();
    }
  }
}



export const scenario = new Scenario();
