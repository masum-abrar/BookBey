'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { BookOpen, ChevronDown, Plus, LayoutGrid, LogOut, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/items#genres', label: 'Books' },
    { href: '/about', label: 'About' },
    { href: '/items/add', label: 'Add Book' },
    { href: '/items/manage', label: 'Manage Book' },
  ];

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
    router.push('/');
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    const baseHref = href.split('#')[0];
    if (baseHref === '/items') {
      return pathname === '/items';
    }
    return pathname.startsWith(baseHref);
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-black/70 border-b border-white/10">
      <div className="container mx-auto px-4 flex items-center justify-between h-[70px]">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-yellow-500 rounded-lg flex items-center justify-center">
            <BookOpen size={18} className="text-black" strokeWidth={2.5} />
          </div>
          <span className="text-lg font-bold">BookBey</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-sm transition
                ${isActive(link.href)
                  ? 'text-yellow-500 bg-yellow-500/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div ref={dropRef} className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-muted border rounded-lg text-sm"
              >
                <div className="w-7 h-7 rounded-full bg-yellow-500 flex items-center justify-center text-xs font-bold text-black">
                  {(user.displayName || user.email || 'U')[0].toUpperCase()}
                </div>
                <span className="max-w-[100px] truncate">
                  {user.displayName || user.email?.split('@')[0]}
                </span>
                <ChevronDown size={14} className={`${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-background border rounded-xl shadow-lg overflow-hidden">
                  <div className="p-3 border-b">
                    <p className="text-sm font-medium">{user.displayName || 'Reader'}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>

                  <Link href="/items/add" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted">
                    <Plus size={14} /> Add Book
                  </Link>

                  <Link href="/items/manage" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted">
                    <LayoutGrid size={14} /> Manage Books
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-500/10"
                  >
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <Link href="/login" className="px-4 py-2 text-sm border rounded-lg">
                Sign In
              </Link>
              <Link href="/register" className="px-4 py-2 text-sm bg-yellow-500 rounded-lg text-black">
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-background px-4 py-4 space-y-3">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm"
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <>
              <Link href="/items/add" className="block">Add Book</Link>
              <Link href="/items/manage" className="block">Manage Books</Link>
              <button onClick={handleLogout} className="text-red-500">Sign Out</button>
            </>
          ) : (
            <>
              <Link href="/login">Sign In</Link>
              <Link href="/register">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
