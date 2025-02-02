import { times } from 'remeda';
import { ModeSpec } from '@/types/fireworks';

export const modes: ModeSpec[] = [
  {
    id: 'festive',
    label: 'Festive',
    launchInterval: 750,
    background: {
      enableStars: true,
      glowColor: 0x223355,
    },
    fireworks: [
      {
        hueOpts: [
          {
            min: 35,
            max: 40,
          },
        ],
        saturationOpts: [
          {
            min: 0.35,
            max: 0.65,
          },
        ],
        sparkCountOpts: {
          min: 500,
          max: 1500,
        },
        sparkRadiusOpts: [
          {
            min: 1,
            max: 10,
          },
        ],
        sparkMassOpts: [
          {
            min: 0.75,
            max: 0.85,
          },
        ],
        sparkFadeDelayOpts: [
          {
            min: 1000,
            max: 3000,
          },
        ],
        sparkFadeDurationOpts: [
          {
            min: 750,
            max: 1000,
          },
        ],
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
      {
        hueOpts: [
          {
            min: 35,
            max: 40,
          },
        ],
        saturationOpts: [
          {
            min: 0.1,
            max: 0.2,
          },
        ],
        sparkCountOpts: {
          min: 500,
          max: 1500,
        },
        sparkRadiusOpts: [
          {
            min: 2,
            max: 8,
          },
        ],
        sparkMassOpts: [
          {
            min: 0.1,
            max: 0.6,
          },
        ],
        sparkFadeDelayOpts: [
          {
            min: 250,
            max: 1000,
          },
        ],
        sparkFadeDurationOpts: [
          {
            min: 750,
            max: 2750,
          },
        ],
        sparkTextureOpts: ['circle'],
        explosionMagnitudeOpts: [
          {
            min: 0,
            max: 5,
          },
        ],
      },
    ],
  },
  {
    id: 'cheers',
    label: 'Cheers!',
    launchInterval: 200,
    background: {
      enableStars: true,
      glowColor: 0x220033,
    },
    fireworks: [
      {
        hueOpts: times(Math.floor(360 / 30), (index) => ({
          min: index * 30,
          max: (index + 1) * 30,
        })),
        saturationOpts: 1,
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
    id: 'knockout',
    label: 'Knockout!',
    launchInterval: 400,
    background: {
      enableStars: false,
      glowColor: 0x000022,
    },
    fireworks: [
      {
        hueOpts: [
          {
            min: 0,
            max: 360,
          },
        ],
        saturationOpts: 1,
        sparkCountOpts: [
          {
            min: 250,
            max: 500,
          },
          750,
        ],
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
          min: 250,
          max: 500,
        },
        sparkFadeDurationOpts: {
          min: 2000,
          max: 3000,
        },
        sparkTextureOpts: [['x', 'star']],
        explosionMagnitudeOpts: [
          {
            min: 3,
            max: 30,
          },
        ],
      },
    ],
  },
  {
    id: 'mind-camera',
    label: 'Mind Camera',
    launchInterval: 300,
    background: {
      enableStars: false,
      glowColor: 0x220011,
    },
    fireworks: [
      {
        hueOpts: [
          {
            min: 10,
            max: 22,
          },
        ],
        saturationOpts: 1,
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