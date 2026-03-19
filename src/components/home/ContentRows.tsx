'use client';
import { ChevronLeft, ChevronRight, Star, Tv } from 'lucide-react';
import { useRef } from 'react';

const MOCK_ITEMS = [
  { id: 1,  title: 'Pathaan',           emoji: '🎙️', color: '#e50914', year: 2023, rating: 7.2 },
  { id: 2,  title: 'RRR',               emoji: '💥', color: '#f59e0b', year: 2022, rating: 8.0 },
  { id: 3,  title: 'KGF Chapter 2',     emoji: '💠', color: '#f59e0b', year: 2022, rating: 8.3 },
  { id: 4,  title: 'Jawan',             emoji: '🚀', color: '#e50914', year: 2023, rating: 7.5 },
  { id: 5,  title: 'Animal',            emoji: '🐺', color: '#7c3aed', year: 2023, rating: 7.1 },
  { id: 6,  title: 'Kalki 2898 AD',     emoji: '⚙️',  color: '#1d4ed8', year: 2024, rating: 7.8 },
  { id: 7,  title: 'Dunki',             emoji: '🌍', color: '#e50914', year: 2023, rating: 6.9 },
  { id: 8,  title: 'Fighter',           emoji: '✈️',  color: '#1d4ed8', year: 2024, rating: 7.3 },
  { id: 9,  title: 'Stree 2',           emoji: '👻', color: '#7c3aed', year: 2024, rating: 8.2 },
  { id: 10, title: 'Singham Again',     emoji: '🔥', color: '#e50914', year: 2024, rating: 6.5 },
];

const SERIES = [
  { id: 1,  title: 'Mirzapur S3',         emoji: '🔫', color: '#e50914', year: 2024, rating: 8.6 },
  { id: 2,  title: 'Sacred Games',         emoji: '🗡️',  color: '#7c3aed', year: 2023, rating: 8.7 },
  { id: 3,  title: 'Panchayat S3',         emoji: '🌿', color: '#f59e0b', year: 2024, rating: 9.1 },
  { id: 4,  title: 'Aspirants S2',         emoji: '📚', color: '#1d4ed8', year: 2024, rating: 9.3 },
  { id: 5,  title: 'Kota Factory S3',      emoji: '🎓', color: '#1d4ed8', year: 2024, rating: 9.0 },
  { id: 6,  title: 'Scam 2003',            emoji: '💰', color: '#f59e0b', year: 2023, rating: 8.4 },
  { id: 7,  title: 'Delhi Crime S3',       emoji: '🕵️',  color: '#e50914', year: 2024, rating: 8.2 },
  { id: 8,  title: 'Taj: Divided by Blood',emoji: '👑', color: '#7c3aed', year: 2023, rating: 7.8 },
];

const LIVE_SPORTS = [
  { id: 1,  title: 'IND vs PAK — T20I', emoji: '🏏', color: '#e50914', viewers: '2.4M', isLive: true },
  { id: 2,  title: 'IPL 2025 — CSK vs MI', emoji: '🏏', color: '#f59e0b', viewers: '5.1M', isLive: true },
  { id: 3,  title: 'UEFA Champions League', emoji: '⚽', color: '#1d4ed8', viewers: '1.8M', isLive: false },
  { id: 4,  title: 'Pro Kabaddi League',    emoji: '🤼', color: '#7c3aed', viewers: '0.9M', isLive: true },
  { id: 5,  title: 'Wimbledon 2025',        emoji: '🎾', color: '#f59e0b', viewers: '1.2M', isLive: false },
  { id: 6,  title: 'Formula 1 — Monaco GP', emoji: '🏎️', color: '#e50914', viewers: '3.3M', isLive: true },
];

function ContentCard({ item, isLive }: { item: typeof MOCK_ITEMS[0] & { viewers?: string; isLive?: boolean }; isLive?: boolean }) {
  return (
    <div className="flex-shrink-0 w-40 md:w-48 group cursor-pointer">
      <div
        className="aspect-[2/3] rounded-xl flex flex-col items-center justify-center mb-2 relative overflow-hidden
                   group-hover:scale-105 transition-transform duration-300"
        style={{
          background: `linear-gradient(135deg, ${item.color}30, ${item.color}10)`,
          border: `1px solid ${item.color}30`,
          boxShadow: `0 4px 20px ${item.color}20`,
        }}
      >
        <span className="text-5xl">{item.emoji}</span>
        {isLive && item.isLive && (
          <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 bg-[#e50914] rounded text-[10px] font-bold">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> LIVE
          </div>
        )}
        {isLive && (
          <div className="absolute bottom-2 right-2 flex items-center gap-1 text-[10px] text-white/60">
            <Tv className="w-3 h-3" /> {item.viewers}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <p className="text-sm font-semibold text-white truncate">{item.title}</p>
      {!isLive && (
        <div className="flex items-center gap-1 mt-1">
          <Star className="w-3 h-3 fill-[#f59e0b] text-[#f59e0b]" />
          <span className="text-xs text-white/50">{(item as typeof MOCK_ITEMS[0]).rating}</span>
          <span className="text-xs text-white/30">· {(item as typeof MOCK_ITEMS[0]).year}</span>
        </div>
      )}
    </div>
  );
}

function RowSection({
  title, badge, items, isLive = false,
}: {
  title: string;
  badge?: string;
  items: (typeof MOCK_ITEMS[0] & { viewers?: string; isLive?: boolean })[];
  isLive?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 'left' | 'right') => {
    if (ref.current) ref.current.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
  };

  return (
    <div className="py-8">
      <div className="flex items-center justify-between px-6 md:px-12 mb-5">
        <div className="flex items-center gap-3">
          <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
          {badge && (
            <span className="px-2 py-0.5 text-[10px] font-bold bg-[#e50914] rounded">{badge}</span>
          )}
        </div>
        <div className="flex gap-2">
          <button onClick={() => scroll('left')} className="p-2 glass rounded-lg hover:border-white/30 transition">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={() => scroll('right')} className="p-2 glass rounded-lg hover:border-white/30 transition">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto hide-scrollbar px-6 md:px-12 pb-2"
      >
        {items.map((item) => (
          <ContentCard key={item.id} item={item} isLive={isLive} />
        ))}
      </div>
    </div>
  );
}

export default function ContentRows() {
  return (
    <section className="relative z-10 py-12 max-w-full">
      <RowSection title="Trending Now"   badge="HOT"  items={MOCK_ITEMS} />
      <RowSection title="New Releases"               items={[...MOCK_ITEMS].reverse()} />
      <RowSection title="Top Series"                  items={SERIES as never} />
      <RowSection title="Live Channels"  badge="LIVE" items={LIVE_SPORTS as never} isLive />
    </section>
  );
}
