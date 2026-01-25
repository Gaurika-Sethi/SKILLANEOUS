"use client";

import { useState } from "react";
import { Mail, Linkedin, Send, MessageSquare, Users, Heart } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const inputClass = "w-full bg-[#262626]/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-gray-600";

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.name || !formData.email || !formData.message) {
    alert("Please fill all fields");
    return;
  }

  try {
    setStatus("sending");

    const res = await fetch("https://formspree.io/f/xayzabcd", { // 🔥 replace with your endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setStatus("error");
    }
  } catch (err) {
    console.error(err);
    setStatus("error");
  }
};

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20 font-sans selection:bg-purple-500/30">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="text-center mb-16 space-y-4">
          <h1 className="text-6xl font-black tracking-tighter bg-gradient-to-b from-purple-300 to-pink-400 bg-clip-text text-transparent">
            Contact
          </h1>
          <p className="text-gray-400 text-lg font-medium">Let's talk.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Left: Send a Message Form */}
          <section className="bg-[#111116] border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl shadow-purple-500/5">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-cyan-400">
              Send a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Name <span className="text-pink-500">*</span></label>
                <input 
                  type="text" 
                  placeholder="Your name" 
                  className={inputClass}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Email <span className="text-pink-500">*</span></label>
                <input 
                  type="email" 
                  placeholder="gaurikasethi88@gmail.com" 
                  className={inputClass}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Message <span className="text-pink-500">*</span></label>
                <textarea 
                  rows={5} 
                  placeholder="What would you like to discuss?" 
                  className={`${inputClass} resize-none`}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>

              <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-black font-black rounded-xl hover:opacity-90 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {status === "sending" ? "Sending..." : "Send Message"}
                    <Send size={18} />
              </button>

              {status === "success" && (
                <p className="text-green-400 text-sm font-medium">
                  Message sent successfully! We'll get back to you soon 💌
                </p>
              )}

              {status === "error" && (
                <p className="text-red-400 text-sm font-medium">
                  Something went wrong. Please try again later.
                </p>
              )}
            </form>
          </section>

          {/* Right Column: Info & Socials */}
          <div className="space-y-8">
            
            {/* Email Us Card */}
            <section className="bg-[#111116] border border-white/10 rounded-3xl p-8 md:p-10">
              <h2 className="text-2xl font-bold mb-8 text-cyan-400">Email us</h2>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <MessageSquare className="text-purple-400 shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-lg">General Inquiries</h3>
                    <p className="text-gray-500 text-sm">Questions about the platform, features, or how it works.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Users className="text-cyan-400 shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-lg">Collaboration</h3>
                    <p className="text-gray-500 text-sm">Partnership opportunities, integrations, or content collaboration.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Heart className="text-pink-400 shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-lg">Feedback</h3>
                    <p className="text-gray-500 text-sm">Suggestions, bug reports, or thoughts on improving SKILLANEOUS.</p>
                  </div>
                </div>

                <div className="pt-4 space-y-3 border-t border-white/5">
                  <a href="mailto:gaurikasethi88@gmail.com" className="flex items-center gap-3 text-cyan-400 hover:underline font-medium">
                    <Mail size={16} /> gaurikasethi88@gmail.com
                  </a>
                  <a href="mailto:rgoel0110@gmail.com" className="flex items-center gap-3 text-purple-400 hover:underline font-medium">
                    <Mail size={16} /> rgoel0110@gmail.com
                  </a>
                </div>
              </div>
            </section>            
          </div>
        </div>

        {/* Footer Note */}
        <footer className="mt-20 text-center space-y-1">
          <p className="text-gray-500 text-sm font-medium">We read every message.</p>
          <p className="text-gray-600 text-xs">Responses may take time — and that's okay.</p>
        </footer>
      </div>
    </div>
  );
}