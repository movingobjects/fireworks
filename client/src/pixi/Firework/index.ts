import * as PIXI from 'pixi.js';
import { times } from 'remeda';
import { FireworkSpec } from '@/types/fireworks';
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

  constructor(
    x: number,
    y: number,
    spec: FireworkSpec,
  ) {
    super();
    this.spec = spec;

    this.drawProjectile(x, y);
  }

  drawProjectile = (x: number, y: number) => {
    const {
      color,
      target,
      radiusOpts,
    } = this.spec.projectile;

    this.projectile = new Projectile({
      radius: collapseNum(radiusOpts),
      color,
    });
    this.projectile.x = x;
    this.projectile.y = y;
    this.projectile.launchAt(target);

    this.addChild(this.projectile);
  };

  explode = () => {
    if (!this.projectile) return;

    this.drawSparks();

    this.projectile.dispose();
    delete this.projectile;
  };

  drawSparks = () => {
    const {
      maxMagnitudeOpts,
      sparkCountOpts,
      sparkHueOpts,
      sparkFadeDelayOpts,
      sparkFadeDurationOpts,
      sparkDragOpts,
      sparkRadiusOpts,
      sparkTextureOpts,
      upwardMagnitudeOpts,
    } = this.spec.explosion;

    const sparksCount = collapseNum(sparkCountOpts);
    const sparkHueCollapsed = shallowCollapseNum(sparkHueOpts);
    const sparkRadiusCollapsd = shallowCollapseNum(sparkRadiusOpts);
    const maxMagnitudeCollapsed = shallowCollapseNum(maxMagnitudeOpts);
    const textureCollapsed = shallowCollapseString(sparkTextureOpts);
    const fadeDelayCollapsed = shallowCollapseNum(sparkFadeDelayOpts);

    times(sparksCount, () => {
      const spark = new Spark({
        projectile: this.projectile!,
        texture: collapseString(textureCollapsed),
        color: fromHsv(collapseNum(sparkHueCollapsed)),
        radius: collapseNum(sparkRadiusCollapsd),
        drag: collapseNum(sparkDragOpts),
        fadeDelay: collapseNum(fadeDelayCollapsed),
        fadeDuration: collapseNum(sparkFadeDurationOpts),
        explosionMagnitude: collapseNum(maxMagnitudeCollapsed),
        upwardMagnitude: collapseNum(upwardMagnitudeOpts),
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