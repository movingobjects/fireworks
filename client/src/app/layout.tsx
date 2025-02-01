import type { Metadata } from 'next';
import React from 'react';
import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: 'Fireworks',
  description: 'Animation demo for Visual Electric',
};

type RootLayoutProps = {
  readonly children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}