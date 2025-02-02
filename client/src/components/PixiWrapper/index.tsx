'use client';

import * as PIXI from 'pixi.js';
import React from 'react';
import {
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { PixiView } from '@/pixi/PixiView';

export default function PixiWrapper() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  /**
   * Pixi init in Next.js from {@link https://stackoverflow.com/a/78782201}
   */
  const initApp = useCallback(async() => {
    const canvas = canvasRef.current ?? undefined;
    const app = new PIXI.Application();

    await app.init({
      resizeTo: window,
      canvas,
      backgroundColor: 0x101,
    });

    const view = new PixiView(app);
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

  return (
    <canvas ref={canvasRef} />
  );
}