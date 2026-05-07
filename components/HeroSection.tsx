"use client"
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Book } from '@/data/books';
import { motion, Variants } from 'framer-motion';


const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const
    },
  },
};

interface HeroProps {
  books?: Book[];
}

export default function HeroSection({ books = [] }: HeroProps) {

  return (
    <section className="relative pt-12 pb-20 lg:pt-18 lg:pb-32 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -z-10 w-1/3 h-1/2 bg-yellow-500/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 -z-10 w-1/4 h-1/3 bg-blue-500/5 blur-[100px] rounded-full" />

      <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="z-10 space-y-8 text-center lg:text-left"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-xs font-medium uppercase tracking-wider"
          >
            <Sparkles size={14} /> Curated Literary Marketplace
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]"
          >
            Where <span className="italic text-yellow-500 underline decoration-yellow-500/30">Great Stories</span> Find Their Readers
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 font-light"
          >
            BookBey is a sanctuary for bibliophiles. We curate the world’s most impactful literature so you can spend less time searching and more time reading.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Link href="/items" className="group px-8 py-4 bg-yellow-500 text-black font-semibold rounded-xl hover:bg-yellow-400 transition-all flex items-center justify-center gap-2 hover:shadow-[0_15px_30px_rgba(234,179,8,0.3)]">
              Browse Collection <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/register" className="px-8 py-4 border border-white/10 rounded-xl hover:bg-white/5 transition-colors">
              Join the Community
            </Link>
          </motion.div>
        </motion.div>

        {/* HERO VISUAL */}
        <div className="relative hidden lg:block h-[500px]">
          {books.slice(0, 3).map((book, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: i === 0 ? -14 : i === 1 ? 14 : 0,
                y: [0, i === 2 ? -10 : 10, 0]
              }}
              transition={{
                opacity: { duration: 1, delay: 0.4 + i * 0.2 },
                scale: { duration: 1, delay: 0.4 + i * 0.2 },
                rotate: { duration: 1, delay: 0.6 + i * 0.2 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              className={`absolute w-64 h-96 rounded-2xl overflow-hidden shadow-2xl hover:z-50 hover:scale-105 transition-transform duration-500
              ${i === 0 ? 'left-0 top-12 z-10 border border-white/10' : ''}
              ${i === 1 ? 'right-4 top-4 z-10 border border-white/10' : ''}
              ${i === 2 ? 'left-1/2 -translate-x-1/2 top-24 z-20 border-4 border-yellow-500/20' : ''}`}
            >
              <Image src={book.imageUrl} alt={book.title} fill className="object-cover" sizes="256px" priority />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
