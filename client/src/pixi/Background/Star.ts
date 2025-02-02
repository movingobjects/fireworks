import * as PIXI from 'pixi.js';

export class Star extends PIXI.Container {
  distance: number;

  constructor(distance: number) {
    super();

    this.distance = distance;

    this.draw();
  }

  draw = () => {
    const graphic = new PIXI.Graphics();
    graphic.circle(0, 0, Math.random() + 1);
    graphic.fill({ color: 0xffffff });
    graphic.alpha = this.distance * 0.35;
    this.addChild(graphic);
  };
}