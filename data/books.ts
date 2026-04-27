// lib/books.ts
export interface Book {
  id: string;
  title: string;
  author: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  category: string;
  rating: number;
  pages: number;
  publisher: string;
  publishedYear: number;
  language: string;
  isbn: string;
  imageUrl: string;
  tags: string[];
  inStock: boolean;
}

export const CATEGORIES = ['Fiction', 'Non-Fiction', 'Science', 'History', 'Biography', 'Technology', 'Philosophy', 'Mystery'];

export const defaultBooks: Book[] = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    shortDescription: 'A dazzling novel about all the choices that go into a life well lived.',
    fullDescription: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices. Would you have done anything different, if you had the chance to undo your regrets? A philosophical, moving, and magical story about how we never really know the full potential of our lives.',
    price: 18.99,
    category: 'Fiction',
    rating: 4.7,
    pages: 304,
    publisher: 'Canongate Books',
    publishedYear: 2020,
    language: 'English',
    isbn: '978-1786892737',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop',
    tags: ['bestseller', 'philosophical', 'uplifting'],
    inStock: true,
  },
  {
    id: '2',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    shortDescription: 'A brief history of humankind from the Stone Age to the present.',
    fullDescription: 'From a renowned historian comes a groundbreaking narrative of humanity\'s creation and evolution—a #1 international bestseller—that explores the ways in which biology and history have defined us and enhanced our understanding of what it means to be "human." One hundred thousand years ago, at least six different species of humans inhabited Earth. Yet today there is only one—homo sapiens.',
    price: 22.50,
    category: 'History',
    rating: 4.8,
    pages: 443,
    publisher: 'Harper',
    publishedYear: 2015,
    language: 'English',
    isbn: '978-0062316097',
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
    tags: ['history', 'anthropology', 'bestseller'],
    inStock: true,
  },
  {
    id: '3',
    title: 'Atomic Habits',
    author: 'James Clear',
    shortDescription: 'An easy and proven way to build good habits and break bad ones.',
    fullDescription: 'No matter your goals, Atomic Habits offers a proven framework for improving—every day. James Clear, one of the world\'s leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.',
    price: 19.99,
    category: 'Non-Fiction',
    rating: 4.9,
    pages: 320,
    publisher: 'Avery',
    publishedYear: 2018,
    language: 'English',
    isbn: '978-0735211292',
    imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
    tags: ['self-help', 'productivity', 'habits'],
    inStock: true,
  },
  {
    id: '4',
    title: 'The Name of the Wind',
    author: 'Patrick Rothfuss',
    shortDescription: 'Day One of the Kingkiller Chronicle — a stunning fantasy debut.',
    fullDescription: 'Told in Kvothe\'s own voice, this is the tale of a magically gifted young man who grows to be the most notorious wizard his world has ever seen. The intimate narrative of his childhood in a troupe of traveling players, his years spent as a near-feral orphan in a crime-ridden city, his daringly brazen yet successful bid to enter a legendary school of magic, and his life as a fugitive after the murder of a king forms a gripping coming-of-age story unrivaled in recent literature.',
    price: 15.99,
    category: 'Fiction',
    rating: 4.6,
    pages: 662,
    publisher: 'DAW Books',
    publishedYear: 2007,
    language: 'English',
    isbn: '978-0756404079',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=600&fit=crop',
    tags: ['fantasy', 'epic', 'magic'],
    inStock: true,
  },
  {
    id: '5',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    shortDescription: 'A handbook of agile software craftsmanship for developers.',
    fullDescription: 'Even bad code can function. But if code isn\'t clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. But it doesn\'t have to be that way. Noted software expert Robert C. Martin presents a revolutionary paradigm with Clean Code: A Handbook of Agile Software Craftsmanship.',
    price: 35.99,
    category: 'Technology',
    rating: 4.5,
    pages: 464,
    publisher: 'Prentice Hall',
    publishedYear: 2008,
    language: 'English',
    isbn: '978-0132350884',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=600&fit=crop',
    tags: ['programming', 'software', 'best-practices'],
    inStock: true,
  },
  {
    id: '6',
    title: 'Meditations',
    author: 'Marcus Aurelius',
    shortDescription: 'Personal writings of the Roman Emperor, a cornerstone of Stoicism.',
    fullDescription: 'Written in Greek by an intellectual Roman emperor without any intention of publication, the Meditations of Marcus Aurelius offer a remarkable series of challenging spiritual reflections and exercises developed as the emperor struggled to understand himself and make sense of the universe. Ranging from doubt and despair to conviction and exaltation, they cover such diverse topics as the question of virtue, human rationality, the nature of the gods and the values of leadership.',
    price: 12.99,
    category: 'Philosophy',
    rating: 4.8,
    pages: 256,
    publisher: 'Modern Library',
    publishedYear: 180,
    language: 'English',
    isbn: '978-0812968255',
    imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop',
    tags: ['stoicism', 'philosophy', 'classic'],
    inStock: true,
  },
  {
    id: '7',
    title: 'The Girl with the Dragon Tattoo',
    author: 'Stieg Larsson',
    shortDescription: 'A riveting mystery of murder, family secrets, and corporate corruption.',
    fullDescription: 'Harriet Vanger, a scion of one of Sweden\'s wealthiest families, disappeared over forty years ago. All these years later, her aged uncle continues to seek the truth. He hires Mikael Blomkvist, a crusading journalist recently convicted of libel, and Lisbeth Salander, a twenty-four-year-old, tattooed, pierced computer hacker.',
    price: 14.99,
    category: 'Mystery',
    rating: 4.5,
    pages: 672,
    publisher: 'Vintage Crime',
    publishedYear: 2008,
    language: 'English',
    isbn: '978-0307949486',
    imageUrl: 'https://images.unsplash.com/photo-1509266272358-7701da638078?w=400&h=600&fit=crop',
    tags: ['thriller', 'mystery', 'crime'],
    inStock: false,
  },
  {
    id: '8',
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    shortDescription: 'From the Big Bang to black holes — science made accessible.',
    fullDescription: 'Was there a beginning of time? Could time run backwards? Is the universe infinite or does it have boundaries? These are just some of the questions considered in the internationally acclaimed masterpiece by the world renowned physicist—generally considered to have been one of the world\'s greatest thinkers. It begins by reviewing the great theories of the cosmos from Newton to Einstein, before delving into the secrets which still lie at the heart of space and time.',
    price: 16.50,
    category: 'Science',
    rating: 4.6,
    pages: 212,
    publisher: 'Bantam',
    publishedYear: 1988,
    language: 'English',
    isbn: '978-0553380163',
    imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=600&fit=crop',
    tags: ['physics', 'cosmology', 'science'],
    inStock: true,
  },
  {
    id: '9',
    title: 'Educated',
    author: 'Tara Westover',
    shortDescription: 'A memoir about the struggle for self-invention and family loyalty.',
    fullDescription: 'Born to survivalists in the mountains of Idaho, Tara Westover was seventeen the first time she set foot in a classroom. Her family was so isolated from mainstream society that there was no one to ensure she tried to get an education, and no one to intervene when one of her older brothers became violent.',
    price: 17.99,
    category: 'Biography',
    rating: 4.7,
    pages: 352,
    publisher: 'Random House',
    publishedYear: 2018,
    language: 'English',
    isbn: '978-0399590504',
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
    tags: ['memoir', 'education', 'family'],
    inStock: true,
  },
];

export function getBooks(): Book[] {
  if (typeof window === 'undefined') return defaultBooks;
  const stored = localStorage.getItem('odyssey_books');
  if (stored) {
    const parsed = JSON.parse(stored);
    // Merge stored with defaults (stored takes priority by id)
    const storedIds = new Set(parsed.map((b: Book) => b.id));
    const merged = [...defaultBooks.filter(b => !storedIds.has(b.id)), ...parsed];
    return merged;
  }
  return defaultBooks;
}

export function saveBooks(books: Book[]): void {
  if (typeof window === 'undefined') return;
  // Only save non-default books (user-added)
  const defaultIds = new Set(defaultBooks.map(b => b.id));
  const userBooks = books.filter(b => !defaultIds.has(b.id));
  localStorage.setItem('odyssey_books', JSON.stringify(userBooks));
}

export function addBook(book: Book): void {
  if (typeof window === 'undefined') return;
  const stored = localStorage.getItem('odyssey_books');
  const existing: Book[] = stored ? JSON.parse(stored) : [];
  existing.push(book);
  localStorage.setItem('odyssey_books', JSON.stringify(existing));
}

export function deleteBook(id: string): void {
  if (typeof window === 'undefined') return;
  const books = getBooks();
  const remaining = books.filter(b => b.id !== id);
  saveBooks(remaining);
}
