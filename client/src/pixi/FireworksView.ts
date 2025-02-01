import * as PIXI from 'pixi.js';
import { FireworkSpec } from '@/types/pixi';
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
    }, 500);
  }

  onFrame = (elapsedMs: number = 0) => {
    requestAnimationFrame(this.onFrame);

    this.fireworks.forEach((firework) => {
      firework.update(elapsedMs);
    });
  };

  launchFirework = () => {
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
          min: 50,
          max: 500,
        },
        sparkRadiusRange: {
          min: 1,
          max: 3,
        },
        sparkMassRange: {
          min: 0.25,
          max: 1,
        },
        upwardMagnitudeRange: {
          min: 5,
          max: 10,
        },
        maxMagnitudeRange: {
          min: 2,
          max: 10,
        },
      },
    };

    const firework = new Firework(
      FireworksView.width() / 2,
      FireworksView.height(),
      spec,
    );

    this.addChild(firework);
    this.fireworks.push(firework);
  };
}