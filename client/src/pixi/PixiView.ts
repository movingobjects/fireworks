import { getDefaultStore } from 'jotai';
import * as PIXI from 'pixi.js';
import * as atoms from '@/atoms';
import { ModeSpec } from '@/types/fireworks';
import { getRandomArrayItem } from '@/utils/math';
import { Background } from './Background';
import { Firework } from './Firework';

export class PixiView extends PIXI.Container {
  static pixiApp: PIXI.Application;
  static width = (): number => PixiView.pixiApp.screen.width;
  static height = (): number => PixiView.pixiApp.screen.height;

  atomStore: any;
  lastLaunchTime: number = 0;

  background: Background;
  fireworks: Firework[] = [];

  animationId?: number;

  constructor(app: PIXI.Application) {
    super();

    // Static access to PIXI.Application
    PixiView.pixiApp = app;

    this.atomStore = getDefaultStore();

    this.initTicker();
    this.preloadTextures();
    this.background = this.drawBackground();
    this.startAnimation();
  }

  onTick = (ticker: PIXI.Ticker) => {
    // Update background
    this.background.update();

    // Update fireworks
    this.fireworks.forEach((firework) => {
      firework.update();
    });

    // Launch fireworks on interval
    const { launchInterval } = this.atomStore.get(atoms.activeMode) as ModeSpec;
    const elapsed = performance.now() - this.lastLaunchTime;
    if (elapsed >= launchInterval) {
      this.launchFirework();
    }
  };

  initTicker = () => {
    PIXI.Ticker.shared.autoStart = false;
    PIXI.Ticker.shared.add(this.onTick);
  };

  stopAnimation = () => {
    PIXI.Ticker.shared.stop();
  };

  startAnimation = () => {
    PIXI.Ticker.shared.start();
  };

  preloadTextures = async() => {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    await PIXI.Assets.load(`${basePath}/textures/x.png`);
    await PIXI.Assets.load(`${basePath}/textures/circle.png`);
    await PIXI.Assets.load(`${basePath}/textures/star.png`);
    await PIXI.Assets.load(`${basePath}/textures/visual-electric.png`);
  };

  drawBackground = () => {
    const background = new Background();
    this.addChild(background);
    return background;
  };

  launchFirework = () => {
    const { fireworks } = this.atomStore.get(atoms.activeMode);

    const firework = new Firework(
      PixiView.width() / 2,
      PixiView.height(),
      getRandomArrayItem(fireworks),
    );

    this.addChild(firework);
    this.fireworks.push(firework);

    this.lastLaunchTime = performance.now();
  };
}