import { times } from 'remeda';
import { ModeSpec } from '@/types/fireworks';

export const modes: ModeSpec[] = [
  {
    id: 'mode-1',
    label: 'Celebration',
    launchInterval: 200,
    background: {
      enableStars: true,
      glowColor: 0x220033,
    },
    fireworks: [
      {
        id: 'a',
        hueOpts: times(Math.floor(360 / 30), (index) => ({
          min: index * 30,
          max: (index + 1) * 30,
        })),
        sparkCountOpts: {
          min: 100,
          max: 1000,
        },
        sparkRadiusOpts: [
          {
            min: 3,
            max: 7,
          },
        ],
        sparkMassOpts: [
          {
            min: 0.5,
            max: 0.75,
          },
        ],
        sparkFadeDelayOpts: [
          {
            min: 500,
            max: 1250,
          },
        ],
        sparkFadeDurationOpts: {
          min: 750,
          max: 4000,
        },
        sparkTextureOpts: ['circle'],
        explosionMagnitudeOpts: [
          {
            min: 0,
            max: 5,
          },
          {
            min: 0,
            max: 10,
          },
        ],
      },
    ],
  },
  {
    id: 'mode-2',
    label: 'Knockout!',
    launchInterval: 400,
    background: {
      enableStars: false,
      glowColor: 0x330066,
    },
    fireworks: [
      {
        id: 'a',
        hueOpts: [
          {
            min: 0,
            max: 360,
          },
        ],
        sparkCountOpts: {
          min: 250,
          max: 500,
        },
        sparkRadiusOpts: [
          {
            min: 10,
            max: 50,
          },
        ],
        sparkMassOpts: {
          min: 0.65,
          max: 0.75,
        },
        sparkFadeDelayOpts: {
          min: 500,
          max: 1250,
        },
        sparkFadeDurationOpts: {
          min: 1000,
          max: 2000,
        },
        sparkTextureOpts: [['x', 'star']],
        explosionMagnitudeOpts: [
          {
            min: 5,
            max: 30,
          },
        ],
      },
    ],
  },
  {
    id: 'mode-3',
    label: 'Mind Camera',
    launchInterval: 300,
    background: {
      enableStars: false,
      glowColor: 0x220011,
    },
    fireworks: [
      {
        id: 'a',
        hueOpts: [
          {
            min: 10,
            max: 22,
          },
        ],
        sparkCountOpts: {
          min: 25,
          max: 100,
        },
        sparkRadiusOpts: [
          {
            min: 10,
            max: 100,
          },
          {
            min: 25,
            max: 125,
          },
        ],
        sparkMassOpts: 0.6,
        sparkFadeDelayOpts: {
          min: 500,
          max: 1000,
        },
        sparkFadeDurationOpts: {
          min: 500,
          max: 5000,
        },
        sparkTextureOpts: ['visual-electric'],
        explosionMagnitudeOpts: [
          {
            min: 0,
            max: 30,
          },
          {
            min: 0,
            max: 15,
          },
        ],
      },
    ],
  },

] as const;