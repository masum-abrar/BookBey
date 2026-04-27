"use client"
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Book } from '@/types';

interface HeroProps {
  books: Book[];
}

export default function HeroSection({ books }: HeroProps) {
  return (
    <section className="relative pt-12 pb-20 lg:pt-18 lg:pb-32 px-6">
      <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="z-10 space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-xs font-medium uppercase tracking-wider">
            <Sparkles size={14} /> Curated Literary Marketplace
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Where <span className="italic text-yellow-500 underline decoration-yellow-500/30">Great Stories</span> Find Their Readers
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
            BookBey is a sanctuary for bibliophiles. We curate the world’s most impactful literature so you can spend less time searching and more time reading.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/items" className="px-8 py-4 bg-yellow-500 text-black font-semibold rounded-xl hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2">
              Browse Collection <ArrowRight size={18} />
            </Link>
            <Link href="/register" className="px-8 py-4 border border-white/10 rounded-xl hover:bg-white/5 transition-colors">
              Join the Community
            </Link>
          </div>
        </div>

        {/* HERO VISUAL */}
        <div className="relative hidden lg:block h-[400px]">
          {books.slice(0, 3).map((book, i) => (
            <div
              key={book.id}
              className={`absolute w-56 h-80 rounded-2xl overflow-hidden shadow-2xl transition-transform duration-700 hover:z-50 hover:scale-105
              ${i === 0 ? 'left-2 top-22 -rotate-14 translate-x-4 border border-white/10' : ''}
              ${i === 1 ? 'right-0 top-12 rotate-14 -translate-x-4 border border-white/10' : ''}
              ${i === 2 ? 'left-1/2 -translate-x-1/2 top-30 z-20 border-2 border-yellow-500/20' : ''}`}
            >
              <Image src={book.imageUrl} alt={book.title} fill className="object-cover" sizes="224px" priority />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}