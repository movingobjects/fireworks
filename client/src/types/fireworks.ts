import { Range } from './math';

export type NumberOptions = number | Range | NumberOptions[];
export type StringOptions = string | StringOptions[];

export interface ModeSpec {
  id: string;
  fireworks: FireworkSpec[];
  label: string;
  launchInterval: number;
}

export interface FireworkSpec {
  id: string;
  hueOpts: NumberOptions;
  explosionMagnitudeOpts: NumberOptions;
  sparkCountOpts: NumberOptions;
  sparkRadiusOpts: NumberOptions;
  sparkMassOpts: NumberOptions;
  sparkFadeDelayOpts: NumberOptions;
  sparkFadeDurationOpts: NumberOptions;
  sparkTextureOpts: StringOptions;
}