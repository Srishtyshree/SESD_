const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.book.count();
  console.log(`Total books in database: ${count}`);
  if (count > 0) {
    const books = await prisma.book.findMany({ take: 5 });
    console.log('Sample books:', JSON.stringify(books, null, 2));
  }
}

main()
  .catch(e => console.error(err))
  .finally(async () => await prisma.$disconnect());
