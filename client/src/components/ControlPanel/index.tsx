'use client';

import { useAtom } from 'jotai';
import React from 'react';
import * as atoms from '@/atoms';
import { modes } from '@/config/modes';
import ModeButton from './ModeButton';
import style from './style.module.scss';

export default function ControlPanel() {
  const [modeIndex, setModeIndex] = useAtom(atoms.modeIndex);

  return (
    <div className={style.wrap}>
      {modes?.map((mode, index) => (
        <ModeButton
          key={mode.id}
          label={mode.label}
          selected={index === modeIndex}
          onSelect={() => {
            setModeIndex(index);
          }} />
      ))}
    </div>
  );
}