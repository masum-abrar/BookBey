'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';
import { addBook, CATEGORIES, Book } from '@/data/books';
import toast from 'react-hot-toast';
import {
    PlusCircle, BookOpen, Image as ImageIcon,
    DollarSign, Info, Sparkles, ArrowRight, Eye
} from 'lucide-react';
import Image from 'next/image';

export default function AddBookPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        title: '',
        author: '',
        shortDescription: '',
        fullDescription: '',
        price: '',
        category: '',
        imageUrl: '',
    });

    const handleChange = (field: string, val: string) => {
        setForm(p => ({ ...p, [field]: val }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.title || !form.price || !form.category) {
            return toast.error("Please fill in the essentials");
        }

        setLoading(true);
        try {
            const book: Book = {
                id: Date.now().toString(),
                title: form.title,
                author: form.author || "Unknown Author",
                shortDescription: form.shortDescription,
                fullDescription: form.fullDescription,
                price: parseFloat(form.price),
                category: form.category,
                rating: 5.0,
                pages: 0,
                publisher: 'Independent',
                publishedYear: new Date().getFullYear(),
                language: 'English',
                isbn: 'N/A',
                imageUrl: form.imageUrl || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1000',
                tags: [],
                inStock: true,
            };

            addBook(book);
            toast.success('Volume added to the collection', {
                style: { background: '#13131c', color: '#f0ede8', border: '1px solid #c9a84c' }
            });
            router.push('/items/manage');
        } catch {
            toast.error('Manifest submission failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-[#0a0a0f] text-[#f0ede8]">
                <Navbar />

                <main className="pb-20">
                    {/* Header Section */}
                    <div className="relative border-b border-white/5 bg-white/[0.01] px-6 py-20">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-transparent pointer-events-none" />
                        <div className="container relative flex flex-col md:flex-row justify-between items-end md:items-center gap-6">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <PlusCircle size={14} className="text-yellow-500" />
                                    <span className="text-[10px] uppercase tracking-[0.4em] text-yellow-500 font-bold">Librarian Tools</span>
                                </div>
                                <h1 className="text-4xl font-bold tracking-tighter">
                                    <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700"> Add </span>
                                    New Volume
                                </h1>
                                <p className="text-muted-foreground text-sm mt-2 font-light">
                                    Fill in the details below to add a new book to your collection
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="container py-12">
                        <div className="grid lg:grid-cols-12 gap-12 items-start">

                            {/* FORM AREA (8 Columns) */}
                            <form onSubmit={handleSubmit} className="lg:col-span-8 space-y-8">

                                {/* 1. Content Manifest */}
                                <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-6">
                                    <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                                        <BookOpen className="text-yellow-500" size={20} />
                                        <h3 className="font-bold tracking-tight text-xl">Content Manifest</h3>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[11px] uppercase tracking-widest text-muted-foreground ml-1">Title</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. The Great Gatsby"
                                                value={form.title}
                                                onChange={e => handleChange('title', e.target.value)}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-yellow-500/50 transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[11px] uppercase tracking-widest text-muted-foreground ml-1">Author</label>
                                            <input
                                                type="text"
                                                placeholder="F. Scott Fitzgerald"
                                                value={form.author}
                                                onChange={e => handleChange('author', e.target.value)}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-yellow-500/50 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[11px] uppercase tracking-widest text-muted-foreground ml-1">Genre / Category</label>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                            {CATEGORIES.map(c => (
                                                <button
                                                    key={c}
                                                    type="button"
                                                    onClick={() => handleChange('category', c)}
                                                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${form.category === c ? 'bg-yellow-500 text-black border-yellow-500' : 'bg-white/5 border-white/5 hover:border-white/20 text-muted-foreground'}`}
                                                >
                                                    {c}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[11px] uppercase tracking-widest text-muted-foreground ml-1">Short Summary</label>
                                        <textarea
                                            rows={2}
                                            placeholder="The defining novel of the Jazz Age..."
                                            value={form.shortDescription}
                                            onChange={e => handleChange('shortDescription', e.target.value)}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-yellow-500/50 transition-all resize-none"
                                        />
                                    </div>
                                </section>

                                {/* 2. Visuals & Appraisal */}
                                <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-6">
                                    <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                                        <Sparkles className="text-yellow-500" size={20} />
                                        <h3 className="font-bold tracking-tight text-xl">Visuals & Appraisal</h3>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[11px] uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                                                <ImageIcon size={14} /> Cover Image URL
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="https://unsplash.com/..."
                                                value={form.imageUrl}
                                                onChange={e => handleChange('imageUrl', e.target.value)}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-yellow-500/50 transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[11px] uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                                                <DollarSign size={14} /> Price (USD)
                                            </label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                placeholder="29.99"
                                                value={form.price}
                                                onChange={e => handleChange('price', e.target.value)}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-yellow-500/50 transition-all"
                                            />
                                        </div>
                                    </div>
                                </section>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group w-full flex items-center justify-center gap-3 bg-yellow-500 text-black py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-yellow-400 hover:shadow-[0_20px_50px_rgba(201,168,76,0.2)] transition-all active:scale-[0.98] disabled:opacity-50"
                                >
                                    {loading ? 'Committing to Archive...' : (
                                        <>
                                            Publish Volume <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* PREVIEW SIDEBAR (4 Columns) */}
                            <aside className="lg:col-span-4 sticky top-28 space-y-6">
                                <div className="flex items-center gap-2 text-muted-foreground/50 mb-2">
                                    <Eye size={16} />
                                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Real-time Preview</span>
                                </div>

                                {/* Mock Book Card */}
                                <div className="relative group p-4 rounded-3xl bg-white/[0.03] border border-white/10 overflow-hidden">
                                    <div className="aspect-[3/4] relative rounded-2xl overflow-hidden mb-6 shadow-2xl">
                                        <Image
                                            src={form.imageUrl || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1000'}
                                            width={48}
                                            height={64}
                                            alt="Preview"
                                            className="object-cover w-full h-full grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700"
                                        />
                                        <div className="absolute top-4 right-4 px-2 py-1 bg-black/60 backdrop-blur-md rounded border border-white/10 text-[10px] font-bold uppercase tracking-widest">
                                            {form.category || "General"}
                                        </div>
                                    </div>

                                    <div className="space-y-2 px-2">
                                        <h3 className="text-2xl font-bold tracking-tight line-clamp-1">{form.title || "Untitled Volume"}</h3>
                                        <p className="font-serif italic text-muted-foreground">by {form.author || "Author Unknown"}</p>
                                        <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-4">
                                            <p className="text-2xl font-light tracking-tighter text-yellow-500">
                                                ${form.price || "0.00"}
                                            </p>
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-yellow-500/40" />)}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex gap-4">
                                    <Info className="text-blue-400 shrink-0" size={20} />
                                    <p className="text-xs leading-relaxed text-blue-200/70">
                                        Your volume will be listed as <span className="text-blue-300 font-bold">Odyssey Independent</span>. Curators may review and edit the meta-data after publication.
                                    </p>
                                </div>
                            </aside>

                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </ProtectedRoute>
    );
}