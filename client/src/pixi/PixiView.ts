import { getDefaultStore } from 'jotai';
import * as PIXI from 'pixi.js';
import * as atoms from '@/atoms';
import { getRandomArrayItem } from '@/utils/math';
import { Background } from './Background';
import { Firework } from './Firework';

export class PixiView extends PIXI.Container {
  static pixiApp: PIXI.Application;
  static width = (): number => PixiView.pixiApp.screen.width;
  static height = (): number => PixiView.pixiApp.screen.height;

  atomStore: any;
  lastLaunchTime: number = 0;

  background?: Background;
  fireworks: Firework[] = [];

  animationId?: number;

  constructor(app: PIXI.Application) {
    super();

    // Static access to PIXI.Application
    PixiView.pixiApp = app;

    this.initTicker();
    this.initAtomStore();
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

    const { launchInterval } = this.atomStore.get(atoms.activeMode);
    const elapsed = performance.now() - this.lastLaunchTime;

    if (elapsed >= launchInterval) {
      this.launchFirework();
    }
  };

  initTicker = () => {
    PIXI.Ticker.shared.autoStart = false;
    PIXI.Ticker.shared.add(this.onTick);
  };

  initAtomStore = () => {
    this.atomStore = getDefaultStore();
  };

  stopAnimation = () => {
    PIXI.Ticker.shared.stop();
  };

  startAnimation = () => {
    PIXI.Ticker.shared.start();
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