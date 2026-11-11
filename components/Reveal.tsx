"use client";

import * as m from "motion/react-m";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "article";
};

/** Aparición sutil al entrar en pantalla (opacidad + desplazamiento corto). */
export default function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const Component = m[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </Component>
  );
}
