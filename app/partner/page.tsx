// src/app/partner/page.tsx
'use client';
import React from 'react';
import Image from 'next/image';
import { CheckCircle2, ArrowRight, Building2, Briefcase, HeartHandshake } from 'lucide-react';

export default function PartnerPage() {
  const checkmarks = [
    "Reach the most vulnerable young people in communities across Ghana and beyond Africa",
    "Support long-term services and development policies for sustainable change",
    "Work with locally-led experts and leaders in the field",
    "Make a positive impact on the lives of underprivileged children, youth, and women",
    "Build a strong partnership with a respected and accountable organization",
    "Contribute to the global good by supporting a National Society-owned organization",
    "Address complex poverty issues and Streetism among youth in society through coordinated action"
  ];

  return (
    <div className="w-full bg-[#f5f9f6] pb-24">
      
      {/* 1. CINEMATIC HERO DISPLAY HEADLINE SECTION */}
      <section className="relative bg-[#141753] text-white py-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#141753] via-slate-900 to-[#141753] opacity-85" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-4">
          <span className="text-xs font-bold text-[#e17c22] tracking-widest uppercase block">Get Involved</span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">Partner With Us</h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            Discover why it is important you should support our work and how you can get involved. Our mission depends largely on flexible financial and operational alliances.
          </p>
        </div>
      </section>

      {/* 2. PRIMARY CONTENT NARRATIVE PANEL */}
      <section className="max-w-6xl mx-auto px-6 pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* TEXT PARAGRAPHS WRAPPER (8-Cols wide on large viewports) */}
        <div className="lg:col-span-7 space-y-6 text-slate-600 text-xs sm:text-sm leading-relaxed">
          <p className="text-sm font-semibold text-[#141753]">
            Support to GMI Global Vision Foundation is not just support to one organization, but to the greater population of under-privileged children, youth and women across Ghana and beyond Africa.
          </p>
          <p>
            Our work supporting the core poor in communities; the school drop-outs, the street child and the youth engaging in head-potting for economic livelihood depends largely on financial support from partners.
          </p>
          <p>
            GMI Global Vision Foundation is always looking to build on existing partnerships and develop new ones that align with our mission. Our aim is to secure income that is as predictable and as flexible as possible, enabling us to best serve our mandate.
          </p>
          <p>
            We are much more than first responders. Our volunteers and staff are experts and leaders in providing long-term services and development policies—from capacity building through hands-on-skill training for the school drop-out, head-potter (“Kayaye”), providing platforms for generational leadership training—that help communities not only survive, but thrive.
          </p>
          <p>
            As an organization, the GMI Global Vision Foundation is engaged, respected and accountable. We are owned by, and work for, our National Societies—bringing together their lifesaving and life-changing local action for global good.
          </p>

          {/* DUAL TARGET BLOCK SECTOR FIELDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
            <div className="p-5 bg-white border border-slate-200/80 rounded-xl space-y-2.5">
              <Building2 className="w-5 h-5 text-[#e17c22]" />
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#141753]">National Societies</h4>
              <p className="text-[11px] text-slate-500 leading-normal">
                Solicitating structural contributions and deep institutional inter-governmental networks to stabilize policy implementation parameters.
              </p>
            </div>
            <div className="p-5 bg-white border border-slate-200/80 rounded-xl space-y-2.5">
              <Briefcase className="w-5 h-5 text-[#e17c22]" />
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#141753]">The Private Sector</h4>
              <p className="text-[11px] text-slate-500 leading-normal">
                Coordinating direct actions alongside local businesses and corporate CSR budgets to address complex urban poverty issues comprehensively.
              </p>
            </div>
          </div>
        </div>

        {/* IMAGE SIDEBAR CONTAINER DISPLAY (5-Cols wide on large viewports) */}
        <div className="lg:col-span-5 relative h-[360px] lg:h-[460px] w-full rounded-2xl overflow-hidden shadow-md bg-slate-200 border border-slate-200">
          <Image 
            src="/partner-hero.jpg"
            alt="Collaborative work and partnerships across Africa"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* 3. CORE ARGUMENT AND BULLET LIST GRID SECTION */}
      <section className="max-w-6xl mx-auto px-6 pt-24">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold text-[#e17c22] uppercase tracking-wider">Strategic Engagement</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#141753] tracking-tight leading-tight">
              Why Partner <br className="hidden lg:block"/>with Us?
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              GMI Global Vision Foundation is a locally-led organization that reaches children and youth others cannot. We deliver local resurrection of dead hopes and actions that are principled, sustainable and bring positive change to the most vulnerable young folks in communities—no matter who or where they are in Upper East, Ghana and beyond Africa.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#141753] mb-2 flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-[#e17c22]" /> Partnership Advantages
            </h4>
            {checkmarks.map((point, index) => (
              <div key={index} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>{point}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. CALL TO ACTION FORMS TRANSITION SPOT */}
      <section className="max-w-4xl mx-auto px-6 pt-16 text-center space-y-4">
        <h3 className="font-bold text-sm sm:text-base text-[#141753]">Ready to align objectives with our team?</h3>
        <a 
          href="#query-form"
          className="inline-flex items-center gap-2 bg-[#e17c22] hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded shadow-md transition"
        >
          Submit Proposal Request <ArrowRight className="w-4 h-4" />
        </a>
      </section>

    </div>
  );
}