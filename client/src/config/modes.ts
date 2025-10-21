import { times } from 'remeda';
import { ModeSpec } from '@/types/fireworks';

export const modes: ModeSpec[] = [
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
            max: 8,
          },
          {
            min: 2,
            max: 10,
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
            min: 1000,
            max: 5000,
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
    id: 'lunar',
    label: 'Lunar',
    launchInterval: 200,
    background: {
      enableStars: true,
      glowColor: 0x331100,
    },
    fireworks: [
      {
        hueOpts: [
          {
            min: 0,
            max: 20,
          },
          {
            min: 20,
            max: 40,
          },
        ],
        saturationOpts: 1,
        sparkCountOpts: {
          min: 500,
          max: 1000,
        },
        sparkRadiusOpts: [
          {
            min: 3,
            max: 5,
          },
        ],
        sparkMassOpts: [
          {
            min: 0.25,
            max: 0.5,
          },
        ],
        sparkFadeDelayOpts: [
          {
            min: 500,
            max: 2000,
          },
        ],
        sparkFadeDurationOpts: {
          min: 1000,
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
            max: 7,
          },
          {
            min: 0,
            max: 10,
          },
          {
            min: 10,
            max: 20,
          },
        ],
      },
    ],
  },
  {
    id: 'o-beautiful',
    label: 'O Beautiful',
    launchInterval: 100,
    background: {
      enableStars: true,
      glowColor: 0x330022,
    },
    fireworks: [
      {
        hueOpts: [
          {
            min: 220,
            max: 270,
          },
        ],
        saturationOpts: 1,
        sparkCountOpts: {
          min: 100,
          max: 500,
        },
        sparkRadiusOpts: [
          {
            min: 8,
            max: 15,
          },
        ],
        sparkMassOpts: [
          {
            min: 0.4,
            max: 0.7,
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
        sparkTextureOpts: ['star'],
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
            min: 330,
            max: 359,
          },
        ],
        saturationOpts: 1,
        sparkCountOpts: {
          min: 100,
          max: 500,
        },
        sparkRadiusOpts: [
          {
            min: 8,
            max: 15,
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
        sparkTextureOpts: ['star'],
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
        hueOpts: 0,
        saturationOpts: 0,
        sparkCountOpts: {
          min: 100,
          max: 250,
        },
        sparkRadiusOpts: [
          {
            min: 8,
            max: 10,
          },
        ],
        sparkMassOpts: [
          {
            min: 0.15,
            max: 0.35,
          },
        ],
        sparkFadeDelayOpts: [
          {
            min: 250,
            max: 750,
          },
        ],
        sparkFadeDurationOpts: {
          min: 550,
          max: 750,
        },
        sparkTextureOpts: ['star'],
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

] as const;