import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import BookCard from '@/components/BookCard';
import { Book } from '@/types';

interface FeaturedGridProps {
  books: Book[];
}

export default function FeaturedGrid({ books }: FeaturedGridProps) {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Selections</h2>
            <p className="text-muted-foreground">Hand-picked by our curators this week.</p>
          </div>
          <Link href="/items" className="hidden sm:flex items-center gap-2 text-yellow-500 hover:gap-3 transition-all">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}