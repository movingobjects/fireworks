import * as PIXI from 'pixi.js';
import { times } from 'remeda';
import { FireworkSpec } from '@/types/pixi';
import { getRandomInRange } from '@/utils/math';
import { Projectile } from './Projectile';
import { Spark } from './Spark';

export class Firework extends PIXI.Container {
  private projectile?: Projectile;
  private sparks: Spark[] = [];

  private hasExploded: boolean = false;
  private spec: FireworkSpec;

  constructor(
    x: number,
    y: number,
    spec: FireworkSpec,
  ) {
    super();
    this.spec = spec;

    this.projectile = new Projectile(x, y, spec.projectile);
    this.addChild(this.projectile);
  }

  explode = () => {
    if (!this.projectile) return;

    const {
      sparkCountRange,
      sparkMassRange,
      sparkRadiusRange,
      maxMagnitudeRange,
      upwardMagnitudeRange,
    } = this.spec.explosion;

    const sparksCount = getRandomInRange(sparkCountRange);

    times(sparksCount, () => {
      const spark = new Spark(
        this.projectile!,
        {
          color: 'white',
          radius: getRandomInRange(sparkRadiusRange),
          mass: getRandomInRange(sparkMassRange),
          explosionMagnitude: getRandomInRange(maxMagnitudeRange),
          upwardMagnitude: getRandomInRange(upwardMagnitudeRange),
        },
      );
      this.addChild(spark);
      this.sparks.push(spark);
    });

    this.projectile.dispose();
    delete this.projectile;
  };

  update = (elapsedMs: number) => {
    if (this.projectile) {
      this.projectile.applyPhysics();
      if (this.projectile.isAtArcPeak()) {
        this.explode();
      }
    }

    // Loops through all sparks, disposing those off screen
    // and applying physics to the remaining
    this.sparks = this.sparks.reduce<Spark[]>((nextSparks, spark) => {
      if (spark.canBeDisposed()) {
        spark.dispose();
        return nextSparks;
      }
      spark.applyPhysics();
      return [...nextSparks, spark];
    }, []);
  };
}