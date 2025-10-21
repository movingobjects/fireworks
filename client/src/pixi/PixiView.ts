import { getDefaultStore } from 'jotai';
import * as PIXI from 'pixi.js';
import * as atoms from '@/atoms';
import { ModeSpec } from '@/types/fireworks';
import { getRandomArrayItem } from '@/utils/math';
import { Background } from './Background';
import { Firework } from './Firework';
const { Howl } = require('howler');

export class PixiView extends PIXI.Container {
  static pixiApp: PIXI.Application;
  static width = (): number => PixiView.pixiApp.screen.width;
  static height = (): number => PixiView.pixiApp.screen.height;

  atomStore: any;
  lastLaunchTime: number = 0;

  background: Background;
  fireworks: Firework[] = [];

  assetBasePath: string = process.env.NEXT_PUBLIC_BASE_PATH || '';

  explodeSounds: string[] = [
    `explode-1.mp3`,
    `explode-2.mp3`,
    `explode-3.mp3`,
    `explode-4.mp3`,
  ];

  sparkTextures: string[] = [
    'x.png',
    'circle.png',
    'star.png'
  ];

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
    const textureBasePath = `${this.assetBasePath}/textures/`;
    await Promise.all(
      this.sparkTextures.map((fileName) => {
        PIXI.Assets.load(`${textureBasePath}${fileName}`);
      }),
    );
  };

  drawBackground = () => {
    const background = new Background();
    this.addChild(background);
    return background;
  };

  onFireworkExplode = () => {
    if (this.atomStore.get(atoms.isMuted)) return;

    const soundBasePath = `${this.assetBasePath}/sounds/`;
    var sound = new Howl({
      src: `${soundBasePath}${getRandomArrayItem(this.explodeSounds)}`,
      volume: Math.random() * 0.5,
      autoplay: false,
    });
    sound.once('unlock', () => sound.stop());
    sound.play();
  };

  launchFirework = () => {
    const { fireworks } = this.atomStore.get(atoms.activeMode);

    const firework = new Firework(
      PixiView.width() / 2,
      PixiView.height(),
      getRandomArrayItem(fireworks),
      this.onFireworkExplode,
    );

    this.addChild(firework);
    this.fireworks.push(firework);

    this.lastLaunchTime = performance.now();
  };
}