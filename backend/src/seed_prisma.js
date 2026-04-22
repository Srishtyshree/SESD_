const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const books = [
  { genre:"fiction",    volume:"VOLUME I",   title:"The Meridian Glass",       author:"Cassian Vael",        year:2019, rating:4.7, reviews:120,
    pdfUrl:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    image:"https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80",
    description:"A lighthouse keeper on the edge of the known world begins to receive letters from a woman who died three decades prior. Each envelope carries a map drawn in salt water — each map a different coastline of grief.",
    tags:["magical realism","epistolary","solitude"] },
  { genre:"fiction",    volume:"VOLUME I",   title:"Where Salt Meets Shadow",  author:"Isolde Pham",         year:2021, rating:4.5, reviews:120,
    pdfUrl:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    image:"https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80",
    description:"Twin sisters inherit an estuary and discover their grandmother had been cataloguing tidal patterns as a form of divination. A novel about inheritance, silence, and the language of water.",
    tags:["family","coastal","mystery"] },
  { genre:"fiction",    volume:"VOLUME I",   title:"The Cartographer's Daughter", author:"Nura Eleyyan",    year:2018, rating:4.8, reviews:120,
    pdfUrl:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    image:"https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=400&q=80",
    description:"Raised on maps of places her father invented, a young woman travels to find whether any of his imagined territories ever became real. A meditation on belief, longing, and the power of named things.",
    tags:["quest","identity","maps"] },
  { genre:"fiction",    volume:"VOLUME I",   title:"Smoke and Lilac",          author:"Bertrand Mosse",      year:2022, rating:4.3, reviews:120,
    pdfUrl:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    image:"https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&q=80",
    description:"A perfumer in pre-war Lyon attempts to reconstruct the scent of a vanished city. Told in olfactory memory, sensation, and the logic of grief.",
    tags:["historical","sensory","France"] },
  { genre:"fiction",    volume:"VOLUME I",   title:"The Last Interval",        author:"Daria Kowalczyk",     year:2020, rating:4.6, reviews:120,
    pdfUrl:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    image:"https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80",
    description:"A composer discovers that the music she has been writing all her life contains encoded messages from someone she has never met. Love story. Mystery. A novel about what sound carries across silence.",
    tags:["music","romance","mystery"] },
  { genre:"literature", volume:"VOLUME II",  title:"A Season of Embers",       author:"Théa Laurent",        year:2017, rating:4.9, reviews:120,
    pdfUrl:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    image:"https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=400&q=80",
    description:"A masterwork of quiet devastation. An aging woman returns to her childhood village in Provence and finds the landscape has absorbed her history. Winner of three international prizes.",
    tags:["literary","memory","French"] },
  { genre:"literature", volume:"VOLUME II",  title:"The Quiet Hours",          author:"Raúl Sánchez",        year:2020, rating:4.4, reviews:120,
    pdfUrl:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    image:"https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80",
    description:"Three generations of a Havana family navigate revolution, exile, and the longing for a country that no longer exists. Sánchez writes with the precision of a surgeon and the soul of a poet.",
    tags:["Cuba","generational","exile"] },
  { genre:"literature", volume:"VOLUME II",  title:"Letters to Nowhere",       author:"Yuki Hamasaki",       year:2019, rating:4.7, reviews:120,
    pdfUrl:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    image:"https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80",
    description:"A series of unsent letters from a Japanese widow to her late husband, spanning forty years. Spare, precise, and impossibly tender. Perhaps the most beautiful short novel of its decade.",
    tags:["Japan","grief","epistolary"] },
  { genre:"literature", volume:"VOLUME II",  title:"The Glass Almanac",        author:"Constance Fell",      year:2016, rating:4.6, reviews:120,
    pdfUrl:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    image:"https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&q=80",
    description:"A Victorian almanac-keeper discovers that the weather she records is altering based on how she describes it. A novel about language, power, and what we make real by naming.",
    tags:["Victorian","language","climate"] },
  { genre:"thriller",   volume:"VOLUME III", title:"The Quiet Cartographer",   author:"Maren D. Ashby",      year:2022, rating:4.5, reviews:120,
    pdfUrl:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    image:"https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&q=80",
    description:"A forensic geographer is hired to find patterns in a series of disappearances. The map she builds tells her something no one wants to hear. A thriller of cold precision and building dread.",
    tags:["forensic","maps","procedural"] },
  { genre:"thriller",   volume:"VOLUME III", title:"Below the Waterline",      author:"Kira Nolan",          year:2021, rating:4.3, reviews:120,
    pdfUrl:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    image:"https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&q=80",
    description:"A marine archaeologist recovering a shipwreck discovers the wreck was staged — and the stagecraft points to something still alive. Gripping, watery, and deeply unsettling.",
    tags:["maritime","conspiracy","underwater"] },
  { genre:"thriller",   volume:"VOLUME III", title:"The Vane Cipher",          author:"Piotr Dembicki",      year:2023, rating:4.6, reviews:120,
    pdfUrl:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    image:"https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80",
    description:"A cryptanalyst working on Cold War-era documents discovers that one code cannot have been made by any human — and that someone destroyed careers to keep this buried.",
    tags:["Cold War","cryptography","conspiracy"] },
  { genre:"historical", volume:"VOLUME IV",  title:"The Amber Road",           author:"Cécile Fontaine",     year:2018, rating:4.7, reviews:120,
    pdfUrl:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    image:"https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=400&q=80",
    description:"A merchant travels the ancient amber trade routes from the Baltic to Rome, carrying a cargo he doesn't understand. A sweeping historical novel of commerce, faith, and the ancient world's interconnection.",
    tags:["ancient Rome","trade","adventure"] },
  { genre:"historical", volume:"VOLUME IV",  title:"Dust and Dynasties",       author:"Ahmad Rashid",        year:2019, rating:4.8, reviews:120,
    pdfUrl:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    image:"https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80",
    description:"The fall of the Mughal empire through the eyes of a court calligrapher who outlives four emperors. Rashid writes with extraordinary control and emotional restraint.",
    tags:["Mughal","India","calligraphy"] },
  { genre:"historical", volume:"VOLUME IV",  title:"The Wax Seal",             author:"Emmett Lyons",        year:2020, rating:4.4, reviews:120,
    pdfUrl:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    image:"https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=400&q=80",
    description:"A forger of royal documents in 17th-century England navigates the court of Charles II. Equal parts comedy and tragedy, with a remarkable eye for period detail.",
    tags:["Restoration","England","forgery"] },
  { genre:"scifi",      volume:"VOLUME V",   title:"The Heliograph Station",   author:"Ryn Calloway",        year:2022, rating:4.6, reviews:120,
    pdfUrl:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    image:"https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&q=80",
    description:"On a generation ship 400 years from Earth, the archivist discovers that the ship's memory banks have been selectively edited. What history was removed — and by whom?",
    tags:["generation ship","memory","archive"] },
  { genre:"scifi",      volume:"VOLUME V",   title:"Fold Space, Find Me",      author:"Damaris Okwu",        year:2021, rating:4.5, reviews:120,
    pdfUrl:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    image:"https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&q=80",
    description:"A physicist discovers she has been sending messages to herself across folded spacetime — but the version writing back gave up her career thirty years ago. A meditation on choice and parallel regret.",
    tags:["physics","time","identity"] },
  { genre:"scifi",      volume:"VOLUME V",   title:"The Antikythera Protocol", author:"Sven Borgen",         year:2023, rating:4.7, reviews:120,
    pdfUrl:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    image:"https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80",
    description:"An archaeologist discovers that the Antikythera mechanism contained a second layer — instructions for technology that shouldn't have existed until the 21st century.",
    tags:["archaeology","ancient tech","conspiracy"] },
  { genre:"literature", volume:"VOLUME II",  title:"The Weight of Snow",       author:"Elena Rostov",        year:2015, rating:4.6, reviews:120,
    pdfUrl:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    image:"https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=400&q=80",
    description:"A slow meditation on a harsh winter in 19th-century Russia, focusing on a pianist who loses her hearing but begins to hear the architecture of snowfall.",
    tags:["winter","grief","Russian"] },
  { genre:"thriller",   volume:"VOLUME III", title:"The Midnight Protocol",    author:"Julian Vance",        year:2024, rating:4.8, reviews:120,
    pdfUrl:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    image:"https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&q=80",
    description:"When an archivist is found murdered inside a locked vault, the primary suspect is the person who catalogued the exhibit thirty years ago — a ghost.",
    tags:["locked room","murder","archive"] },
  { genre:"thriller",   volume:"VOLUME III", title:"Echoes in the Ice",        author:"Silas Thorne",        year:2020, rating:4.2, reviews:120,
    pdfUrl:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    image:"https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&q=80",
    description:"An Arctic expedition uncovers a perfect replica of a Victorian manor frozen within a glacier, complete with fresh footprints inside.",
    tags:["Arctic","mystery","supernatural"] },
  { genre:"historical", volume:"VOLUME IV",  title:"The Gilded Cage",          author:"Mariana Silva",       year:2017, rating:4.5, reviews:120,
    pdfUrl:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    image:"https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=400&q=80",
    description:"Set against the backdrop of the Spanish Inquisition, a Jewish scribe attempts to secretly transcode banned texts into the architectural blueprints of a cathedral.",
    tags:["Inquisition","Spain","architecture"] },
  { genre:"historical", volume:"VOLUME IV",  title:"Empire of Silk",           author:"Takeshi Mori",        year:2022, rating:4.7, reviews:120,
    pdfUrl:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    image:"https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80",
    description:"During the Meiji Restoration, an indigo dyer becomes accidentally entangled with underground samurai rebellion when a coded message is dyed into a kimono.",
    tags:["Meiji","Japan","rebellion"] },
  { genre:"scifi",      volume:"VOLUME V",   title:"The Lattice Matrix",       author:"Ariana Kepler",       year:2024, rating:4.4, reviews:120,
    pdfUrl:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    image:"https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&q=80",
    description:"Humanity retreats to a digital heaven to escape an ecological collapse, but one programmer realizes the code is selectively deleting painful memories.",
    tags:["cyberpunk","memory","dystopia"] },
  { genre:"scifi",      volume:"VOLUME V",   title:"Children of the Void",     author:"Omar Tariq",          year:2019, rating:4.9, reviews:120,
    pdfUrl:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    image:"https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&q=80",
    description:"Deep space explorers find a derelict ship containing thousands of frozen embryos, along with a warning written in a language that shouldn't exist.",
    tags:["space opera","mystery","biology"] },
];

async function main() {
  console.log('Clearing existing data...');
  await prisma.marginalia.deleteMany({});
  await prisma.book.deleteMany({});
  await prisma.user.deleteMany({});
  
  console.log('Seeding admin user...');
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('admin123', salt);
  
  await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@archive.org',
      password: hashedPassword,
      role: 'ADMIN'
    }
  });

  console.log('Seeding test user...');
  const testPassword = await bcrypt.hash('testpassword', salt);
  await prisma.user.create({
    data: {
      username: 'testuser',
      email: 'testuser@example.com',
      password: testPassword,
      role: 'USER'
    }
  });

  console.log('Seeding books...');
  for (const b of books) {
    await prisma.book.create({ data: b });
  }

  console.log('Prisma Seeding Complete.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
