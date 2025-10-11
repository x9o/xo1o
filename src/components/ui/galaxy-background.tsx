"use client";

import React from 'react';
import { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

export const GalaxyBackground = () => {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'auto',
      overflow: 'hidden',
    }}>
      <Suspense fallback={
        <div className="w-full h-full bg-gradient-to-br from-purple-900 via-blue-900 to-black animate-pulse" />
      }>
        <Spline
          style={{
            width: '100%',
            height: '100%',
            pointerEvents: 'auto',
          }}
          scene="https://prod.spline.design/us3ALejTXl6usHZ7/scene.splinecode"
        />
      </Suspense>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            linear-gradient(to right, rgba(0, 0, 0, 0.3), transparent 30%, transparent 70%, rgba(0, 0, 0, 0.3)),
            linear-gradient(to bottom, transparent 30%, rgba(0, 0, 0, 0.2))
          `,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
