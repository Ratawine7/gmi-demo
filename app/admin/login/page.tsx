'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, LockKeyhole } from 'lucide-react';
import { adminRequest } from '@/lib/adminApi';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await adminRequest('/admin/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      router.replace('/admin');
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="grid min-h-[70vh] place-items-center bg-[#eef4f0] px-4 py-12">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-md bg-[#141753] p-2 text-white">
            <LockKeyhole className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#e17c22]">Admin Login</p>
            <h1 className="text-2xl font-black tracking-tight text-[#141753]">News Portal</h1>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block space-y-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
            Email
            <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-3 text-sm normal-case tracking-normal text-[#141753] outline-none focus:border-[#e17c22]" />
          </label>
          <label className="block space-y-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
            Password
            <span className="relative block">
              <input type={showPassword ? 'text' : 'password'} required value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-3 pr-11 text-sm normal-case tracking-normal text-[#141753] outline-none focus:border-[#e17c22]" />
              <button
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword((isVisible) => !isVisible)}
                className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-[#141753] focus:outline-none focus:ring-2 focus:ring-[#e17c22]/40"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </span>
          </label>
        </div>

        {error && <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{error}</p>}

        <button type="submit" disabled={loading} className="mt-6 w-full rounded-md bg-[#e17c22] px-5 py-3 text-xs font-black uppercase tracking-wider text-white transition hover:bg-orange-600 disabled:opacity-60">
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </section>
  );
}
