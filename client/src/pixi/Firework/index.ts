import * as PIXI from 'pixi.js';
import { times } from 'remeda';
import {
  TARGET_X_RANGE,
  TARGET_Y_RANGE,
} from '@/config/constants';
import {
  FireworkSpec,
  NumberOptions,
  StringOptions,
} from '@/types/fireworks';
import {
  collapseNum,
  collapseString,
  shallowCollapseNum,
  shallowCollapseString,
} from '@/utils/collapse';
import { fromHsv } from '@/utils/color';
import { Projectile } from './Projectile';
import { Spark } from './Spark';

export class Firework extends PIXI.Container {
  projectile?: Projectile;
  sparks: Spark[] = [];
  spec: FireworkSpec;

  sparkCount: number;
  hueOpts: NumberOptions;
  saturationOpts: NumberOptions;
  sparkRadiusOpts: NumberOptions;
  explosionMagnitudeOpts: NumberOptions;
  sparkTextureOpts: StringOptions;
  sparkFadeDelayOpts: NumberOptions;
  sparkFadeDurationOpts: NumberOptions;
  sparkMassOpts: NumberOptions;

  constructor(
    x: number,
    y: number,
    spec: FireworkSpec,
  ) {
    super();
    this.spec = spec;

    this.sparkCount = collapseNum(spec.sparkCountOpts);
    this.hueOpts = shallowCollapseNum(spec.hueOpts);
    this.saturationOpts = shallowCollapseNum(spec.saturationOpts);
    this.sparkRadiusOpts = shallowCollapseNum(spec.sparkRadiusOpts);
    this.explosionMagnitudeOpts = shallowCollapseNum(spec.explosionMagnitudeOpts);
    this.sparkTextureOpts = shallowCollapseString(spec.sparkTextureOpts);
    this.sparkFadeDelayOpts = shallowCollapseNum(spec.sparkFadeDelayOpts);
    this.sparkFadeDurationOpts = shallowCollapseNum(spec.sparkFadeDurationOpts);
    this.sparkMassOpts = shallowCollapseNum(spec.sparkMassOpts);

    this.drawProjectile(x, y);
  }

  drawProjectile = (x: number, y: number) => {
    this.projectile = new Projectile();

    this.projectile.x = x;
    this.projectile.y = y;
    this.projectile.launchAt(
      collapseNum(TARGET_X_RANGE),
      collapseNum(TARGET_Y_RANGE),
    );

    this.addChild(this.projectile);
  };

  explode = () => {
    if (!this.projectile) return;

    this.drawSparks();

    this.projectile.dispose();
    delete this.projectile;
  };

  drawSparks = () => {
    times(this.sparkCount, () => {
      const spark = new Spark({
        projectile: this.projectile!,
        texture: collapseString(this.sparkTextureOpts),
        color: fromHsv(
          collapseNum(this.hueOpts),
          collapseNum(this.saturationOpts),
        ),
        radius: collapseNum(this.sparkRadiusOpts),
        mass: collapseNum(this.sparkMassOpts),
        fadeDelay: collapseNum(this.sparkFadeDelayOpts),
        fadeDuration: collapseNum(this.sparkFadeDurationOpts),
        explosionMagnitude: collapseNum(this.explosionMagnitudeOpts),
      });
      this.addChild(spark);
      this.sparks.push(spark);
    });
  };

  update = () => {
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
      spark.updateFade();
      spark.applyPhysics();
      return [...nextSparks, spark];
    }, []);
  };
}