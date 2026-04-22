import { useState, useEffect } from "react";
import { Breadcrumb } from "../components/Breadcrumb";
import { Stars } from "../components/Stars";
import { fetchBookById } from "../api";

export const BookDetailPage = ({ bookId, navigate, user, onUpdateUser }) => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadBook() {
      try {
        setLoading(true);
        // Using bookId from props instead of useParams
        const data = await fetchBookById(bookId);
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadBook();
  }, [bookId]);

  if (loading) return <div className="loading-container" style={{ padding: '100px', textAlign: 'center', color: 'var(--gold)' }}>Consulting the Archive...</div>;
  if (error) return <div className="error-container" style={{ padding: '100px', textAlign: 'center' }}>{error}</div>;
  if (!book) return <div className="error-container" style={{ padding: '100px', textAlign: 'center' }}>Volume not found.</div>;

  return (
    <div className="book-detail-container">
      <Breadcrumb items={[
        { label: "HOME", action: () => navigate("home") },
        { label: "LIBRARY", action: () => navigate("library") },
        { label: book.title.toUpperCase() }
      ]} />
      
      <div className="book-detail-main">
        <div className="book-cover-section">
          <img src={book.image || "/book-placeholder.png"} alt={book.title} />
          <div className="book-actions">
            <button 
              className="primary-btn" 
              onClick={() => navigate('reader', { id: bookId })}
              disabled={!book.pdfUrl && !(book.metadata && (book.metadata.webReaderUrl || book.metadata.previewLink))}
            >
              {(!book.pdfUrl && !(book.metadata && (book.metadata.webReaderUrl || book.metadata.previewLink))) ? "NOT AVAILABLE" : "READ NOW"}
            </button>
            {book.metadata?.previewLink && (
              <a href={book.metadata.previewLink} target="_blank" rel="noopener noreferrer" className="secondary-btn">
                PREVIEW
              </a>
            )}
            {book.metadata?.infoLink && (
              <a href={book.metadata.infoLink} target="_blank" rel="noopener noreferrer" className="outline-btn">
                VIEW SOURCE
              </a>
            )}
          </div>
        </div>

        <div className="book-info-section">
          <span className="book-genre">{book.genre?.toUpperCase() || "UNCLASSIFIED"}</span>
          <h1>{book.title}</h1>
          <p className="book-author">by {book.author}</p>
          
          <div className="book-stats">
            <Stars rating={book.rating || 0} />
            <span className="rating-count">({book.rating || 0}/5)</span>
          </div>

          <div className="book-description">
            <h3>SYNOPSIS</h3>
            <p>{book.description || "No synopsis available for this volume in the Archive."}</p>
          </div>

          <div className="book-meta-grid">
            <div className="meta-item">
              <span className="label">ISBN</span>
              <span className="value">{book.isbn || "N/A"}</span>
            </div>
            <div className="meta-item">
              <span className="label">PAGES</span>
              <span className="value">{book.pages || "???"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
