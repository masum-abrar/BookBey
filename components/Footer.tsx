import Link from 'next/link';
import { BookOpen, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-muted border-t py-16 pb-8 px-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-yellow-500 rounded-lg flex items-center justify-center">
                <BookOpen size={18} className="text-black" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold">BookBey</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              A curated marketplace for serious readers. Discover exceptional books across every genre.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
              Navigation
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/items', label: 'Browse Books' },
                { href: '/about', label: 'About Us' },
                { href: '/login', label: 'Sign In' },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-yellow-500 transition"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Genres */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
              Genres
            </h4>
            <div className="flex flex-col gap-2">
              {['Fiction', 'Non-Fiction', 'Science', 'History', 'Philosophy', 'Technology'].map(g => (
                <Link
                  key={g}
                  href={`/items?category=${g}`}
                  className="text-sm text-muted-foreground hover:text-yellow-500 transition"
                >
                  {g}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
              Newsletter
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Get curated book recommendations every week.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 text-sm border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button className="px-4 py-2 bg-yellow-500 rounded-md flex items-center justify-center hover:opacity-90 transition">
                <Mail size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Odyssey Books. All rights reserved.
          </p>

          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
              <Link
                key={item}
                href="#"
                className="text-xs text-muted-foreground hover:text-foreground transition"
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
