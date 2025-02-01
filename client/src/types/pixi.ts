export type Vector = {
  x: number;
  y: number;
};

export type Range = {
  min: number;
  max: number;
};

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
  maxMagnitudeRange: Range;
  upwardMagnitudeRange: Range;
}

export interface SparkSpec {
  color: string;
  radius: number;
  mass: number;
  explosionMagnitude: number;
  upwardMagnitude: number;
}