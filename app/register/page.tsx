'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { BookOpen, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
    const { user, register, loginWithGoogle, loading } = useAuth();
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (!loading && user) router.replace('/');
    }, [user, loading, router]);

    const validate = () => {
        const e: Record<string, string> = {};
        if (!name.trim()) e.name = 'Name is required';
        if (!email.trim()) e.email = 'Email is required';
        if (password.length < 6) e.password = 'Password must be at least 6 characters';
        if (password !== confirm) e.confirm = 'Passwords do not match';
        return e;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }

        setSubmitting(true);
        try {
            await register(email, password, name);
            toast.success('Account created!');
            router.replace('/');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            const msg =
                err.code === 'auth/email-already-in-use'
                    ? 'Email already used'
                    : err.code === 'auth/invalid-email'
                        ? 'Invalid email'
                        : 'Registration failed';
            toast.error(msg);
        } finally {
            setSubmitting(false);
        }
    };

    const handleGoogle = async () => {
        setGoogleLoading(true);
        try {
            await loginWithGoogle();
            toast.success('Signed in with Google');
            router.replace('/');
        } catch {
            toast.error('Google failed');
        } finally {
            setGoogleLoading(false);
        }
    };

    const strength =
        password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;

    const strengthColor = ['bg-transparent', 'bg-red-500', 'bg-yellow-500', 'bg-green-500'][strength];
    const strengthLabel = ['', 'Weak', 'Good', 'Strong'][strength];

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="w-full max-w-md space-y-6">

                {/* Logo */}
                <div className="text-center space-y-3">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <div className="w-11 h-11 bg-yellow-500 rounded-lg flex items-center justify-center">
                            <BookOpen className="text-black" size={22} />
                        </div>
                        <span className="text-xl font-bold">Odyssey</span>
                    </Link>
                    <h2 className="text-2xl font-semibold">Create Account</h2>
                    <p className="text-sm text-muted-foreground">
                        Start your journey
                    </p>
                </div>

                {/* Card */}
                <div className="bg-card border rounded-2xl p-6 space-y-4">

                    {/* Google */}
                    <button
                        onClick={handleGoogle}
                        disabled={googleLoading}
                        className="w-full flex items-center justify-center gap-2 border rounded-lg py-3 hover:bg-muted transition"
                    >
                        {googleLoading ? (
                            <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin" />
                        ) : (
                            'Continue with Google'
                        )}
                    </button>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="flex-1 h-px bg-border" />
                        or
                        <div className="flex-1 h-px bg-border" />
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Name */}
                        <div>
                            <label className="text-sm">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 text-muted-foreground" size={16} />
                                <input
                                    className="w-full pl-9 pr-3 py-2 border rounded-lg"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name"
                                />
                            </div>
                            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-sm">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 text-muted-foreground" size={16} />
                                <input
                                    type="email"
                                    className="w-full pl-9 pr-3 py-2 border rounded-lg"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@email.com"
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-sm">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 text-muted-foreground" size={16} />
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    className="w-full pl-9 pr-10 py-2 border rounded-lg"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    className="absolute right-3 top-2.5"
                                >
                                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>

                            {/* Strength */}
                            {password && (
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="flex-1 h-1 bg-muted rounded">
                                        <div
                                            className={`h-full ${strengthColor}`}
                                            style={{ width: `${(strength / 3) * 100}%` }}
                                        />
                                    </div>
                                    <span className="text-xs">{strengthLabel}</span>
                                </div>
                            )}
                        </div>

                        {/* Confirm */}
                        <div>
                            <label className="text-sm">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 text-muted-foreground" size={16} />
                                <input
                                    type="password"
                                    className="w-full pl-9 pr-3 py-2 border rounded-lg"
                                    value={confirm}
                                    onChange={(e) => setConfirm(e.target.value)}
                                    placeholder="Confirm Password"
                                />
                            </div>
                            {errors.confirm && <p className="text-red-500 text-xs">{errors.confirm}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-yellow-500 text-black py-3 rounded-lg font-medium hover:opacity-90"
                        >
                            {submitting ? 'Creating...' : 'Create Account'}
                        </button>
                    </form>

                    <p className="text-center text-sm text-muted-foreground">
                        Already have an account?{' '}
                        <Link href="/login" className="text-yellow-500 font-medium">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}