import * as PIXI from 'pixi.js';
import { ProjectileSpec } from '@/types/fireworks';
import { Vector } from '@/types/math';
import {
  getRandomInRange,
  getVelToHitTarget,
} from '@/utils/math';
import { Particle } from './Particle';

export class Projectile extends Particle {
  explodeAtVelocityY: number;
  graphic: PIXI.Graphics;

  constructor(
    x: number,
    y: number,
    spec: ProjectileSpec,
  ) {
    super();

    const {
      radiusRange,
      color,
      explodeAtVelocityYRange,
      target,
    } = spec;

    // Init properties
    this.x = x;
    this.y = y;
    this.explodeAtVelocityY = getRandomInRange(explodeAtVelocityYRange);

    // Draw
    this.graphic = new PIXI.Graphics();
    this.graphic.circle(0, 0, getRandomInRange(radiusRange));
    this.graphic.fill({ color });
    this.addChild(this.graphic);

    // Launch!
    this.launchAt(target);
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