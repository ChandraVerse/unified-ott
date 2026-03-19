'use client';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import CinematicBackground from '@/components/ui/CinematicBackground';
import FloatingPosterCards from '@/components/ui/FloatingPosterCards';

const SIGNUP_POSTERS = [
  { title: 'Black Panther',  color: '#7c3aed', emoji: '🐾' },
  { title: 'Spider-Man',     color: '#e50914', emoji: '🕷️' },
  { title: 'Oppenheimer',    color: '#f59e0b', emoji: '💥' },
  { title: 'Harry Potter',   color: '#1d4ed8', emoji: '⚡' },
  { title: 'The Matrix',     color: '#22c55e', emoji: '🟢' },
  { title: 'Inception',      color: '#7c3aed', emoji: '🌀' },
];

type StrengthLevel = 'Weak' | 'Fair' | 'Good' | 'Strong';

function getStrength(pw: string): { level: StrengthLevel; score: number; color: string } {
  let score = 0;
  if (pw.length >= 8)  score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const map: { level: StrengthLevel; color: string }[] = [
    { level: 'Weak',   color: '#e50914' },
    { level: 'Weak',   color: '#e50914' },
    { level: 'Fair',   color: '#f59e0b' },
    { level: 'Good',   color: '#22c55e' },
    { level: 'Strong', color: '#1d4ed8' },
    { level: 'Strong', color: '#1d4ed8' },
  ];
  return { ...map[Math.min(score, 5)], score };
}

function SignUpContent() {
  const searchParams = useSearchParams();
  const refCode = searchParams.get('ref') ?? '';

  const [name,     setName]     = useState('');
  const [email,    setEmail]    = useState(searchParams.get('email') ?? '');
  const [password, setPassword] = useState('');
  const [confirm,  setConfirm]  = useState('');
  const [showPw,   setShowPw]   = useState(false);
  const [showCf,   setShowCf]   = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [done,     setDone]     = useState(false);

  const strength   = getStrength(password);
  const pwMatch    = confirm.length > 0 && password === confirm;
  const pwNoMatch  = confirm.length > 0 && password !== confirm;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pwNoMatch) return;
    setLoading(true);
    // TODO: call /api/auth/register
    await new Promise(r => setTimeout(r, 1500));
    setDone(true);
    setLoading(false);
  };

  if (done) {
    return (
      <div className="glass-card p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-400" />
        </div>
        <h2 className="text-2xl font-black mb-2">Account Created!</h2>
        <p className="text-white/50 text-sm mb-6">Welcome to Unified OTT. Start watching now.</p>
        <Link href="/subscribe" className="btn-red px-8 py-3 rounded-xl font-bold inline-block">
          Choose a Plan →
        </Link>
      </div>
    );
  }

  return (
    <div className="glass-card p-8 md:p-10">
      {/* Header */}
      <div className="text-center mb-6">
        <Link href="/" className="inline-block mb-4">
          <span className="text-2xl font-black text-glow-red">
            Unified<span className="text-[#e50914]">OTT</span>
          </span>
        </Link>
        <h1 className="text-3xl font-black mb-2">Create Your Account</h1>
        <p className="text-white/50 text-sm">Join millions of viewers. Cancel anytime.</p>
      </div>

      {/* Benefit badges */}
      <div className="flex flex-wrap justify-center gap-2 mb-7">
        {['🎬 10k+ titles', '📺 4K & HD', '📱 All devices'].map((b) => (
          <span
            key={b}
            className="px-3 py-1 text-xs font-semibold rounded-full"
            style={{ background: 'rgba(229,9,20,0.12)', border: '1px solid rgba(229,9,20,0.25)', color: '#fff' }}
          >
            {b}
          </span>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            required
            className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl
                       text-white placeholder-white/30 text-sm focus:outline-none
                       focus:border-[#e50914] transition-colors"
          />
        </div>

        {/* Email */}
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            required
            className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl
                       text-white placeholder-white/30 text-sm focus:outline-none
                       focus:border-[#e50914] transition-colors"
          />
        </div>

        {/* Password */}
        <div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full pl-11 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl
                         text-white placeholder-white/30 text-sm focus:outline-none
                         focus:border-[#e50914] transition-colors"
            />
            <button type="button" onClick={() => setShowPw(!showPw)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70">
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {/* Strength bar */}
          {password.length > 0 && (
            <div className="mt-2">
              <div className="flex gap-1 mb-1">
                {[1,2,3,4].map((seg) => (
                  <div
                    key={seg}
                    className="h-1 flex-1 rounded-full transition-all duration-300"
                    style={{
                      background: strength.score >= seg ? strength.color : 'rgba(255,255,255,0.1)',
                    }}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold" style={{ color: strength.color }}>
                {strength.level}
              </span>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type={showCf ? 'text' : 'password'}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirm Password"
            required
            className={`w-full pl-11 pr-12 py-3.5 bg-white/5 border rounded-xl
                        text-white placeholder-white/30 text-sm focus:outline-none transition-colors ${
              pwMatch    ? 'border-green-500/50' :
              pwNoMatch  ? 'border-red-500/50'   :
                           'border-white/10 focus:border-[#e50914]'
            }`}
          />
          <button type="button" onClick={() => setShowCf(!showCf)}
            className="absolute right-10 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70">
            {showCf ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
          {pwMatch   && <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-green-400" />}
          {pwNoMatch && <XCircle      className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-red-400" />}
        </div>
        {pwNoMatch && (
          <p className="text-xs text-red-400 -mt-2">Passwords do not match</p>
        )}

        {/* Referral code (hidden if not present) */}
        {refCode && (
          <div className="px-4 py-3 rounded-xl text-xs font-semibold"
               style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', color: '#f59e0b' }}>
            🎁 Referral code <strong>{refCode}</strong> applied — you'll get a bonus!
          </div>
        )}

        {/* CTA */}
        <button
          type="submit"
          disabled={loading || pwNoMatch}
          className="w-full btn-red py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          Create Account — It&apos;s Free <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Footer */}
      <p className="text-center text-white/40 text-sm mt-6">
        Already have an account?{' '}
        <Link href="/signin" className="text-[#e50914] font-semibold hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden py-12">
      <CinematicBackground theme="purple" />
      <FloatingPosterCards posters={SIGNUP_POSTERS} side="both" />

      <div className="relative z-10 w-full max-w-md mx-4">
        <Suspense fallback={null}>
          <SignUpContent />
        </Suspense>
      </div>
    </main>
  );
}
