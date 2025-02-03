'use client';

import React from 'react';
import ControlPanel from '@/components/ControlPanel';
import MuteToggle from '@/components/MuteToggle';
import PixiWrapper from '@/components/PixiWrapper';
import style from './style.module.scss';

export default function AppPage() {
  return (
    <div className={style.wrap}>

      <PixiWrapper />
      <ControlPanel />
      <MuteToggle />

    </div>
  );
}