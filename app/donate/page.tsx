// src/app/donate/page.tsx
import React from 'react';
import Image from 'next/image';
import { Wallet, Puzzle, HeartHandshake, CheckCircle } from 'lucide-react';

export default function DonatePage() {
  return (
    <div className="w-full bg-[#f5f9f6] pb-16 sm:pb-20">
      
      {/* 1. COMPACT PAGE HEADER ACCENT */}
      <section className="relative overflow-hidden bg-[#141753] py-16 text-center text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-[#141753] via-slate-900 to-[#141753] opacity-80" />
        <div className="relative z-10 mx-auto max-w-3xl space-y-3 px-4 sm:px-6">
          <h1 className="text-3xl font-black uppercase tracking-wider text-white sm:text-4xl">Donate</h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            Support to GMI Global Vision Foundation is not just to an organization, but to Africa—a community in diverse need. Donate today to our global foundation.
          </p>
        </div>
      </section>

      {/* 2. CASE FOR SUPPORT LAYOUT COMPONENT */}
      <section className="mx-auto max-w-6xl space-y-10 px-4 pt-12 sm:px-6 sm:pt-16">
        <div className="space-y-5 text-center max-w-3xl mx-auto">
          <div className="text-xs font-bold text-[#e17c22] uppercase tracking-widest">Our Mandate</div>
          <h2 className="text-2xl font-black text-[#141753] tracking-tight sm:text-3xl">Why Donate?</h2>
          <div className="space-y-4 text-slate-600 text-xs sm:text-sm leading-relaxed text-left">
            <h4 className="font-bold text-[#141753] text-sm sm:text-base text-balance text-center">
              For every penny you give to GMI, we make a measurable impact.
            </h4>
            <p>
              We are actively helping communities and regions to rid our streets of Streetism and head-potting, thereby building the capacity of vulnerable boys and girls through hands-on skills training and empowering them economically.
            </p>
            <p>
              By supporting us today, you help us continue our mandate and mission of redefining the concept of life among children, youth, and women facing ever-increasing crises.
            </p>
          </div>
        </div>

        {/* Crisp Refactored Dynamic Image Framework Spot */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          {[
            { src: '/donate1.jpeg', alt: 'GMI Global Vision Foundation donation impact 1' },
            { src: '/donate2.jpeg', alt: 'GMI Global Vision Foundation donation impact 2' },
            { src: '/donate3.jpeg', alt: 'GMI Global Vision Foundation donation impact 3' },
            { src: '/donate4.jpeg', alt: 'GMI Global Vision Foundation donation impact 4' },
          ].map((image) => (
            <div key={image.src} className="relative h-72 overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 shadow-lg sm:h-96">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* 3. TRANSITION STRATEGIC PILLARS CONTAINER */}
      <section className="mx-auto max-w-6xl space-y-10 px-4 pt-16 sm:px-6 sm:pt-20">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-black text-[#141753]">How to Donate</h2>
          <p className="text-slate-500 text-xs">You can safely support GMI Global Vision Foundation via two direct pathways:</p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          
          {/* Pathway 1: Central Pool */}
          <div className="flex items-start gap-4 rounded-xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="p-3 bg-[#f5f9f6] text-[#141753] rounded-lg flex-shrink-0">
              <Wallet className="w-6 h-6 text-[#e17c22]" />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-sm sm:text-base text-[#141753]">Central Pool Funds</h3>
              <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                Donate directly to our central operations hub using secure regional banking structures and localized Mobile Money (MoMo) pipelines managed below.
              </p>
            </div>
          </div>

          {/* Pathway 2: Specific Projects */}
          <div className="flex items-start gap-4 rounded-xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="p-3 bg-[#f5f9f6] text-[#141753] rounded-lg flex-shrink-0">
              <Puzzle className="w-6 h-6 text-[#e17c22]" />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-sm sm:text-base text-[#141753]">Targeted Project Funding</h3>
              <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                Direct your resources to an active field milestone that aligns closely with your personal humanitarian objectives, community goals, or institutional metrics.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. FINANCIAL CHANNELS AND DISCLOSURE CARDS */}
      <section className="mx-auto max-w-4xl px-4 pt-10 sm:px-6 sm:pt-12">
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-[#141753] border-b border-slate-100 pb-3 flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-[#e17c22]" /> Official Remittance Methods
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="space-y-1.5 p-4 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-[10px] font-bold text-[#e17c22] tracking-wider uppercase block">Mobile Money (MoMo)</span>
              <p className="font-bold text-[#141753]">MTN MoMo Accounts:</p>
              <p className="text-slate-600 font-medium">Network Name: GMI Foundation</p>
              <p className="break-words text-sm font-bold tracking-wide text-[#141753] font-mono">+233 24 522 4667</p>
            </div>

            <div className="space-y-1.5 p-4 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-[10px] font-bold text-[#e17c22] tracking-wider uppercase block">Direct Bank Wire</span>
              <p className="font-bold text-[#141753]">National Wire Gateway:</p>
              <p className="text-slate-600 font-medium">Bank: Bank of Ghana / Regional Branch</p>
              <p className="break-words text-xs text-slate-600">Further wire swift credentials can be requested at info@gmiglobalvision.org</p>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-400">
            <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span>All official GMI Global Vision financial pipelines undergo strict external compliance audits.</span>
          </div>
        </div>
      </section>

    </div>
  );
}