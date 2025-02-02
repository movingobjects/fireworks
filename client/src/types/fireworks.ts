import { Range } from './math';

export type NumberOptions = number | Range | NumberOptions[];
export type StringOptions = string | StringOptions[];

export interface ModeSpec {
  id: string;
  fireworks: FireworkSpec[];
  label: string;
  launchInterval: number;
  background: BackgroundSpec;
}

export interface BackgroundSpec {
  enableStars: boolean;
  glowColor: number;
}

export interface FireworkSpec {
  hueOpts: NumberOptions;
  saturationOpts: NumberOptions;
  explosionMagnitudeOpts: NumberOptions;
  sparkCountOpts: NumberOptions;
  sparkRadiusOpts: NumberOptions;
  sparkMassOpts: NumberOptions;
  sparkFadeDelayOpts: NumberOptions;
  sparkFadeDurationOpts: NumberOptions;
  sparkTextureOpts: StringOptions;
}