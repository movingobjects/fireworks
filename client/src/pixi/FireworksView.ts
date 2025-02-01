import * as PIXI from 'pixi.js';

export class FireworksView extends PIXI.Container {
  constructor() {
    super();

    this.onFrame();
  }

  onFrame = (elapsedMs: number = 0) => {
    requestAnimationFrame(this.onFrame);
  };
}