import { atom } from 'jotai';
import { modes } from '@/config/modes';
import { ModeSpec } from '@/types/fireworks';

export const modeIndex = atom<number>(0);

export const activeMode = atom<ModeSpec>((get) => (
  modes[get(modeIndex)]
));