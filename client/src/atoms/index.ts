import { atom } from 'jotai';
import { modes } from '@/config/modes';
import {
  BackgroundSpec,
  ModeSpec,
} from '@/types/fireworks';

export const modeIndex = atom<number>(0);
export const isMuted = atom<boolean>(true);

export const activeMode = atom<ModeSpec>((get) => (
  modes[get(modeIndex)]
));

export const activeBackground = atom<BackgroundSpec>((get) => (
  modes[get(modeIndex)]?.background
));