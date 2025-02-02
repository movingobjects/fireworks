import * as PIXI from 'pixi.js';
import { COLOR_TWILIGHT } from '@/constants';
import { mixColors } from '@/utils/color';
import {
  clamp,
  getRandomRadianAngle,
  getVectorFromPolar,
  norm,
} from '@/utils/math';
import { Particle } from '../Particle';
import { PixiView } from '../PixiView';
import { Projectile } from './Projectile';

type SparkProps = {
  projectile: Projectile;
  texture: string;
  color: number;
  radius: number;
  drag: number;
  fadeDelay: number;
  fadeDuration: number;
  explosionMagnitude: number;
  upwardMagnitude: number;
};

export class Spark extends Particle {
  graphic: PIXI.Sprite;
  color: number;
  explodeTime: number;
  fadeDelay: number;
  fadeDuration: number;

  constructor({
    projectile,
    texture,
    color,
    radius,
    drag,
    fadeDelay,
    fadeDuration,
    explosionMagnitude,
    upwardMagnitude,
  }: SparkProps) {
    super();

    // Init values
    this.drag = drag;
    this.color = color;
    this.fadeDelay = fadeDelay;
    this.fadeDuration = fadeDuration;
    this.x = projectile.x;
    this.y = projectile.y;

    this.graphic = new PIXI.Sprite(
      PIXI.Texture.from(`/textures/${texture}.png`),
    );
    this.graphic.tint = color;
    this.graphic.width = radius;
    this.graphic.height = radius;
    this.graphic.rotation = Math.random() * Math.PI * 2;
    this.addChild(this.graphic);

    this.explodeTime = performance.now();

    // Explode!
    this.explode(
      projectile,
      explosionMagnitude,
      upwardMagnitude,
    );
  }

  explode = (
    projectile: Projectile,
    explosionMagnitude: number,
    upwardMagnitude: number,
  ) => {
    const explosionVelocity = this.getExplosionVelocity(explosionMagnitude);

    this.velocity.x = (projectile.velocity.x / 2) + explosionVelocity.x;
    this.velocity.y = (projectile.velocity.y / 2) + explosionVelocity.y - upwardMagnitude;
  };

  updateFade = () => {
    const elapsed = performance.now() - this.explodeTime;
    if (elapsed > this.fadeDelay) {
      const amt = norm(elapsed, this.fadeDelay, this.fadeDelay + this.fadeDuration);
      this.tint = mixColors(this.color, COLOR_TWILIGHT, clamp(amt));
    }
  };

  getExplosionVelocity = (magnitude: number) => (
    getVectorFromPolar(getRandomRadianAngle(), magnitude)
  );

  canBeDisposed = () => (
    this.x < 0 ||
    this.x > PixiView.width() ||
    this.y > PixiView.height() ||
    performance.now() > this.explodeTime + this.fadeDelay + this.fadeDuration
  );
}