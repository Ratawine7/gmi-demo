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
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/#programs", label: "Our Programs" },
    { href: "/news", label: "News" },
    { href: "/partner", label: "Partner With Us" },
    { href: "/volunteer", label: "Volunteer" },
  ];

  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="bg-[#f5f9f6] text-[#141753] min-h-screen flex flex-col antialiased font-sans" suppressHydrationWarning>

        {/* Navigation Header */}
        <header className="bg-[#141753] text-white shadow-md relative z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 lg:py-0">
            <div className="flex min-h-20 lg:h-24 items-center justify-between gap-4">
              <Link
                href="/"
                className="relative z-50 -mb-4 sm:-mb-6 lg:-mb-10 block shrink-0 bg-[#141753] p-1.5 rounded-full border border-slate-700 shadow-xl"
              >
                <div className="w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] lg:w-20 lg:h-20 rounded-full overflow-hidden bg-white relative flex items-center justify-center">
                  <Image
                    src="/gmi-logo.jpeg"
                    alt="GMI Logo"
                    fill
                    sizes="(min-width: 1024px) 80px, (min-width: 640px) 72px, 64px"
                    className="object-contain p-1"
                    priority
                  />
                </div>
              </Link>

              <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 text-xs font-semibold uppercase tracking-wider text-slate-300">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="hover:text-[#e17c22] transition">
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-2 sm:gap-3">
                <Link
                  href="/donate"
                  className="bg-[#e17c22] hover:bg-orange-600 text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider px-3 sm:px-5 py-2.5 rounded shadow-md transition"
                >
                  Donate
                </Link>

                <details className="mobile-nav lg:hidden">
                  <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded border border-slate-700 bg-slate-900/40 text-slate-100 transition hover:border-[#e17c22] hover:text-[#e17c22]">
                    <span className="sr-only">Toggle navigation menu</span>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M4 7h16" />
                      <path d="M4 12h16" />
                      <path d="M4 17h16" />
                    </svg>
                  </summary>

                  <nav className="absolute right-4 top-full mt-3 w-[min(18rem,calc(100vw-2rem))] rounded-2xl border border-slate-700 bg-[#141753] p-4 shadow-2xl sm:right-6 sm:w-72">
                    <div className="flex flex-col gap-1">
                      {navLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="rounded-lg px-3 py-3 text-sm font-semibold uppercase tracking-wider text-slate-200 transition hover:bg-slate-800 hover:text-[#e17c22]"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </nav>
                </details>
              </div>
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
                <Image src="/gmi-logo.jpeg" alt="GMI Logo" fill sizes="64px" className="object-contain p-1" />
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