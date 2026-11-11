"use client";

import { useEffect, useRef, useState } from "react";

export type VideoSource = { src: string; type: string };

type Props = {
  sources: VideoSource[];
  mobileSrc?: string;
};

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

/**
 * Video de fondo del hero.
 * - No bloquea la carga: se monta después de que la página está lista (idle).
 * - Silenciado, en loop y con playsInline (requisito de autoplay en iOS).
 * - No se carga con `prefers-reduced-motion`, ahorro de datos o redes 2G.
 * - Permanece transparente hasta poder reproducirse: mientras tanto (o si falla)
 *   se ve el póster optimizado que renderiza el servidor.
 */
export default function HeroVideo({ sources, mobileSrc }: Props) {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    const constrained = conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? "");
    if (reduce.matches || constrained) return;

    setIsMobile(window.matchMedia("(max-width: 768px)").matches);

    const start = () => setEnabled(true);
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let idleId: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const schedule = () => {
      if (w.requestIdleCallback) idleId = w.requestIdleCallback(start, { timeout: 2500 });
      else timer = setTimeout(start, 1200);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    // Si el usuario activa "reducir movimiento" después, se detiene el video.
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        videoRef.current?.pause();
        setEnabled(false);
      }
    };
    reduce.addEventListener("change", onChange);

    return () => {
      window.removeEventListener("load", schedule);
      reduce.removeEventListener("change", onChange);
      if (idleId !== undefined) w.cancelIdleCallback?.(idleId);
      if (timer) clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!enabled || !video) return;
    video.muted = true; // garantiza autoplay en navegadores estrictos
    video.play().catch(() => {
      /* Autoplay bloqueado: se mantiene el póster. */
    });

    // Pausa el video cuando el hero no es visible para ahorrar batería y CPU.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.05 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [enabled]);

  if (!enabled) return null;

  const list = isMobile && mobileSrc ? [{ src: mobileSrc, type: "video/mp4" }] : sources;

  return (
    <video
      ref={videoRef}
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
        ready ? "opacity-100" : "opacity-0"
      }`}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
      disablePictureInPicture
      onCanPlay={() => setReady(true)}
      onError={() => setEnabled(false)}
    >
      {list.map((s) => (
        <source key={s.src} src={s.src} type={s.type} />
      ))}
    </video>
  );
}
