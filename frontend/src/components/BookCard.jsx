import {Stars} from "./Stars";

export function BookCard({book, navigate}) {
  const targetId = book._id || book.id;
  return (
    <div className="book-card" onClick={() => navigate("book", {id: targetId})}>
      <img className="book-card-img" src={book.image} alt={book.title} />
      <div className="book-card-vol">{book.volume}</div>
      <div className="book-card-title">{book.title}</div>
      <div className="book-card-author">{book.author}</div>
      <div className="book-card-rating">
        <Stars rating={book.rating} />
        <span className="rating-n">{book.rating}</span>
      </div>
    </div>
  );
}
