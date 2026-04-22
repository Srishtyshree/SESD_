import { CORRIDORS_DATA } from "../data/archiveData";
import { BookCard } from "../components/BookCard";
import { Breadcrumb } from "../components/Breadcrumb";

export function CorridorPage({ corridorId, navigate, books: allBooks }) {
  const corridor = CORRIDORS_DATA.find(c => c.id === corridorId) || CORRIDORS_DATA[0];
  const corridorBooks = allBooks.filter(b => b.genre === corridorId);

  return (
    <div className="page">
      <div className="corridor-hero">
        <div className="page-hero-bg" style={{ backgroundImage: `url(${corridor.image})` }} />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <div className="eyebrow">{corridor.volume}</div>
          <h1 className="display display-xl">{corridor.label}.</h1>
        </div>
      </div>

      <Breadcrumb items={[{ label: "HOME", action: () => navigate("home") }, { label: "LIBRARY", action: () => navigate("library") }, { label: corridor.label.toUpperCase() }]} />

      <div className="books-section">
        <div className="container">
          <div className="corridor-intro">
            <p className="body-text" style={{ fontSize: '20px', maxWidth: '800px', marginBottom: '60px' }}>{corridor.desc}</p>
          </div>
          <div className="book-grid">
            {corridorBooks.map(book => <BookCard key={book.id || book._id} book={book} navigate={navigate} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
