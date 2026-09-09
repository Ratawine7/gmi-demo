'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Edit3, Plus, Trash2 } from 'lucide-react';
import AdminGuard from '@/components/admin/AdminGuard';
import AdminShell from '@/components/admin/AdminShell';
import { adminRequest } from '@/lib/adminApi';

type NewsPost = {
  _id: string;
  slug: string;
  title: string;
  category?: string;
  isDraft: boolean;
  published: boolean;
  publishedAt?: string;
};

type ListResponse = { items: NewsPost[]; total: number };

export default function AdminNewsPage() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [drafts, setDrafts] = useState<NewsPost[]>([]);
  const [message, setMessage] = useState('');

  const fetchPosts = () => Promise.all([
      adminRequest<ListResponse>('/news?limit=100'),
      adminRequest<ListResponse>('/news?status=draft&limit=100'),
    ]);

  const loadPosts = async () => {
    const [publishedData, draftData] = await fetchPosts();
    setPosts(publishedData.items);
    setDrafts(draftData.items);
  };

  useEffect(() => {
    let active = true;

    fetchPosts()
      .then(([publishedData, draftData]) => {
        if (!active) return;
        setPosts(publishedData.items);
        setDrafts(draftData.items);
      })
      .catch((error: Error) => {
        if (active) setMessage(error.message);
      });

    return () => {
      active = false;
    };
  }, []);

  const deletePost = async (slug: string) => {
    if (!window.confirm('Delete this news post?')) return;
    await adminRequest(`/news/${slug}`, { method: 'DELETE' });
    await loadPosts();
  };

  const renderRows = (items: NewsPost[]) => (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[42rem] text-left text-sm">
          <thead className="bg-slate-50 text-[11px] font-black uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((post) => (
              <tr key={post._id}>
                <td className="px-4 py-4 font-bold text-[#141753]">{post.title}</td>
                <td className="px-4 py-4 text-slate-600">{post.category || 'General'}</td>
                <td className="px-4 py-4">
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-black uppercase ${post.isDraft ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>
                    {post.isDraft ? 'Draft' : 'Published'}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/news/${post.slug}/edit`} className="rounded-md border border-slate-200 p-2 text-slate-600 transition hover:border-[#e17c22] hover:text-[#e17c22]" aria-label="Edit news post">
                      <Edit3 className="h-4 w-4" />
                    </Link>
                    <button type="button" onClick={() => deletePost(post.slug)} className="rounded-md border border-slate-200 p-2 text-slate-600 transition hover:border-red-300 hover:text-red-600" aria-label="Delete news post">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-sm font-semibold text-slate-500">No news posts found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <AdminGuard>
      <AdminShell title="News Management">
        <div className="flex justify-end">
          <Link href="/admin/news/new" className="inline-flex items-center gap-2 rounded-md bg-[#e17c22] px-4 py-3 text-xs font-black uppercase tracking-wider text-white transition hover:bg-orange-600">
            <Plus className="h-4 w-4" />
            Create News
          </Link>
        </div>
        {message && <p className="rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{message}</p>}
        <section className="space-y-3">
          <h3 className="text-sm font-black uppercase tracking-wider text-[#141753]">Drafts</h3>
          {renderRows(drafts)}
        </section>
        <section className="space-y-3">
          <h3 className="text-sm font-black uppercase tracking-wider text-[#141753]">Published</h3>
          {renderRows(posts)}
        </section>
      </AdminShell>
    </AdminGuard>
  );
}
