import * as PIXI from 'pixi.js';
import { Firework } from './Firework';

export class FireworksView extends PIXI.Container {
  static pixiApp: PIXI.Application;
  static width = (): number => FireworksView.pixiApp.screen.width;
  static height = (): number => FireworksView.pixiApp.screen.height;

  fireworks: Firework[] = [];

  constructor(app: PIXI.Application) {
    super();

    FireworksView.pixiApp = app;

    this.onFrame();

    setInterval(() => {
      this.launchFirework();
    }, 100);
  }

  onFrame = (elapsedMs: number = 0) => {
    requestAnimationFrame(this.onFrame);

    this.fireworks.forEach((firework) => {
      firework.update(elapsedMs);
    });
  };

  launchFirework = () => {
    const firework = new Firework(
      FireworksView.width() / 2,
      FireworksView.height(),
      {
        projectile: {
          color: 'white',
          radius: {
            min: 3,
            max: 5,
          },
          explodeAtVelocityY: {
            min: 0,
            max: 5,
          },
        },
        spark: {
          radius: {
            min: 1,
            max: 3,
          },
          color: 'white',
        },
        explosion: {
          sparkCountRange: {
            min: 25,
            max: 500,
          },
          upwardMagnitudeRange: {
            min: 5,
            max: 10,
          },
          maxMagnitudeRange: {
            min: 3,
            max: 20,
          },
        },
        target: {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        },
      },
    );

    this.addChild(firework);
    this.fireworks.push(firework);
  };
}