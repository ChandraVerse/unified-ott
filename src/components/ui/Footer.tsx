import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#020617] border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xl font-black text-glow-red mb-3">
              Unified<span className="text-[#e50914]">OTT</span>
            </h3>
            <p className="text-white/50 text-sm leading-relaxed">
              India&apos;s ultimate streaming destination. Movies, Series & Live Sports — all in one place.
            </p>
          </div>
          {/* Links */}
          {[
            { title: 'Company',  links: ['About Us', 'Careers', 'Press', 'Blog'] },
            { title: 'Legal',    links: ['Privacy Policy', 'Terms of Use', 'Cookie Policy', 'DMCA'] },
            { title: 'Support',  links: ['Help Center', 'Contact Us', 'FAQ', 'Device Support'] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-bold text-white/80 mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-sm text-white/40 hover:text-[#e50914] transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © 2025 Unified OTT. All rights reserved. Made with ❤️ in India.
          </p>
          <div className="flex items-center gap-4">
            {['🍎 App Store', '▶ Google Play'].map((badge) => (
              <button
                key={badge}
                className="px-4 py-2 text-xs font-semibold text-white/60 border border-white/10
                           rounded-lg hover:border-white/30 transition-colors"
              >
                {badge}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
