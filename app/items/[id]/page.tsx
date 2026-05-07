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
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import { getBooks } from "@/data/books"; 

const SpecItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
    <div className="group flex items-center justify-between p-4 rounded-xl transition-all duration-500 hover:bg-white/[0.04] border border-transparent hover:border-white/5">
        <div className="flex items-center gap-4">
            <div className="p-2.5 rounded-lg bg-yellow-500/5 text-yellow-500/40 group-hover:text-yellow-500 group-hover:bg-yellow-500/10 transition-all duration-500">
                {icon}
            </div>
            <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/50 mb-0.5 font-bold">
                    {label}
                </p>
                <p className="text-sm font-bold text-foreground/90 tracking-wide">
                    {value}
                </p>
            </div>
        </div>
    </div>
);

export default function BookDetailPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);

    const books = getBooks();
    const book = books.find((b) => b.id === id);

    if (!book) {
        return (
            <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center space-y-8">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <h2 className="text-3xl font-black tracking-tighter uppercase mb-4">Volume Not Found</h2>
                    <Link href="/items" className="text-yellow-500 border-b-2 border-yellow-500/30 pb-1 hover:border-yellow-500 transition-all font-bold uppercase tracking-widest text-xs">
                        Return to Archives
                    </Link>
                </motion.div>
            </div>
        );
    }

    const relatedBooks = books
        .filter((b) => b.id !== id && b.category === book.category)
        .slice(0, 3);

    const handleAddToCart = () => {
        setAddedToCart(true);
        toast.success(`"${book.title}" secured in cart`, {
            icon: '🏛️',
            style: { borderRadius: '15px', background: '#13131c', color: '#f0ede8', border: '1px solid rgba(255,255,255,0.1)' }
        });
        setTimeout(() => setAddedToCart(false), 3000);
    };

    return (
        <div className="relative min-h-screen bg-[#0a0a0f] text-[#f0ede8] selection:bg-yellow-500/30 overflow-x-hidden">
            {/* Cinematic Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-yellow-500/5 to-transparent pointer-events-none -z-10" />

            <Navbar />

            <main className="container mx-auto px-6 pt-32 pb-24">

                {/* Breadcrumb Navigation */}
                <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => router.back()}
                    className="flex items-center gap-3 text-muted-foreground/60 hover:text-yellow-500 transition-all mb-12 group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[11px] uppercase tracking-[0.4em] font-black">Back to Archives</span>
                </motion.button>

                <div className="grid lg:grid-cols-12 gap-16 xl:gap-32">

                    {/* LEFT COLUMN: Visuals (5/12) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="lg:col-span-5 space-y-12"
                    >
                        <div className="relative group">
                            {/* Dynamic Glow */}
                            <div className="absolute -inset-10 bg-yellow-500/10 blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10" />

                            {/* Main Cover */}
                            <div className="relative aspect-[3/4.2] rounded-[2rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border border-white/10 group-hover:border-yellow-500/20 transition-all duration-700">
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
                                        <span className="px-8 py-3 border-2 border-red-500/40 text-red-400 text-[10px] font-black uppercase tracking-[0.4em] rounded-full">
                                            Archived / Out of Stock
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Trust Badge Card */}
                        <div className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl flex items-start gap-6 group hover:bg-white/[0.04] transition-all duration-500 shadow-2xl">
                            <div className="p-4 bg-yellow-500/10 rounded-2xl text-yellow-500 shadow-inner">
                                <ShieldCheck size={32} strokeWidth={1.5} />
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-base font-black tracking-tight">The Odyssey Guarantee</h4>
                                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                                    Every curated volume undergoes a rigorous 12-point quality check. Hand-packed and carbon-neutral delivery.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN: Product Info (7/12) */}
                    <div className="lg:col-span-7 flex flex-col pt-4">

                        {/* Header Section */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-8 mb-16"
                        >
                            <div className="flex flex-wrap items-center gap-6">
                                <span className="px-4 py-1.5 bg-yellow-500/10 text-yellow-500 text-[10px] font-black uppercase tracking-[0.4em] rounded-lg border border-yellow-500/20">
                                    {book.category}
                                </span>
                                <div className="h-px w-10 bg-white/10" />
                                <div className="flex items-center gap-2.5 text-muted-foreground/80">
                                    <Star size={16} className="fill-yellow-500 text-yellow-500" />
                                    <span className="text-xs font-black tracking-[0.2em]">{book.rating} Appraisal</span>
                                </div>
                            </div>

                            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-white">
                                {book.title}
                            </h1>

                            <div className="flex items-center gap-6">
                                <div className="w-16 h-[2px] bg-yellow-500/50" />
                                <p className="text-3xl text-muted-foreground font-serif italic tracking-tight">
                                    by {book.author}
                                </p>
                            </div>
                        </motion.div>

                        {/* Price & Primary Actions */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col sm:flex-row sm:items-end gap-12 mb-16"
                        >
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground/40 mb-4 font-black">Current Appraisal</p>
                                <p className="text-7xl font-black tracking-tighter text-foreground">${book.price.toFixed(2)}</p>
                            </div>

                            <div className="flex gap-4 pb-2">
                                <button
                                    onClick={() => setIsWishlisted(!isWishlisted)}
                                    className={`p-5 rounded-2xl border border-white/10 transition-all duration-300 active:scale-90 shadow-xl ${isWishlisted ? 'bg-red-500/10 border-red-500/50 text-red-500' : 'hover:bg-white/5 hover:border-white/20'}`}
                                >
                                    <Heart size={24} className={isWishlisted ? 'fill-current' : ''} />
                                </button>
                                <button className="p-5 rounded-2xl border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all duration-300 active:scale-90 shadow-xl">
                                    <Share2 size={24} />
                                </button>
                            </div>
                        </motion.div>

                        {/* Synopsis */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="prose prose-invert max-w-2xl mb-16"
                        >
                            <p className="text-2xl leading-relaxed text-foreground/70 font-light italic">
                                "{book.fullDescription || book.shortDescription}"
                            </p>
                        </motion.div>

                        {/* Major CTA */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="mb-20"
                        >
                            <button
                                disabled={!book.inStock}
                                onClick={handleAddToCart}
                                className="group relative w-full sm:w-auto min-w-[350px] flex items-center justify-center gap-5 px-12 py-7 bg-yellow-500 text-black font-black rounded-3xl transition-all duration-500 hover:shadow-[0_25px_60px_rgba(234,179,8,0.3)] active:scale-[0.98] disabled:opacity-20 disabled:grayscale"
                            >
                                {addedToCart ? (
                                    <>
                                        <Check size={24} strokeWidth={3} />
                                        <span className="uppercase tracking-[0.3em] text-sm">Secured in Collection</span>
                                    </>
                                ) : (
                                    <>
                                        <ShoppingCart size={24} />
                                        <span className="uppercase tracking-[0.3em] text-sm">Acquire Volume</span>
                                    </>
                                )}
                            </button>
                        </motion.div>

                        {/* Specifications Card */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="space-y-6"
                        >
                            <h5 className="text-[10px] uppercase tracking-[0.6em] text-muted-foreground/30 font-black ml-2">Manifest Details</h5>
                            <div className="grid sm:grid-cols-2 gap-4 p-4 rounded-[2.5rem] bg-white/[0.01] border border-white/5 backdrop-blur-sm shadow-inner">
                                <SpecItem icon={<User size={20} />} label="Curated Author" value={book.author} />
                                <SpecItem icon={<Hash size={20} />} label="Global Identifier" value={book.id.toUpperCase()} />
                                <SpecItem icon={<Building size={20} />} label="Release Year" value="2024" />
                                <SpecItem icon={<Globe size={20} />} label="Edition Language" value="English / Standard" />
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* RELATED WORKS: Section */}
                {relatedBooks.length > 0 && (
                    <div className="mt-48">
                        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
                            <div className="space-y-3">
                                <span className="text-yellow-500 font-black text-[10px] tracking-[0.5em] uppercase">You may also appreciate</span>
                                <h2 className="text-5xl font-black tracking-tighter">Similar Literary Works</h2>
                            </div>
                            <Link href="/items" className="text-[11px] font-black uppercase tracking-[0.3em] py-3 border-b-2 border-white/10 hover:border-yellow-500 transition-all">
                                Explore Full Archive
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
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