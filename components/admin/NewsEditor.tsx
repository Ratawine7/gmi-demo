'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Send } from 'lucide-react';
import { adminRequest } from '@/lib/adminApi';

type NewsForm = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  tags: string;
  isDraft: boolean;
};

const initialForm: NewsForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  image: '/hero-bg.jpg',
  author: 'GMI Media',
  category: 'General',
  tags: '',
  isDraft: true,
};

export default function NewsEditor({ slug }: { slug?: string }) {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!slug) return;

    adminRequest<{ title: string; slug: string; excerpt: string; content: string; image?: string; author?: string; category?: string; tags?: string[]; isDraft: boolean }>(`/news/${slug}`)
      .then((post) => {
        setForm({
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          image: post.image || '/hero-bg.jpg',
          author: post.author || 'GMI Media',
          category: post.category || 'General',
          tags: (post.tags || []).join(', '),
          isDraft: post.isDraft,
        });
      })
      .catch((error: Error) => setMessage(error.message));
  }, [slug]);

  const updateField = (field: keyof NewsForm, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submit = async (publish: boolean) => {
    setSaving(true);
    setMessage('');

    const payload = {
      ...form,
      isDraft: !publish,
      published: publish,
      tags: form.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    try {
      const path = slug ? `/news/${slug}` : '/news';
      await adminRequest(path, {
        method: slug ? 'PATCH' : 'POST',
        body: JSON.stringify(payload),
      });
      router.push('/admin/news');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to save news post.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
          Title
          <input value={form.title} onChange={(event) => updateField('title', event.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm normal-case tracking-normal text-[#141753] outline-none focus:border-[#e17c22]" />
        </label>
        <label className="space-y-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
          Slug
          <input value={form.slug} onChange={(event) => updateField('slug', event.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm normal-case tracking-normal text-[#141753] outline-none focus:border-[#e17c22]" />
        </label>
        <label className="space-y-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
          Author
          <input value={form.author} onChange={(event) => updateField('author', event.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm normal-case tracking-normal text-[#141753] outline-none focus:border-[#e17c22]" />
        </label>
        <label className="space-y-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
          Category
          <input value={form.category} onChange={(event) => updateField('category', event.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm normal-case tracking-normal text-[#141753] outline-none focus:border-[#e17c22]" />
        </label>
        <label className="space-y-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 md:col-span-2">
          Image URL
          <input value={form.image} onChange={(event) => updateField('image', event.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm normal-case tracking-normal text-[#141753] outline-none focus:border-[#e17c22]" />
        </label>
        <label className="space-y-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 md:col-span-2">
          Excerpt
          <textarea value={form.excerpt} onChange={(event) => updateField('excerpt', event.target.value)} rows={3} className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm normal-case tracking-normal text-[#141753] outline-none focus:border-[#e17c22]" />
        </label>
        <label className="space-y-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 md:col-span-2">
          Content
          <textarea value={form.content} onChange={(event) => updateField('content', event.target.value)} rows={12} className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm normal-case tracking-normal text-[#141753] outline-none focus:border-[#e17c22]" />
        </label>
        <label className="space-y-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 md:col-span-2">
          Tags
          <input value={form.tags} onChange={(event) => updateField('tags', event.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm normal-case tracking-normal text-[#141753] outline-none focus:border-[#e17c22]" />
        </label>
      </div>

      {message && <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{message}</p>}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button type="button" disabled={saving} onClick={() => submit(false)} className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 px-5 py-3 text-xs font-black uppercase tracking-wider text-[#141753] transition hover:border-[#e17c22] disabled:opacity-60">
          <Save className="h-4 w-4" />
          Save Draft
        </button>
        <button type="button" disabled={saving} onClick={() => submit(true)} className="inline-flex items-center justify-center gap-2 rounded-md bg-[#e17c22] px-5 py-3 text-xs font-black uppercase tracking-wider text-white transition hover:bg-orange-600 disabled:opacity-60">
          <Send className="h-4 w-4" />
          Publish
        </button>
      </div>
    </div>
  );
}