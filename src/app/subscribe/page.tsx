'use client';
import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Check, Monitor, Smartphone, Download, Zap, Shield } from 'lucide-react';
import CinematicBackground from '@/components/ui/CinematicBackground';

const PLANS = [
  {
    id: 'mobile',
    name: 'Mobile',
    price: 149,
    icon: Smartphone,
    quality: 'SD',
    qualityFull: 'SD 480p',
    screens: 1,
    color: '#e50914',
    glow: 'rgba(229,9,20,0.25)',
    badge: null,
    features: [
      'SD 480p quality',
      '1 screen at a time',
      'Phone & tablet only',
      'Standard ads included',
      '10,000+ titles',
    ],
    notFeatures: ['No ads', 'HD / 4K', 'Offline downloads', 'TV support'],
    cta: 'Start with Mobile',
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 499,
    icon: Monitor,
    quality: 'HD',
    qualityFull: 'Full HD 1080p',
    screens: 2,
    color: '#7c3aed',
    glow: 'rgba(124,58,237,0.35)',
    badge: 'Popular',
    features: [
      'Full HD 1080p quality',
      '2 screens simultaneously',
      'TV + Laptop + Mobile',
      'No ads',
      'Dolby Audio',
      '10,000+ titles',
    ],
    notFeatures: ['4K UHD', 'Offline downloads'],
    cta: 'Get Standard',
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 799,
    icon: Zap,
    quality: '4K',
    qualityFull: '4K UHD + Dolby Vision',
    screens: 4,
    color: '#e50914',
    glow: 'rgba(229,9,20,0.35)',
    badge: 'Best Value',
    features: [
      '4K UHD + HDR + Dolby Vision',
      '4 screens simultaneously',
      'All devices supported',
      'Offline downloads',
      'Dolby Atmos',
      '10,000+ titles',
    ],
    notFeatures: [],
    cta: 'Go Premium',
  },
];

function SubscribeContent() {
  const searchParams = useSearchParams();
  const defaultPlan  = searchParams.get('plan') ?? 'standard';
  const [selected, setSelected] = useState(defaultPlan);

  return (
    <>
      <div className="text-center mb-12">
        <Link href="/" className="inline-block mb-6">
          <span className="text-2xl font-black text-glow-red">
            Unified<span className="text-[#e50914]">OTT</span>
          </span>
        </Link>
        <h1 className="text-4xl md:text-5xl font-black mb-4">
          Choose Your <span className="text-[#e50914]">Plan</span>
        </h1>
        <p className="text-white/50 text-lg">Watch on any device. Cancel anytime. No hidden fees.</p>
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {PLANS.map((plan) => {
          const Icon      = plan.icon;
          const isSelected = selected === plan.id;
          return (
            <div
              key={plan.id}
              onClick={() => setSelected(plan.id)}
              className="relative glass-card p-8 flex flex-col cursor-pointer transition-all duration-300"
              style={{
                borderColor: isSelected ? plan.color : 'rgba(255,255,255,0.06)',
                boxShadow: isSelected ? `0 0 48px ${plan.glow}` : undefined,
                transform: isSelected ? 'scale(1.02)' : undefined,
              }}
            >
              {/* Badge */}
              {plan.badge && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1.5 text-xs font-black rounded-full tracking-wider"
                  style={{ background: plan.color }}
                >
                  ✦ {plan.badge}
                </div>
              )}

              {/* Selected ring */}
              {isSelected && (
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ border: `2px solid ${plan.color}`, borderRadius: '16px' }}
                />
              )}

              {/* Icon + Quality */}
              <div className="flex items-center justify-between mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${plan.color}20` }}
                >
                  <Icon className="w-6 h-6" style={{ color: plan.color }} />
                </div>
                <span
                  className="px-3 py-1.5 text-xs font-black rounded-lg tracking-widest"
                  style={{ background: `${plan.color}20`, color: plan.color }}
                >
                  {plan.quality}
                </span>
              </div>

              {/* Name & Price */}
              <h3 className="text-2xl font-black mb-1">{plan.name}</h3>
              <p className="text-white/40 text-xs mb-4">{plan.qualityFull} · {plan.screens} screen{plan.screens > 1 ? 's' : ''}</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black">₹{plan.price}</span>
                <span className="text-white/40 text-sm">/month</span>
              </div>

              {/* Features */}
              <ul className="space-y-2.5 flex-1 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white/70">
                    <Check className="w-4 h-4 flex-shrink-0" style={{ color: plan.color }} />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={`/payment?plan=${plan.id}`}
                onClick={(e) => e.stopPropagation()}
                className="block text-center py-3.5 rounded-xl font-bold text-sm transition-all hover:opacity-90"
                style={{ background: `linear-gradient(135deg, ${plan.color}, ${plan.color}cc)` }}
              >
                {plan.cta}
              </Link>
            </div>
          );
        })}
      </div>

      {/* Payment trust badges */}
      <div className="flex flex-col items-center gap-5">
        <div className="flex items-center gap-3 text-white/30 text-xs">
          <Shield className="w-4 h-4" />
          <span>SSL Secured · 256-bit Encryption · PCI DSS Compliant</span>
        </div>
        <div className="flex items-center gap-6 flex-wrap justify-center">
          {/* Stripe logo */}
          <div className="flex items-center gap-2 px-4 py-2 glass rounded-lg">
            <svg viewBox="0 0 60 25" width="60" height="25" fill="none">
              <text x="0" y="20" fontSize="22" fontWeight="bold" fill="#635bff" fontFamily="Arial">stripe</text>
            </svg>
          </div>
          {/* Razorpay logo */}
          <div className="flex items-center gap-2 px-4 py-2 glass rounded-lg">
            <svg viewBox="0 0 100 30" width="100" height="30" fill="none">
              <polygon points="10,5 25,5 18,15 30,15 15,28 22,16 12,16" fill="#3395ff"/>
              <text x="35" y="22" fontSize="16" fontWeight="bold" fill="#3395ff" fontFamily="Arial">Razorpay</text>
            </svg>
          </div>
          {/* UPI */}
          <div className="flex items-center gap-1 px-4 py-2 glass rounded-lg text-xs font-bold text-white/70">
            <span className="text-[#097939]">UPI</span>
            <span className="text-white/30">|</span>
            <span>Visa</span>
            <span className="text-white/30">|</span>
            <span>Mastercard</span>
            <span className="text-white/30">|</span>
            <span>RuPay</span>
          </div>
        </div>
        <p className="text-white/20 text-xs text-center mt-2">
          © 2025 Unified OTT · All plans include a 7-day free trial ·{' '}
          <Link href="/signin" className="hover:text-white/40 transition-colors">Already subscribed? Sign in</Link>
        </p>
      </div>
    </>
  );
}

export default function SubscribePage() {
  return (
    <main className="min-h-screen relative overflow-hidden py-16 px-4">
      <CinematicBackground theme="mixed" />
      <div className="relative z-10 max-w-5xl mx-auto">
        <Suspense fallback={null}>
          <SubscribeContent />
        </Suspense>
      </div>
    </main>
  );
}
