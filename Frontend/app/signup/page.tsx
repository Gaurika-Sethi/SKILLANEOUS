'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Eye, EyeOff, ShieldCheck, AlertCircle, Check, X, Image } from 'lucide-react';
import { API_BASE_URL } from "@/lib/api";

type SignUpPageProps = {
  onBackToLogin?: () => void;
  onSignUp?: (data: any) => void;
};

const CreateAccountPage = ({ onBackToLogin, onSignUp }: SignUpPageProps) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePic: null as File | null
  });
  const [profilePreview, setProfilePreview] = useState<string>('');
  const [error, setError] = useState('');
  const [validationState, setValidationState] = useState({
    username: { isValid: false, rules: { noStartWithNumber: false, onlyAllowedChars: false, minLength: false } },
    password: { isValid: false, rules: { minLength: false, hasNumber: false, hasSpecialChar: false } },
    email: { isValid: false }
  });

  const handleGoogleSignIn = () => {
    window.location.href = `${API_BASE_URL}/api/v1/users/auth/google`;
  };

  // Username validation rules
  const validateUsername = (value: string) => {
    const noStartWithNumber = !/^\d/.test(value);
    const onlyAllowedChars = /^[a-zA-Z_@-]*$/.test(value) && value.length > 0;
    const minLength = value.length >= 3;
    
    setValidationState(prev => ({
      ...prev,
      username: {
        isValid: noStartWithNumber && onlyAllowedChars && minLength && value.length > 0,
        rules: { noStartWithNumber, onlyAllowedChars, minLength }
      }
    }));
  };

  // Password validation rules
  const validatePassword = (value: string) => {
    const minLength = value.length >= 7;
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
    
    setValidationState(prev => ({
      ...prev,
      password: {
        isValid: minLength && hasNumber && hasSpecialChar,
        rules: { minLength, hasNumber, hasSpecialChar }
      }
    }));
  };

  // Email validation
  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(value);
    
    setValidationState(prev => ({
      ...prev,
      email: { isValid }
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(''); // Clear error when user types

    // Run real-time validation
    if (name === 'username') {
      validateUsername(value);
    } else if (name === 'password') {
      validatePassword(value);
    } else if (name === 'email') {
      validateEmail(value);
    }
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }
      setFormData(prev => ({ ...prev, profilePic: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      if (error) setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all required fields
    if (!formData.username.trim()) {
      setError('Username is required');
      return;
    }
    if (!validationState.username.isValid) {
      setError('Please fix the username validation errors');
      return;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return;
    }
    if (!validationState.email.isValid) {
      setError('Please enter a valid email address');
      return;
    }
    if (!formData.password.trim()) {
      setError('Password is required');
      return;
    }
    if (!validationState.password.isValid) {
      setError('Please fix the password validation errors');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    // Proceed with sign up logic
    console.log("Form submitted:", formData);
    if (onSignUp) {
      onSignUp(formData);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] flex flex-col items-center justify-center p-8 md:p-24 font-sans text-gray-200">
      {/* Main Card - Matching your Login UI */}
      <div className="w-full max-w-[580px] bg-gradient-to-r from-white/10 via-white/5 to-white/1 rounded-[40px] p-10 md:p-14 shadow-[0_0_24px_rgba(138,216,237,0.2)] relative overflow-hidden">
        
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 blur-[80px] pointer-events-none bg-cyan-500/10" />

        <div className="text-center mb-10 relative z-10">
          <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">Start Your Journey</h1>
          <p className="text-gray-500 text-sm">Create an account to begin your career roadmap.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          

          {/* Username Field */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold tracking-[0.2em] text-gray-400 uppercase ml-1">Username*</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center text-gray-500 group-focus-within:text-cyan-400 transition-colors">
                <User size={18} />
              </div>
              <input
                name="username"
                type="text"
                required
                placeholder="John_Doe"
                className={`w-full bg-[#0a0a0c] border ${validationState.username.isValid ? 'border-emerald-500/50' : formData.username && !validationState.username.isValid ? 'border-red-500/50' : 'border-white/10'} rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all`}
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            {/* Username Validation Checklist */}
            {formData.username && (
              <div className="mt-3 bg-white/5 rounded-lg p-3 space-y-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Username Rules:</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[11px]">
                    {validationState.username.rules.minLength ? <Check size={14} className="text-emerald-500" /> : <X size={14} className="text-red-500" />}
                    <span className={validationState.username.rules.minLength ? 'text-emerald-400' : 'text-gray-400'}>Minimum 3 characters</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px]">
                    {validationState.username.rules.noStartWithNumber ? <Check size={14} className="text-emerald-500" /> : <X size={14} className="text-red-500" />}
                    <span className={validationState.username.rules.noStartWithNumber ? 'text-emerald-400' : 'text-gray-400'}>Cannot start with a number</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px]">
                    {validationState.username.rules.onlyAllowedChars ? <Check size={14} className="text-emerald-500" /> : <X size={14} className="text-red-500" />}
                    <span className={validationState.username.rules.onlyAllowedChars ? 'text-emerald-400' : 'text-gray-400'}>Only letters, numbers, '_', '-', '@' allowed</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold tracking-[0.2em] text-gray-400 uppercase ml-1">Email Address*</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center text-gray-500 group-focus-within:text-cyan-400 transition-colors">
                <Mail size={18} />
              </div>
              <input 
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className={`w-full bg-[#0a0a0c] border ${validationState.email.isValid ? 'border-emerald-500/50' : formData.email && !validationState.email.isValid ? 'border-red-500/50' : 'border-white/10'} rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all`}
                value={formData.email}
                onChange={handleInputChange}
              />
              {formData.email && (
                <div className="absolute inset-y-0 right-4 flex items-center">
                  {validationState.email.isValid ? (
                    <Check size={18} className="text-emerald-500" />
                  ) : (
                    <X size={18} className="text-red-500" />
                  )}
                </div>
              )}
            </div>
          </div>

        {/* Profile Picture Upload */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold tracking-[0.2em] text-gray-400 uppercase ml-1">Profile Picture (Optional)</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center text-gray-500 group-focus-within:text-cyan-400 transition-colors z-10">
                <Image size={18} />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="w-full bg-[#0a0a0c] border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-gray-400 placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all cursor-pointer file:cursor-pointer file:bg-transparent file:text-transparent file:w-0"
              />
              <div className="absolute inset-y-0 right-4 flex items-center z-10">
                <div className={`w-3 h-3 rounded-full ${formData.profilePic ? 'bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.6)]' : 'bg-red-400 shadow-[0_0_10px_rgba(239,68,68,0.6)]'} transition-all`} />
              </div>
            </div>
            {profilePreview && (
              <div className="mt-3 flex justify-center">
                <img src={profilePreview} alt="Profile preview" className="w-20 h-20 rounded-full object-cover border border-cyan-500/30" />
              </div>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold tracking-[0.2em] text-gray-400 uppercase ml-1">Password*</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center text-gray-500 group-focus-within:text-purple-400 transition-colors">
                <Lock size={18} />
              </div>
              <input 
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                className={`w-full bg-[#0a0a0c] border ${validationState.password.isValid ? 'border-emerald-500/50' : formData.password && !validationState.password.isValid ? 'border-red-500/50' : 'border-white/10'} rounded-2xl py-4 pl-12 pr-12 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all`}
                value={formData.password}
                onChange={handleInputChange}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {/* Password Validation Checklist */}
            {formData.password && (
              <div className="mt-3 bg-white/5 rounded-lg p-3 space-y-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Password Requirements:</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[11px]">
                    {validationState.password.rules.minLength ? <Check size={14} className="text-emerald-500" /> : <X size={14} className="text-red-500" />}
                    <span className={validationState.password.rules.minLength ? 'text-emerald-400' : 'text-gray-400'}>Minimum 7 characters</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px]">
                    {validationState.password.rules.hasNumber ? <Check size={14} className="text-emerald-500" /> : <X size={14} className="text-red-500" />}
                    <span className={validationState.password.rules.hasNumber ? 'text-emerald-400' : 'text-gray-400'}>At least one number</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px]">
                    {validationState.password.rules.hasSpecialChar ? <Check size={14} className="text-emerald-500" /> : <X size={14} className="text-red-500" />}
                    <span className={validationState.password.rules.hasSpecialChar ? 'text-emerald-400' : 'text-gray-400'}>At least one special character (!@#$%^&*)</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold tracking-[0.2em] text-gray-400 uppercase ml-1">Confirm Password*</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center text-gray-500 group-focus-within:text-purple-400 transition-colors">
                <Lock size={18} />
              </div>
              <input 
                name="confirmPassword"
                type="password"
                required
                placeholder="••••••••"
                className={`w-full bg-[#0a0a0c] border ${formData.password && formData.confirmPassword === formData.password && validationState.password.isValid ? 'border-emerald-500/50' : formData.confirmPassword && formData.confirmPassword !== formData.password ? 'border-red-500/50' : 'border-white/10'} rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all`}
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
            {error && (
              <p className="text-red-400 text-[12px] mt-1 ml-1 flex items-center gap-1 animate-pulse font-bold">
                <AlertCircle size={12} /> {error}
              </p>
            )}
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <div className="p-[2px] rounded-2xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 group hover:scale-[1.05] transition-transform duration-300">
              <button 
                type="submit"
                className="w-full bg-[#111116] group-hover:bg-transparent text-white font-black uppercase tracking-[0.2em] text-sm py-4 rounded-[15px] transition-all duration-300"
              >
                Create Account
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

        {/* Footer Link */}
        <div className="mt-10 text-center relative z-10">
          <p className="text-gray-500 text-[16px]">
            Already have an account? <button onClick={() => router.push('/login')} className="text-white font-bold underline decoration-cyan-500/50 underline-offset-4 hover:text-cyan-400 transition-colors ml-1">Sign in</button>
          </p>
        </div>

        {/* Security Badge */}
        <div className="mt-8 flex items-center justify-center gap-2 text-[13px] text-gray-600 tracking-tighter">
          <ShieldCheck size={14} className="text-emerald-500/50" />
          <span>Your data is encrypted and secure</span>
        </div>
      </div>

      {/* Footer Links */}
      <div className="mt-12 flex gap-6 text-[12px] font-bold tracking-[0.2em] text-gray-600 uppercase">
        <button className="hover:text-cyan-400 transition-colors">Terms of Service</button>
        <button className="hover:text-purple-400 transition-colors">Privacy Policy</button>
      </div>
    </div>
  );
};

export default CreateAccountPage;