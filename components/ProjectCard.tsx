// src/components/ProjectCard.tsx
'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  link: string;
  icon: React.ReactNode;
}

export default function ProjectCard({ title, description, link, icon }: ProjectCardProps) {
  return (
    <div className="flex flex-col items-center text-center p-4 group">
      {/* Dark blue circular icon wrapper matching the template image */}
      <div className="w-14 h-14 bg-[#141753] text-white rounded-full flex items-center justify-center shadow-md mb-4 transition-transform group-hover:scale-105">
        {icon}
      </div>
      
      <h3 className="font-bold text-[#141753] text-base mb-2">{title}</h3>
      
      <p className="text-[11px] text-slate-500 leading-relaxed max-w-[180px] mb-4">
        {description}
      </p>
      
      <a 
        href={link} 
        className="text-xs font-bold text-[#e17c22] hover:underline inline-flex items-center gap-0.5"
      >
        Explore More <ChevronRight className="w-3 h-3" />
      </a>
    </div>
  );
}