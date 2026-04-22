import { useEffect } from "react";
import { Breadcrumb } from "../components/Breadcrumb";

export function ProfilePage({ user, books, navigate, onLogout }) {
  useEffect(() => {
    if (!user) navigate('home');
  }, [user, navigate]);

  if (!user) return null;

  // Use populated reading list from backend
  const savedVolumes = user.readingList || [];

  return (
    <div className="page">
      <div className="container" style={{ paddingTop: '80px' }}>
        <Breadcrumb items={[{ label: "HOME", action: () => navigate("home") }, { label: "FELLOWSHIP" }, { label: "PROFILE" }]} />
        
        <section className="profile-header" style={{ padding: '60px 0', borderBottom: '1px solid var(--border)', marginBottom: '60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            <div style={{ width: 120, height: 120, borderRadius: '50%', background: 'linear-gradient(45deg, var(--bg2), var(--border))', border: '1px solid var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', color: 'var(--gold)' }}>
              {user.username ? user.username[0].toUpperCase() : '✦'}
            </div>
            <div>
              <div className="eyebrow">ARCHIVE FELLOW</div>
              <h1 className="display display-lg" style={{ marginBottom: 16 }}>{user.username}</h1>
              <div style={{ color: 'var(--text-dim)', fontSize: '14px', fontStyle: 'italic' }}>
                Member since {new Date(user.joinedAt || Date.now()).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
              </div>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <button className="btn-outline" onClick={onLogout}>EXIT ARCHIVE</button>
            </div>
          </div>
        </section>

        <section className="profile-content">
          <div className="section-header">
            <div>
              <div className="eyebrow">PERSONAL COLLECTION</div>
              <h2 className="display display-md">Your archived volumes.</h2>
            </div>
          </div>
          
          {savedVolumes.length === 0 ? (
            <div style={{ padding: '80px 0', textAlign: 'center', border: '1px dashed var(--border)', borderRadius: '4px' }}>
              <div style={{ color: 'var(--gold)', fontSize: '24px', marginBottom: '16px' }}>🕯</div>
              <div className="body-text" style={{ fontStyle: 'italic', color: 'var(--text-dim)' }}>Your personal stacks are empty. Wander the corridors to archive your first volume.</div>
            </div>
          ) : (
            <div className="book-grid">
              {savedVolumes.map(book => (
                <div key={book._id || book.id} className="book-card" onClick={() => navigate("book", { id: book._id || book.id })}>
                  <div className="book-card-img-wrap">
                    <img className="book-card-img" src={book.image} alt={book.title} />
                  </div>
                  <div className="book-card-title">{book.title}</div>
                  <div className="book-card-author">by {book.author}</div>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: '80px', padding: '60px', background: 'rgba(201,169,110,0.03)', border: '1px solid var(--border)', textAlign: 'center' }}>
            <div className="eyebrow" style={{ marginBottom: 24 }}>FELLOWSHIP STATS</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
              <div>
                <span className="stat-n">3</span>
                <span className="stat-l">VOLUMES SAVED</span>
              </div>
              <div>
                <span className="stat-n">12</span>
                <span className="stat-l">MARGINALIA ADDED</span>
              </div>
              <div>
                <span className="stat-n">I</span>
                <span className="stat-l">FELLOWSHIP TIER</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
