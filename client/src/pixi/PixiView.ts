import { getDefaultStore } from 'jotai';
import * as PIXI from 'pixi.js';
import { times } from 'remeda';
import * as atoms from '@/atoms';
import {
  TARGET_X_RANGE,
  TARGET_Y_RANGE,
} from '@/constants';
import { FireworkSpec } from '@/types/fireworks';
import { getRandomInRange } from '@/utils/math';
import { Background } from './Background';
import { Firework } from './Firework';

export class PixiView extends PIXI.Container {
  static pixiApp: PIXI.Application;
  static width = (): number => PixiView.pixiApp.screen.width;
  static height = (): number => PixiView.pixiApp.screen.height;

  atomStore: any;
  launchInterval: number = 0;

  background?: Background;
  fireworks: Firework[] = [];

  animationId?: number;

  constructor(app: PIXI.Application) {
    super();

    // Static access to PIXI.Application
    PixiView.pixiApp = app;

    this.initTicker();
    this.initAtomStore();
    this.initAutoPause();
    this.preloadTextures();
    this.drawBackground();
    this.startAnimation();
  }

  onTick = (ticker: PIXI.Ticker) => {
    if (this.background) {
      this.background.update();
    }

    this.fireworks.forEach((firework) => {
      firework.update();
    });
  };

  initTicker = () => {
    PIXI.Ticker.shared.autoStart = false;
    PIXI.Ticker.shared.add(this.onTick);
  };

  initAtomStore = () => {
    this.atomStore = getDefaultStore();

    this.atomStore.sub(atoms.isRunning, () => {
      const isRunning = this.atomStore.get(atoms.isRunning);

      if (isRunning) {
        this.startAnimation();
      } else {
        this.stopAnimation();
      }
    });
  };

  initAutoPause = () => {
    window.addEventListener('focus', () => {
      this.atomStore.set(atoms.isRunning, true);
    });

    window.addEventListener('blur', () => {
      this.atomStore.set(atoms.isRunning, false);
    });

    document.addEventListener('visibilitychange', () => {
      this.atomStore.set(atoms.isRunning, !document.hidden);
    });
  };

  stopAnimation = () => {
    PIXI.Ticker.shared.stop();
    clearInterval(this.launchInterval);
  };

  startAnimation = () => {
    PIXI.Ticker.shared.start();

    // TODO
    clearInterval(this.launchInterval);
    this.launchInterval = window.setInterval(() => {
      this.launchFirework();
    }, 200);
  };

  preloadTextures = async() => {
    await PIXI.Assets.load('/textures/x.png');
    await PIXI.Assets.load('/textures/circle.png');
    await PIXI.Assets.load('/textures/star.png');
    await PIXI.Assets.load('/textures/visual-electric.png');
  };

  drawBackground = () => {
    this.background = new Background();
    this.addChild(this.background);
  };

  launchFirework = () => {
    // TODO

    const HUE_RANGE = 20;

    const spec: FireworkSpec = {
      projectile: {
        color: 0xffffff,
        radiusOpts: {
          min: 1,
          max: 2,
        },
        target: {
          x: getRandomInRange(TARGET_X_RANGE),
          y: getRandomInRange(TARGET_Y_RANGE),
        },
      },
      explosion: {
        sparkCountOpts: {
          min: 100,
          max: 500,
        },
        sparkHueOpts: times(Math.floor(360 / HUE_RANGE), (index) => ({
          min: index * HUE_RANGE,
          max: (index + 1) * HUE_RANGE,
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
    };

    const firework = new Firework(
      PixiView.width() / 2,
      PixiView.height(),
      spec,
    );

    this.addChild(firework);
    this.fireworks.push(firework);
  };
}