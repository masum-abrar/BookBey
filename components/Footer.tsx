import Link from 'next/link';
import { BookOpen, Mail, } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#050508] border-t border-white/5 pt-24 pb-12 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">

          {/* Brand & Manifesto */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12 group-hover:scale-110">
                <BookOpen size={20} className="text-black" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase italic">Book<span className="text-yellow-500">Bey</span></span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed font-light">
              We believe the right book at the right time can change a life. Our mission is to curate the world’s most impactful literature for the modern seeker.
            </p>
            {/* <div className="flex gap-4">
              {[Twitter, Github, Instagram, Linkedin].map((Icon, i) => (
                <Link key={i} href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:bg-white/5 hover:text-yellow-500 transition-all">
                  <Icon size={16} />
                </Link>
              ))}
            </div> */}
          </div>

          {/* Navigation Matrix */}
          <div>
            <h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-yellow-500 mb-8">
              Archive Navigation
            </h4>
            <div className="flex flex-col gap-4">
              {[
                { href: '/', label: 'Home' },
                { href: '/items', label: 'All Collections' },
                { href: '/about', label: 'Our Story' },
                { href: '/items/manage', label: 'Librarian Dashboard' },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Curated Genres */}
          <div>
            <h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-yellow-500 mb-8">
              Curated Genres
            </h4>
            <div className="flex flex-col gap-4">
              {['Fiction', 'Non-Fiction', 'Science', 'History', 'Philosophy', 'Technology'].map(g => (
                <Link
                  key={g}
                  href={`/items?category=${g}`}
                  className="text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  {g}
                </Link>
              ))}
            </div>
          </div>

          {/* Intelligence Briefing */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-yellow-500 mb-8">
              Weekly Briefing
            </h4>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              Join 98,000+ readers receiving our curated literary insights.
            </p>
            <div className="relative group">
              <input
                type="email"
                placeholder="Secure email address"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 text-sm outline-none focus:border-yellow-500/50 transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-yellow-500 rounded-lg text-black hover:bg-yellow-400 transition-all shadow-lg shadow-yellow-500/10">
                <Mail size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Legal & Versioning */}
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              © {new Date().getFullYear()} BookBey Archives
            </p>
            <div className="hidden md:block w-1 h-1 bg-white/20 rounded-full" />
            <p className="text-[10px] text-muted-foreground/50 uppercase tracking-[0.2em]">
              v4.0.0 Stable / Built on Next.js 16
            </p>
          </div>

          <div className="flex gap-8">
            {['Privacy', 'Terms', 'Manifesto'].map(item => (
              <Link
                key={item}
                href="#"
                className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-white transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
