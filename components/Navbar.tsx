'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { BookOpen, ChevronDown, Plus, LayoutGrid, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/items', label: 'Books' },
    { href: '/about', label: 'About' },
    ...(user ? [
      { href: '/items/add', label: 'Add Book' },
      { href: '/items/manage', label: 'Manage' },
    ] : []),
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
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/70 border-b border-white/10">
      <div className="container mx-auto px-4 flex items-center justify-between h-[70px]">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12 group-hover:scale-110">
            <BookOpen size={20} className="text-black" strokeWidth={2.5} />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase italic">Book<span className="text-yellow-500">Bey</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
                ${isActive(link.href)
                  ? 'text-yellow-500 bg-yellow-500/10'
                  : 'text-muted-foreground hover:text-white hover:bg-white/5'}`}
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
                className="flex items-center gap-3 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm hover:bg-white/10 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-xs font-black text-black shadow-lg shadow-yellow-500/20">
                  {(user.displayName || user.email || 'U')[0].toUpperCase()}
                </div>
                <span className="max-w-[120px] truncate font-bold text-foreground/90">
                  {user.displayName || user.email?.split('@')[0]}
                </span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-0 mt-3 w-64 bg-[#13131c] border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl"
                  >
                    <div className="p-4 border-b border-white/5 bg-white/5">
                      <p className="text-sm font-black tracking-tight">{user.displayName || 'Reader'}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>

                    <div className="p-2">
                      <Link 
                        href="/items/add" 
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm rounded-lg hover:bg-white/5 transition-colors group"
                      >
                        <Plus size={16} className="text-yellow-500 group-hover:scale-110 transition-transform" /> 
                        <span className="font-medium">Register New Volume</span>
                      </Link>

                      <Link 
                        href="/items/manage" 
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm rounded-lg hover:bg-white/5 transition-colors group"
                      >
                        <LayoutGrid size={16} className="text-yellow-500 group-hover:scale-110 transition-transform" /> 
                        <span className="font-medium">Inventory Management</span>
                      </Link>

                      <div className="h-px bg-white/5 my-2 mx-2" />

                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-400 rounded-lg hover:bg-red-500/10 transition-colors group"
                      >
                        <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" /> 
                        <span className="font-bold">Secure Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link href="/login" className="px-5 py-2.5 text-sm font-bold border border-white/10 rounded-xl hover:bg-white/5 transition-all">
                Sign In
              </Link>
              <Link href="/register" className="px-5 py-2.5 text-sm font-black bg-yellow-500 rounded-xl text-black hover:bg-yellow-400 transition-all shadow-lg shadow-yellow-500/10">
                Join Now
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 bg-white/5 rounded-lg border border-white/10"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-white/10 bg-[#0a0a0f] overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-2 text-lg font-bold ${isActive(link.href) ? 'text-yellow-500' : 'text-muted-foreground'}`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="h-px bg-white/10 my-4" />

              {user ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                     <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-xs font-black text-black">
                        {(user.displayName || user.email || 'U')[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-bold">{user.displayName || 'Reader'}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                  </div>
                  <Link href="/items/add" onClick={() => setMobileOpen(false)} className="block py-2 font-medium">Add Book</Link>
                  <Link href="/items/manage" onClick={() => setMobileOpen(false)} className="block py-2 font-medium">Manage Books</Link>
                  <button onClick={handleLogout} className="w-full text-left py-2 text-red-500 font-bold">Sign Out</button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/login" onClick={() => setMobileOpen(false)} className="px-4 py-3 text-center text-sm font-bold border border-white/10 rounded-xl">Sign In</Link>
                  <Link href="/register" onClick={() => setMobileOpen(false)} className="px-4 py-3 text-center text-sm font-black bg-yellow-500 rounded-xl text-black">Join Now</Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

