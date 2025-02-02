import { getDefaultStore } from 'jotai';
import * as PIXI from 'pixi.js';
import * as atoms from '@/atoms';
import { FireworkSpec } from '@/types/fireworks';
import { Background } from './Background/Background';
import { Firework } from './Firework';

export class PixiView extends PIXI.Container {
  static pixiApp: PIXI.Application;
  static width = (): number => PixiView.pixiApp.screen.width;
  static height = (): number => PixiView.pixiApp.screen.height;

  atomStore: any;
  launchInterval: number = 0;

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
    }, 500);
  };

  preloadTextures = async() => {
    await PIXI.Assets.load('/textures/star.png');
  };

  launchFirework = () => {
    // TODO
    const spec: FireworkSpec = {
      projectile: {
        color: 'white',
        radiusRange: {
          min: 1,
          max: 2,
        },
        explodeAtVelocityYRange: {
          min: 0,
          max: 5,
        },
        target: {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        },
      },
      explosion: {
        sparkCountRange: {
          min: 100,
          max: 1000,
        },
        sparkHueRange: {
          min: 0,
          max: 25,
        },
        sparkRadiusRange: {
          min: 3,
          max: 10,
        },
        sparkMassRange: {
          min: 0.05,
          max: 0.25,
        },
        sparkTextures: ['star'],
        upwardMagnitudeRange: {
          min: 5,
          max: 10,
        },
        maxMagnitudeRange: {
          min: 1,
          max: 10,
        },
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