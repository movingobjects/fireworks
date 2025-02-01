'use client';

import { Application } from 'pixi.js';
import React from 'react';
import {
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { FireworksView } from '@/pixi/FireworksView';

export default function PixiWrapper() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  /**
   * Pixi init in Next.js from {@link https://stackoverflow.com/a/78782201}
   */
  const initApp = useCallback(async() => {
    const canvas = canvasRef.current ?? undefined;
    const app = new Application();

    await app.init({
      resizeTo: window,
      canvas,
    });

    const view = new FireworksView();
    app.stage.addChild(view);

    return app;
  }, []);

  useEffect(() => {
    const app = initApp();
    return () => {
      app
        .then((app) => app.stop())
        .catch(console.error);
    };
  }, [initApp]);

  return <canvas ref={canvasRef} />;
}