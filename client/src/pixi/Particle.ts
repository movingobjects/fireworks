import * as PIXI from 'pixi.js';
import { Physics } from '@/constants';
import { Vector } from '@/types/math';

export class Particle extends PIXI.Container {
  mass: number = 1;
  velocity: Vector = {
    x: 0,
    y: 0,
  };

  applyPhysics = () => {
    // Apply gravity & friction
    this.velocity.y += Physics.GRAVITY;

    const drag = Math.pow(Physics.FRICTION, 1 / this.mass);

    this.velocity.x *= drag;
    this.velocity.y *= drag;

    // Update pos from velocity
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  };

  dispose = () => {
    if (this.parent) {
      this.parent.removeChild(this);
    }
  };
}