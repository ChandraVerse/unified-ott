'use client';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    q: 'Can I cancel my subscription anytime?',
    a: 'Yes! You can cancel your Unified OTT subscription at any time with no cancellation fees. Your access continues until the end of the billing period.',
  },
  {
    q: 'How many devices can I stream on simultaneously?',
    a: 'Mobile plan: 1 device, Standard plan: 2 devices simultaneously, Premium plan: up to 4 devices at the same time.',
  },
  {
    q: 'Is 4K content available on all plans?',
    a: '4K UHD, HDR, and Dolby Vision content is available exclusively on the Premium plan. Standard plan supports Full HD 1080p.',
  },
  {
    q: 'Can I download content for offline viewing?',
    a: 'Offline downloads are available on the Premium plan. You can download movies and series episodes to watch without internet on supported devices.',
  },
  {
    q: 'Are live sports available on all plans?',
    a: 'Live sports are available on all plans, though some premium matches require a Standard or Premium subscription for HD/4K streaming.',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'We accept Credit/Debit Cards (Visa, Mastercard, RuPay), UPI (GPay, PhonePe, Paytm, BHIM), Net Banking, and all major wallets through Stripe and Razorpay.',
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative z-10 py-24 px-6 md:px-12 max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-black text-center mb-3">
        Frequently Asked <span className="text-[#e50914]">Questions</span>
      </h2>
      <p className="text-center text-white/50 mb-12">Still have questions? Contact our support team 24/7.</p>

      <div className="space-y-3">
        {FAQS.map((faq, i) => (
          <div key={i} className="glass-card overflow-hidden">
            <button
              className="w-full flex items-center justify-between p-5 text-left"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="font-semibold text-sm md:text-base pr-4">{faq.q}</span>
              {open === i
                ? <Minus className="w-5 h-5 text-[#e50914] flex-shrink-0" />
                : <Plus  className="w-5 h-5 text-white/50 flex-shrink-0" />}
            </button>
            {open === i && (
              <div className="px-5 pb-5 text-sm text-white/60 leading-relaxed border-t border-white/5">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
