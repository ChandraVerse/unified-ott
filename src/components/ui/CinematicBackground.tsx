'use client';
import { useEffect, useRef } from 'react';

interface CinematicBackgroundProps {
  theme?: 'red' | 'blue' | 'purple' | 'mixed';
  className?: string;
}

export default function CinematicBackground({
  theme = 'mixed',
  className = '',
}: CinematicBackgroundProps) {
  const scanRef = useRef<HTMLDivElement>(null);

  // Scanline loop
  useEffect(() => {
    const el = scanRef.current;
    if (!el) return;
    const run = () => {
      el.style.transition = 'none';
      el.style.top = '-4px';
      void el.offsetHeight;
      el.style.transition = 'top 2.8s linear';
      el.style.top = '100%';
    };
    run();
    const id = setInterval(run, 3200);
    return () => clearInterval(id);
  }, []);

  const orbColors = {
    red:    ['#e50914', '#b20710', '#ff6b6b'],
    blue:   ['#1d4ed8', '#2563eb', '#60a5fa'],
    purple: ['#7c3aed', '#6d28d9', '#a855f7'],
    mixed:  ['#e50914', '#1d4ed8', '#7c3aed', '#f59e0b'],
  };

  const colors = orbColors[theme];

  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`} style={{ zIndex: 0 }}>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[#020617]" />

      {/* Radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(2,6,23,0.85) 100%)',
        }}
      />

      {/* Glowing orbs */}
      {colors.map((color, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-orb-pulse"
          style={{
            background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
            width:  `${300 + i * 120}px`,
            height: `${300 + i * 120}px`,
            top:    `${10 + i * 20}%`,
            left:   `${-10 + i * 25}%`,
            filter: `blur(${60 + i * 20}px)`,
            animationDelay: `${i * 1.2}s`,
          }}
        />
      ))}

      {/* Geometric shapes */}
      {/* Hexagon outline */}
      <svg className="absolute top-[15%] right-[8%] opacity-10 animate-spin-slow" width="80" height="80" viewBox="0 0 100 100">
        <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="none" stroke="#e50914" strokeWidth="2" />
      </svg>
      {/* Triangle */}
      <svg className="absolute bottom-[20%] left-[5%] opacity-10" style={{animationDelay:'1s'}} width="60" height="60" viewBox="0 0 100 100">
        <polygon points="50,5 95,90 5,90" fill="none" stroke="#1d4ed8" strokeWidth="2" />
      </svg>
      {/* Ring */}
      <svg className="absolute top-[50%] right-[15%] opacity-10 animate-spin-slow" style={{animationDelay:'3s'}} width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" stroke="#7c3aed" strokeWidth="3" strokeDasharray="8 6" />
      </svg>
      {/* Diamond */}
      <svg className="absolute top-[30%] left-[12%] opacity-10" width="50" height="50" viewBox="0 0 100 100">
        <polygon points="50,5 95,50 50,95 5,50" fill="none" stroke="#f59e0b" strokeWidth="2" />
      </svg>
      {/* Dotted grid */}
      <svg className="absolute bottom-[10%] right-[5%] opacity-5" width="120" height="120">
        {Array.from({length: 5}).map((_, r) =>
          Array.from({length: 5}).map((__, c) => (
            <circle key={`${r}-${c}`} cx={c*24+12} cy={r*24+12} r="2" fill="#e50914" />
          ))
        )}
      </svg>

      {/* Red scanline */}
      <div
        ref={scanRef}
        className="absolute left-0 right-0 h-[2px] pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(229,9,20,0.6), transparent)',
          top: '-4px',
          zIndex: 10,
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px',
        }}
      />
    </div>
  );
}
