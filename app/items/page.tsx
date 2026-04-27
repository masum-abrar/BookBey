'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookCard from '@/components/BookCard';
import { getBooks, CATEGORIES } from '@/data/books';
import { Search, SlidersHorizontal, X, ChevronDown, LayoutGrid, ListFilter } from 'lucide-react';

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
    
    // Logic to sync category with URL or local state
    const setCategory = (cat: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (cat) params.set('category', cat);
        else params.delete('category');
        router.push(`?${params.toString()}`);
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
                <header className="relative py-24 overflow-hidden border-b border-white/5">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/5 blur-[120px] pointer-events-none" />
                    <div className="container relative z-10">
                        <div className="max-w-2xl">
                            <p className="text-[10px] uppercase tracking-[0.4em] text-yellow-500 font-bold mb-4">
                                Curated Archive
                            </p>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-6">
                                The <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-600">Odyssey</span> Library
                            </h1>
                            <p className="text-muted-foreground text-lg font-light leading-relaxed">
                                Sifting through the noise to bring you {books.length} volumes that define generations. Use the filters to narrow your search.
                            </p>
                        </div>
                    </div>
                </header>

                <div className="container mt-12">
                    {/* SEARCH & PRIMARY CONTROLS */}
                    <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between mb-12">
                        <div className="relative w-full lg:max-w-md group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 group-focus-within:text-yellow-500 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search by title, author, or keyword..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/[0.03] border border-white/10 focus:border-yellow-500/50 focus:bg-white/[0.05] transition-all outline-none text-sm placeholder:text-muted-foreground/40"
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                            <div className="relative group flex-1 sm:flex-none">
                                <select
                                    value={sortBy}
                                    onChange={e => setSortBy(e.target.value)}
                                    className="appearance-none w-full sm:w-48 pl-5 pr-10 py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-sm font-medium hover:border-white/20 transition-all cursor-pointer outline-none"
                                >
                                    <option value="default">Sort: Recommended</option>
                                    <option value="price-asc">Price: Low to High</option>
                                    <option value="price-desc">Price: High to Low</option>
                                    <option value="rating">Top Rated</option>
                                    <option value="title">Alphabetical</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={16} />
                            </div>

                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex items-center gap-3 px-6 py-4 rounded-2xl border transition-all text-sm font-bold tracking-tight ${showFilters ? 'bg-yellow-500 text-black border-yellow-500' : 'bg-white/[0.03] border-white/10 hover:border-white/20'}`}
                            >
                                <SlidersHorizontal size={16} />
                                {showFilters ? 'Close Filters' : 'Advanced Filters'}
                            </button>

                            {hasActiveFilters && (
                                <button
                                    onClick={clearFilters}
                                    className="flex items-center gap-2 px-4 py-4 text-xs font-bold uppercase tracking-widest text-yellow-500 hover:text-white transition-colors"
                                >
                                    <X size={14} /> Reset
                                </button>
                            )}
                        </div>
                    </div>

                    {/* EXPANDABLE FILTER PANEL */}
                    {showFilters && (
                        <div className="mb-12 p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                <div className="space-y-4">
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Genres</label>
                                    <div className="flex flex-wrap gap-2">
                                        <button 
                                            onClick={() => setCategory('')}
                                            className={`px-4 py-2 rounded-full text-xs transition-all ${!initCategory ? 'bg-white text-black font-bold' : 'bg-white/5 border border-white/10'}`}
                                        >
                                            All
                                        </button>
                                        {CATEGORIES.map(c => (
                                            <button 
                                                key={c}
                                                onClick={() => setCategory(c)}
                                                className={`px-4 py-2 rounded-full text-xs transition-all ${initCategory === c ? 'bg-yellow-500 text-black font-bold' : 'bg-white/5 border border-white/10 hover:border-white/30'}`}
                                            >
                                                {c}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Price Range</label>
                                    <div className="flex gap-2">
                                        <input type="number" placeholder="Min" value={minPrice} onChange={e => setMinPrice(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-yellow-500/50" />
                                        <input type="number" placeholder="Max" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-yellow-500/50" />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Minimum Rating</label>
                                    <select value={minRating} onChange={e => setMinRating(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none">
                                        <option value="">Any appraisal</option>
                                        <option value="4.5">4.5+ Stars</option>
                                        <option value="4">4.0+ Stars</option>
                                    </select>
                                </div>
                                <div className="flex items-end">
                                    <button onClick={() => setShowFilters(false)} className="w-full py-2 text-xs font-bold uppercase border-b border-white/10 hover:border-yellow-500 transition-all text-muted-foreground hover:text-yellow-500">Apply Filters</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* RESULTS META */}
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                        <p className="text-sm font-light text-muted-foreground">
                            Revealing <span className="text-white font-bold tracking-tight">{filtered.length}</span> results 
                            {initCategory && <span> in <span className="text-yellow-500 underline underline-offset-4 font-medium">{initCategory}</span></span>}
                        </p>
                        <div className="flex items-center gap-4 text-muted-foreground/30">
                            <LayoutGrid size={18} className="text-yellow-500" />
                            <ListFilter size={18} />
                        </div>
                    </div>

                    {/* MAIN GRID */}
                    {filtered.length > 0 ? (
                        <div className="grid gap-x-8 gap-y-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {filtered.map(book => (
                                <div key={book.id} className="animate-in fade-in zoom-in-95 duration-500">
                                    <BookCard book={book} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-40 rounded-3xl bg-white/[0.01] border border-dashed border-white/10">
                            <div className="bg-yellow-500/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search size={32} className="text-yellow-500/20" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">No volumes found</h3>
                            <p className="text-muted-foreground font-light mb-8 max-w-xs mx-auto">Our library is vast, but your specific search yielded no results. Try adjusting your filters.</p>
                            <button onClick={clearFilters} className="px-8 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-all text-sm font-bold">
                                Clear All Constraints
                            </button>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default function ItemsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center"><div className="w-12 h-12 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin" /></div>}>
            <BooksContent />
        </Suspense>
    );
}