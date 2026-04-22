import React, { useState, useEffect } from 'react';
import { API_BASE, fetchBookById } from '../api';

const ReaderPage = ({ bookId, onBack }) => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBook = async () => {
      try {
        const response = await fetch(`${API_BASE}/books/${bookId}/read`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('luminary_token')}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch reading information.');
        const data = await response.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadBook();
  }, [bookId]);

  const [iframeError, setIframeError] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);

  const handleIframeLoad = () => {
    setIframeLoading(false);
    // Note: We can't actually detect CORS/CSP errors from here easily,
    // but if the iframe loads and stays blank, the user can use our manual fallback.
  };

  if (loading) {
    return (
      <div className="reader-loading">
        <div className="loader"></div>
        <p>Unrolling the manuscript...</p>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="reader-error">
        <h2>The Volume is Missing</h2>
        <p>{error || "This scroll could not be found in our records."}</p>
        <button onClick={onBack} className="btn-primary">Return to Archive</button>
      </div>
    );
  }

  // Determine the best URL to use
  const readUrl = book.pdfUrl || book.embedUrl;
  const externalUrl = book.webReaderUrl || book.previewLink || readUrl;

  return (
    <div className="reader-page">
      <div className="reader-header">
        <div className="reader-info">
          <button onClick={onBack} className="back-btn">
            <span className="icon">←</span> Back
          </button>
          <div className="title-stack">
            <span className="book-title">{book.title}</span>
            <span className="book-author">{book.author}</span>
          </div>
        </div>
        <div className="reader-controls">
          {/* Add more controls like zoom, theme etc if needed */}
          <button onClick={() => window.print()} className="control-btn" title="Save Copy">
             ⎙
          </button>
        </div>
      </div>
      
      <div className="reader-content">
        {readUrl ? (
          <>
            {iframeLoading && (
              <div className="iframe-loader">
                <div className="loader"></div>
                <p>Preparing the reading view...</p>
              </div>
            )}
            
            <iframe 
              src={readUrl} 
              title={book.title}
              className={`book-iframe ${iframeLoading ? 'hidden' : ''}`}
              allow="fullscreen"
              onLoad={handleIframeLoad}
              onError={() => setIframeError(true)}
            ></iframe>

            {/* Fallback Overlay - Always visible or toggleable if iframe is blank */}
            <div className="reader-fallback-hint">
              <p>Content not loading? <a href={externalUrl} target="_blank" rel="noopener noreferrer">Open in New Tab</a></p>
            </div>
          </>
        ) : (
          <div className="no-reader-url">
            <h3>Digitization in Progress</h3>
            <p>A digital copy of this volume is not yet available in the public archive.</p>
            <button onClick={onBack} className="btn-secondary">Back to Volume Details</button>
          </div>
        )}
      </div>

      <style>{`
        .reader-page {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #0a0a0a;
          color: #e0d5c0;
          display: flex;
          flex-direction: column;
          z-index: 1000;
          font-family: 'Outfit', sans-serif;
        }

        .reader-header {
          height: 60px;
          background: #1a1a1a;
          border-bottom: 1px solid #332b1a;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 2rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }

        .reader-info {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .back-btn {
          background: none;
          border: 1px solid #d4af37;
          color: #d4af37;
          padding: 0.4rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-family: 'Outfit', sans-serif;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .back-btn:hover {
          background: #d4af37;
          color: #111;
        }

        .title-stack {
          display: flex;
          flex-direction: column;
        }

        .book-title {
          font-weight: 600;
          font-size: 1rem;
          color: #fff;
        }

        .book-author {
          font-size: 0.8rem;
          color: #888;
        }

        .reader-content {
          flex: 1;
          width: 100%;
          position: relative;
          background: #fdfdfd; /* White for paper feel */
        }

        .book-iframe {
          width: 100%;
          height: 100%;
          border: none;
        }

        .book-iframe.hidden {
          display: none;
        }

        .iframe-loader {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #111;
          z-index: 5;
        }

        .reader-fallback-hint {
          position: absolute;
          bottom: 20px;
          right: 20px;
          background: rgba(0,0,0,0.8);
          padding: 0.5rem 1rem;
          border-radius: 4px;
          border: 1px solid #332b1a;
          font-size: 0.8rem;
          z-index: 10;
        }

        .reader-fallback-hint a {
          color: #d4af37;
          text-decoration: underline;
        }

        .reader-loading, .reader-error, .no-reader-url {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: #0a0a0a;
          color: #e0d5c0;
          text-align: center;
          padding: 2rem;
        }

        .loader {
          width: 50px;
          height: 50px;
          border: 3px solid #332b1a;
          border-top: 3px solid #d4af37;
          border-radius: 50%;
          animation: reader-spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes reader-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .control-btn {
          background: none;
          border: none;
          color: #d4af37;
          font-size: 1.5rem;
          cursor: pointer;
          opacity: 0.7;
          transition: opacity 0.3s;
        }

        .control-btn:hover {
          opacity: 1;
        }

        .btn-primary {
          background: #d4af37;
          color: #111;
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 4px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
};

export default ReaderPage;
