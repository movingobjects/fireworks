import * as PIXI from 'pixi.js';
import { GRAVITY } from '@/constants';
import { Vector } from '@/types/math';

export class Particle extends PIXI.Container {
  drag: number = 0;
  velocity: Vector = {
    x: 0,
    y: 0,
  };

  applyPhysics = () => {
    // Apply gravity & friction
    this.velocity.y += GRAVITY;

    // Apply drag (air resistance)
    this.velocity.x *= (1 - this.drag);
    this.velocity.y *= (1 - this.drag);

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