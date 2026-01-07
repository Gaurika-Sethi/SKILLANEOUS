"use client";

import Link from "next/link";
import Image from "next/image";
import LoginPage from "./login";
import ThemeSelection from "./resume";
export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Left: Logo + Text */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Skillaneous Logo"
            width={32}
            height={32}
            priority
          />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#837FA4] via-[#7EA9AC] to-[#C390D4]">
            SKILLANEOUS
          </span>
        </Link>

        {/* Right: Buttons */}
        <div className="flex items-center gap-4">

          {/* Build Resume */}
          <Link
            href="/resume"
            className="px-4 py-2 rounded-full border border-white/20 text-white text-sm bg-gradient-to-r from-cyan-400/15 via-purple-400/15 to-pink-500/15 hover:from-cyan-400/30 hover:via-purple-400/30 hover:to-pink-500/30 hover:shadow-[0_0_14px_rgba(138,216,237,0.7)] transition-all duration-300 ease-in-out"
          >
            BUILD RESUME
          </Link>

          {/* Login (Reference Button) */}
          <Link
            href="/login"
            className="px-4 py-2 rounded-full border border-white/20 text-white text-sm bg-gradient-to-r from-cyan-400/15 via-purple-400/15 to-pink-500/15 hover:from-cyan-400/30 hover:via-purple-400/30 hover:to-pink-500/30 hover:shadow-[0_0_14px_rgba(138,216,237,0.7)] transition-all duration-300 ease-in-out"
          >
            LOGIN
          </Link>

          {/* Start My Path (Same Style as Login) */}
          <Link
            href="/path"
            className="px-4 py-2 rounded-full border border-white/20 text-white text-sm bg-gradient-to-r from-cyan-400/15 via-purple-400/15 to-pink-500/15 hover:from-cyan-400/30 hover:via-purple-400/30 hover:to-pink-500/30 hover:shadow-[0_0_14px_rgba(138,216,237,0.7)] transition-all duration-300 ease-in-out"
          >
            START MY PATH
          </Link>

        </div>
      </div>
    </nav>
  );
}
