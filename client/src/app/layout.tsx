import type { Metadata } from 'next';
import React from 'react';
import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: 'Fireworks',
  description: 'Animation demo for Visual Electric',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}