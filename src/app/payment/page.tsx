'use client';
import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  CreditCard, Smartphone, Building2, Lock,
  ChevronRight, Loader2, CheckCircle2, ArrowLeft, Shield
} from 'lucide-react';
import CinematicBackground from '@/components/ui/CinematicBackground';
import FloatingPosterCards from '@/components/ui/FloatingPosterCards';

const BOLLYWOOD_POSTERS = [
  { title: 'Pathaan',  color: '#e50914', emoji: '🎙️' },
  { title: 'RRR',      color: '#f59e0b', emoji: '💥' },
  { title: 'KGF',      color: '#f59e0b', emoji: '💠' },
  { title: 'Jawan',    color: '#e50914', emoji: '🚀' },
  { title: 'Animal',   color: '#7c3aed', emoji: '🐺' },
  { title: 'Stree 2',  color: '#7c3aed', emoji: '👻' },
];

const PLANS: Record<string, { name: string; price: number; color: string }> = {
  mobile:   { name: 'Mobile',   price: 149, color: '#e50914' },
  standard: { name: 'Standard', price: 499, color: '#7c3aed' },
  premium:  { name: 'Premium',  price: 799, color: '#e50914' },
};

const PLATFORM_FEE = 20;
const GST_RATE     = 0.18;

type Tab = 'card' | 'upi' | 'razorpay' | 'netbanking';

const UPI_APPS = [
  { name: 'GPay',     color: '#4285f4', emoji: '🔵' },
  { name: 'PhonePe',  color: '#5f259f', emoji: '🟣' },
  { name: 'Paytm',    color: '#00b9f1', emoji: '🔷' },
  { name: 'BHIM',     color: '#0076be', emoji: '🏛️' },
];

const BANKS = [
  'State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank',
  'Kotak Mahindra Bank', 'Punjab National Bank', 'Bank of Baroda',
  'Canara Bank', 'Union Bank of India', 'IndusInd Bank',
];

function detectCard(num: string): string {
  if (/^4/.test(num))              return 'Visa';
  if (/^5[1-5]/.test(num))         return 'Mastercard';
  if (/^6/.test(num))              return 'RuPay';
  if (/^3[47]/.test(num))          return 'Amex';
  return '';
}

function formatCardNum(val: string): string {
  return val.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})/g, '$1 ').trim();
}

function PaymentContent() {
  const searchParams = useSearchParams();
  const planId  = searchParams.get('plan') ?? 'standard';
  const plan    = PLANS[planId] ?? PLANS.standard;

  const subtotal = plan.price + PLATFORM_FEE;
  const gst      = Math.round(subtotal * GST_RATE);
  const total    = subtotal + gst;

  const [tab,      setTab]      = useState<Tab>('card');
  const [cardNum,  setCardNum]  = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry,   setExpiry]   = useState('');
  const [cvv,      setCvv]      = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [upiId,    setUpiId]    = useState('');
  const [upiVerified, setUpiVerified] = useState(false);
  const [bank,     setBank]     = useState('');
  const [loading,  setLoading]  = useState(false);
  const [paid,     setPaid]     = useState(false);

  const cardType = detectCard(cardNum.replace(/\s/g, ''));

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setPaid(true);
    setLoading(false);
  };

  if (paid) {
    return (
      <div className="max-w-md mx-auto glass-card p-12 text-center">
        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-10 h-10 text-green-400" />
        </div>
        <h2 className="text-3xl font-black mb-3">Payment Successful!</h2>
        <p className="text-white/50 mb-2">
          You&apos;re now subscribed to{' '}
          <span className="font-bold text-white">{plan.name} Plan</span>
        </p>
        <p className="text-white/30 text-sm mb-8">
          ₹{total} charged. Confirmation sent to your email.
        </p>
        <Link href="/" className="btn-red px-8 py-3.5 rounded-xl font-bold inline-flex items-center gap-2">
          Start Watching <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <Link href="/" className="inline-block mb-4">
          <span className="text-2xl font-black text-glow-red">
            Unified<span className="text-[#e50914]">OTT</span>
          </span>
        </Link>
        <h1 className="text-3xl md:text-4xl font-black mb-3">Complete Your Payment</h1>
        <p className="text-white/40 text-sm">Secure checkout powered by Stripe & Razorpay</p>
      </div>

      {/* Selected plan banner */}
      <div
        className="flex items-center justify-between px-6 py-4 rounded-xl mb-8"
        style={{ background: `${plan.color}15`, border: `1px solid ${plan.color}40` }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center"
               style={{ background: plan.color }}>
            <span className="text-xs font-black text-white">✓</span>
          </div>
          <span className="font-bold">{plan.name} Plan — ₹{plan.price}/month</span>
        </div>
        <span className="text-xs px-3 py-1 rounded-full font-bold"
              style={{ background: `${plan.color}25`, color: plan.color }}>
          ✅ Current Selection
        </span>
        <Link href="/subscribe" className="text-xs text-white/40 hover:text-white/70 flex items-center gap-1 transition-colors">
          <ArrowLeft className="w-3 h-3" /> Change
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment form — left 2/3 */}
        <div className="lg:col-span-2">
          <div className="glass-card p-6 md:p-8">
            {/* Tab selector */}
            <div className="flex gap-1 p-1 bg-white/5 rounded-xl mb-8 flex-wrap">
              {([
                { id: 'card',       label: 'Card',        Icon: CreditCard  },
                { id: 'upi',        label: 'UPI',         Icon: Smartphone  },
                { id: 'razorpay',   label: 'Razorpay',    Icon: Shield      },
                { id: 'netbanking', label: 'Netbanking',  Icon: Building2   },
              ] as { id: Tab; label: string; Icon: React.ElementType }[]).map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold rounded-lg transition-all ${
                    tab === id
                      ? 'bg-[#e50914] text-white'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />{label}
                </button>
              ))}
            </div>

            <form onSubmit={handlePay}>
              {/* CARD TAB */}
              {tab === 'card' && (
                <div className="space-y-4">
                  <p className="text-xs text-white/30 mb-4 flex items-center gap-2">
                    <Lock className="w-3 h-3" /> Powered by Stripe — 256-bit SSL
                  </p>

                  {/* Card number */}
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNum}
                      onChange={(e) => setCardNum(formatCardNum(e.target.value))}
                      placeholder="Card Number"
                      maxLength={19}
                      className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl
                                 text-white placeholder-white/30 text-sm tracking-widest
                                 focus:outline-none focus:border-[#e50914] transition-colors"
                    />
                    {cardType && (
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-white/50">
                        {cardType}
                      </span>
                    )}
                  </div>

                  {/* Cardholder */}
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Cardholder Name"
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl
                               text-white placeholder-white/30 text-sm
                               focus:outline-none focus:border-[#e50914] transition-colors"
                  />

                  {/* Expiry + CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => {
                        const v = e.target.value.replace(/\D/g,'').slice(0,4);
                        setExpiry(v.length > 2 ? v.slice(0,2) + '/' + v.slice(2) : v);
                      }}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl
                                 text-white placeholder-white/30 text-sm
                                 focus:outline-none focus:border-[#e50914] transition-colors"
                    />
                    <div className="relative">
                      <input
                        type="password"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g,'').slice(0,4))}
                        placeholder="CVV"
                        maxLength={4}
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl
                                   text-white placeholder-white/30 text-sm
                                   focus:outline-none focus:border-[#e50914] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Save card */}
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <div
                      onClick={() => setSaveCard(!saveCard)}
                      className={`w-5 h-5 rounded border transition-all flex items-center justify-center ${
                        saveCard ? 'bg-[#e50914] border-[#e50914]' : 'border-white/20'
                      }`}
                    >
                      {saveCard && <span className="text-[10px] text-white font-black">✓</span>}
                    </div>
                    <span className="text-sm text-white/60">Save card for future payments</span>
                  </label>
                </div>
              )}

              {/* UPI TAB */}
              {tab === 'upi' && (
                <div className="space-y-5">
                  <p className="text-xs text-white/30 mb-2 flex items-center gap-2">
                    <Lock className="w-3 h-3" /> Powered by Razorpay
                  </p>

                  {/* Quick UPI app buttons */}
                  <div className="grid grid-cols-4 gap-3">
                    {UPI_APPS.map((app) => (
                      <button
                        key={app.name}
                        type="button"
                        className="flex flex-col items-center gap-2 p-3 glass rounded-xl
                                   hover:border-white/30 transition-all group"
                      >
                        <span className="text-2xl">{app.emoji}</span>
                        <span className="text-[10px] text-white/50 font-semibold group-hover:text-white/80">
                          {app.name}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-xs text-white/30">or enter UPI ID</span>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>

                  {/* UPI ID input */}
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => { setUpiId(e.target.value); setUpiVerified(false); }}
                      placeholder="yourname@upi"
                      className="flex-1 px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl
                                 text-white placeholder-white/30 text-sm
                                 focus:outline-none focus:border-[#e50914] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setUpiVerified(!!upiId)}
                      className="px-4 py-3.5 glass rounded-xl text-sm font-semibold
                                 hover:border-[#e50914] hover:text-[#e50914] transition-all whitespace-nowrap"
                    >
                      Verify
                    </button>
                  </div>
                  {upiVerified && (
                    <p className="text-xs text-green-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> UPI ID verified
                    </p>
                  )}

                  {/* QR */}
                  <button
                    type="button"
                    className="w-full py-3 glass rounded-xl text-sm font-semibold
                               hover:border-white/30 transition-all flex items-center justify-center gap-2"
                  >
                    <span>⬛</span> Scan QR Code
                  </button>
                </div>
              )}

              {/* RAZORPAY TAB */}
              {tab === 'razorpay' && (
                <div className="text-center py-8 space-y-6">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto"
                       style={{ background: 'rgba(51,149,255,0.15)', border: '1px solid rgba(51,149,255,0.3)' }}>
                    <svg viewBox="0 0 40 40" width="32" height="32">
                      <polygon points="8,4 22,4 14,18 26,18 12,36 18,20 8,20" fill="#3395ff"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Pay with Razorpay</h3>
                    <p className="text-white/50 text-sm max-w-xs mx-auto">
                      Click below to open the Razorpay checkout — supports UPI, cards, netbanking & wallets.
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto text-xs text-white/40">
                    <div className="glass rounded-lg p-2 text-center">UPI</div>
                    <div className="glass rounded-lg p-2 text-center">Cards</div>
                    <div className="glass rounded-lg p-2 text-center">Wallets</div>
                  </div>
                </div>
              )}

              {/* NETBANKING TAB */}
              {tab === 'netbanking' && (
                <div className="space-y-5">
                  <p className="text-xs text-white/30 mb-2 flex items-center gap-2">
                    <Building2 className="w-3 h-3" /> Select your bank to proceed
                  </p>
                  <select
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl
                               text-white text-sm focus:outline-none focus:border-[#e50914]
                               transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-[#020617]">-- Select your bank --</option>
                    {BANKS.map((b) => (
                      <option key={b} value={b} className="bg-[#020617]">{b}</option>
                    ))}
                  </select>
                  {bank && (
                    <p className="text-xs text-white/40">
                      You will be redirected to <strong className="text-white/70">{bank}</strong>&apos;s secure portal.
                    </p>
                  )}
                </div>
              )}

              {/* Pay button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-red py-4 rounded-xl font-black text-base flex items-center
                           justify-center gap-3 mt-8 disabled:opacity-70"
              >
                {loading ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Processing…</>
                ) : (
                  <><Lock className="w-4 h-4" /> Pay Now — ₹{total}</>
                )}
              </button>

              {/* Trust badges row */}
              <div className="flex items-center justify-center gap-4 mt-5 flex-wrap">
                <div className="flex items-center gap-1.5 text-[10px] text-white/30 font-semibold">
                  <Lock className="w-3 h-3" /> SSL Secured
                </div>
                <div className="w-px h-3 bg-white/10" />
                <div className="flex items-center gap-1.5 text-[10px] text-white/30 font-semibold">
                  🛡️ 256-bit Encryption
                </div>
                <div className="w-px h-3 bg-white/10" />
                <svg viewBox="0 0 50 20" width="50" height="20">
                  <text x="0" y="16" fontSize="14" fontWeight="bold" fill="#635bff" fontFamily="Arial">stripe</text>
                </svg>
                <div className="w-px h-3 bg-white/10" />
                <svg viewBox="0 0 80 20" width="80" height="20">
                  <polygon points="2,2 10,2 6,9 14,9 5,18 8,10 2,10" fill="#3395ff"/>
                  <text x="16" y="16" fontSize="11" fontWeight="bold" fill="#3395ff" fontFamily="Arial">Razorpay</text>
                </svg>
              </div>
            </form>
          </div>
        </div>

        {/* Order summary — right 1/3 */}
        <div>
          <div className="glass-card p-6 sticky top-24">
            <h3 className="text-sm font-bold text-white/60 mb-5 uppercase tracking-widest">Order Summary</h3>

            <div className="space-y-3 text-sm mb-5">
              <div className="flex justify-between">
                <span className="text-white/60">{plan.name} Plan (1 month)</span>
                <span className="font-semibold">₹{plan.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Platform Fee</span>
                <span className="font-semibold">₹{PLATFORM_FEE}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">GST (18%)</span>
                <span className="font-semibold">₹{gst}</span>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 flex justify-between items-center">
              <span className="font-black text-base">Total</span>
              <span
                className="text-2xl font-black"
                style={{ color: plan.color }}
              >
                ₹{total}
              </span>
            </div>

            <div className="mt-5 p-3 rounded-lg text-xs text-white/40 text-center"
                 style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              🔄 Cancel anytime. Billed monthly. No hidden fees.
            </div>

            {/* Plan features mini list */}
            <div className="mt-5 space-y-2">
              {tab === 'card' && (
                <div className="text-xs text-white/30 flex items-center gap-2">
                  <span className="text-green-400">✓</span> Visa, Mastercard, RuPay, Amex
                </div>
              )}
              <div className="text-xs text-white/30 flex items-center gap-2">
                <span className="text-green-400">✓</span> Instant activation after payment
              </div>
              <div className="text-xs text-white/30 flex items-center gap-2">
                <span className="text-green-400">✓</span> 7-day free trial included
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <main className="min-h-screen relative overflow-hidden py-16 px-4">
      <CinematicBackground theme="red" />
      <FloatingPosterCards posters={BOLLYWOOD_POSTERS} side="both" />
      <div className="relative z-10">
        <Suspense fallback={null}>
          <PaymentContent />
        </Suspense>
      </div>
    </main>
  );
}
