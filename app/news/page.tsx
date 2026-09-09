// src/app/news/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Calendar, User, ArrowRight, Bookmark, Mail } from 'lucide-react';
import { apiUrl } from '@/lib/apiClient';
import { getRecaptchaSiteKey, shouldRequireRecaptcha } from '@/lib/recaptcha';
import RecaptchaField from '@/components/RecaptchaField';

type Article = {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
};

export default function NewsPage() {
  // Shown until posts are loaded from the database, and as a fallback if none exist yet.
  const fallbackArticles: Article[] = [
    {
      id: "awakening-consciences",
      title: "Awakening Consciences. Bringing Back Hopes.",
      excerpt: "Redefining the concepts of life among children, youth, and women in our societies facing the ever-increasing crises of streetism and head-potting.",
      image: "/news1.jpg",
      date: "June 20, 2026",
      author: "GMI Media",
      category: "Advocacy"
    },
    {
      id: "sustainability-independence",
      title: "Community Projects Bring Sustainability and Independence.",
      excerpt: "Building hands-on capacity through localization efforts, basket weaving, and agricultural farming to empower youth groups economically.",
      image: "/news2.jpg",
      date: "June 19, 2026",
      author: "Projects Team",
      category: "Development"
    },
    {
      id: "clean-water-initiatives",
      title: "Expanding Clean Water Delivery Across Upper East Regions",
      excerpt: "Our foundation prioritizes safe hydration and health provisions, laying down pipelines to bring direct relief to vulnerable settlement districts.",
      image: "/hero-bg.jpg", // Reuses your beautiful high-res background image safely
      date: "June 10, 2026",
      author: "Health Hub",
      category: "Water & Health"
    }
  ];

  const [articles, setArticles] = useState<Article[]>(fallbackArticles);
  const [email, setEmail] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const [subscribeState, setSubscribeState] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });
  const recaptchaEnabled = shouldRequireRecaptcha();
  const recaptchaSiteKey = getRecaptchaSiteKey();

  useEffect(() => {
    let active = true;

    fetch(apiUrl('/news'))
      .then((response) => response.json())
      .then((result) => {
        if (!active || !result?.success || !Array.isArray(result.data?.items) || result.data.items.length === 0) return;

        setArticles(
          result.data.items.map((post: Record<string, string>) => ({
            id: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            image: post.image || '/hero-bg.jpg',
            date: new Date(post.publishedAt).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }),
            author: post.author,
            category: post.category,
          }))
        );
      })
      .catch(() => undefined);

    return () => {
      active = false;
    };
  }, []);

  const handleSubscribe = async (event: React.FormEvent) => {
    event.preventDefault();

    if (recaptchaEnabled && !captchaToken) {
      setSubscribeState({ type: 'error', message: 'Please complete the security challenge.' });
      return;
    }

    setSubscribeState({ type: 'loading', message: '' });

    try {
      const response = await fetch(apiUrl('/subscribers'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'news-page', captchaToken: recaptchaEnabled ? captchaToken : undefined }),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        setSubscribeState({ type: 'error', message: result.error || 'Subscription failed. Please try again.' });
        return;
      }

      setEmail('');
      setSubscribeState({ type: 'success', message: 'You are subscribed. Watch your inbox for updates.' });
    } catch {
      setSubscribeState({ type: 'error', message: 'Could not reach the server. Please try again.' });
    }
  };

  return (
    <div className="w-full bg-[#f5f9f6] pb-16 sm:pb-24">
      
      {/* 1. HERO BANNER HEADER */}
      <section className="relative overflow-hidden bg-[#141753] py-16 text-center text-white sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-[#141753] via-slate-900 to-[#141753] opacity-85" />
        <div className="relative z-10 mx-auto max-w-3xl space-y-4 px-4 sm:px-6">
          <span className="text-xs font-bold text-[#e17c22] tracking-widest uppercase block">Updates from the Field</span>
          <h1 className="text-3xl font-black uppercase tracking-tight text-white sm:text-5xl">Latest News</h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Stay informed on our grassroots operations, structural policy commitments, and the lives changed across Ghana.
          </p>
        </div>
      </section>

      {/* 2. MAIN NEWS GRID */}
      <section className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 sm:pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((post, index) => (
            <article 
              key={index} 
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow"
            >
              
              {/* Card Image Wrapper with Next.js Optimization */}
              <div className="relative h-48 w-full bg-slate-100 border-b border-slate-100 overflow-hidden">
                <Image 
                  src={post.image} 
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
                {/* Floating Category Badge */}
                <span className="absolute top-4 left-4 bg-[#141753] text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
                  {post.category}
                </span>
              </div>

              {/* Card Body Content */}
              <div className="flex flex-grow flex-col space-y-3 p-5 sm:p-6">
                
                {/* Metadata Row */}
                <div className="flex flex-wrap items-center gap-3 text-[11px] font-medium text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#e17c22]" /> {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#e17c22]" /> {post.author}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-extrabold text-[#141753] text-base sm:text-lg tracking-tight group-hover:text-[#e17c22] transition line-clamp-2 leading-snug">
                  {post.title}
                </h3>

                {/* Short Excerpt */}
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>

                {/* Bottom Read More Triggers */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#e17c22] inline-flex items-center gap-1 group-hover:underline cursor-pointer">
                    Read Story <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <Bookmark className="w-4 h-4 text-slate-300 hover:text-[#e17c22] cursor-pointer transition" />
                </div>

              </div>

            </article>
          ))}
        </div>
      </section>

      {/* 3. NEWSLETTER SUBSCRIPTION */}
      <section className="mx-auto max-w-3xl px-4 pt-12 sm:px-6 sm:pt-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-10">
          <div className="mx-auto mb-4 w-fit rounded-lg bg-[#141753] p-2 text-white">
            <Mail className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-black uppercase tracking-tight text-[#141753] sm:text-2xl">Subscribe to our newsletter</h2>
          <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-slate-500 sm:text-sm">
            Get field reports, programme updates, and impact stories delivered straight to your inbox.
          </p>

          <form onSubmit={handleSubscribe} className="mx-auto mt-6 flex max-w-md flex-col gap-4">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-[#e17c22] focus:bg-white focus:outline-none"
              />
              <button
                type="submit"
                disabled={subscribeState.type === 'loading'}
                className="rounded-lg bg-[#e17c22] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {subscribeState.type === 'loading' ? 'Sending...' : 'Subscribe'}
              </button>
            </div>
            {recaptchaEnabled && (
              <RecaptchaField siteKey={recaptchaSiteKey} value={captchaToken} onChange={setCaptchaToken} />
            )}
          </form>

          {subscribeState.message && (
            <p
              className={`mt-4 text-xs font-semibold ${
                subscribeState.type === 'success' ? 'text-emerald-600' : 'text-red-600'
              }`}
            >
              {subscribeState.message}
            </p>
          )}
        </div>
      </section>

    </div>
  );
}