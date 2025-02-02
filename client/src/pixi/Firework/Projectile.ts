import * as PIXI from 'pixi.js';
import { getVelToHitTarget } from '@/utils/math';
import { Particle } from '../Particle';
import { PixiView } from '../PixiView';

export class Projectile extends Particle {
  graphic: PIXI.Graphics;

  constructor() {
    super();

    // Draw
    this.graphic = new PIXI.Graphics();
    this.graphic.circle(0, 0, 2);
    this.graphic.fill({ color: 0xffffff });
    this.graphic.alpha = 0.75;
    this.addChild(this.graphic);
  }

  launchAt = (targetX: number, targetY: number) => {
    const velocity = getVelToHitTarget(
      this.x,
      this.y,
      targetX * PixiView.width(),
      targetY * PixiView.height(),
    );
    this.velocity.x = velocity.x;
    this.velocity.y = velocity.y;
  };

  isAtArcPeak = () => (
    this.velocity.y > 0
  );
}