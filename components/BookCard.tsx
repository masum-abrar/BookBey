'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, ArrowRight, BookOpen } from 'lucide-react';
import { Book } from '@/types'; // Using the type defined in our previous step

interface BookCardProps {
  book: Book & { 
    category?: string; 
    inStock?: boolean; 
    shortDescription?: string; 
  };
}

/**
 * Sub-component for rendering the star rating
 */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={12}
            className={`${
              i <= Math.round(rating) 
                ? 'fill-yellow-500 text-yellow-500' 
                : 'text-white/20'
            }`}
          />
        ))}
      </div>
      <span className="text-[0.78rem] text-muted-foreground ml-1">{rating}</span>
    </div>
  );
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Link 
      href={`/items/${book.id}`} 
      className="group block h-full no-underline"
    >
      <div className="flex flex-col h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-300 hover:bg-white/[0.05] hover:border-yellow-500/30 hover:shadow-2xl hover:shadow-yellow-500/5">
        
        {/* Book Cover Container */}
        <div className="relative h-64 w-full overflow-hidden bg-muted flex-shrink-0">
          {book.imageUrl ? (
            <Image
              src={book.imageUrl}
              alt={book.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-background">
              <BookOpen size={40} className="text-white/10" />
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {book.category && (
              <span className="bg-yellow-500/90 text-black text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md backdrop-blur-sm">
                {book.category}
              </span>
            )}
          </div>

          {/* Stock Status Overlay */}
          {book.inStock === false && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-[2px]">
              <span className="bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-widest">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-1 p-5 gap-3">
          <StarRating rating={book.rating} />

          <div className="space-y-1">
            <h3 className="font-display text-lg font-bold text-foreground leading-snug line-clamp-1 group-hover:text-yellow-500 transition-colors">
              {book.title}
            </h3>
            <p className="text-xs text-muted-foreground italic">
              by {book.author}
            </p>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
            {book.shortDescription || "No description available for this curated selection."}
          </p>

          {/* Footer Info */}
          <div className="flex items-center justify-between pt-4 mt-auto border-t border-white/5">
            <span className="font-display text-xl font-bold text-yellow-500">
              ${book.price.toFixed(2)}
            </span>
            
            <span className="flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-widest text-muted-foreground group-hover:text-yellow-500 transition-all">
              Details
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}