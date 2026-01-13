import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <s
              />
              <Image
                src="/logo.png"
                alt="Skillaneous Logo"
                width={40}
                height={40}
              />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#837FA4] via-[#7EA9AC] to-[#C390D4] text-xl">
                SKILLANEOUS
              </span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              AI-powered career roadmapping for the next generation of developers.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="/features" className="hover:text-white transition">Features</Link></li>
              <li><Link href="#" className="hover:text-white transition">Roadmaps</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="/about" className="hover:text-white transition">About</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="#" className="hover:text-white transition">Privacy & Cookies</Link></li>
              <li><Link href="#" className="hover:text-white transition">Terms & Security</Link></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-white/10" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <p className="text-sm text-white/50">
            © 2025 SKILLANEOUS. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: "https://github.com/Gaurika-Sethi/SKILLANEOUS.git" }
            ].map(({ icon: Icon, href }, i) => (
              <Link
                key={i}
                href={href}
                className="w-9 h-9 rounded-full border border-white/15
                           flex items-center justify-center text-white/70
                           hover:text-white hover:border-white/30
                           hover:shadow-[0_0_12px_rgba(255,255,255,0.15)]
                           transition"
              >
                <Icon size={24} />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
