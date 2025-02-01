import React from 'react';
import PixiWrapper from '@/components/PixiWrapper';
import style from './style.module.scss';

export default function AppPage() {
  return (
    <div className={style.wrap}>
      <PixiWrapper />
    </div>
  );
}