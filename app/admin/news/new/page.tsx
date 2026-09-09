import AdminGuard from '@/components/admin/AdminGuard';
import AdminShell from '@/components/admin/AdminShell';
import NewsEditor from '@/components/admin/NewsEditor';

export default function NewNewsPage() {
  return (
    <AdminGuard>
      <AdminShell title="Create News">
        <NewsEditor />
      </AdminShell>
    </AdminGuard>
  );
}
