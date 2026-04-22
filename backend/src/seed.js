const mongoose = require('mongoose');
const Book = require('./models/Book');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/luminary';

const books = [
  // FICTION (Corridor I)
  { title: "Moby Dick", author: "Herman Melville", genre: "fiction", volume: "VOLUME I", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80", pdfUrl: "https://www.gutenberg.org/files/2701/2701-h/2701-h.htm" },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "fiction", volume: "VOLUME II", image: "https://images.unsplash.com/photo-1543004471-240ce49a2a2f?w=800&q=80", pdfUrl: "https://www.gutenberg.org/ebooks/64317" },
  { title: "War and Peace", author: "Leo Tolstoy", genre: "fiction", volume: "VOLUME III", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80", pdfUrl: "https://www.gutenberg.org/ebooks/2600" },
  { title: "Jane Eyre", author: "Charlotte Brontë", genre: "fiction", volume: "VOLUME IV", image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&q=80", pdfUrl: "https://www.gutenberg.org/ebooks/1230" },
  { title: "Wuthering Heights", author: "Emily Brontë", genre: "fiction", volume: "VOLUME V", image: "https://images.unsplash.com/photo-1524578271613-d550eeb6da00?w=800&q=80", pdfUrl: "https://www.gutenberg.org/ebooks/768" },

  // LITERATURE (Corridor II)
  { title: "The Odyssey", author: "Homer", genre: "literature", volume: "VOLUME I", image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&q=80", pdfUrl: "https://www.gutenberg.org/ebooks/6130" },
  { title: "The Divine Comedy", author: "Dante Alighieri", genre: "literature", volume: "VOLUME II", image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&q=80", pdfUrl: "https://www.gutenberg.org/ebooks/8800" },
  { title: "Faust", author: "Johann Wolfgang von Goethe", genre: "literature", volume: "VOLUME III", image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&q=80", pdfUrl: "https://www.gutenberg.org/ebooks/14591" },
  { title: "Paradise Lost", author: "John Milton", genre: "literature", volume: "VOLUME IV", image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&q=80", pdfUrl: "https://www.gutenberg.org/ebooks/26" },
  { title: "Ulysses", author: "James Joyce", genre: "literature", volume: "VOLUME V", image: "https://images.unsplash.com/photo-1526243128144-6255381f7406?w=800&q=80", pdfUrl: "https://www.gutenberg.org/ebooks/4300" },

  // THRILLER (Corridor III)
  { title: "Silence of the Lambs", author: "Thomas Harris", genre: "thriller", volume: "VOLUME I", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80" },
  { title: "Gone Girl", author: "Gillian Flynn", genre: "thriller", volume: "VOLUME II", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80" },
  { title: "Dragon Tattoo", author: "Stieg Larsson", genre: "thriller", volume: "VOLUME III", image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&q=80" },
  { title: "Shutter Island", author: "Dennis Lehane", genre: "thriller", volume: "VOLUME IV", image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&q=80" },
  { title: "Da Vinci Code", author: "Dan Brown", genre: "thriller", volume: "VOLUME V", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80" },

  // HISTORICAL (Corridor IV)
  { title: "Pillars of Earth", author: "Ken Follett", genre: "historical", volume: "VOLUME I", image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&q=80" },
  { title: "Wolf Hall", author: "Hilary Mantel", genre: "historical", volume: "VOLUME II", image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&q=80" },
  { title: "The Book Thief", author: "Markus Zusak", genre: "historical", volume: "VOLUME III", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80" },
  { title: "Tale of Two Cities", author: "Charles Dickens", genre: "historical", volume: "VOLUME IV", image: "https://images.unsplash.com/photo-1466442929976-97f336a557bb?w=800&q=80", pdfUrl: "https://www.gutenberg.org/ebooks/98" },
  { title: "Memoirs of Geisha", author: "Arthur Golden", genre: "historical", volume: "VOLUME V", image: "https://images.unsplash.com/photo-1524578271613-d550eeb6da00?w=800&q=80" },

  // SCI-FI (Corridor V)
  { title: "Dune", author: "Frank Herbert", genre: "scifi", volume: "VOLUME I", image: "https://images.unsplash.com/photo-1506466010722-395aa2bef877?w=800&q=80" },
  { title: "Foundation", author: "Isaac Asimov", genre: "scifi", volume: "VOLUME II", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80" },
  { title: "Neuromancer", author: "William Gibson", genre: "scifi", volume: "VOLUME III", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80" },
  { title: "Hyperion", author: "Dan Simmons", genre: "scifi", volume: "VOLUME IV", image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80" },
  { title: "Left Hand of Darkness", author: "Ursula K. Le Guin", genre: "scifi", volume: "VOLUME V", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80" }
];

async function seedDB() {
  try {
    await mongoose.connect(MONGO_URI);
    await Book.deleteMany({});
    const createdBooks = await Book.insertMany(books.map(b => ({
      ...b,
      image: b.image || "https://images.unsplash.com/photo-1543004471-240ce49a2a2f?w=800&q=80",
      description: `A masterwork of ${b.genre} literature. Explore the deep themes and annotated marginalia in this digital reproduction of Volume ${b.volume.split(' ').pop()}.`,
      year: Math.floor(Math.random() * (2024 - 1887) + 1887),
      tags: [b.genre, "classic", "illuminated"],
      marginalia: [
        { user: "Reader_1887", text: "The symbolism on page 42 is haunting." },
        { user: "Parchment_Seeker", text: "Underlined this twice." }
      ]
    })));
    console.log(`Successfully archived ${createdBooks.length} volumes to the database.`);
    process.exit();
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seedDB();
