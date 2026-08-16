// src/app/layout.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link"; // Import Next.js optimized routing component
import "./globals.css";

export const metadata: Metadata = {
  title: "GMI Global Vision Foundation | Awakening Consciences, Bringing Back Hopes.",
  description: "Official portal of GMI Global Vision Foundation.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="bg-[#f5f9f6] text-[#141753] min-h-screen flex flex-col antialiased font-sans" suppressHydrationWarning>
        
        {/* Navigation Header */}
        <header className="bg-[#141753] text-white shadow-md relative z-50">
          <div className="max-w-6xl mx-auto px-6 h-24 flex items-center justify-between">
            
            {/* Hanging Circular Logo Placement */}
            <Link href="/" className="relative z-50 -mb-10 block bg-[#141753] p-1.5 rounded-full border border-slate-700 shadow-xl">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-white relative flex items-center justify-center">
                <Image 
                  src="/gmi-logo.jpeg" 
                  alt="GMI Logo" 
                  fill
                  className="object-contain p-1"
                  priority
                />
              </div>
            </Link>

            {/* Fully Unified Navbar Menu Links */}
            <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold uppercase tracking-wider text-slate-300">
              <Link href="/" className="hover:text-[#e17c22] transition">
                Home
              </Link>
              <Link href="/about" className="hover:text-[#e17c22] transition">About Us</Link>
              <Link href="/#programs" className="hover:text-[#e17c22] transition">
                Our Programs
              </Link>
              <Link href="/news" className="hover:text-[#e17c22] transition">News</Link>
              {/* BRAND NEW: Partner With Us Link Added */}
              <Link href="/partner" className="hover:text-[#e17c22] transition tracking-wide">
                Partner With Us
              </Link>
              {/* NEW: Volunteer Page Navigation added directly */}
              <Link href="/volunteer" className="hover:text-[#e17c22] transition">
                Volunteer
              </Link>
            </nav>

            {/* Primary Global Call-To-Action Button */}
            <div>
              <Link href="/donate" className="bg-[#e17c22] hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded shadow-md transition">
                Donate
              </Link>
            </div>
          </div>
        </header>

        {/* Content Body Area Injection point */}
        <main className="flex-grow">{children}</main>

        {/* Unified Bottom Platform Footer */}
        <footer className="bg-[#141753] text-slate-400 text-xs pt-16 pb-8 border-t border-slate-900">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-white relative">
                <Image src="/gmi-logo.jpeg" alt="GMI Logo" fill className="object-contain p-1" />
              </div>
              <p className="leading-relaxed font-medium text-slate-300">GMI Global Vision Foundation</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-bold text-sm">Menu</h4>
              <ul className="space-y-1.5">
                <li><Link href="/" className="hover:text-[#e17c22]">What we do</Link></li>
                <li><Link href="/#about" className="hover:text-[#e17c22]">About us</Link></li>
                <li><Link href="/partner" className="hover:text-[#e17c22]">Partner with us</Link></li>
                <li><Link href="/donate" className="hover:text-[#e17c22]">Donate to support</Link></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-bold text-sm">Contact Us</h4>
              <p>📍 Box 385, Bolgatanga - Ghana</p>
              <p className="text-gmi-orange font-medium">📞 +233 24 522 4667</p>
              <p>✉ info@gmiglobalvision.org</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-bold text-sm">Social Links</h4>
              <div className="flex space-x-2 pt-1">
                <span className="w-7 h-7 bg-slate-800 text-white rounded-full flex items-center justify-center font-bold cursor-pointer hover:bg-[#e17c22]">f</span>
                <span className="w-7 h-7 bg-slate-800 text-white rounded-full flex items-center justify-center font-bold cursor-pointer hover:bg-[#e17c22]">i</span>
                <span className="w-7 h-7 bg-slate-800 text-white rounded-full flex items-center justify-center font-bold cursor-pointer hover:bg-[#e17c22]">x</span>
              </div>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-6 mt-12 pt-6 border-t border-slate-800 text-slate-500 text-center">
            &copy; {new Date().getFullYear()} GMI Global Vision Foundation. All rights reserved.
          </div>
        </footer>

      </body>
    </html>
  );
}