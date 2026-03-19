'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import CinematicBackground from '@/components/ui/CinematicBackground';
import FloatingPosterCards from '@/components/ui/FloatingPosterCards';

const SIGNIN_POSTERS = [
  { title: 'Batman',         color: '#1d4ed8', emoji: '🦇' },
  { title: 'Stranger Things',color: '#7c3aed', emoji: '🔦' },
  { title: 'Avengers',       color: '#e50914', emoji: '⚡' },
  { title: 'Dune',           color: '#f59e0b', emoji: '🏜️' },
  { title: 'Interstellar',   color: '#1d4ed8', emoji: '🚀' },
  { title: 'Oppenheimer',    color: '#f59e0b', emoji: '💥' },
];

export default function SignInPage() {
  const [mode, setMode]         = useState<'password' | 'otp'>('password');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp]           = useState('');
  const [otpSent, setOtpSent]   = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: call /api/auth/signin
    setTimeout(() => setLoading(false), 1500);
  };

  const handleSendOtp = async () => {
    setLoading(true);
    // TODO: call /api/auth/send-otp
    setTimeout(() => { setOtpSent(true); setLoading(false); }, 1000);
  };

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <CinematicBackground theme="red" />
      <FloatingPosterCards posters={SIGNIN_POSTERS} side="both" />

      {/* Glassmorphism Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="glass-card p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-black text-glow-red">
                Unified<span className="text-[#e50914]">OTT</span>
              </span>
            </Link>
            <h1 className="text-3xl font-black mb-2">Welcome Back</h1>
            <p className="text-white/50 text-sm">Sign in to continue watching</p>
          </div>

          {/* Mode Toggle */}
          <div className="flex bg-white/5 rounded-xl p-1 mb-6">
            {(['password', 'otp'] as const).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setOtpSent(false); }}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                  mode === m
                    ? 'bg-[#e50914] text-white'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {m === 'password' ? '🔑 Password' : '📧 Email OTP'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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

            {mode === 'password' ? (
              /* Password Input */
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="w-full pl-11 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl
                             text-white placeholder-white/30 text-sm focus:outline-none
                             focus:border-[#e50914] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            ) : (
              /* OTP Mode */
              <div className="space-y-3">
                {!otpSent ? (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={loading || !email}
                    className="w-full py-3.5 bg-white/10 border border-white/20 rounded-xl text-sm
                               font-semibold hover:border-[#e50914] hover:bg-[#e50914]/10
                               transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    Send OTP to Email
                  </button>
                ) : (
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl
                               text-white placeholder-white/30 text-sm text-center tracking-[0.5em]
                               focus:outline-none focus:border-[#e50914] transition-colors"
                  />
                )}
              </div>
            )}

            {mode === 'password' && (
              <div className="text-right">
                <Link href="/forgot-password" className="text-xs text-white/40 hover:text-[#e50914] transition-colors">
                  Forgot password?
                </Link>
              </div>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-red py-3.5 rounded-xl font-bold flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Sign In <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 text-xs">or continue with</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* OAuth Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-3 glass rounded-xl
                               text-sm font-semibold hover:border-white/30 transition-all">
              <span className="text-lg">🔵</span> Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 glass rounded-xl
                               text-sm font-semibold hover:border-white/30 transition-all">
              <span className="text-lg">📘</span> Facebook
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-white/40 text-sm mt-6">
            New to Unified OTT?{' '}
            <Link href="/signup" className="text-[#e50914] font-semibold hover:underline">
              Create a free account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
