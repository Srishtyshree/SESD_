import { useState, useEffect } from "react";
import "./index.css";
import * as api from "./api";

// Components
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { Modal } from "./components/Modal";
import { SignInForm, JoinForm } from "./components/Forms";

// Pages
import { HomePage } from "./pages/HomePage";
import { LibraryPage } from "./pages/LibraryPage";
import { CorridorPage } from "./pages/CorridorPage";
import { BookDetailPage } from "./pages/BookDetailPage";
import { CommunityPage } from "./pages/CommunityPage";
import { QuillPage } from "./pages/QuillPage";
import { ProfilePage } from "./pages/ProfilePage";
import { AdminDashboard } from "./pages/AdminDashboard";
import ReaderPage from "./pages/ReaderPage";

export default function App() {
  const [page, setPage] = useState({ name: "home", params: {} });
  const [signInOpen, setSignInOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const token = localStorage.getItem('luminary_token');
        if (token) {
          const userData = await api.fetchMe();
          if (userData) setUser(userData);
        }
        const data = await api.fetchBooks();
        setBooks(data);
      } catch (err) {
        console.error("Archive initialization failed:", err);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  const navigate = (name, params = {}) => {
    setPage({ name, params });
    setSearchQuery(""); // Clear search on navigation
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAuth = async (authData, shouldRedirect = false) => {
    localStorage.setItem('luminary_token', authData.token);
    localStorage.setItem('luminary_user', JSON.stringify(authData.user));
    
    // Fetch full user profile including readingList
    const fullUser = await api.fetchMe();
    if (fullUser) setUser(fullUser);
    else setUser(authData.user);

    setSignInOpen(false);
    setJoinOpen(false);
    if (shouldRedirect) navigate('profile');
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('luminary_user', JSON.stringify(updatedUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('luminary_token');
    localStorage.removeItem('luminary_user');
    navigate('home');
  };

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="lum">
      <Nav 
        navigate={navigate} 
        current={page.name} 
        user={user}
        onSearch={setSearchQuery}
        onSignIn={() => setSignInOpen(true)} 
        onJoin={() => setJoinOpen(true)} 
        onLogout={handleLogout}
      />

      <main style={{ minHeight: '80vh' }}>
        {loading ? (
          <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="quill-loading" style={{ fontStyle: 'italic', letterSpacing: '0.1em' }}>ARCHIVE IS WHISPERING...</div>
          </div>
        ) : (
          <>
            {searchQuery && (
              <div className="container" style={{ paddingTop: '100px' }}>
                <div className="eyebrow">SEARCH RESULTS FOR "{searchQuery.toUpperCase()}"</div>
                <div className="book-grid" style={{ marginTop: '40px' }}>
                  {filteredBooks.map(b => <BookCard key={b._id || b.id} book={b} navigate={navigate} />)}
                  {filteredBooks.length === 0 && <div className="body-text">No matching volumes found.</div>}
                </div>
                <div className="divider" style={{ margin: '80px 0' }} />
              </div>
            )}
            
            {!searchQuery && (
              <>
                {page.name === "home"      && <HomePage navigate={navigate} books={books} />}
                {page.name === "library"   && <LibraryPage navigate={navigate} books={books} />}
                {page.name === "corridor"  && <CorridorPage corridorId={page.params.id} navigate={navigate} books={books} />}
                {page.name === "book"      && <BookDetailPage bookId={page.params.id} navigate={navigate} books={books} user={user} onUpdateUser={handleUpdateUser} />}
                {page.name === "community" && <CommunityPage navigate={navigate} books={books} />}
                {page.name === "quill"     && <QuillPage navigate={navigate} />}
                {page.name === "profile"   && <ProfilePage user={user} books={books} navigate={navigate} onLogout={handleLogout} />}
                {page.name === "admin"     && <AdminDashboard user={user} navigate={navigate} />}
                {page.name === "reader"    && <ReaderPage bookId={page.params.id} onBack={() => navigate('book', { id: page.params.id })} />}
              </>
            )}
          </>
        )}
      </main>

      {page.name !== "quill" && <Footer navigate={navigate} />}

      <Modal open={signInOpen} onClose={() => setSignInOpen(false)} title="Sign In to the Archive">
        <SignInForm 
          onSuccess={(data) => handleAuth(data, false)}
          onClose={() => setSignInOpen(false)} 
          onJoin={() => { setSignInOpen(false); setTimeout(() => setJoinOpen(true), 150); }} 
        />
      </Modal>

      <Modal open={joinOpen} onClose={() => setJoinOpen(false)} title="Sign Up for the Archive">
        <JoinForm 
          onSuccess={(data) => handleAuth(data, true)} 
          onClose={() => setJoinOpen(false)} 
          onSignIn={() => { setJoinOpen(false); setTimeout(() => setSignInOpen(true), 150); }}
        />
      </Modal>
    </div>
  );
}
