'use client';
import React, { useState } from 'react';
import { API_BASE_URL } from "@/lib/api";
import { User, Mail, Lock, Eye, EyeOff, ShieldCheck, AlertCircle } from 'lucide-react';

const CreateAccount = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  // State for password fields
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please ensure they are the same.");
      return;
    }

    // Clear error and proceed if they match
    setError("");
    console.log("Account created successfully!");
    // Add your API call logic here
  };

  const handleGoogleSignIn = () => {
    window.location.href = `${API_BASE_URL}/api/v1/users/auth/google`;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center p-28 font-sans text-gray-200">
      <div className="w-full max-w-md bg-gradient-to-r from-white/20 to-white/5 rounded-3xl p-10 border border-gray-800 shadow-[0_0_24px_rgba(138,216,237,0.2)] shadow-2xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl text-white mb-2 font-bold">Create Your Account</h1>
          <p className="text-gray-400 text-sm">Start building your personalized career roadmap.</p>
        </div>

        <form className="space-y-5" onSubmit={handleCreateAccount}>
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider ml-1">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="text" 
                required
                placeholder="John Doe" 
                className="w-full bg-[#252529] border border-gray-700 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="email" 
                required
                placeholder="you@example.com" 
                className="w-full bg-[#252529] border border-gray-700 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••" 
                className={`w-full bg-[#252529] border ${error ? 'border-red-500' : 'border-gray-700'} rounded-xl py-3 pl-10 pr-12 focus:outline-none focus:border-purple-500 transition-colors`}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider ml-1">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="••••••••" 
                className={`w-full bg-[#252529] border ${error ? 'border-red-500' : 'border-gray-700'} rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-purple-500 transition-colors`}
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 text-red-400 text-xs mt-2 ml-1 animate-pulse">
              <AlertCircle size={14} />
              <span>{error}</span>
            </div>
          )}

          {/* Create Account Button */}
          <button 
            type="submit"
            className="w-full mt-4 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-white py-4 rounded-xl shadow-lg group hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 uppercase tracking-widest text-sm font-bold"
          >
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-8 text-center">
          <span className="bg-transparent px-6 text-xs text-gray-500 uppercase z-10 relative font-bold">Or</span>
          <div className="absolute top-1/2 w-full h-[1px] bg-gray-800 -z-0"></div>
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-5 bg-[#252529] border border-gray-700 py-3 rounded-xl hover:bg-[#2d2d33] transition-colors mb-6 mt-4"
        >
          <img src="/google_logo.png" className="w-5 h-5" alt="Google" />
          <span className="text-sm font-semibold text-white">Continue with Google</span>
        </button>

        {/* Footer Links */}
        <div className="text-center space-y-6">
          <p className="text-sm text-gray-400">
            Already have an account? <a href="/login" className="text-cyan-400 font-bold hover:underline underline-offset-4">Sign in</a>
          </p>
          
          <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 uppercase tracking-tighter">
            <ShieldCheck size={14} className="text-cyan-500/50" />
            <span>Your data is encrypted and secure</span>
          </div>
        </div>
      </div>

      {/* Terms and Privacy */}
      <div className="absolute bottom-4 text-center text-[10px] text-gray-500 max-w-xs px-4">
        By creating an account, you agree to our <a href="#" className="text-cyan-400 font-bold">Terms of Service</a> and <a href="#" className="text-cyan-400 font-bold">Privacy Policy</a>
      </div>
    </div>
  );
};

export default CreateAccount;