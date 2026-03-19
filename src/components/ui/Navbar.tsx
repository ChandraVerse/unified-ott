'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Play, Search, Bell } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4
                    bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-[#e50914] flex items-center justify-center">
          <Play className="w-4 h-4 text-white fill-white" />
        </div>
        <span className="text-xl font-black tracking-tight text-glow-red">
          Unified<span className="text-[#e50914]">OTT</span>
        </span>
      </Link>

      {/* Desktop Nav */}
      <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
        {['Home', 'Movies', 'Series', 'Live Sports'].map((item) => (
          <li key={item}>
            <Link
              href={`/${item.toLowerCase().replace(' ', '-')}`}
              className="hover:text-white transition-colors hover:text-[#e50914]"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>

      {/* Actions */}
      <div className="hidden md:flex items-center gap-4">
        <button className="p-2 text-white/70 hover:text-white transition-colors">
          <Search className="w-5 h-5" />
        </button>
        <button className="p-2 text-white/70 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <Link
          href="/signin"
          className="px-4 py-2 text-sm font-semibold text-white border border-white/20 rounded-lg
                     hover:border-white/60 transition-all glass"
        >
          Sign In
        </Link>
        <Link
          href="/signup"
          className="btn-red px-5 py-2 text-sm font-bold rounded-lg"
        >
          Get Started
        </Link>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden p-2 text-white"
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Drawer */}
      {open && (
        <div className="absolute top-full left-0 right-0 glass border-t border-white/10 p-6 flex flex-col gap-4">
          {['Home', 'Movies', 'Series', 'Live Sports'].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(' ', '-')}`}
              className="text-white/80 hover:text-[#e50914] font-medium"
              onClick={() => setOpen(false)}
            >
              {item}
            </Link>
          ))}
          <div className="flex gap-3 pt-2">
            <Link href="/signin" className="flex-1 text-center py-2 border border-white/20 rounded-lg text-sm font-semibold">
              Sign In
            </Link>
            <Link href="/signup" className="flex-1 text-center py-2 bg-[#e50914] rounded-lg text-sm font-bold">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
