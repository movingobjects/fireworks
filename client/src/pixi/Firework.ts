import * as PIXI from 'pixi.js';
import { Physics } from '@/constants';
import {
  FireworkSpec,
  Vector,
} from '@/types/pixi';
import { getVelToHitTarget } from '@/utils/math';

export class Firework extends PIXI.Container {
  static INIT_VEL_X_RANGE: number = 25;

  private projectile: PIXI.Graphics = new PIXI.Graphics();
  private isExploded: boolean = false;

  velocity: Vector = {
    x: 0,
    y: 0,
  };

  radius: number;
  color: string;
  target: Vector;

  constructor(
    x: number,
    y: number,
    options: FireworkSpec,
  ) {
    super();

    this.x = x;
    this.y = y;

    this.radius = options.radius;
    this.color = options.color;
    this.target = options.target;

    const initVelocity = getVelToHitTarget(x, y, this.target);
    this.velocity.x = initVelocity.x;
    this.velocity.y = initVelocity.y;

    this.draw();
  }

  draw = () => {
    this.projectile.circle(0, 0, this.radius);
    this.projectile.fill({ color: this.color });
    this.addChild(this.projectile);
  };

  explode = () => {
    this.isExploded = true;
  };

  update = (elapsedMs: number) => {
    if (this.isExploded) return;

    // Apply gravity & friction
    this.velocity.y += Physics.GRAVITY;
    this.velocity.x *= Physics.FRICTION;

    // Update pos from velocity
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    if (this.velocity.y > 0) {
      this.explode();
    }
  };
}