// src/app/page.tsx
import React from 'react';
import Image from 'next/image'; // Import the high-performance Next.js Image component
import ProjectCard from '@/components/ProjectCard';
import { GraduationCap, Droplet, Users, ChevronRight } from 'lucide-react';
import Link from 'next/link';
export default function HomePage() {
  const programs = [
    {
      title: "Education",
      description: "Education frameworks designed to reduce vulnerabilities and build traditional knowledge metrics.",
      link: "#edu",
      icon: <GraduationCap className="w-6 h-6" />
    },
    {
      title: "Water & Health",
      description: "Our foundation prioritizes safe hydration, health provisions, and clean water delivery.",
      link: "#water",
      icon: <Droplet className="w-6 h-6" />
    },
    {
      title: "Community Development",
      description: "Building small localized economic projects to generate independence and long-term security.",
      link: "#dev",
      icon: <Users className="w-6 h-6" />
    }
  ];

  return (
    <div className="w-full">
      
      {/* SECTION 1: HERO BACKGROUND BANNER (WITH OPTIMIZED BACKGROUND IMAGE) */}
      <section className="relative flex min-h-[460px] w-full items-center justify-center overflow-hidden bg-[#141753] text-white sm:min-h-[540px]">
        
        {/* Next.js Background Image Handler */}
        <Image 
          src="/hero-bg.jpg" 
          alt="GMI Community Impact Background" 
          fill
          className="object-cover object-center opacity-25 mix-blend-overlay"
          priority
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-[#141753]/40 via-[#141753]/80 to-[#f5f9f6]" />
        
        <div className="relative z-10 mx-auto max-w-4xl space-y-6 px-4 text-center sm:px-6">
          <h1 className="text-3xl font-black leading-tight tracking-tight text-white drop-shadow-md sm:text-5xl">
            Awakening Consciences.<br />
            Transforming Lives.<br />
            Building Futures.
          </h1>
          <div className="pt-2">
            <button className="rounded bg-[#e17c22] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-orange-600 sm:px-8 sm:py-3.5">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: CONTENT GRID */}
      <section id="programs" className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-3 lg:gap-12">
        
        {/* LEFT COLUMN: IMPACT CARD SLOTS */}
        <div className="lg:col-span-2 space-y-12">
          <div className="text-center space-y-1.5">
            <span className="text-xs font-bold text-[#e17c22] tracking-widest uppercase block">Our Programs.</span>
            <h2 className="text-2xl font-extrabold text-[#141753] tracking-tight sm:text-3xl">
              Our <span className="text-[#e17c22]">Impact Areas</span>
            </h2>
            <p className="text-slate-500 text-xs max-w-xl mx-auto leading-relaxed pt-1">
              GMI Global Vision Foundation is everywhere to awaken conscience, address water & health needs, and promote community development.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 pt-4 sm:gap-6 md:grid-cols-3">
            {programs.map((program, index) => (
              <ProjectCard 
                key={index}
                title={program.title}
                description={program.description}
                link={program.link}
                icon={program.icon}
              />
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: RE-STYLED PROFESSIONAL NEWS SIDEBAR */}
        <div className="space-y-8 lg:border-l lg:border-slate-200 lg:pl-8">
          
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#141753] border-b border-slate-200 pb-2">
              Latest News
            </h3>
            
            <div className="space-y-4">
              
              {/* News Item 1 */}
              <div className="group flex items-start gap-3 cursor-pointer">
                <div className="w-16 h-16 rounded overflow-hidden relative bg-slate-100 border border-slate-200/60 flex-shrink-0">
                  <Image 
                    src="/news1.jpg" 
                    alt="Awakening Consciences Project" 
                    fill 
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="min-w-0 space-y-1">
                  <h4 className="text-xs font-bold text-[#141753] group-hover:text-[#e17c22] transition line-clamp-2 leading-tight">
                    Awakening Consciences. Bringing Back Hopes.
                  </h4>
                  <span className="text-[10px] text-slate-400 block">1 day ago</span>
                </div>
              </div>

              {/* News Item 2 */}
              <div className="group flex items-start gap-3 cursor-pointer">
                <div className="w-16 h-16 rounded overflow-hidden relative bg-slate-100 border border-slate-200/60 flex-shrink-0">
                  <Image 
                    src="/news2.jpg" 
                    alt="Community Projects Sustainability" 
                    fill 
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="min-w-0 space-y-1">
                  <h4 className="text-xs font-bold text-[#141753] group-hover:text-[#e17c22] transition line-clamp-2 leading-tight">
                    Community Projects Bring Sustainability and Independence.
                  </h4>
                  <span className="text-[10px] text-slate-400 block">1 day ago</span>
                </div>
              </div>

            </div>
            
            <Link href="/news" className="text-xs font-bold text-[#e17c22] hover:underline inline-flex items-center gap-0.5 pt-1">
              Show More <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Donation Widget Form Box */}
          <div id="donate" className="space-y-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h3 className="text-sm font-bold text-[#141753] tracking-tight">Direct Donation</h3>
            <form className="space-y-2.5">
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded focus:outline-none focus:ring-1 focus:ring-[#e17c22]"
              />
              <button className="w-full bg-[#e17c22] hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded transition">
                Donate
              </button>
            </form>
          </div>

        </div>

      </section>

    </div>
  );
}