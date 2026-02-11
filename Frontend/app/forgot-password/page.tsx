'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Added for redirect
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowLeft, CheckCircle2, Circle, Key, Timer, AlertCircle } from 'lucide-react';

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [step, setStep] = useState<'email' | 'otp' | 'reset' | 'success'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [timer, setTimer] = useState(60);

  // --- Password Validation Logic ---
  const validation = {
    minLength: password.length >= 7,
    hasNumber: /\d/.test(password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    matches: password === confirmPassword && password.length > 0
  };

  const isPasswordValid = validation.minLength && validation.hasNumber && validation.hasSpecial;

  // --- OTP Timer Logic ---
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleResendOtp = () => setTimer(60);

  // --- Navigation Logic ---
  const handleBack = () => {
    if (step === 'email') {
      router.push('/login'); // Redirect to login page
    } else if (step === 'otp') {
      setStep('email');
    } else if (step === 'reset') {
      setStep('otp');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] flex flex-col items-center justify-center p-8 md:p-24 font-sans text-gray-200">
      <div className="w-full max-w-[580px] bg-gradient-to-r from-white/10 via-white/5 to-white/1 rounded-[40px] p-10 md:p-14 shadow-[0_0_24px_rgba(138,216,237,0.2)] relative overflow-hidden">
        
        {/* Glow Decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 blur-[80px] pointer-events-none bg-violet-500/10" />

        {/* Back Button */}
        {step !== 'success' && (
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-6 text-sm font-bold uppercase tracking-widest relative z-20"
          >
            <ArrowLeft size={16} /> {step === 'email' ? 'Back' : 'Back'}
          </button>
        )}

        {/* --- STEP 1: EMAIL --- */}
        {step === 'email' && (
          <div className="space-y-8 animate-in fade-in duration-500 relative z-10">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">Forgot Password?</h1>
              <p className="text-gray-500 text-sm">Enter your email to receive a recovery code.</p>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold tracking-[0.2em] text-gray-400 uppercase ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400" size={18} />
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-[#0a0a0c] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-cyan-500/50 outline-none transition-all"
                />
              </div>
            </div>
            <GradientButton 
              disabled={!email.includes('@') || email.length < 5} 
              onClick={() => setStep('otp')}
            >
              Send Code
            </GradientButton>
          </div>
        )}

        {/* --- STEP 2: OTP --- */}
        {step === 'otp' && (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-500 relative z-10">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">Verify Identity</h1>
              <p className="text-gray-500 text-sm">We've sent a code to <span className="text-white">{email}</span></p>
            </div>
            <div className="space-y-4">
              <div className="relative group">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400" size={18} />
                <input 
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit code"
                  className="w-full bg-[#0a0a0c] border border-white/10 rounded-2xl py-4 pl-12 text-center text-2xl tracking-[0.5em] text-white focus:border-purple-500/50 outline-none"
                />
              </div>
              <div className="flex justify-between items-center px-1">
                <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-widest font-bold">
                  <Timer size={14} /> 00:{timer < 10 ? `0${timer}` : timer}
                </div>
                <button 
                  type="button"
                  disabled={timer > 0}
                  onClick={handleResendOtp}
                  className={`text-xs font-bold uppercase tracking-widest transition-colors ${timer > 0 ? 'text-gray-700 cursor-not-allowed' : 'text-cyan-400 hover:text-cyan-300'}`}
                >
                  Resend Code
                </button>
              </div>
            </div>
            <GradientButton disabled={otp.length < 6} onClick={() => setStep('reset')}>
              Verify Code
            </GradientButton>
          </div>
        )}

        {/* --- STEP 3: RESET PASSWORD --- */}
        {step === 'reset' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500 relative z-10">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">New Password</h1>
              <p className="text-gray-500 text-sm">Create a password you'll remember.</p>
            </div>
            
            <div className="space-y-4">
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New Password"
                  className="w-full bg-[#0a0a0c] border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white outline-none focus:border-purple-500/50"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm New Password"
                  className="w-full bg-[#0a0a0c] border border-white/10 rounded-2xl py-4 pl-12 text-white outline-none focus:border-purple-500/50"
                />
              </div>
            </div>

            {/* Checklist Section */}
            <div className="bg-white/5 border border-white/5 rounded-2xl p-5 space-y-3">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">Password Requirements</p>
              <CheckItem met={validation.minLength} text="7+ Characters minimum" />
              <CheckItem met={validation.hasNumber} text="Contains at least 1 number" />
              <CheckItem met={validation.hasSpecial} text="Contains 1 special character" />
              <CheckItem met={validation.matches} text="Passwords match exactly" />
            </div>

            <GradientButton 
              disabled={!isPasswordValid || !validation.matches} 
              onClick={() => setStep('success')}
            >
              Update Password
            </GradientButton>
          </div>
        )}

        {/* --- STEP 4: SUCCESS --- */}
        {step === 'success' && (
          <div className="text-center space-y-8 animate-in zoom-in-95 duration-500 relative z-10">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="text-emerald-400" size={40} />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">Password Changed</h1>
              <p className="text-gray-500 text-sm leading-relaxed">
                Your credentials have been updated. You can now use your new password to log in.
              </p>
            </div>
            <GradientButton disabled={false} onClick={() => router.push('/login')}>
              Go to Sign In
            </GradientButton>
          </div>
        )}

        {/* Security Badge */}
        <div className="mt-10 flex items-center justify-center gap-2 text-[13px] text-gray-600 tracking-tighter relative z-10">
          <ShieldCheck size={14} className="text-emerald-500/50" />
          <span>AES-256 Bit Encrypted Connection</span>
        </div>
      </div>
    </div>
  );
};

// --- Helper Components ---

const CheckItem = ({ met, text }: { met: boolean; text: string }) => (
  <div className={`flex items-center gap-3 text-[12px] transition-all duration-300 ${met ? 'text-emerald-400' : 'text-gray-600'}`}>
    {met ? <CheckCircle2 size={14} className="animate-in zoom-in" /> : <Circle size={14} />}
    <span className={met ? 'font-bold' : ''}>{text}</span>
  </div>
);

const GradientButton = ({ children, disabled, onClick }: { children: React.ReactNode; disabled: boolean; onClick: () => void }) => (
  <div className={`p-[2px] rounded-2xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 transition-all duration-300 ${disabled ? 'opacity-20 grayscale cursor-not-allowed' : 'hover:scale-[1.03] active:scale-[0.98]'}`}>
    <button 
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="w-full bg-[#111116] disabled:cursor-not-allowed text-white font-black uppercase tracking-[0.2em] text-sm py-4 rounded-[15px] transition-all hover:bg-transparent"
    >
      {children}
    </button>
  </div>
);

export default ForgotPasswordPage;