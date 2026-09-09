'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck } from 'lucide-react';
import { adminRequest } from '@/lib/adminApi';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    let active = true;

    adminRequest('/admin/me')
      .then(() => {
        if (active) setAuthorized(true);
      })
      .catch(() => {
        if (active) router.replace('/admin/login');
      });

    return () => {
      active = false;
    };
  }, [router]);

  if (!authorized) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-[#eef4f0] px-4">
        <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-5 py-4 text-sm font-bold text-[#141753] shadow-sm">
          <ShieldCheck className="h-5 w-5 text-[#e17c22]" />
          Checking admin session
        </div>
      </div>
    );
  }

  return children;
}
