import * as PIXI from 'pixi.js';
import { Vector } from '@/types/math';
import { getVelToHitTarget } from '@/utils/math';
import { Particle } from '../Particle';
import { PixiView } from '../PixiView';

type ProjectileProps = {
  radius: number;
  color: number;
};

export class Projectile extends Particle {
  graphic: PIXI.Graphics;

  constructor({
    radius,
    color,
  }: ProjectileProps) {
    super();

    // Draw
    this.graphic = new PIXI.Graphics();
    this.graphic.circle(0, 0, radius);
    this.graphic.fill({ color });
    this.addChild(this.graphic);
  }

  launchAt = (target: Vector) => {
    const velocity = getVelToHitTarget(
      this.x,
      this.y,
      {
        x: target.x * PixiView.width(),
        y: target.y * PixiView.height(),
      },
    );
    this.velocity.x = velocity.x;
    this.velocity.y = velocity.y;
  };

  isAtArcPeak = () => (
    this.velocity.y > 0
  );
}