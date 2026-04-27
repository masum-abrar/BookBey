'use client';

import { useState } from 'react';
import { getBooks, deleteBook, defaultBooks as staticDefaults } from '@/data/books';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Search, Trash2, Eye, Plus, ShieldCheck, Database, AlertCircle } from 'lucide-react';
import Image from 'next/image';

export default function ManageBooksPage() {
    const [search, setSearch] = useState('');
    const [confirmId, setConfirmId] = useState<string | null>(null);

    const books = getBooks();

    const isDefault = (id: string) =>
        staticDefaults.some(b => b.id === id);

    const filtered = books.filter(b =>
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.author.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = (id: string, title: string) => {
        if (isDefault(id)) {
            toast.error('Immutable archives cannot be purged');
            return;
        }

        deleteBook(id);
        toast.success(`${title} removed from archive`);
        setConfirmId(null);
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-[#0a0a0f] text-[#f0ede8]">
                <Navbar />

                <main className="pb-20">
                    {/* HEADER SECTION */}


                    <header className="relative border-b border-white/5 bg-white/[0.01] px-6 py-20 mb-12">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-transparent pointer-events-none" />
                        <div className="container relative flex flex-col md:flex-row justify-between items-end md:items-center gap-6">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Database size={14} className="text-yellow-500" />
                                    <span className="text-[10px] uppercase tracking-[0.4em] text-yellow-500 font-bold">Central Registry</span>
                                </div>
                                <h1 className="text-4xl font-bold tracking-tighter">Inventory
                                    <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700"> Management</span>
                                </h1>
                                <p className="text-muted-foreground text-sm mt-2 font-light">
                                    Currently overseeing <span className="text-white font-medium">{books.length}</span> curated volumes
                                </p>
                            </div>

                            <Link
                                href="/items/add"
                                className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-yellow-500 transition-all active:scale-95 shadow-xl shadow-white/5"
                            >
                                <Plus size={18} strokeWidth={3} /> Register Volume
                            </Link>
                        </div>
                    </header>

                    <div className="container space-y-8">
                        {/* UTILITY BAR */}
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/[0.02] border border-white/5 p-4 rounded-3xl backdrop-blur-sm">
                            <div className="relative w-full md:max-w-md group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 group-focus-within:text-yellow-500 transition-colors" size={18} />
                                <input
                                    type="text"
                                    placeholder="Filter by title, author, or UID..."
                                    className="w-full bg-black/40 border border-white/5 rounded-2xl pl-12 pr-4 py-3 outline-none focus:border-yellow-500/30 transition-all text-sm"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-6 px-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Database Live</span>
                                </div>
                            </div>
                        </div>

                        {/* TABLE ARCHITECTURE */}
                        <div className="relative rounded-[2rem] border border-white/5 bg-white/[0.01] overflow-hidden shadow-2xl">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/5 bg-white/[0.02]">
                                        <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground">Volume Details</th>
                                        <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground">Category</th>
                                        <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground">Appraisal</th>
                                        <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground">Status</th>
                                        <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-black text-right text-muted-foreground">Operations</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-white/[0.03]">
                                    {filtered.map(book => (
                                        <tr key={book.id} className="group hover:bg-white/[0.02] transition-colors">

                                            {/* Book Info */}
                                            <td className="p-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative w-12 h-16 rounded-lg overflow-hidden shadow-lg border border-white/10 shrink-0">
                                                        <Image
                                                            src={book.imageUrl || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1000'}
                                                            alt={book.title}
                                                            width={48}
                                                            height={64}
                                                            className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500"
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <p className="font-bold tracking-tight text-white group-hover:text-yellow-500 transition-colors">{book.title}</p>
                                                            {isDefault(book.id) && <ShieldCheck size={14} className="text-blue-400" />}
                                                        </div>
                                                        <p className="text-xs text-muted-foreground font-light italic">by {book.author}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="p-6">
                                                <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/5 text-muted-foreground">
                                                    {book.category}
                                                </span>
                                            </td>

                                            <td className="p-6">
                                                <p className="text-lg font-light tracking-tighter text-yellow-500">
                                                    ${book.price.toFixed(2)}
                                                </p>
                                            </td>

                                            <td className="p-6">
                                                <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${book.inStock ? 'text-green-400' : 'text-red-400'
                                                    }`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${book.inStock ? 'bg-green-400' : 'bg-red-400'}`} />
                                                    {book.inStock ? 'Available' : 'Depleted'}
                                                </div>
                                            </td>

                                            {/* Actions */}
                                            <td className="p-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link href={`/items/${book.id}`}>
                                                        <button className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 hover:text-yellow-500 transition-all" title="View Entry">
                                                            <Eye size={18} />
                                                        </button>
                                                    </Link>

                                                    {!isDefault(book.id) && (
                                                        <div className="flex items-center gap-2">
                                                            {confirmId === book.id ? (
                                                                <div className="flex items-center gap-2 animate-in fade-in zoom-in-95 duration-200">
                                                                    <button
                                                                        onClick={() => handleDelete(book.id, book.title)}
                                                                        className="bg-red-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-lg hover:bg-red-400 transition-all"
                                                                    >
                                                                        Purge
                                                                    </button>
                                                                    <button
                                                                        onClick={() => setConfirmId(null)}
                                                                        className="text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-all"
                                                                    >
                                                                        Esc
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                <button
                                                                    onClick={() => setConfirmId(book.id)}
                                                                    className="p-3 rounded-xl bg-red-500/5 border border-red-500/10 text-red-500 hover:bg-red-500 hover:text-black transition-all"
                                                                    title="Delete Entry"
                                                                >
                                                                    <Trash2 size={18} />
                                                                </button>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {filtered.length === 0 && (
                                <div className="py-20 text-center space-y-4">
                                    <AlertCircle size={40} className="mx-auto text-muted-foreground/20" />
                                    <p className="text-muted-foreground font-light">No volumes match your current filter criteria.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </ProtectedRoute>
    );
}