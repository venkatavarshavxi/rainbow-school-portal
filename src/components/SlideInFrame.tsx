import React, { useEffect, useRef, useState } from 'react';

interface SlideInFrameProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  distancePx?: number;
  durationMs?: number;
}

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const SlideInFrame: React.FC<SlideInFrameProps> = ({
  children,
  className = '',
  delayMs = 0,
  distancePx = 52,
  durationMs = 720,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [reducedMotion] = useState<boolean>(() => prefersReducedMotion());
  const [visible, setVisible] = useState<boolean>(() => prefersReducedMotion());

  useEffect(() => {
    if (reducedMotion || visible) return;
    const node = ref.current;
    if (!node) return;

    let rafId = 0;
    const triggerReveal = () => {
      rafId = window.requestAnimationFrame(() => {
        setVisible(true);
      });
    };

    if (typeof IntersectionObserver === 'undefined') {
      triggerReveal();
      return () => window.cancelAnimationFrame(rafId);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          triggerReveal();
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' },
    );

    observer.observe(node);

    // Fallback safety timer in case an edge viewport never fires intersection
    const safetyTimer = window.setTimeout(() => {
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight * 1.15) {
        triggerReveal();
        observer.disconnect();
      }
    }, 320);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(safetyTimer);
      observer.disconnect();
    };
  }, [reducedMotion, visible]);

  return (
    <div
      ref={ref}
      className={className}
      style={
        reducedMotion
          ? undefined
          : {
              opacity: visible ? 1 : 0,
              transform: visible ? 'translate3d(0, 0, 0)' : `translate3d(-${distancePx}px, 0, 0)`,
              transition: `transform ${durationMs}ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, opacity ${Math.round(
                durationMs * 0.85,
              )}ms ease-out ${delayMs}ms`,
              willChange: visible ? 'auto' : 'transform, opacity',
            }
      }
    >
      {children}
    </div>
  );
};
