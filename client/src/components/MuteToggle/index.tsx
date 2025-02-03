'use client';

import classNames from 'classnames';
import { useAtom } from 'jotai';
import React from 'react';
import * as atoms from '@/atoms';
import style from './style.module.scss';

export default function MuteToggle() {
  const [isMuted, setIsMuted] = useAtom(atoms.isMuted);

  const assetBasePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const iconFileName = isMuted ? 'volume-xmark.svg' : 'volume.svg';

  const onClick = () => {
    setIsMuted((state) => !state);
  };

  return (
    <button
      aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
      className={classNames({
        [style.wrap]: true,
        [style.isMuted]: isMuted,
      })}
      style={{ backgroundImage: `url(${assetBasePath}/images/${iconFileName})` }}
      type="button"
      onClick={onClick} />
  );
}