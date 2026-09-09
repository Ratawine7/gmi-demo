'use client';

import { useParams } from 'next/navigation';
import AdminGuard from '@/components/admin/AdminGuard';
import AdminShell from '@/components/admin/AdminShell';
import NewsEditor from '@/components/admin/NewsEditor';

export default function EditNewsPage() {
  const params = useParams<{ slug: string }>();

  return (
    <AdminGuard>
      <AdminShell title="Edit News">
        <NewsEditor slug={params.slug} />
      </AdminShell>
    </AdminGuard>
  );
}
