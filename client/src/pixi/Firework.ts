import * as PIXI from 'pixi.js';
import { times } from 'remeda';
import {
  FireworkSpec,
  Vector,
} from '@/types/pixi';
import {
  getVelToHitTarget,
  randomInRange,
} from '@/utils/math';
import { Particle } from './Particle';

export class Firework extends PIXI.Container {
  private projectile: Particle;
  private sparks: Particle[] = [];

  private explodeAtVelocityY: number;
  private hasExploded: boolean = false;
  private spec: FireworkSpec;

  constructor(
    x: number,
    y: number,
    spec: FireworkSpec,
  ) {
    super();
    this.spec = spec;
    this.x = x;
    this.y = y;

    this.explodeAtVelocityY = randomInRange(this.spec.projectile.explodeAtVelocityY);

    this.projectile = this.getProjectile();
    this.launchProjectile(spec.target);
  }

  getProjectile = () => {
    const {
      radius,
      color,
    } = this.spec.projectile;

    const projectile = new Particle();
    projectile.circle(0, 0, randomInRange(radius));
    projectile.fill({ color });
    this.addChild(projectile);
    return projectile;
  };

  getSpark = () => {
    const {
      radius,
      color,
    } = this.spec.spark;

    const spark = new Particle();
    spark.circle(0, 0, randomInRange(radius));
    spark.fill({ color });

    spark.x = this.projectile.x;
    spark.y = this.projectile.y;

    this.addChild(spark);
    return spark;
  };

  launchProjectile = (target: Vector) => {
    const vel = getVelToHitTarget(this.x, this.y, target);
    this.projectile.velocity.x = vel.x;
    this.projectile.velocity.y = vel.y;
  };

  explode = () => {
    this.hasExploded = true;

    const {
      sparkCountRange,
      maxMagnitudeRange,
      upwardMagnitudeRange,
    } = this.spec.explosion;

    const sparksCount = randomInRange(sparkCountRange);
    const maxExplosionMagnitude = randomInRange(maxMagnitudeRange);
    const upwardMagnitude = randomInRange(upwardMagnitudeRange);

    times(sparksCount, () => {
      const spark = this.getSpark();

      const angle = Math.random() * 2 * Math.PI;
      const magnitude = Math.random() * maxExplosionMagnitude;

      spark.velocity.x = magnitude * Math.cos(angle);
      spark.velocity.y = (magnitude * Math.sin(angle)) - upwardMagnitude;

      // Add half of the X velocity of the projectile
      spark.velocity.x += this.projectile.velocity.x / 2;

      this.sparks.push(spark);
    });

    this.projectile.dispose();
  };

  update = (elapsedMs: number) => {
    if (!this.hasExploded) {
      this.projectile.applyPhysics();
      if (this.projectile.velocity.y > this.explodeAtVelocityY) {
        this.explode();
      }
    }

    this.sparks = this.sparks.reduce<Particle[]>((nextSparks, spark) => {
      if (spark.isOffScreen()) {
        spark.dispose();
        return nextSparks;
      }
      spark.applyPhysics();
      return [...nextSparks, spark];
    }, []);
  };
}