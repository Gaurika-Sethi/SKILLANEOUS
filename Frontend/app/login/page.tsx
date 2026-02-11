'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from "@/lib/api";
import { Mail, Lock, Eye, EyeOff, ShieldCheck,} from 'lucide-react';
type LoginPageProps = {
 onSkip?: () => void;
  onLogin?: (email: string, password: string) => void;
};
const LoginPage = ({ onSkip, onLogin }: LoginPageProps) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleSignIn = () => {
    window.location.href = `${API_BASE_URL}/api/v1/users/auth/google`;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] flex flex-col items-center justify-center p-24 font-sans">
      {/* Main Login Card */}
      <div className="w-full h-full max-w-[580px] bg-gradient-to-r from-white/10 via-white/5 to-white/1 rounded-[40px] p-10 md:p-14 shadow-[0_0_24px_rgba(138,216,237,0.2)] relative overflow-hidden">
        
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 blur-[80px] pointer-events-none" />

        <div className="text-center mb-10 relative z-10">
          <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">Welcome Back</h1>
          <p className="text-gray-500 text-sm">Sign in to continue building your career path.</p>
        </div>

        <form className="space-y-6 relative z-10">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-s tracking-widest text-gray-400 ml-1">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center text-gray-500 group-focus-within:text-cyan-400 transition-colors">
                <Mail size={18} />
              </div>
              <input 
                type="email"
                placeholder="you@example.com"
                className="w-full bg-[#0a0a0c] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-s tracking-widest text-gray-400">Password</label>
              <button 
                type="button" 
                onClick={() => router.push('/forgot-password')}
                className="text-s tracking-tighter text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center text-gray-500 group-focus-within:text-purple-400 transition-colors">
                <Lock size={18} />
              </div>
              <input 
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-[#0a0a0c] border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Sign In Button with Gradient Border Effect */}
          <div className="pt-4">
            <div className="p-[2px] rounded-2xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 group hover:scale-[1.1] transition-transform duration-300">
              <button 
                type="submit"
                className="w-full bg-[#111116] group-hover:bg-transparent text-white font-black uppercase tracking-[0.2em] text-sm py-4 rounded-[15px] transition-all duration-300"
              >
                Sign In
              </button>
            </div>
          </div>
        </form>

        {/* Divider */}
        <div className="flex items-center my-8">
          <div className="flex-grow h-[1px] bg-white/5"></div>
          <span className="px-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest">or</span>
          <div className="flex-grow h-[1px] bg-white/5"></div>
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 flex items-center justify-center gap-3 text-white font-bold hover:bg-white/10 transition-all group"
        >
          <img src="/google_logo.png" alt="Google" className="w-5 h-5" />
          <span className="text-sm">Continue with Google</span>
        </button>

        {/* Create Account & Optional Skip */}
        <div className="mt-10 text-center space-y-4 relative z-10">
          <p className="text-gray-500 text-[18px]">
            New to SKILLANEOUS? <button onClick={() => router.push('/signup')} className="text-white font-bold underline decoration-cyan-500/50 underline-offset-4 hover:text-cyan-400 transition-colors">Create an account</button>
          </p>
          
          {/* Skip for now option */}
          <button 
            onClick={() => router.push('/how-it-works')}
            className="block w-full text-[16px] uppercase tracking-[0.3em] text-gray-600 hover:text-gray-400 transition-colors mt-6 pt-4 border-t border-white/5"
          >
            Skip for now
          </button>
        </div>

        {/* Security Badge */}
        <div className="mt-8 flex items-center justify-center gap-2 text-[14px] text-gray-600 tracking-tighter">
          <ShieldCheck size={14} className="text-emerald-500/50" />
          <span>Your data is encrypted and secure</span>
        </div>
      </div>

      {/* Footer Links */}
      <div className="mt-12 flex gap-6 text-[14px] tracking-[0.2em] text-gray-600">
        <button className="hover:text-cyan-400 transition-colors">Terms of Service</button>
        <button className="hover:text-purple-400 transition-colors">Privacy Policy</button>
      </div>
    </div>
  );
};

export default LoginPage;