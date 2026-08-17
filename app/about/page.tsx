// src/app/about/page.tsx
import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Network, Users } from 'lucide-react';

export default function AboutPage() {
  // Structured Array for Pillars
  const pillars = [
    {
      title: "Our Core Values",
      description: "The fundamental principles express the core values and practices of GMI Global Vision Foundation. They have served both as a guide for action and a common identity for our foundation since existence—honesty, accountability, and transparency.",
      icon: <ShieldCheck className="w-5 h-5 text-[#e17c22]" />
    },
    {
      title: "People and Structures",
      description: "We are proud to be made up of dedicated staff who are experts in all aspects of our core mandate: Capacity Building, Youth Leadership Training, Education, Water and Sanitation, and Street Child and Head-potting Advocacy—all working together for the good of humanity.",
      icon: <Network className="w-5 h-5 text-[#e17c22]" />
    },
    {
      title: "Our Organizational Team",
      description: "GMI Global Vision Foundation team is expertly structured to direct long-term services and development policies. Meet the administration, executive directorate, program officers, and technical operators moving our workflows forward below.",
      icon: <Users className="w-5 h-5 text-[#e17c22]" />
    }
  ];

  // Structured Array for Team Roster Data
  const team = [
    { name: "John Doe", role: "Executive Director", quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam viverra justo vel consectetur dignissim." },
    { name: "Jane Doe", role: "Assistant Director", quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam viverra justo vel consectetur dignissim." },
    { name: "Jane Doe", role: "Child Rights Officer", quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam viverra justo vel consectetur dignissim." },
    { name: "Jane Doe", role: "Projects Manager", quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam viverra justo vel consectetur dignissim." },
    { name: "Jane Doe", role: "IT Manager", quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam viverra justo vel consectetur dignissim." },
    { name: "Jane Doe", role: "Human Resource", quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam viverra justo vel consectetur dignissim." },
    { name: "Jane Doe", role: "Secretary", quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam viverra justo vel consectetur dignissim." },
    { name: "Jane Doe", role: "Driver", quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam viverra justo vel consectetur dignissim." }
  ];

  return (
    <div className="w-full bg-[#f5f9f6] pb-16 sm:pb-24">
      
      {/* 1. SECTION HERO BANNER HEADER */}
      <section className="relative overflow-hidden bg-[#141753] py-16 text-center text-white sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-[#141753] via-slate-900 to-[#141753] opacity-85" />
        <div className="relative z-10 mx-auto max-w-3xl space-y-4 px-4 sm:px-6">
          <span className="text-xs font-bold text-[#e17c22] tracking-widest uppercase block">Who We Are</span>
          <h1 className="text-3xl font-black uppercase tracking-tight text-white sm:text-5xl">About Our Foundation</h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Discover the values driving our field models and meet the organizational team structuring localized progress out of Bolgatanga, Ghana.
          </p>
        </div>
      </section>

      {/* 2. THREE-COLUMN PILLAR STRATEGY CARDS CONTAINER */}
      <section className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 sm:pt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3.5">
              <div className="p-2.5 bg-[#f5f9f6] rounded-lg w-fit">
                {pillar.icon}
              </div>
              <h3 className="font-extrabold text-[#141753] text-base sm:text-lg tracking-tight">{pillar.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ROSTER DISPLAY SYSTEM GRID CONTAINER */}
      <section className="mx-auto max-w-6xl space-y-10 px-4 pt-16 sm:px-6 sm:pt-24 sm:space-y-12">
        
        {/* Component Header Block Titles */}
        <div className="text-center space-y-1.5">
          <span className="text-xs font-bold text-[#e17c22] tracking-widest uppercase block">Our Leadership</span>
          <h2 className="text-2xl font-black text-[#141753] tracking-tight sm:text-3xl">Meet Our Team</h2>
          <p className="text-slate-500 text-xs max-w-md mx-auto leading-normal">
            A dedicated collective of field specialists managing regional logistics and development directives.
          </p>
        </div>

        {/* Responsive Grid Layout cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <div key={index} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm text-center flex flex-col items-center group hover:shadow-md transition-shadow">
              
              {/* Profile Image Wrapper element */}
              <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-100 border border-slate-200/60 relative mb-4">
                <Image 
                  src="/steve.jpg" 
                  alt={`${member.name} - ${member.role}`}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              {/* Identity Descriptions block */}
              <div className="space-y-0.5">
                <h4 className="font-bold text-sm text-[#141753]">{member.name}</h4>
                <p className="text-[11px] font-bold text-[#e17c22] uppercase tracking-wider">{member.role}</p>
              </div>

              {/* Testimonial Quote paragraph parameters */}
              <p className="text-[11px] text-slate-400 italic leading-relaxed pt-3 border-t border-slate-100 mt-4 flex-grow">
                &ldquo;{member.quote}&rdquo;
              </p>

            </div>
          ))}
        </div>
      </section>

    </div>
  );
}