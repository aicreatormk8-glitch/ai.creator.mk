'use client';

/**
 * Fixed full-viewport ambient layer: graphite base, living teal gradients,
 * faint grid and a soft noise overlay. Purely decorative.
 */
export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-graphite-950"
    >
      {/* living gradient blobs */}
      <div className="absolute -left-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-teal-500/20 blur-[120px] animate-pulse-glow" />
      <div className="absolute -right-32 top-1/3 h-[30rem] w-[30rem] rounded-full bg-teal-400/10 blur-[120px] animate-float" />
      <div className="absolute bottom-0 left-1/3 h-[28rem] w-[28rem] rounded-full bg-emerald-500/10 blur-[140px] animate-pulse-glow" />

      {/* faint grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)',
        }}
      />

      {/* top vignette glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-400/50 to-transparent" />
    </div>
  );
}
