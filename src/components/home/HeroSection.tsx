'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronRight, Play, Info } from 'lucide-react';

const SLIDES = [
  {
    title: 'The Dark Knight Rises',
    genre: 'Action · Thriller · 2012',
    bg: 'from-[#1d4ed8]/40 via-[#020617] to-[#020617]',
    accent: '#1d4ed8',
  },
  {
    title: 'Kalki 2898 AD',
    genre: 'Sci-Fi · Action · 2024',
    bg: 'from-[#f59e0b]/40 via-[#020617] to-[#020617]',
    accent: '#f59e0b',
  },
  {
    title: 'Stranger Things S5',
    genre: 'Sci-Fi · Horror · 2025',
    bg: 'from-[#7c3aed]/40 via-[#020617] to-[#020617]',
    accent: '#7c3aed',
  },
  {
    title: 'ICC Champions Trophy',
    genre: 'Live Cricket · 2025',
    bg: 'from-[#e50914]/40 via-[#020617] to-[#020617]',
    accent: '#e50914',
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [email, setEmail]       = useState('');

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % SLIDES.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { next(); return 0; }
        return p + 100 / 70; // 7 seconds
      });
    }, 100);
    return () => clearInterval(interval);
  }, [next]);

  const slide = SLIDES[current];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Slide Background */}
      <div
        key={current}
        className={`absolute inset-0 bg-gradient-to-r ${slide.bg} transition-opacity duration-1000`}
        style={{ animation: 'ken-burns 14s ease-in-out infinite alternate' }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/30" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div
          className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest uppercase rounded-full"
          style={{ background: `${slide.accent}30`, color: slide.accent, border: `1px solid ${slide.accent}50` }}
        >
          ● LIVE NOW · {slide.genre}
        </div>

        <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight animate-fade-in-up">
          Unlimited Movies,
          <br />
          <span className="text-[#e50914] text-glow-red">Shows & Live Sports</span>
        </h1>

        <p className="text-lg md:text-xl text-white/60 mb-2 font-medium">
          Starts at &#x20B9;149. Cancel anytime.
        </p>
        <p className="text-sm text-white/40 mb-10">
          Now streaming: <span className="text-white/80 font-semibold">{slide.title}</span>
        </p>

        {/* Email CTA */}
        <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 px-5 py-4 rounded-xl bg-black/60 border border-white/20 text-white
                       placeholder-white/30 backdrop-blur focus:outline-none focus:border-[#e50914]
                       transition-colors text-sm"
          />
          <Link
            href={`/signup${email ? `?email=${encodeURIComponent(email)}` : ''}`}
            className="btn-red flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold
                       whitespace-nowrap text-sm"
          >
            Get Started <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Play / Info buttons */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg
                             font-bold text-sm hover:bg-white/90 transition-colors">
            <Play className="w-4 h-4 fill-black" /> Play Trailer
          </button>
          <button className="flex items-center gap-2 px-6 py-3 glass text-white rounded-lg
                             font-semibold text-sm hover:border-white/40 transition-all">
            <Info className="w-4 h-4" /> More Info
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); setProgress(0); }}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? 'w-8 h-2 bg-[#e50914]'
                  : 'w-2 h-2 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Red progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10">
        <div
          className="h-full bg-[#e50914] transition-all duration-100"
          style={{ width: `${progress}%`, boxShadow: '0 0 8px #e50914' }}
        />
      </div>
    </section>
  );
}
