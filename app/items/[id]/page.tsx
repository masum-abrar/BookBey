"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
    ShoppingCart, Star, Share2, Heart, ShieldCheck,
    ArrowLeft, User, Hash, Building, Globe, Check
} from "lucide-react";
import toast from "react-hot-toast";


const SpecItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
    <div className="group flex items-center justify-between p-4 rounded-xl transition-all duration-500 hover:bg-white/[0.04] border border-transparent hover:border-white/5">
        <div className="flex items-center gap-4">
            <div className="p-2.5 rounded-lg bg-yellow-500/5 text-yellow-500/40 group-hover:text-yellow-500 group-hover:bg-yellow-500/10 transition-all duration-500">
                {icon}
            </div>
            <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/50 mb-0.5 font-medium">
                    {label}
                </p>
                <p className="text-sm font-medium text-foreground/90 tracking-wide">
                    {value}
                </p>
            </div>
        </div>
    </div>
);



import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import { defaultBooks } from "@/data/books"; 

export default function BookDetailPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);

    // Finding the book
    const book = defaultBooks.find((b) => b.id === id);

    if (!book) {
        return (
            <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center space-y-6">
                <h2 className="text-2xl font-light tracking-widest uppercase">Volume Not Found</h2>
                <Link href="/items" className="text-yellow-500 border-b border-yellow-500/30 pb-1 hover:border-yellow-500 transition-all">
                    Return to Archives
                </Link>
            </div>
        );
    }

    const relatedBooks = defaultBooks
        .filter((b) => b.id !== id && b.category === book.category)
        .slice(0, 3);

    const handleAddToCart = () => {
        setAddedToCart(true);
        toast.success(`"${book.title}" secured in cart`, {
            icon: '🏛️',
            style: { borderRadius: '10px', background: '#13131c', color: '#f0ede8' }
        });
        setTimeout(() => setAddedToCart(false), 3000);
    };

    return (
        <div className=" relative min-h-screen bg-[#0a0a0f] text-[#f0ede8] selection:bg-yellow-500/30">
            {/* Cinematic Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-yellow-500/10 to-transparent pointer-events-none -z-10" />

            <Navbar />

            <main className="container mx-auto px-6 pt-32 pb-24">

                {/* Breadcrumb Navigation */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-3 text-muted-foreground/60 hover:text-yellow-500 transition-all mb-12 group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[11px] uppercase tracking-[0.3em] font-semibold">Back to Archives</span>
                </button>

                <div className="grid lg:grid-cols-12 gap-16 xl:gap-24">

                    {/* LEFT COLUMN: Visuals (5/12) */}
                    <div className="lg:col-span-5 space-y-10">
                        <div className="relative group perspective-1000">
                            {/* Dynamic Glow */}
                            <div className="absolute -inset-8 bg-yellow-500/10 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10" />

                            {/* Main Cover */}
                            <div className="relative aspect-[3/4.2] rounded-2xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border border-white/10 group-hover:border-white/20 transition-all duration-700">
                                <Image
                                    src={book.imageUrl}
                                    alt={book.title}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    priority
                                />

                                {/* Out of Stock Overlay */}
                                {!book.inStock && (
                                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center">
                                        <span className="px-6 py-2 border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-[0.3em] rounded-full">
                                            Archived / Out of Stock
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Trust Badge Card */}
                        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm flex items-start gap-5 group hover:bg-white/[0.04] transition-all duration-500">
                            <div className="p-3 bg-yellow-500/10 rounded-xl text-yellow-500">
                                <ShieldCheck size={28} strokeWidth={1.5} />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-bold tracking-tight">The Odyssey Guarantee</h4>
                                <p className="text-xs text-muted-foreground/80 leading-relaxed">
                                    Every curated volume undergoes a 12-point quality check. Hand-packed and carbon-neutral delivery to your doorstep.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Product Info (7/12) */}
                    <div className="lg:col-span-7 flex flex-col">

                        {/* Header Section */}
                        <div className="space-y-6 mb-12">
                            <div className="flex flex-wrap items-center gap-4">
                                <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 text-[10px] font-bold uppercase tracking-[0.3em] rounded-md border border-yellow-500/20">
                                    {book.category}
                                </span>
                                <div className="h-px w-8 bg-white/10" />
                                <div className="flex items-center gap-2 text-muted-foreground/60">
                                    <Star size={14} className="fill-yellow-500 text-yellow-500" />
                                    <span className="text-xs font-mono tracking-widest">{book.rating} Editor Rating</span>
                                </div>
                            </div>

                            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.95] text-white">
                                {book.title}
                            </h1>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-[1px] bg-yellow-500/50" />
                                <p className="text-2xl text-muted-foreground font-serif italic italic tracking-tight italic">
                                    by {book.author}
                                </p>
                            </div>
                        </div>

                        {/* Price & Primary Actions */}
                        <div className="flex flex-col sm:flex-row sm:items-end gap-10 mb-12">
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground/40 mb-2 font-bold">Current Appraisal</p>
                                <p className="text-6xl font-light tracking-tighter text-foreground">${book.price}</p>
                            </div>

                            <div className="flex gap-3 pb-2">
                                <button
                                    onClick={() => setIsWishlisted(!isWishlisted)}
                                    className={`p-4 rounded-2xl border border-white/10 transition-all duration-300 active:scale-90 ${isWishlisted ? 'bg-red-500/10 border-red-500/50 text-red-500' : 'hover:bg-white/5'}`}
                                >
                                    <Heart size={22} className={isWishlisted ? 'fill-current' : ''} />
                                </button>
                                <button className="p-4 rounded-2xl border border-white/10 hover:bg-white/5 transition-all duration-300 active:scale-90">
                                    <Share2 size={22} />
                                </button>
                            </div>
                        </div>

                        {/* Synopsis */}
                        <div className="prose prose-invert max-w-2xl mb-12">
                            <p className="text-xl leading-relaxed text-foreground/70 font-light">
                                {book.fullDescription || book.shortDescription}
                            </p>
                        </div>

                        {/* Major CTA */}
                        <div className="mb-16">
                            <button
                                disabled={!book.inStock}
                                onClick={handleAddToCart}
                                className="group relative w-full sm:w-auto min-w-[300px] flex items-center justify-center gap-4 px-10 py-6 bg-yellow-500 text-black font-black rounded-2xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(201,168,76,0.25)] active:scale-[0.98] disabled:opacity-20 disabled:grayscale"
                            >
                                {addedToCart ? (
                                    <>
                                        <Check size={22} strokeWidth={3} />
                                        <span className="uppercase tracking-[0.2em] text-sm">Secured in Cart</span>
                                    </>
                                ) : (
                                    <>
                                        <ShoppingCart size={22} />
                                        <span className="uppercase tracking-[0.2em] text-sm">Add to Private Collection</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Specifications Card */}
                        <div className="space-y-4">
                            <h5 className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground/30 font-bold ml-1">Manifest Details</h5>
                            <div className="grid sm:grid-cols-2 gap-2 p-2 rounded-3xl bg-white/[0.01] border border-white/5 backdrop-blur-sm">
                                <SpecItem icon={<User size={18} />} label="Curated Author" value={book.author} />
                                <SpecItem icon={<Hash size={18} />} label="Global Identifier" value={book.isbn || "N/A"} />
                                <SpecItem icon={<Building size={18} />} label="Release Year" value={book.publishedYear?.toString() || "2024"} />
                                <SpecItem icon={<Globe size={18} />} label="Edition Language" value={book.language || "English"} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* RELATED WORKS: Section */}
                {relatedBooks.length > 0 && (
                    <div className="mt-40">
                        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
                            <div className="space-y-2">
                                <span className="text-yellow-500 font-mono text-[10px] tracking-[0.4em] uppercase">You may also appreciate</span>
                                <h2 className="text-4xl font-bold tracking-tighter">Similar Literary Works</h2>
                            </div>
                            <Link href="/items" className="text-[11px] font-bold uppercase tracking-[0.2em] py-2 border-b border-white/10 hover:border-yellow-500 transition-all">
                                Explore Full Archive
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                            {relatedBooks.map((b) => (
                                <BookCard key={b.id} book={b} />
                            ))}
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}