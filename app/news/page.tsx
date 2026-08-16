// src/app/news/page.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowRight, Bookmark } from 'lucide-react';

export default function NewsPage() {
  // Your structured database array containing the real news items from your layouts
  const articles = [
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

  return (
    <div className="w-full bg-[#f5f9f6] pb-24">
      
      {/* 1. HERO BANNER HEADER */}
      <section className="relative bg-[#141753] text-white py-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#141753] via-slate-900 to-[#141753] opacity-85" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 space-y-4">
          <span className="text-xs font-bold text-[#e17c22] tracking-widest uppercase block">Updates from the Field</span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">Latest News</h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Stay informed on our grassroots operations, structural policy commitments, and the lives changed across Ghana.
          </p>
        </div>
      </section>

      {/* 2. MAIN NEWS GRID */}
      <section className="max-w-6xl mx-auto px-6 pt-16">
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
              <div className="p-6 flex flex-col flex-grow space-y-3">
                
                {/* Metadata Row */}
                <div className="flex items-center gap-4 text-[11px] text-slate-400 font-medium">
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

    </div>
  );
}