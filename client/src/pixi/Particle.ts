import * as PIXI from 'pixi.js';
import { Physics } from '@/constants';
import { Vector } from '@/types/pixi';
import { FireworksView } from './FireworksView';

export class Particle extends PIXI.Graphics {
  velocity: Vector = {
    x: 0,
    y: 0,
  };

  applyPhysics = () => {
    // Apply gravity & friction
    this.velocity.y += Physics.GRAVITY;
    this.velocity.x *= Physics.FRICTION;

    // Update pos from velocity
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  };

  isOffScreen = (): Boolean => {
    const {
      x, y,
    } = this.getGlobalPosition();

    if (x < 0) return true;
    // No y < 0 check, allows particles to exist above screen area
    if (x > FireworksView.width()) return true;
    if (y > FireworksView.height()) return true;
    return false;
  };

  dispose = () => {
    if (this.parent) {
      this.parent.removeChild(this);
    }
  };
}