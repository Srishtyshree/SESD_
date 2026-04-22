import { useState } from "react";
import { COMMUNITY_POSTS } from "../data/archiveData";

export function CommunityPage({ navigate, books }) {
  const [filter, setFilter] = useState("all");
  const genres = ["all", "Fiction", "Literature", "Thriller", "Historical", "Sci-Fi"];
  const filtered = filter === "all" ? COMMUNITY_POSTS : COMMUNITY_POSTS.filter(p => p.genre === filter);

  return (
    <div className="page">
      <div className="page-hero" style={{ minHeight: 280 }}>
        <div className="page-hero-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1400&q=80')" }} />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <div className="eyebrow">THE MARGINALIA WALL</div>
          <h1 className="display display-lg">Words between the words.</h1>
          <p className="body-text" style={{ marginTop: 14 }}>Readers leave traces. These are theirs.</p>
        </div>
      </div>

      <div className="community-header-section">
        <div className="eyebrow">COMMUNITY · FELLOWS OF THE ARCHIVE</div>
        <div className="community-stats">
          {[{ n: "3,291", l: "ACTIVE READERS" }, { n: "12,847", l: "MARGINALIA NOTES" }, { n: "841", l: "THIS MONTH" }, { n: "25", l: "VOLUMES DISCUSSED" }].map(s => (
            <div key={s.l} className="comm-stat">
              <span className="comm-stat-n">{s.n}</span>
              <span className="comm-stat-l">{s.l}</span>
            </div>
          ))}
        </div>
        <div className="genre-tabs" style={{ marginTop: 28 }}>
          {genres.map(g => (
            <button key={g} className={`genre-tab${filter === g ? " active" : ""}`} onClick={() => setFilter(g)}>
              {g === "all" ? "ALL CORRIDORS" : g.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="community-wall">
        {filtered.map(post => (
          <div key={post.id} className="community-post">
            <div className="post-header">
              <div className="post-avatar">{post.avatar}</div>
              <div>
                <span className="post-user">{post.user}</span>
                <span className="post-date">{post.date}</span>
              </div>
            </div>
            <p className="post-txt">"{post.text}"</p>
            <div className="post-book">
              <span style={{ color: "#c9a252", fontSize: 12, opacity: .6 }}>📖</span>
              <span className="post-book-title" style={{ cursor: "pointer" }}
                onClick={() => { const b = books.find(bk => bk.title === post.book); if (b) navigate("book", { id: b.id || b._id }); }}>
                {post.book}
              </span>
              <span className="post-genre">{post.genre}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
