import {
  Range,
  Vector,
} from './math';

export interface FireworkSpec {
  projectile: ProjectileSpec;
  explosion: ExplosionSpec;
}

export interface ProjectileSpec {
  color: string;
  radiusRange: Range;
  target: Vector;
  explodeAtVelocityYRange: Range;
}

export interface ExplosionSpec {
  sparkCountRange: Range;
  sparkMassRange: Range;
  sparkRadiusRange: Range;
  sparkHueRange: Range;
  sparkTextures: string[];
  maxMagnitudeRange: Range;
  upwardMagnitudeRange: Range;
}

export interface SparkSpec {
  texture: string;
  color: string;
  radius: number;
  mass: number;
  explosionMagnitude: number;
  upwardMagnitude: number;
}