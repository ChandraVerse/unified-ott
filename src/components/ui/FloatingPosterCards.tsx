'use client';

interface Poster {
  title: string;
  color: string;
  emoji: string;
}

interface FloatingPosterCardsProps {
  posters?: Poster[];
  side?: 'left' | 'right' | 'both';
}

const DEFAULT_POSTERS: Poster[] = [
  { title: 'Batman', color: '#1d4ed8', emoji: '🦇' },
  { title: 'Stranger Things', color: '#7c3aed', emoji: '🔦' },
  { title: 'Avengers', color: '#e50914', emoji: '⚡' },
  { title: 'Dune', color: '#f59e0b', emoji: '🏜️' },
  { title: 'Interstellar', color: '#1d4ed8', emoji: '🚀' },
  { title: 'Oppenheimer', color: '#f59e0b', emoji: '💥' },
];

export default function FloatingPosterCards({
  posters = DEFAULT_POSTERS,
  side = 'both',
}: FloatingPosterCardsProps) {
  const leftPosters  = posters.slice(0, 3);
  const rightPosters = posters.slice(3, 6);

  const renderCard = (poster: Poster, index: number, isLeft: boolean) => {
    const rotate = isLeft ? -(6 + index * 3) : (4 + index * 3);
    const top    = 15 + index * 22;

    return (
      <div
        key={poster.title}
        className="absolute w-28 rounded-xl overflow-hidden"
        style={{
          '--card-rotate': `${rotate}deg`,
          top: `${top}%`,
          [isLeft ? 'left' : 'right']: '-2%',
          transform: `rotate(${rotate}deg)`,
          animation: `float-card ${5 + index * 0.8}s ease-in-out infinite`,
          animationDelay: `${index * 0.5}s`,
          boxShadow: `0 8px 32px ${poster.color}60`,
          border: `1px solid ${poster.color}40`,
          zIndex: 1,
        } as React.CSSProperties}
      >
        <div
          className="aspect-[2/3] flex flex-col items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${poster.color}30, ${poster.color}10)` }}
        >
          <span className="text-4xl">{poster.emoji}</span>
          <span className="text-[10px] text-white/60 text-center mt-2 px-2 leading-tight">
            {poster.title}
          </span>
        </div>
      </div>
    );
  };

  return (
    <>
      {(side === 'left' || side === 'both') && (
        <div className="fixed left-0 top-0 h-full w-36 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
          {leftPosters.map((p, i) => renderCard(p, i, true))}
        </div>
      )}
      {(side === 'right' || side === 'both') && (
        <div className="fixed right-0 top-0 h-full w-36 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
          {rightPosters.map((p, i) => renderCard(p, i, false))}
        </div>
      )}
    </>
  );
}
