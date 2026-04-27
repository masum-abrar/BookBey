"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  BookOpen,
  Target,
  Heart,
  Users,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const team = [
  {
    name: "Elena Voss",
    role: "Founder & Editor-in-Chief",
    bio: "Former literary agent with 12 years of experience discovering new voices in fiction.",
    initial: "E",
    color: "#c9a84c", 
  },
  {
    name: "James Okafor",
    role: "Head of Curation",
    bio: "Published author and book critic. Believes every reader deserves to find their next obsession.",
    initial: "J",
    color: "#a0a0af", 
  },
  {
    name: "Mei Lin",
    role: "Community Director",
    bio: "Book club organizer turned tech lead. Passionate about connecting readers worldwide.",
    initial: "M",
    color: "#c9a84c",
  },
];

const values = [
  {
    icon: <Target size={22} />,
    title: "Intentional Curation",
    desc: "We don’t list every book ever printed. We surface the ones that genuinely matter — books that challenge and transform.",
  },
  {
    icon: <Heart size={22} />,
    title: "Reader-First",
    desc: "Every feature is built with the reader’s experience in mind — not engagement metrics or ad revenue.",
  },
  {
    icon: <Sparkles size={22} />,
    title: "Discovery First",
    desc: "The best book is often one you’ve never heard of. We build tools that help you stumble upon your next favorite.",
  },
  {
    icon: <Users size={22} />,
    title: "Community Driven",
    desc: "Real reviews from verified readers. No publisher sponsorships. Just honest, literary-focused discourse.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#0a0a0f] text-[#f0ede8]">
      <Navbar />

      <main className="min-h-screen">
        {/* HERO - Dark Gradient Background */}
        <section className="relative overflow-hidden border-b border-white/5 bg-[#0a0a0f] py-28">
          <div className="absolute -top-24 -right-24 h-[500px] w-[500px] rounded-full bg-yellow-500/5 blur-[100px]" />
          <div className="absolute -bottom-24 -left-24 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-[100px]" />

          <div className="relative mx-auto max-w-6xl px-6">
            <p className="mb-4 text-[10px] uppercase tracking-[0.4em] text-yellow-500 font-bold">
              Our Story
            </p>

            <h1 className="mb-6 text-5xl font-bold leading-[1.1] md:text-7xl tracking-tighter">
              Books That <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700">Actually</span> Matter
            </h1>

            <p className="mb-10 max-w-2xl text-xl leading-relaxed text-muted-foreground font-light">
              Odyssey was born out of frustration. Too many bookstores optimize for volume over value. We built a sanctuary for the curious — a place that respects your time and your intelligence.
            </p>

            <Link
              href="/items"
              className="group inline-flex items-center gap-3 rounded-full bg-yellow-500 px-8 py-4 text-sm font-bold text-black transition-all hover:bg-yellow-400 hover:shadow-[0_0_30px_rgba(201,168,76,0.3)]"
            >
              Browse The Collection 
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

        {/* MISSION - Dark Minimalist Split */}
        <section className="py-32">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-20 px-6 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-bold">
                The Mission
              </p>

              <h2 className="text-4xl font-bold tracking-tight">
                Every reader deserves their <br/>
                <span className="text-yellow-500">next obsession.</span>
              </h2>

              <p className="text-lg leading-relaxed text-muted-foreground/80">
                We believe in the transformative power of literature. A single volume can reshape how you see the world, providing a lifetime of insight in a few hundred pages.
              </p>

              <div className="pt-4 grid grid-cols-2 gap-8 border-t border-white/5">
                <div>
                  <h4 className="text-2xl font-bold text-white">12k+</h4>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Curated Titles</p>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white">45k</h4>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Readers Joined</p>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/20 to-transparent rounded-2xl blur opacity-25" />
              <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-12 backdrop-blur-sm">
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-500/10">
                  <BookOpen className="text-yellow-500" />
                </div>

                <blockquote className="text-2xl font-serif italic text-foreground/90 leading-snug">
                  &quot;{"A reader lives a thousand lives before he dies. The man who never reads lives only one."}
                </blockquote>

                <p className="mt-6 text-sm tracking-widest text-muted-foreground">— GEORGE R.R. MARTIN</p>
              </div>
            </div>
          </div>
        </section>

        {/* VALUES - Glass Cards */}
        <section className="border-y border-white/5 bg-white/[0.01] py-32">
          <div className="mx-auto mb-20 max-w-6xl px-6 text-center">
            <p className="mb-4 text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-bold">
              The Blueprint
            </p>
            <h2 className="text-4xl font-bold tracking-tighter">Our Core Values</h2>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="group rounded-2xl border border-white/5 bg-white/[0.02] p-8 transition-all hover:bg-white/[0.04] hover:border-white/10">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-white/5 text-yellow-500 group-hover:scale-110 transition-transform">
                  {v.icon}
                </div>
                <h3 className="mb-3 font-bold text-lg text-white">{v.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TEAM - Abstract Profiles */}
        <section className="py-32">
          <div className="mx-auto mb-20 max-w-6xl px-6 text-center">
            <p className="mb-4 text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-bold">
              Architects
            </p>
            <h2 className="text-4xl font-bold tracking-tighter">Meet The Curators</h2>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m) => (
              <div key={m.name} className="group relative rounded-2xl border border-white/5 bg-[#0a0a0f] p-8 text-center transition-all hover:-translate-y-2">
                <div
                  className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold transition-all group-hover:shadow-[0_0_20px_rgba(201,168,76,0.15)]"
                  style={{
                    backgroundColor: m.color + "10",
                    color: m.color,
                    border: `1px solid ${m.color}30`,
                  }}
                >
                  {m.initial}
                </div>

                <h3 className="text-lg font-bold text-white">{m.name}</h3>
                <p className="mb-4 text-[10px] uppercase tracking-[0.2em] font-bold text-yellow-600">
                  {m.role}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground/80 font-light">
                  {m.bio}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA - Deep Dark Footer */}
        <section className="border-t border-white/5 bg-[#0d0d14] py-24 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />
          
          <div className="relative z-10">
            <h3 className="mb-4 text-4xl font-bold tracking-tighter px-2">
              Ready to find your <span className="text-yellow-500">odyssey?</span>
            </h3>
            <p className="mb-10 text-muted-foreground max-w-md mx-auto px-2">
              Join a global community of readers who prioritize depth, discovery, and the written word.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mx-6">
              <Link href="/register" className="rounded-full bg-white px-10 py-4 text-sm font-bold text-black transition-all hover:bg-gray-200">
                Create Private Account
              </Link>
              <Link href="/items" className="rounded-full border border-white/10 px-10 py-4 text-sm font-bold text-white transition-all hover:bg-white/5">
                Explore Archives
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}