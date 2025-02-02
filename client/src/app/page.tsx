'use client';

import { useAtom } from 'jotai';
import React from 'react';
import * as atoms from '@/atoms';
import PixiWrapper from '@/components/PixiWrapper';
import style from './style.module.scss';

export default function AppPage() {
  const [isRunning, setIsRunning] = useAtom(atoms.isRunning);

  const onTogglePause = () => {
    setIsRunning((state) => !state);
  };

  return (
    <div className={style.wrap}>

      <PixiWrapper />

      <div className={style.controls}>
        <button type="button" onClick={onTogglePause}>
          {isRunning ? 'Pause' : 'Resume'}
        </button>
      </div>

    </div>
  );
}