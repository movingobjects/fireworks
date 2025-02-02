import {
  Range,
  Vector,
} from './math';

export type NumberOptions = number | Range | NumberOptions[];
export type StringOptions = string | StringOptions[];

export interface FireworkSpec {
  projectile: ProjectileSpec;
  explosion: ExplosionSpec;
}

export interface ProjectileSpec {
  color: number;
  radiusOpts: NumberOptions;
  target: Vector;
}

export interface ExplosionSpec {
  maxMagnitudeOpts: NumberOptions;
  sparkCountOpts: NumberOptions;
  sparkDragOpts: NumberOptions;
  sparkFadeDelayOpts: NumberOptions;
  sparkFadeDurationOpts: NumberOptions;
  sparkFadeRadiusMultOpts: NumberOptions;
  sparkHueOpts: NumberOptions;
  sparkRadiusOpts: NumberOptions;
  sparkTextureOpts: StringOptions;
  upwardMagnitudeOpts: NumberOptions;
}