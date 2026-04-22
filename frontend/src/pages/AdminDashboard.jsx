import { useState, useEffect } from "react";
import * as api from "../api";
import { BookEditModal } from "../components/BookEditModal";

export function AdminDashboard({ user, navigate }) {
  const [stats, setStats] = useState({ users: 0, books: 0 });
  const [usersList, setUsersList] = useState([]);
  const [booksList, setBooksList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [editingBook, setEditingBook] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('home');
      return;
    }

    async function loadData() {
      try {
        const adminStats = await api.fetchAdminStats();
        const usersData = await api.fetchAdminUsers();
        const booksData = await api.fetchBooks();
        setStats(adminStats);
        setUsersList(usersData);
        setBooksList(booksData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, [user, navigate]);

  const handleEditClick = (book) => {
    setEditingBook(book);
    setIsEditModalOpen(true);
  };

  const handleBookUpdate = (updatedBook) => {
    setBooksList(booksList.map(b => (b._id === updatedBook._id || b.id === updatedBook.id) ? updatedBook : b));
  };

  if (loading) return (
    <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="quill-loading" style={{ fontStyle: 'italic', letterSpacing: '0.1em' }}>ARCHIVING MANUSCRIPTS...</div>
    </div>
  );

  if (error) return (
    <div style={{ padding: '80px', textAlign: 'center', color: '#ff6b6b' }}>
      <p>Error loading dashboard: {error}</p>
    </div>
  );

  return (
    <div className="page" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="container">
        <h1 className="display display-lg" style={{ marginBottom: 40 }}>Library Administration</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px', marginBottom: '60px' }}>
          <div style={{ padding: '40px', background: 'rgba(201,169,110,0.03)', border: '1px solid var(--border)', textAlign: 'center' }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>TOTAL MAGNITUDE OF FELLOWS</div>
            <div style={{ fontSize: '48px', color: 'var(--gold)', fontFamily: 'var(--font-serif)' }}>{stats.users}</div>
          </div>
          <div style={{ padding: '40px', background: 'rgba(201,169,110,0.03)', border: '1px solid var(--border)', textAlign: 'center' }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>ARCHIVED VOLUMES</div>
            <div style={{ fontSize: '48px', color: 'var(--gold)', fontFamily: 'var(--font-serif)' }}>{stats.books}</div>
          </div>
        </div>

        {/* User Management Section */}
        <div className="section-header">
          <div className="eyebrow">REGISTRY OF FELLOWS</div>
        </div>
        
        <div style={{ border: '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden', marginBottom: '60px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
              <tr>
                <th style={{ padding: '16px', color: 'var(--gold)', fontWeight: 'normal', letterSpacing: '0.05em', fontSize: '11px' }}>PSEUDONYM</th>
                <th style={{ padding: '16px', color: 'var(--gold)', fontWeight: 'normal', letterSpacing: '0.05em', fontSize: '11px' }}>EMAIL ADRESS</th>
                <th style={{ padding: '16px', color: 'var(--gold)', fontWeight: 'normal', letterSpacing: '0.05em', fontSize: '11px' }}>JOINED</th>
                <th style={{ padding: '16px', color: 'var(--gold)', fontWeight: 'normal', letterSpacing: '0.05em', fontSize: '11px' }}>ROLE</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((u, i) => (
                <tr key={u.id || u._id} style={{ borderBottom: i === usersList.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '16px', fontSize: '14px' }}>{u.username}</td>
                  <td style={{ padding: '16px', fontSize: '14px', color: 'var(--text-dim)' }}>{u.email}</td>
                  <td style={{ padding: '16px', fontSize: '14px', color: 'var(--text-dim)' }}>
                    {new Date(u.joinedAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '16px', fontSize: '14px' }}>
                    <span style={{ 
                      padding: '4px 8px', 
                      background: u.role === 'ADMIN' ? 'rgba(201,169,110,0.2)' : 'rgba(255,255,255,0.05)',
                      color: u.role === 'ADMIN' ? 'var(--gold)' : 'var(--text-dim)',
                      borderRadius: '4px',
                      fontSize: '10px',
                      letterSpacing: '0.05em'
                    }}>
                      {u.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Book Management Section */}
        <div className="section-header">
          <div className="eyebrow">ARCHIVE CATALOGUE</div>
        </div>

        <div style={{ border: '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
              <tr>
                <th style={{ padding: '16px', color: 'var(--gold)', fontWeight: 'normal', letterSpacing: '0.05em', fontSize: '11px' }}>VOLUME TITLE</th>
                <th style={{ padding: '16px', color: 'var(--gold)', fontWeight: 'normal', letterSpacing: '0.05em', fontSize: '11px' }}>AUTHOR</th>
                <th style={{ padding: '16px', color: 'var(--gold)', fontWeight: 'normal', letterSpacing: '0.05em', fontSize: '11px' }}>METADATA</th>
                <th style={{ padding: '16px', color: 'var(--gold)', fontWeight: 'normal', letterSpacing: '0.05em', fontSize: '11px' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {booksList.map((b, i) => (
                <tr key={b.id || b._id} style={{ borderBottom: i === booksList.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '16px', fontSize: '14px' }}>{b.title}</td>
                  <td style={{ padding: '16px', fontSize: '14px', color: 'var(--text-dim)' }}>{b.author}</td>
                  <td style={{ padding: '16px', fontSize: '12px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <span style={{ color: b.webReaderUrl ? '#4cd137' : '#e84118' }}>● Reader</span>
                      <span style={{ color: b.pdfUrl ? '#4cd137' : '#e84118' }}>● PDF</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <button 
                      onClick={() => handleEditClick(b)}
                      style={{ 
                        background: 'none', 
                        border: '1px solid var(--gold)', 
                        color: 'var(--gold)', 
                        padding: '4px 12px', 
                        borderRadius: '4px',
                        fontSize: '11px',
                        cursor: 'pointer'
                      }}
                    >
                      EDIT
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <BookEditModal 
          book={editingBook} 
          isOpen={isEditModalOpen} 
          onClose={() => setIsEditModalOpen(false)} 
          onUpdate={handleBookUpdate}
        />
      </div>
    </div>
  );
}
