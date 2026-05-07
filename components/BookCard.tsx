'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, ArrowRight, BookOpen } from 'lucide-react';
import { Book } from '@/data/books'; 

interface BookCardProps {
  book: Book;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={10}
            className={`${
              i <= Math.round(rating) 
                ? 'fill-yellow-500 text-yellow-500' 
                : 'text-white/10'
            }`}
          />
        ))}
      </div>
      <span className="text-[10px] font-black text-muted-foreground/60 tracking-widest uppercase">{rating}</span>
    </div>
  );
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Link 
      href={`/items/${book.id}`} 
      className="group block h-full no-underline perspective-1000"
    >
      <div className="relative flex flex-col h-full overflow-hidden rounded-[2rem] border border-white/5 bg-[#0d0d12] transition-all duration-700 hover:bg-[#13131c] hover:border-yellow-500/20 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] hover:-translate-y-2">
        
        {/* Book Cover Container */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/40 flex-shrink-0">
          {book.imageUrl ? (
            <Image
              src={book.imageUrl}
              alt={book.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-white/5 to-transparent">
              <BookOpen size={40} className="text-white/10" />
            </div>
          )}

          {/* Luxury Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d12] via-transparent to-transparent opacity-60" />

          {/* Category Badge */}
          <div className="absolute top-5 left-5">
            <span className="bg-black/60 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-[0.3em] px-3 py-1.5 rounded-lg border border-white/10">
              {book.category}
            </span>
          </div>

          {/* Out of Stock Overlay */}
          {book.inStock === false && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center backdrop-blur-md">
              <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.4em]">
                Archived
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-1 p-8 gap-5">
          <StarRating rating={book.rating} />

          <div className="space-y-2">
            <h3 className="text-xl font-black tracking-tight text-white leading-tight line-clamp-1 group-hover:text-yellow-500 transition-colors duration-500">
              {book.title}
            </h3>
            <p className="text-xs text-muted-foreground font-serif italic tracking-tight">
              by {book.author}
            </p>
          </div>

          <p className="text-xs text-muted-foreground/60 leading-relaxed line-clamp-2 flex-1 font-light italic">
            "{book.shortDescription || "No description available for this curated selection."}"
          </p>

          {/* Footer Info */}
          <div className="flex items-center justify-between pt-6 mt-auto border-t border-white/5">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 mb-1">Price</span>
              <span className="text-2xl font-black tracking-tighter text-yellow-500">
                ${book.price.toFixed(2)}
              </span>
            </div>
            
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-yellow-500 group-hover:border-yellow-500 group-hover:text-black">
              <ArrowRight size={20} className="transition-transform duration-500 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}