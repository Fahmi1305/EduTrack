import React, { useState } from 'react';
import { X, Zap, Lock, Mail, Eye, EyeOff, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { EduTrackLogo } from './Navbar';

interface AuthLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (payload: { nipOrEmail?: string; password?: string; isDemoOneClick?: boolean }) => Promise<void>;
}

export const AuthLoginModal: React.FC<AuthLoginModalProps> = ({
  isOpen,
  onClose,
  onLogin
}) => {
  const [nipOrEmail, setNipOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nipOrEmail.trim() || !password.trim()) return;
    setIsLoading(true);
    try {
      await onLogin({
        nipOrEmail: nipOrEmail.trim(),
        password: password.trim(),
        isDemoOneClick: false
      });
      setNipOrEmail('');
      setPassword('');
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoOneClick = async () => {
    setIsLoading(true);
    try {
      await onLogin({
        nipOrEmail: '197804122005011004',
        isDemoOneClick: true
      });
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-[28px] shadow-2xl overflow-hidden">
        {/* Top Clean Header */}
        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <EduTrackLogo />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                  Portal Resmi BAN-PDM
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-[#5E5CE6] border border-indigo-200">
                  SSO Jatim
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Otentikasi Asesor Lapangan & Admin Moderasi
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            aria-label="Tutup Modal Login"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* 1-Click Judge Demo Card */}
          <div className="p-4 rounded-2xl bg-[#14151A] text-white space-y-3 shadow-lg shadow-slate-900/10">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-0.5">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-300">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Akses Cepat Dewan Juri MIA 2026
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Masuk langsung sebagai <strong className="text-white">Dr. Hendra, M.Pd</strong> (Asesor BAN-PDM Jatim) untuk menguji moderasi laporan warga, kontrol SLA, & sinkronisasi Dapodik.
                </p>
              </div>
            </div>

            <button
              type="button"
              disabled={isLoading}
              onClick={handleDemoOneClick}
              className="w-full py-3 px-4 rounded-full bg-[#5E5CE6] hover:bg-[#4B49C8] text-white text-xs font-extrabold tracking-tight shadow-md shadow-indigo-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>⚡ Demo One-Click Login (Asesor/Admin Jatim)</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center py-1">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Atau Kredensial Resmi NIP
            </span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Manual Login Form */}
          <form onSubmit={handleManualSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                NIP / Email Resmi BAN-PDM
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={nipOrEmail}
                  onChange={(e) => setNipOrEmail(e.target.value)}
                  placeholder="197804122005011004 / hendra@banpdm-jatim.id"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 tabular-nums focus:outline-none focus:border-[#5E5CE6] focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Kata Sandi / PIN SISPENA
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi akun asesor..."
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-[#5E5CE6] focus:bg-white transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
              <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Sesi Terenkripsi & Persisten
              </span>
              <span>BAN-PDM Provinsi Jawa Timur</span>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isLoading || !nipOrEmail.trim() || !password.trim()}
                className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all ${
                  !isLoading && nipOrEmail.trim() && password.trim()
                    ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {isLoading ? 'Memverifikasi...' : 'Masuk dengan NIP'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

