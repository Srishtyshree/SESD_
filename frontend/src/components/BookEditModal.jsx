import React, { useState, useEffect } from 'react';

export const BookEditModal = ({ book, isOpen, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    webReaderUrl: '',
    pdfUrl: '',
    title: '',
    author: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (book) {
      setFormData({
        webReaderUrl: book.webReaderUrl || '',
        pdfUrl: book.pdfUrl || '',
        title: book.title || '',
        author: book.author || ''
      });
    }
  }, [book]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5005/api/books/${book._id || book.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('luminary_token')}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to update volume.');
      
      const updatedBook = await response.json();
      onUpdate(updatedBook);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal-content">
        <div className="edit-modal-header">
          <h2 className="display">Modify Volume Metadata</h2>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="edit-form">
          {error && <div className="error-msg">{error}</div>}
          
          <div className="form-group">
            <label className="eyebrow">VOLUME TITLE</label>
            <input 
              type="text" 
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label className="eyebrow">AUTHOR</label>
            <input 
              type="text" 
              value={formData.author} 
              onChange={(e) => setFormData({...formData, author: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label className="eyebrow">WEB READER URL (GOOGLE BOOKS / ARCHIVE.ORG)</label>
            <input 
              type="url" 
              placeholder="https://books.google.com/..."
              value={formData.webReaderUrl} 
              onChange={(e) => setFormData({...formData, webReaderUrl: e.target.value})}
            />
            <p className="hint">Used for in-browser reading preview.</p>
          </div>

          <div className="form-group">
            <label className="eyebrow">PDF DOWNLOAD/READER URL</label>
            <input 
              type="url" 
              placeholder="https://..."
              value={formData.pdfUrl} 
              onChange={(e) => setFormData({...formData, pdfUrl: e.target.value})}
            />
            <p className="hint">Direct link to a PDF resource if available.</p>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'ARCHIVING...' : 'UPDATE VOLUME'}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .edit-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
        }

        .edit-modal-content {
          background: #111;
          border: 1px solid #332b1a;
          width: 90%;
          max-width: 600px;
          padding: 2.5rem;
          border-radius: 4px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }

        .edit-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          border-bottom: 1px solid #332b1a;
          padding-bottom: 1rem;
        }

        .close-btn {
          background: none;
          border: none;
          color: #888;
          font-size: 2rem;
          cursor: pointer;
        }

        .edit-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-size: 0.7rem;
          color: #d4af37;
        }

        .form-group input {
          background: #0a0a0a;
          border: 1px solid #332b1a;
          color: #fff;
          padding: 0.8rem;
          border-radius: 4px;
          font-family: 'Outfit', sans-serif;
        }

        .form-group input:focus {
          border-color: #d4af37;
          outline: none;
        }

        .hint {
          font-size: 0.7rem;
          color: #666;
          margin: 0;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 1rem;
        }

        .btn-primary {
          background: #d4af37;
          color: #111;
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 4px;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-secondary {
          background: none;
          border: 1px solid #332b1a;
          color: #888;
          padding: 0.8rem 1.5rem;
          border-radius: 4px;
          cursor: pointer;
        }

        .error-msg {
          background: rgba(255,107,107,0.1);
          color: #ff6b6b;
          padding: 1rem;
          border-radius: 4px;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
};
