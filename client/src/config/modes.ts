import { times } from 'remeda';
import { ModeSpec } from '@/types/fireworks';
import {
  TARGET_X_RANGE,
  TARGET_Y_RANGE,
} from './constants';

export const modes: ModeSpec[] = [
  {
    id: 'mode-1',
    label: 'Celebration',
    launchInterval: 200,
    fireworks: [
      {
        projectile: {
          color: 0x8866bb,
          radiusOpts: {
            min: 1,
            max: 2,
          },
          targetXOpts: TARGET_X_RANGE,
          targetYOpts: TARGET_Y_RANGE,
        },
        explosion: {
          sparkCountOpts: {
            min: 100,
            max: 500,
          },
          sparkHueOpts: times(Math.floor(360 / 30), (index) => ({
            min: index * 30,
            max: (index + 1) * 30,
          })),
          sparkRadiusOpts: [
            {
              min: 3,
              max: 7,
            },
          ],
          sparkDragOpts: {
            min: 0.02,
            max: 0.1,
          },
          sparkFadeDelayOpts: {
            min: 250,
            max: 1250,
          },
          sparkFadeDurationOpts: {
            min: 250,
            max: 1250,
          },
          sparkFadeRadiusMultOpts: {
            min: 0.985,
            max: 1.015,
          },
          sparkTextureOpts: ['circle'],
          upwardMagnitudeOpts: {
            min: 5,
            max: 10,
          },
          maxMagnitudeOpts: [
            {
              min: 1,
              max: 5,
            }, {
              min: 3,
              max: 10,
            },
          ],
        },
      },
    ],
  },
  {
    id: 'mode-2',
    label: 'Knockout!',
    launchInterval: 400,
    fireworks: [
      {
        projectile: {
          color: 0x000000,
          radiusOpts: 0,
          targetXOpts: TARGET_X_RANGE,
          targetYOpts: TARGET_Y_RANGE,
        },
        explosion: {
          sparkCountOpts: {
            min: 250,
            max: 500,
          },
          sparkHueOpts: [
            {
              min: 0,
              max: 360,
            },
          ],
          sparkRadiusOpts: [
            {
              min: 20,
              max: 50,
            },
          ],
          sparkDragOpts: {
            min: 0.02,
            max: 0.04,
          },
          sparkFadeDelayOpts: {
            min: 500,
            max: 1250,
          },
          sparkFadeDurationOpts: {
            min: 1000,
            max: 1250,
          },
          sparkFadeRadiusMultOpts: {
            min: 1,
            max: 1.02,
          },
          sparkTextureOpts: [['x', 'star']],
          upwardMagnitudeOpts: {
            min: 5,
            max: 10,
          },
          maxMagnitudeOpts: [
            {
              min: 10,
              max: 50,
            },
          ],
        },
      },
    ],
  },
  {
    id: 'mode-3',
    label: 'Mind Camera',
    launchInterval: 300,
    fireworks: [
      {
        projectile: {
          color: 0xffffff,
          radiusOpts: {
            min: 2,
            max: 4,
          },
          targetXOpts: TARGET_X_RANGE,
          targetYOpts: TARGET_Y_RANGE,
        },
        explosion: {
          sparkCountOpts: {
            min: 50,
            max: 150,
          },
          sparkHueOpts: 18,
          sparkRadiusOpts: [
            {
              min: 25,
              max: 100,
            }, {
              min: 25,
              max: 125,
            },
          ],
          sparkDragOpts: {
            min: 0.05,
            max: 0.04,
          },
          sparkFadeDelayOpts: {
            min: 500,
            max: 1000,
          },
          sparkFadeDurationOpts: {
            min: 500,
            max: 1000,
          },
          sparkFadeRadiusMultOpts: {
            min: 0.99,
            max: 1,
          },
          sparkTextureOpts: ['visual-electric'],
          upwardMagnitudeOpts: {
            min: 20,
            max: 10,
          },
          maxMagnitudeOpts: [
            {
              min: 10,
              max: 30,
            }, {
              min: 10,
              max: 15,
            },
          ],
        },
      },
    ],
  },

] as const;