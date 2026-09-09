'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FileText, LayoutDashboard, LogOut, Mail, UsersRound } from 'lucide-react';
import { adminRequest } from '@/lib/adminApi';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/news', label: 'News', icon: FileText },
  { href: '/admin/volunteers', label: 'Volunteers', icon: UsersRound },
  { href: '/admin/subscribers', label: 'Subscribers', icon: Mail },
];

export default function AdminShell({ title, children }: { title: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await adminRequest('/admin/logout', { method: 'POST' }).catch(() => undefined);
    router.replace('/admin/login');
  };

  return (
    <section className="min-h-screen bg-[#eef4f0] px-4 py-6 text-[#141753] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[16rem_1fr]">
        <aside className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm lg:sticky lg:top-6 lg:h-fit">
          <div className="border-b border-slate-100 pb-4">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#e17c22]">GMI Admin</p>
            <h1 className="mt-1 text-xl font-black tracking-tight">Control Center</h1>
          </div>

          <nav className="mt-4 grid gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-bold transition ${
                    active ? 'bg-[#141753] text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-[#141753]'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-md border border-slate-200 px-3 py-2.5 text-xs font-black uppercase tracking-wider text-slate-600 transition hover:border-[#e17c22] hover:text-[#e17c22]"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </aside>

        <div className="min-w-0 space-y-5">
          <header className="rounded-lg border border-slate-200 bg-white px-5 py-4 shadow-sm sm:px-6">
            <h2 className="text-2xl font-black tracking-tight sm:text-3xl">{title}</h2>
          </header>
          {children}
        </div>
      </div>
    </section>
  );
}
