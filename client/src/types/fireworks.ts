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
  color: string;
  explodeAtVelocityYOpts: NumberOptions;
  radiusOpts: NumberOptions;
  target: Vector;
}

export interface ExplosionSpec {
  maxMagnitudeOpts: NumberOptions;
  sparkCountOpts: NumberOptions;
  sparkHueOpts: NumberOptions;
  sparkMassOpts: NumberOptions;
  sparkRadiusOpts: NumberOptions;
  sparkTextureOpts: StringOptions;
  upwardMagnitudeOpts: NumberOptions;
}