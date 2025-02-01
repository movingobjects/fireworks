import { SparkSpec } from '@/types/pixi';
import {
  getRandomRadianAngle,
  getVectorFromPolar,
} from '@/utils/math';
import { FireworksView } from './FireworksView';
import { Particle } from './Particle';
import { Projectile } from './Projectile';

export class Spark extends Particle {
  constructor(
    projectile: Projectile,
    spec: SparkSpec,
  ) {
    super();

    const {
      radius,
      color,
      mass,
      explosionMagnitude,
      upwardMagnitude,
    } = spec;

    this.circle(0, 0, radius);
    this.fill({ color });

    this.x = projectile.x;
    this.y = projectile.y;
    this.mass = mass;

    const explosionVelocity = this.getExplosionVelocity(explosionMagnitude);

    this.velocity.x = (projectile.velocity.x / 2) + explosionVelocity.x;
    this.velocity.y = (projectile.velocity.y / 2) + explosionVelocity.y - upwardMagnitude;
  }

  getExplosionVelocity = (magnitude: number) => (
    getVectorFromPolar(getRandomRadianAngle(), magnitude)
  );

  canBeDisposed = () => (
    this.x < 0 ||
    this.x > FireworksView.width() ||
    this.y > FireworksView.height()
  );
}