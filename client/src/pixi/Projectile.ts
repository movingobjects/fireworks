import {
  ProjectileSpec,
  Vector,
} from '@/types/pixi';
import {
  getRandomInRange,
  getVelToHitTarget,
} from '@/utils/math';
import { Particle } from './Particle';

export class Projectile extends Particle {
  private explodeAtVelocityY: number;

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

    this.circle(0, 0, getRandomInRange(radiusRange));
    this.fill({ color });

    this.x = x;
    this.y = y;

    this.explodeAtVelocityY = getRandomInRange(explodeAtVelocityYRange);

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