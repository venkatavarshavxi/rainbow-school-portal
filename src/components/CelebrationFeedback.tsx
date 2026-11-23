import React, { useEffect, useRef } from 'react';
import { Award, CheckCircle2, Sparkles, X } from 'lucide-react';

interface ConfettiBurstProps {
  burstKey: number;
}

const CREST_COLORS = ['#C85A32', '#1E6B52', '#264B8A', '#8B1E2D', '#E8C587'];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  color: string;
  rotation: number;
  vRot: number;
  tiltAngle: number;
  vTilt: number;
  opacity: number;
  shape: 'rect' | 'ribbon';
}

export const ConfettiBurst: React.FC<ConfettiBurstProps> = ({ burstKey }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (burstKey === 0) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const w = window.innerWidth;
    const h = window.innerHeight;
    const particles: Particle[] = [];

    // Left & right celebratory bursts + gentle upper cascade
    const count = Math.min(130, Math.max(75, Math.floor(w / 10)));
    for (let i = 0; i < count; i++) {
      const originMode = i % 3;
      const startX =
        originMode === 0
          ? w * 0.18 + (Math.random() - 0.5) * 90
          : originMode === 1
          ? w * 0.82 + (Math.random() - 0.5) * 90
          : Math.random() * w;
      const startY = originMode === 2 ? -20 - Math.random() * 80 : h * 0.62 + (Math.random() - 0.5) * 60;

      const angle =
        originMode === 0
          ? -Math.PI / 3 + (Math.random() - 0.5) * 0.65
          : originMode === 1
          ? (-2 * Math.PI) / 3 + (Math.random() - 0.5) * 0.65
          : Math.PI / 2 + (Math.random() - 0.5) * 0.5;
      const speed = originMode === 2 ? 2.5 + Math.random() * 3.5 : 8 + Math.random() * 7;

      particles.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        w: 6 + Math.random() * 6,
        h: 4 + Math.random() * 5,
        color: CREST_COLORS[i % CREST_COLORS.length],
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.18,
        tiltAngle: Math.random() * Math.PI,
        vTilt: 0.06 + Math.random() * 0.08,
        opacity: 1,
        shape: i % 4 === 0 ? 'ribbon' : 'rect',
      });
    }

    const startTime = performance.now();
    const duration = 3400;
    let rafId = 0;

    const frame = (now: number) => {
      const elapsed = now - startTime;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      let alive = false;
      for (const p of particles) {
        p.vy += 0.22; // gravity
        p.vx *= 0.985; // air drag
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;
        p.tiltAngle += p.vTilt;

        if (elapsed > duration * 0.6) {
          p.opacity = Math.max(0, 1 - (elapsed - duration * 0.6) / (duration * 0.4));
        }

        if (p.opacity > 0.02 && p.y < window.innerHeight + 40) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.scale(1, Math.cos(p.tiltAngle));
          ctx.fillStyle = p.color;
          if (p.shape === 'ribbon') {
            ctx.fillRect(-p.w / 2, -p.h * 0.8, p.w * 0.65, p.h * 1.9);
          } else {
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          }
          ctx.restore();
        }
      }

      if (alive && elapsed < duration) {
        rafId = requestAnimationFrame(frame);
      } else {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    };

    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };
  }, [burstKey]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
    />
  );
};

export interface SubmissionToastData {
  id: string;
  title: string;
  subtitle: string;
  referenceId: string;
  actionLabel?: string;
}

interface SubmissionToastProps {
  toast: SubmissionToastData | null;
  onDismiss: () => void;
  onAction?: () => void;
}

export const SubmissionToast: React.FC<SubmissionToastProps> = ({
  toast,
  onDismiss,
  onAction,
}) => {
  const onDismissRef = useRef(onDismiss);
  onDismissRef.current = onDismiss;

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => onDismissRef.current(), 6500);
    return () => window.clearTimeout(timer);
  }, [toast?.id]);

  if (!toast) return null;

  return (
    <div
      key={toast.id}
      role="status"
      aria-live="polite"
      className="animate-toast-in fixed top-20 right-4 left-4 sm:left-auto sm:w-[400px] z-50 bg-[#FBF9F5] border border-stone-300 rounded-2xl shadow-2xl overflow-hidden"
    >
      {/* 4-Color Rainbow Crest Bar */}
      <div className="grid grid-cols-4 h-1.5 w-full">
        <div className="bg-[#C85A32]" />
        <div className="bg-[#1E6B52]" />
        <div className="bg-[#264B8A]" />
        <div className="bg-[#8B1E2D]" />
      </div>

      <div className="p-4 sm:p-5 flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-[#EFF8F4] border border-[#1E6B52]/30 flex items-center justify-center shrink-0">
          <Award className="w-5 h-5 text-[#1E6B52]" />
        </div>

        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-[#1E6B52]">
            <Sparkles className="w-3.5 h-3.5 text-[#B08D57]" />
            <span>{toast.referenceId}</span>
          </div>
          <h4 className="font-serif text-xl font-semibold text-[#10233D] leading-tight">
            {toast.title}
          </h4>
          <p className="text-xs text-[#44403C] leading-relaxed">{toast.subtitle}</p>

          {onAction && toast.actionLabel && (
            <button
              type="button"
              onClick={onAction}
              className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B1E2D] hover:text-[#10233D] underline underline-offset-4 transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1E6B52]" />
              <span>{toast.actionLabel}</span>
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="min-h-[34px] min-w-[34px] flex items-center justify-center rounded-lg text-stone-400 hover:text-[#10233D] hover:bg-stone-200/60 transition-colors shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Smooth Countdown Bar */}
      <div className="h-1 w-full bg-stone-200/70">
        <div className="animate-toast-progress h-full bg-gradient-to-r from-[#C85A32] via-[#1E6B52] to-[#8B1E2D]" />
      </div>
    </div>
  );
};
