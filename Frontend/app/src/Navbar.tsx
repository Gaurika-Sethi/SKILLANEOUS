"use client";

import React, { useState, useEffect } from "react";
import { Boxes, Menu, X, ChevronRight, UserCircle } from "lucide-react";

export default function SkillaneousNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Create Roadmap", href: "/roadmap-form" },
    { name: "Project Suggestion", href: "/project-form" },
    { name: "Resume Generator", href: "/resume" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 py-4 ${
        isScrolled ? "bg-black/40 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* --- LOGO & BRAND --- */}
        <a 
          href="/" 
          className="flex items-center gap-3 group transition-transform active:scale-95"
        >
          <div className="">
            <img
              src="/logo.png"
              alt="Skillaneous logo"
              className="h-12 w-12 object-contain"
            />
          </div>
          <span 
            className="text-2xl font-black uppercase tracking-tighter"
            style={{
              backgroundImage: "linear-gradient(135deg, #837FA4 0%, #7EA9AC 40%, #C390D4 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            SKILLANEOUS
          </span>
        </a>

        {/* --- DESKTOP NAVIGATION --- */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-5 py-2 text-[14px] font-black uppercase tracking-[0.15em] text-white/50 hover:text-cyan-400 transition-colors relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-1/2 w-0 h-px bg-cyan-500 transition-all duration-300 group-hover:w-1/2 group-hover:left-1/4" />
            </a>
          ))}
        </div>

        {/* --- ACTIONS --- */}
        <div className="flex items-center gap-4">
          <a 
            href="/login"
            className="hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-xl font-black uppercase text-[14px] tracking-widest border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all active:scale-95"
          >
            <UserCircle size={20} />
            Login
          </a>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-white/70 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* --- MOBILE OVERLAY --- */}
      <div 
        className={`fixed inset-0 bg-black/95 backdrop-blur-2xl z-[99] lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 p-6 text-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-3xl font-black uppercase tracking-tighter text-white hover:text-cyan-400 flex items-center gap-4 transition-colors"
            >
              {link.name}
              <ChevronRight className="text-cyan-500" />
            </a>
          ))}
          <div className="w-full h-px bg-white/10 max-w-[200px]" />
          <a 
            href="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full max-w-xs py-5 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-center"
          >
            Login to Portal
          </a>
        </div>
      </div>
    </nav>
  );
}