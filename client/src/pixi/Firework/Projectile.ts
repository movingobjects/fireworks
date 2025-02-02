import * as PIXI from 'pixi.js';
import { Vector } from '@/types/math';
import { getVelToHitTarget } from '@/utils/math';
import { Particle } from '../Particle';

type ProjectileProps = {
  radius: number;
  color: string;
  explodeAtVelocityY: number;
};

export class Projectile extends Particle {
  explodeAtVelocityY: number;
  graphic: PIXI.Graphics;

  constructor({
    radius,
    color,
    explodeAtVelocityY,
  }: ProjectileProps) {
    super();

    // Init properties
    this.explodeAtVelocityY = explodeAtVelocityY;

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
      target,
    );
    this.velocity.x = velocity.x;
    this.velocity.y = velocity.y;
  };

  isAtArcPeak = () => (
    this.velocity.y > this.explodeAtVelocityY
  );
}