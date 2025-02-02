import * as PIXI from 'pixi.js';
import { times } from 'remeda';
import { PixiView } from '../PixiView';
import { Star } from './Star';

export class Background extends PIXI.Container {
  static STAR_COUNT: number = 500;

  gradient: PIXI.Graphics;
  stars: Star[];

  constructor() {
    super();

    this.gradient = this.drawGradient();
    this.stars = this.drawStars();
  }

  drawGradient = () => {
    const fill = new PIXI.FillGradient(0, 0, 0, PixiView.height());
    fill.addColorStop(0, 0x000000);
    fill.addColorStop(1, 0x220033);

    const gradient = new PIXI.Graphics()
      .rect(0, 0, PixiView.width(), PixiView.height())
      .fill(fill);

    this.addChild(gradient);
    return gradient;
  };

  drawStars = () => (
    times(Background.STAR_COUNT, () => {
      const distance = Math.random();
      const star = new Star(distance);

      star.x = Math.random() * PixiView.width();
      star.y = Math.random() * PixiView.height();

      this.addChild(star);
      return star;
    })
  );

  update = () => {
    const viewW = PixiView.width();

    this.stars.forEach((star) => {
      star.x -= star.distance * 0.5;

      if (star.x < 0) {
        star.x += viewW;
      }
    });
  };
}