'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { BookOpen, Mail, Lock, Eye, EyeOff } from 'lucide-react';

function LoginForm() {
    const { user, login, loginWithGoogle, loading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect') || '/';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    useEffect(() => {
        if (!loading && user) router.replace(redirect);
    }, [user, loading, router, redirect]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) return toast.error('Fill all fields');

        setSubmitting(true);
        try {
            await login(email, password);
            toast.success('Welcome back!');
            router.replace(redirect);
        } catch {
            toast.error('Login failed');
        } finally {
            setSubmitting(false);
        }
    };

    const handleGoogle = async () => {
        setGoogleLoading(true);
        try {
            await loginWithGoogle();
            router.replace(redirect);
        } catch {
            toast.error('Google login failed');
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-background">
            <div className="w-full max-w-md space-y-6">

                {/* Logo */}
                <div className="text-center space-y-3">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                            <BookOpen className="text-black" />
                        </div>
                        <span className="text-xl font-bold">Odyssey</span>
                    </Link>
                    <h2 className="text-2xl font-semibold">Welcome back</h2>
                    <p className="text-sm text-muted-foreground">Sign in to continue</p>
                </div>

                <div className="border rounded-xl p-6 space-y-4 bg-card">

                    {/* Google */}
                    <button
                        onClick={handleGoogle}
                        disabled={googleLoading}
                        className="w-full py-3 border rounded-lg flex items-center justify-center gap-2 hover:bg-muted transition"
                    >
                        {googleLoading ? 'Loading...' : 'Continue with Google'}
                    </button>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="flex-1 h-px bg-border" />
                        or email
                        <div className="flex-1 h-px bg-border" />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div className="space-y-1">
                            <label className="text-sm">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-3 py-2 border rounded-md"
                                    placeholder="you@email.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-10 py-2 border rounded-md"
                                    placeholder="Password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                >
                                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full py-3 bg-yellow-500 text-black rounded-lg font-medium"
                        >
                            {submitting ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <p className="text-sm text-center text-muted-foreground">
                        No account?{' '}
                        <Link href="/register" className="text-yellow-500">
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="min-h-screen" />}>
            <LoginForm />
        </Suspense>
    );
}
