'use client';

import classNames from 'classnames';
import React from 'react';
import style from './style.module.scss';

type ModeButtonProps = {
  readonly label: string;
  readonly selected: boolean;
  readonly onSelect: () => void;
};

export default function ModeButton({
  label,
  selected = false,
  onSelect = () => {},
}: ModeButtonProps) {
  return (
    <button
      className={classNames({
        [style.wrap]: true,
        [style.selected]: selected,
      })}
      type="button"
      onClick={onSelect}>
      {label}
    </button>
  );
}