'use client';

import { useEffect, useState } from 'react';
import { FileText, Mail, PenLine, UsersRound } from 'lucide-react';
import AdminGuard from '@/components/admin/AdminGuard';
import AdminShell from '@/components/admin/AdminShell';
import { adminRequest } from '@/lib/adminApi';

type ListResponse<T> = { items: T[]; total: number };

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ published: 0, drafts: 0, volunteers: 0, subscribers: 0 });

  useEffect(() => {
    Promise.all([
      adminRequest<ListResponse<unknown>>('/news?limit=1'),
      adminRequest<ListResponse<unknown>>('/news?status=draft&limit=1'),
      adminRequest<ListResponse<unknown>>('/volunteers?limit=1'),
      adminRequest<ListResponse<unknown>>('/subscribers'),
    ])
      .then(([published, drafts, volunteers, subscribers]) => {
        setStats({ published: published.total, drafts: drafts.total, volunteers: volunteers.total, subscribers: subscribers.total });
      })
      .catch(() => undefined);
  }, []);

  const cards = [
    { label: 'Published News', value: stats.published, icon: FileText },
    { label: 'Draft News', value: stats.drafts, icon: PenLine },
    { label: 'Volunteers', value: stats.volunteers, icon: UsersRound },
    { label: 'Subscribers', value: stats.subscribers, icon: Mail },
  ];

  return (
    <AdminGuard>
      <AdminShell title="Dashboard">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-black uppercase tracking-wider text-slate-500">{card.label}</p>
                  <Icon className="h-5 w-5 text-[#e17c22]" />
                </div>
                <p className="mt-4 text-4xl font-black tracking-tight text-[#141753]">{card.value}</p>
              </div>
            );
          })}
        </div>
      </AdminShell>
    </AdminGuard>
  );
}
