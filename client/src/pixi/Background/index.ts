import { getDefaultStore } from 'jotai';
import * as PIXI from 'pixi.js';
import { times } from 'remeda';
import * as atoms from '@/atoms';
import { BackgroundSpec } from '@/types/fireworks';
import { mixColors } from '@/utils/color';
import { lerp } from '@/utils/math';
import { PixiView } from '../PixiView';
import { Star } from './Star';

export class Background extends PIXI.Container {
  static STAR_COUNT: number = 500;

  atomStore: any;
  wrapStars: PIXI.Container = new PIXI.Container();
  glow: PIXI.Graphics = new PIXI.Graphics();
  stars: Star[] = [];

  enableStars: boolean = false;

  constructor() {
    super();

    this.atomStore = getDefaultStore();

    this.drawGlow();
    this.drawStars();

    // TODO: debounce for performance
    window.addEventListener('resize', () => {
      this.glow.width = PixiView.width();
      this.glow.height = PixiView.height();
    });
  }

  drawGlow = () => {
    const viewW = PixiView.width();
    const viewH = PixiView.height();

    const fill = new PIXI.FillGradient(0, 0, 0, viewH)
      .addColorStop(0, 0x666666)
      .addColorStop(1, 0xffffff);

    this.glow = new PIXI.Graphics()
      .rect(0, 0, viewW, viewH)
      .fill(fill);

    this.glow.tint = 0x000000;

    this.addChild(this.glow);
  };

  drawStars = () => {
    this.wrapStars.alpha = 0;
    this.addChild(this.wrapStars);

    this.stars = times(Background.STAR_COUNT, () => {
      const distance = Math.random();
      const star = new Star(distance);

      star.x = Math.random() * PixiView.width();
      star.y = Math.random() * PixiView.height();

      this.wrapStars.addChild(star);
      return star;
    });
  };

  update = () => {
    const {
      enableStars,
      glowColor,
    } = this.atomStore.get(atoms.activeBackground) as BackgroundSpec;

    this.glow.tint = mixColors(
      this.glow.tint,
      glowColor,
      0.05,
    );

    // Fade stars based on whether they're enabled or not
    this.wrapStars.alpha = lerp(
      this.wrapStars.alpha,
      enableStars ? 1 : 0,
      0.05,
    );

    // Only parallax scroll stars if they're visible
    if (this.wrapStars.alpha >= 0.01) {
      const viewW = PixiView.width();

      this.stars.forEach((star) => {
        star.x -= star.distance * 0.5;

        if (star.x < 0) {
          star.x += viewW;
        }
      });
    }
  };
}