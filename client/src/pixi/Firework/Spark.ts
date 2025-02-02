import * as PIXI from 'pixi.js';
import {
  getRandomRadianAngle,
  getVectorFromPolar,
} from '@/utils/math';
import { Particle } from '../Particle';
import { PixiView } from '../PixiView';
import { Projectile } from './Projectile';

type SparkProps = {
  projectile: Projectile;
  texture: string;
  color: string;
  radius: number;
  drag: number;
  explosionMagnitude: number;
  upwardMagnitude: number;
};

export class Spark extends Particle {
  graphic: PIXI.Sprite;

  constructor({
    projectile,
    texture,
    color,
    radius,
    drag,
    explosionMagnitude,
    upwardMagnitude,
  }: SparkProps) {
    super();

    // Init values
    this.drag = drag;
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

  getExplosionVelocity = (magnitude: number) => (
    getVectorFromPolar(getRandomRadianAngle(), magnitude)
  );

  canBeDisposed = () => (
    this.x < 0 ||
    this.x > PixiView.width() ||
    this.y > PixiView.height()
  );
}