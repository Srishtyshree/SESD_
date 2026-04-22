export function HomeParticles() {
  const pts = Array.from({ length: 16 }, (_, i) => ({
    id: i, left: `${6 + Math.random() * 88}%`,
    size: `${2 + Math.random() * 2.5}px`,
    dur: `${14 + Math.random() * 18}s`,
    del: `${Math.random() * 14}s`,
    bot: `${Math.random() * 15}%`,
  }));
  return <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }}>
    {pts.map(p => <div key={p.id} className="particle" style={{ left: p.left, bottom: p.bot, width: p.size, height: p.size, animationDuration: p.dur, animationDelay: p.del }} />)}
  </div>;
}
