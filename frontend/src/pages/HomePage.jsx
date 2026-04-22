import { useFadeIn } from "../hooks/useFadeIn";
import { HomeParticles } from "../components/HomeParticles";
import { RosetteIcon } from "../components/RosetteIcon";
import { CORRIDORS_DATA } from "../data/archiveData";
import { BookCard } from "../components/BookCard";

export function HomePage({ navigate, books }) {
  const r1 = useFadeIn(), r2 = useFadeIn(), r3 = useFadeIn(), r4 = useFadeIn(), r5 = useFadeIn();
  
  // Dynamic slices from fetched books
  const featured = books.filter(b => b.rating > 4.7).slice(0, 4);
  const newArrivals = books.slice(0, 4);

  return (
    <div className="page">
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-img" />
        <div className="hero-bg-ov" />
        <HomeParticles />
        <div className="container hero-content">
          <div className="hero-inner">
            <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.6)' }}>🕯 EST. 1887 · THE LUMINARY ARCHIVE</div>
            <h1 className="display display-xl">Enter <em>the quiet</em><br />between pages.</h1>
            <p className="body-text" style={{ fontSize: '20px', color: 'rgba(255,255,255,0.7)', marginBottom: '40px' }}>
              A curated reading room for old souls. Explore {books.length} volumes across five corridors, bound in shadow and gilt.
            </p>
            <div className="hero-cta" style={{ display: 'flex', gap: '16px' }}>
              <button className="btn-primary" onClick={() => navigate("library")}>WANDER THE STACKS</button>
              <button className="btn-outline" onClick={() => navigate("quill")}>TAKE UP THE QUILL</button>
            </div>
          </div>
        </div>
        <RosetteIcon />
      </section>

      {/* STATS */}
      <div className="stats-bar">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', width: '100%', padding: 0 }}>
          {[{ n: books.length, l: "VOLUMES" }, { n: "5", l: "CORRIDORS" }, { n: "3,291", l: "READERS" }, { n: "1887", l: "ESTABLISHED" }].map(s => (
            <div key={s.l} className="stat-item"><span className="stat-n">{s.n}</span><span className="stat-l">{s.l}</span></div>
          ))}
        </div>
      </div>

      {/* CORRIDORS */}
      <section className="section fade-up" ref={r1}>
        <div className="container">
          <div className="section-header">
            <div>
              <div className="eyebrow">VOLUMES I — V</div>
              <h2 className="display display-lg">Choose your corridor.</h2>
            </div>
            <a className="see-all" onClick={() => navigate("library")}>SEE ALL VOLUMES →</a>
          </div>

          <div className="corridor-unified-grid">
            <CorridorCard id="fiction" data={CORRIDORS_DATA[0]} onClick={() => navigate("corridor", { id: "fiction" })} />
            <CorridorCard id="literature" data={CORRIDORS_DATA[1]} onClick={() => navigate("corridor", { id: "literature" })} />
            <CorridorCard id="thriller" data={CORRIDORS_DATA[2]} onClick={() => navigate("corridor", { id: "thriller" })} />
            <CorridorCard id="historical" data={CORRIDORS_DATA[3]} onClick={() => navigate("corridor", { id: "historical" })} />
            <CorridorCard id="scifi" data={CORRIDORS_DATA[4]} onClick={() => navigate("corridor", { id: "scifi" })} />
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* NEW ARRIVALS */}
      <section className="section fade-up" ref={r5}>
        <div className="container">
          <div className="section-header">
            <div>
              <div className="eyebrow">FRESH INK ON PARCHMENT</div>
              <h2 className="display display-lg">Newly Archived.</h2>
            </div>
          </div>
          <div className="book-grid">
            {newArrivals.map(book => (
              <BookCard key={book.id || book._id} book={book} navigate={navigate} />
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* QUOTE */}
      <section className="quote-section fade-up" ref={r2} style={{ padding: '140px 0' }}>
        <div className="container">
          <div className="quote-inner" style={{ margin: '0 auto' }}>
            <div className="eyebrow" style={{ marginBottom: 32 }}>READER REFLECTIONS</div>
            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: '38px', fontStyle: 'italic', lineHeight: 1.4, color: '#fff', marginBottom: 32 }}>
              "A library is not a luxury but one of the <em>necessities of life</em> — the place where time folds back upon itself."
            </p>
            <div className="quote-attr" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>— Henry Ward Beecher, Archive Fellow</div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* FEATURED */}
      <section className="section fade-up" ref={r3}>
        <div className="container">
          <div className="section-header">
            <div>
              <div className="eyebrow">ILLUMINATED VOLUMES</div>
              <h2 className="display display-lg">Tonight's selection.</h2>
            </div>
          </div>
          <div className="book-grid">
            {featured.map(book => (
              <BookCard key={book.id || book._id} book={book} navigate={navigate} />
            ))}
          </div>
        </div>
      </section>

      {/* HOUSE OF QUILLS */}
      <section className="house-of-quills fade-up" ref={r4}>
        <div className="container">
          <div className="eyebrow">A HOUSE OF QUILLS</div>
          <h2 className="display display-lg" style={{ marginBottom: 24 }}>Every reader keeps a <em>secret draft.</em></h2>
          <p className="body-text" style={{ fontStyle: 'italic', marginBottom: 40, opacity: 0.8, maxWidth: '600px', margin: '0 auto 40px' }}>
            Publish your own stories to the community shelf. Let strangers underline your sentences. Our AI assistant awaits.
          </p>
          <button className="btn-primary" onClick={() => navigate("quill")}>BEGIN A MANUSCRIPT</button>
        </div>
      </section>
    </div>
  );
}

function CorridorCard({ id, data, onClick }) {
  return (
    <div className={`c-card c-area-${id}`} onClick={onClick}>
      <div className="c-card-bg" style={{ backgroundImage: `url(${data.image})` }} />
      <div className="c-card-ov" />
      <div className="c-card-content">
        <div className="eyebrow" style={{ marginBottom: 8, fontSize: '10px' }}>{data.volume}</div>
        <h3 className="c-card-title">{data.label}</h3>
      </div>
    </div>
  );
}
