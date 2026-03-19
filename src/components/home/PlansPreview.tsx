import Link from 'next/link';
import { Check } from 'lucide-react';

const PLANS = [
  {
    name: 'Mobile',
    price: '149',
    quality: 'SD',
    color: '#e50914',
    features: ['SD 480p quality', '1 screen at a time', 'Phone & tablet only', 'Standard ads'],
    badge: null,
    cta: 'Start with Mobile',
  },
  {
    name: 'Standard',
    price: '499',
    quality: 'HD',
    color: '#7c3aed',
    features: ['Full HD 1080p', '2 screens simultaneously', 'TV + Laptop + Mobile', 'No ads', 'Dolby Audio'],
    badge: 'Popular',
    cta: 'Get Standard',
  },
  {
    name: 'Premium',
    price: '799',
    quality: '4K',
    color: '#e50914',
    features: ['4K UHD + HDR + Dolby Vision', '4 screens simultaneously', 'All devices', 'Offline downloads', 'Dolby Atmos'],
    badge: 'Best Value',
    cta: 'Go Premium',
  },
];

export default function PlansPreview() {
  return (
    <section className="relative z-10 py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-black text-center mb-3">
        Simple, Transparent <span className="text-[#e50914]">Pricing</span>
      </h2>
      <p className="text-center text-white/50 mb-14">Watch on any device. Cancel anytime. No hidden fees.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className="glass-card p-8 relative flex flex-col"
            style={{
              borderColor: `${plan.color}30`,
              boxShadow: plan.badge ? `0 0 40px ${plan.color}20` : undefined,
            }}
          >
            {plan.badge && (
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-bold rounded-full"
                style={{ background: plan.color }}
              >
                {plan.badge}
              </div>
            )}

            <div className="mb-6">
              <span
                className="inline-block px-3 py-1 text-xs font-bold rounded mb-3"
                style={{ background: `${plan.color}20`, color: plan.color }}
              >
                {plan.quality}
              </span>
              <h3 className="text-2xl font-black">{plan.name}</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-black">&#x20B9;{plan.price}</span>
                <span className="text-white/40 text-sm">/month</span>
              </div>
            </div>

            <ul className="space-y-3 flex-1 mb-8">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-white/70">
                  <Check className="w-4 h-4 flex-shrink-0" style={{ color: plan.color }} />
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href={`/subscribe?plan=${plan.name.toLowerCase()}`}
              className="block text-center py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${plan.color}, ${plan.color}cc)` }}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
