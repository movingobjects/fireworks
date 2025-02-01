import * as PIXI from 'pixi.js';
import { Firework } from './Firework';

export class FireworksView extends PIXI.Container {
  fireworks: Firework[] = [];
  app: PIXI.Application;

  constructor(app: PIXI.Application) {
    super();

    this.app = app;

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
    const fw = new Firework(
      this.app.screen.width / 2,
      this.app.screen.height,
      {
        color: 'magenta',
        radius: 5,
        target: {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        },
      },
    );

    this.addChild(fw);
    this.fireworks.push(fw);
  };
}