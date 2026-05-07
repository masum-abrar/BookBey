'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookCard from '@/components/BookCard';
import { getBooks, CATEGORIES } from '@/data/books';
import { Search, SlidersHorizontal, X, ChevronDown, LayoutGrid, ListFilter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function BooksContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const initCategory = searchParams.get('category') || '';

    const [search, setSearch] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [minRating, setMinRating] = useState('');
    const [sortBy, setSortBy] = useState('default');
    const [showFilters, setShowFilters] = useState(false);

    const books = getBooks();
    
    const setCategory = (cat: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (cat) params.set('category', cat);
        else params.delete('category');
        router.push(`?${params.toString()}`, { scroll: false });
    };

    const filtered = books
        .filter(b => {
            const q = search.toLowerCase();
            return (
                (!q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)) &&
                (!initCategory || b.category === initCategory) &&
                (!minPrice || b.price >= parseFloat(minPrice)) &&
                (!maxPrice || b.price <= parseFloat(maxPrice)) &&
                (!minRating || b.rating >= parseFloat(minRating))
            );
        })
        .sort((a, b) => {
            if (sortBy === 'price-asc') return a.price - b.price;
            if (sortBy === 'price-desc') return b.price - a.price;
            if (sortBy === 'rating') return b.rating - a.rating;
            if (sortBy === 'title') return a.title.localeCompare(b.title);
            return 0;
        });

    const clearFilters = () => {
        setSearch('');
        setMinPrice('');
        setMaxPrice('');
        setMinRating('');
        setSortBy('default');
        setCategory('');
    };

    const hasActiveFilters = search || initCategory || minPrice || maxPrice || minRating || sortBy !== 'default';

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-[#f0ede8]">
            <Navbar />

            <main className="pt-0 pb-20">
                {/* HERO HEADER */}
                <header className="relative py-24 overflow-hidden border-b border-white/5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-from)_0%,_transparent_70%)] from-yellow-500/10">
                    <div className="container relative z-10">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-2xl"
                        >
                            <p className="text-[10px] uppercase tracking-[0.5em] text-yellow-500 font-bold mb-6">
                                Curated Archive
                            </p>
                            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.8] mb-8">
                                The <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-yellow-400 to-yellow-700">Odyssey</span> Library
                            </h1>
                            <p className="text-muted-foreground text-xl font-light leading-relaxed max-w-lg">
                                Sifting through the noise to bring you <span className="text-white font-medium">{books.length}</span> volumes that define generations.
                            </p>
                        </motion.div>
                    </div>
                </header>

                <div className="container mt-16">
                    {/* SEARCH & PRIMARY CONTROLS */}
                    <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between mb-16">
                        <div className="relative w-full lg:max-w-xl group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/50 group-focus-within:text-yellow-500 transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search by title, author, or keyword..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="w-full pl-16 pr-6 py-5 rounded-3xl bg-white/[0.03] border border-white/10 focus:border-yellow-500/50 focus:bg-white/[0.05] transition-all outline-none text-base placeholder:text-muted-foreground/30 shadow-2xl shadow-black/20"
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
                            <div className="relative group flex-1 sm:flex-none">
                                <select
                                    value={sortBy}
                                    onChange={e => setSortBy(e.target.value)}
                                    className="appearance-none w-full sm:w-56 pl-6 pr-12 py-5 rounded-3xl bg-white/[0.03] border border-white/10 text-sm font-bold hover:border-white/20 transition-all cursor-pointer outline-none shadow-xl"
                                >
                                    <option value="default">Sort: Recommended</option>
                                    <option value="price-asc">Price: Low to High</option>
                                    <option value="price-desc">Price: High to Low</option>
                                    <option value="rating">Top Rated</option>
                                    <option value="title">Alphabetical</option>
                                </select>
                                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={18} />
                            </div>

                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex items-center gap-3 px-8 py-5 rounded-3xl border transition-all text-sm font-black tracking-tight shadow-xl ${showFilters ? 'bg-yellow-500 text-black border-yellow-500' : 'bg-white/[0.03] border-white/10 hover:border-white/30'}`}
                            >
                                <SlidersHorizontal size={18} />
                                {showFilters ? 'Close' : 'Filters'}
                            </button>

                            {hasActiveFilters && (
                                <button
                                    onClick={clearFilters}
                                    className="flex items-center gap-2 px-4 py-5 text-xs font-black uppercase tracking-[0.2em] text-red-400 hover:text-red-300 transition-colors"
                                >
                                    <X size={16} /> Reset
                                </button>
                            )}
                        </div>
                    </div>

                    {/* EXPANDABLE FILTER PANEL */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div 
                                initial={{ height: 0, opacity: 0, y: -20 }}
                                animate={{ height: 'auto', opacity: 1, y: 0 }}
                                exit={{ height: 0, opacity: 0, y: -20 }}
                                className="mb-16 p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-2xl overflow-hidden shadow-2xl"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                                    <div className="space-y-6">
                                        <label className="text-[10px] uppercase tracking-[0.3em] font-black text-yellow-500/60">Genres</label>
                                        <div className="flex flex-wrap gap-2">
                                            <button 
                                                onClick={() => setCategory('')}
                                                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${!initCategory ? 'bg-white text-black' : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}
                                            >
                                                All
                                            </button>
                                            {CATEGORIES.map(c => (
                                                <button 
                                                    key={c}
                                                    onClick={() => setCategory(c)}
                                                    className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${initCategory === c ? 'bg-yellow-500 text-black' : 'bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10'}`}
                                                >
                                                    {c}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <label className="text-[10px] uppercase tracking-[0.3em] font-black text-yellow-500/60">Price Range</label>
                                        <div className="flex gap-3">
                                            <div className="relative flex-1">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">$</span>
                                                <input type="number" placeholder="Min" value={minPrice} onChange={e => setMinPrice(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl pl-8 pr-4 py-3 text-sm outline-none focus:border-yellow-500/50" />
                                            </div>
                                            <div className="relative flex-1">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">$</span>
                                                <input type="number" placeholder="Max" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl pl-8 pr-4 py-3 text-sm outline-none focus:border-yellow-500/50" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <label className="text-[10px] uppercase tracking-[0.3em] font-black text-yellow-500/60">Curation Rating</label>
                                        <select value={minRating} onChange={e => setMinRating(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm font-bold outline-none cursor-pointer">
                                            <option value="">Any appraisal</option>
                                            <option value="4.5">4.5+ Platinum</option>
                                            <option value="4">4.0+ Gold</option>
                                            <option value="3">3.0+ Silver</option>
                                        </select>
                                    </div>
                                    <div className="flex items-end">
                                        <button onClick={() => setShowFilters(false)} className="w-full py-4 text-xs font-black uppercase tracking-[0.2em] bg-white/5 rounded-2xl hover:bg-yellow-500 hover:text-black transition-all border border-white/10">Lock Parameters</button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* RESULTS META */}
                    <div className="flex items-center justify-between mb-12 pb-6 border-b border-white/5">
                        <div className="flex items-center gap-4">
                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                            <p className="text-sm font-light text-muted-foreground">
                                Revealing <span className="text-white font-bold tracking-tight">{filtered.length}</span> results 
                                {initCategory && <span> in <span className="text-yellow-500 underline underline-offset-8 font-black uppercase tracking-tighter ml-1">{initCategory}</span></span>}
                            </p>
                        </div>
                        <div className="flex items-center gap-6 text-muted-foreground/20">
                            <LayoutGrid size={20} className="text-yellow-500" />
                            <ListFilter size={20} className="hover:text-white transition-colors cursor-pointer" />
                        </div>
                    </div>

                    {/* MAIN GRID */}
                    <motion.div layout className="grid gap-x-10 gap-y-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <AnimatePresence mode="popLayout">
                            {filtered.map((book, idx) => (
                                <motion.div 
                                    key={book.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                                >
                                    <BookCard book={book} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {filtered.length === 0 && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-48 rounded-[3rem] bg-white/[0.01] border border-dashed border-white/10"
                        >
                            <div className="bg-yellow-500/5 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                                <Search size={40} className="text-yellow-500/20" />
                            </div>
                            <h3 className="text-3xl font-black tracking-tighter mb-4">No volumes found</h3>
                            <p className="text-muted-foreground font-light mb-10 max-w-sm mx-auto leading-relaxed">Our library is vast, but your specific search yielded no results. Try broadening your horizons.</p>
                            <button onClick={clearFilters} className="px-10 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-yellow-500 hover:text-black transition-all text-sm font-black uppercase tracking-widest shadow-2xl">
                                Clear All Constraints
                            </button>
                        </motion.div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default function ItemsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center"><div className="w-16 h-16 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin" /></div>}>
            <BooksContent />
        </Suspense>
    );
}