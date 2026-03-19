import { Monitor, Download, Zap, Trophy } from 'lucide-react';

const FEATURES = [
  {
    icon: Monitor,
    title: 'Watch Everywhere',
    desc: 'Stream on your TV, laptop, tablet, or phone. Pick up right where you left off.',
    color: '#e50914',
  },
  {
    icon: Download,
    title: 'Download & Go',
    desc: 'Save your favourites with an eligible plan and watch them anywhere — even offline.',
    color: '#1d4ed8',
  },
  {
    icon: Zap,
    title: '4K Ultra HD',
    desc: 'Experience cinema-quality picture with 4K UHD, HDR, Dolby Vision and Dolby Atmos.',
    color: '#7c3aed',
  },
  {
    icon: Trophy,
    title: 'Live Sports',
    desc: 'Every cricket, football, kabaddi, and tennis match — live and in stunning HD.',
    color: '#f59e0b',
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative z-10 py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-black text-center mb-4">
        Why Choose <span className="text-[#e50914]">Unified OTT</span>?
      </h2>
      <p className="text-center text-white/50 mb-14">
        Everything you love about streaming — in one powerful platform.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="glass-card p-6 hover:border-white/20 transition-all group"
            style={{ borderColor: `${f.color}20` }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
              style={{ background: `${f.color}20` }}
            >
              <f.icon className="w-6 h-6" style={{ color: f.color }} />
            </div>
            <h3 className="text-lg font-bold mb-2">{f.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
