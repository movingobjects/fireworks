import { GRAVITY } from '@/constants';
import {
  Range,
  Vector,
} from '@/types/math';

/**
 * Determines initial velocity needed to launch projectile
 * so it reaches a target at the peak of its arc
 *
 * Simplified/approximated to keep code more-or-less readable,
 * so it doesn't actual reach the exact target position
 *
 */
export function getVelToHitTarget(
  x: number,
  y: number,
  target: Vector,
): Vector {
  const deltaX = target.x - x;
  const deltaY = target.y - y;

  // LLM'd formula for finding velocity.y to hit target.y
  // when velocity.y hits 0 (peak of arc)
  let targetVelY = Math.sqrt(2 * GRAVITY * Math.abs(deltaY));

  if (deltaY < 0) {
    targetVelY = -targetVelY;
  }

  // Approximation of number of frames to reach peak of arc
  const frameCount = Math.abs(targetVelY / GRAVITY);

  // Approximation of velocity.x needed to reach target.x
  // at the same time projectile reaches peak of arc
  const targetVelX = deltaX / frameCount;

  return {
    x: targetVelX,
    y: targetVelY,
  };
}

export function getVectorFromPolar(
  angle: number,
  magnitude: number,
): Vector {
  return {
    x: magnitude * Math.cos(angle),
    y: magnitude * Math.sin(angle),
  };
}

export function getRandomRadianAngle() {
  return Math.random() * 2 * Math.PI;
}

export function getRandomInRange(range: Range): number {
  return (Math.random() * (range.max - range.min)) + range.min;
}

export function getRandomArrayItem(array: any[]): any {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export function lerp(
  min: number,
  max: number,
  val = 0.5,
) {
  return (min * (1 - val)) + (max * val);
}

export function norm(
  val: number,
  min: number,
  max = 0.5,
) {
  return (val - min) / (max - min);
}