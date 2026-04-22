import {useState} from "react";
import {CORRIDORS_DATA} from "../data/archiveData";
import {BookCard} from "../components/BookCard";

export function LibraryPage({navigate, books = []}) {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("all");
  const [sort, setSort] = useState("rating");

  const tabs = [{id: "all", label: "ALL VOLUMES"}, ...CORRIDORS_DATA.map(c => ({id: c.id, label: c.label.toUpperCase()}))];

  const filtered = books
    .filter(b => genre === "all" || b.genre === genre)
    .filter(b => !query || b.title.toLowerCase().includes(query.toLowerCase()) || b.author.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => sort === "rating" ? b.rating - a.rating : sort === "year" ? b.year - a.year : a.title.localeCompare(b.title));

  return (
    <div className="page">
      <div className="page-hero" style={{minHeight: 280}}>
        <div className="page-hero-bg" style={{backgroundImage: "url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1400&q=80')"}} />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <div className="eyebrow">THE STACKS</div>
          <h1 className="display display-lg">The Library.</h1>
          <p className="body-text" style={{marginTop: 14}}>{books.length} volumes across five corridors. Each one waiting.</p>
        </div>
      </div>

      <div className="lib-controls">
        <div className="lib-search-row">
          <div className="lib-search">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c9a252" strokeWidth="1.5"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
            <input placeholder="Search by title or author…" value={query} onChange={e => setQuery(e.target.value)} />
          </div>
          <select className="lib-sort" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="rating">SORT BY RATING</option>
            <option value="year">SORT BY YEAR</option>
            <option value="title">SORT BY TITLE</option>
          </select>
        </div>
        <div className="genre-tabs">
          {tabs.map(t => (
            <button key={t.id} className={`genre-tab${genre === t.id ? " active" : ""}`} onClick={() => setGenre(t.id)}>{t.label}</button>
          ))}
        </div>
      </div>

      {filtered.length === 0
        ? <div className="no-results">No volumes found in these stacks.</div>
        : <div className="book-grid">
          {filtered.map(book => <BookCard key={book.id} book={book} navigate={navigate} />)}
        </div>
      }
    </div>
  );
}
