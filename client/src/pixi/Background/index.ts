import * as PIXI from 'pixi.js';
import { times } from 'remeda';
import { COLOR_TWILIGHT } from '@/constants';
import { PixiView } from '../PixiView';
import { Star } from './Star';

export class Background extends PIXI.Container {
  static STAR_COUNT: number = 500;

  gradient: PIXI.Graphics = new PIXI.Graphics();
  stars: Star[];

  constructor() {
    super();

    this.drawGradient();
    this.stars = this.drawStars();

    // TODO:
    // - debounce for performance
    // - fix stars to work with resizing window
    window.addEventListener('resize', () => {
      this.gradient.width = PixiView.width();
      this.gradient.height = PixiView.height();
    });
  }

  drawGradient = () => {
    const viewW = PixiView.width();
    const viewH = PixiView.height();

    const fill = new PIXI.FillGradient(0, 0, 0, viewH)
      .addColorStop(0, 0x000000)
      .addColorStop(1, COLOR_TWILIGHT);

    this.gradient = new PIXI.Graphics()
      .rect(0, 0, viewW, viewH)
      .fill(fill);

    this.addChild(this.gradient);
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