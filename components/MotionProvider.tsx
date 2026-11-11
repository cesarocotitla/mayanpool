"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

/**
 * Carga solo las funciones de animación necesarias (LazyMotion)
 * y respeta la preferencia del sistema `prefers-reduced-motion`.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
