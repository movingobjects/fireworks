import * as PIXI from 'pixi.js';
import { GRAVITY } from '@/config/constants';
import { Vector } from '@/types/math';

export class Particle extends PIXI.Container {
  mass: number = 1;
  velocity: Vector = {
    x: 0,
    y: 0,
  };

  applyPhysics = () => {
    // Apply gravity and friction, based on mass.
    // These are weaseled to dial the effect, very
    // little relation to actual phyics at this point
    this.velocity.y += (GRAVITY * Math.pow(this.mass, 4));
    this.velocity.x *= Math.pow(this.mass, 0.05);
    this.velocity.y *= Math.pow(this.mass, 0.05);

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