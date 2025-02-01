export type Vector = {
  x: number;
  y: number;
};

export type Range = {
  min: number;
  max: number;
};

export interface ProjectileSpec {
  color: string;
  radius: Range;
  explodeAtVelocityY: Range;
}
export interface SparkSpec {
  color: string;
  radius: Range;
}

export interface ExplosionSpec {
  sparkCountRange: Range;
  maxMagnitudeRange: Range;
  upwardMagnitudeRange: Range;
}

export interface FireworkSpec {
  target: Vector;
  projectile: ProjectileSpec;
  explosion: ExplosionSpec;
  spark: SparkSpec;
}