import React from 'react';
import { PlusCircle, Scale, LayoutDashboard, TableProperties, BarChart3, KeyRound, LogOut } from 'lucide-react';
import { AuthUser } from '../types/school';

export type NavTabType = 'overview' | 'tracker' | 'analytics' | 'compare' | 'admin';

export const EduTrackLogo: React.FC = () => {
  const [logoSrc, setLogoSrc] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isMounted = true;

    const tryPng = () => {
      const imgPng = new Image();
      imgPng.onload = () => {
        if (isMounted && imgPng.naturalWidth > 0) {
          setLogoSrc('/logo.png');
        }
      };
      imgPng.src = '/logo.png';
    };

    const imgJpeg = new Image();
    imgJpeg.onload = () => {
      if (isMounted && imgJpeg.naturalWidth > 0) {
        setLogoSrc('/logo-edutrack.jpeg');
      } else {
        tryPng();
      }
    };
    imgJpeg.onerror = () => {
      tryPng();
    };
    imgJpeg.src = '/logo-edutrack.jpeg';

    return () => {
      isMounted = false;
    };
  }, []);

  if (logoSrc) {
    return (
      <img
        src={logoSrc}
        alt="EduTrack Logo"
        className="h-11 w-11 object-contain rounded-xl group-hover:scale-105 transition-transform duration-200"
      />
    );
  }

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="EduTrack Logo"
      className="h-11 w-11 shrink-0 rounded-xl group-hover:scale-105 transition-transform duration-200"
    >
      <defs>
        <linearGradient id="edutrackBarGrad" x1="18" y1="30" x2="46" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#004E98" />
          <stop offset="50%" stopColor="#007B97" />
          <stop offset="100%" stopColor="#00A896" />
        </linearGradient>
      </defs>

      {/* Bentuk Atas: Panah Melengkung ke Kanan Atas (Rising Trend Arrow - Teal #00A896) */}
      <path
        d="M 13 24 C 22.5 21, 32 15.5, 40.8 8.2 L 38 5.4 L 48.5 4.8 L 45.5 13.8 L 43 11.1 C 33.5 18.4, 23.5 23, 13 24 Z"
        fill="#00A896"
      />

      {/* Bentuk Tengah: 3 Batang Diagram Semakin Tinggi dari Kiri ke Kanan (Gradasi #004E98 ke #00A896) */}
      <rect x="18" y="27.5" width="6.5" height="11" rx="1.5" fill="url(#edutrackBarGrad)" />
      <rect x="28.75" y="22" width="6.5" height="19.5" rx="1.5" fill="url(#edutrackBarGrad)" />
      <rect x="39.5" y="16.5" width="6.5" height="22" rx="1.5" fill="url(#edutrackBarGrad)" />

      {/* Bentuk Bawah Kiri: Buku Terbuka Simetris Sisi Kiri (Royal Blue #004E98) */}
      <path
        d="M 7 40.5 C 15.5 40, 23.5 42.5, 30.8 47.5 L 30.8 55.5 C 23.5 50.5, 15.5 48, 7 48.5 Z"
        fill="#004E98"
      />
      <path
        d="M 5.5 51.5 C 14.5 51, 23 53.5, 30.8 58.5 L 30.8 61 C 22.5 56, 14 54, 5.5 54 Z"
        fill="#004E98"
      />

      {/* Bentuk Bawah Kanan: Buku Terbuka Simetris Sisi Kanan (Emerald Teal #00A896) */}
      <path
        d="M 57 40.5 C 48.5 40, 40.5 42.5, 33.2 47.5 L 33.2 55.5 C 40.5 50.5, 48.5 48, 57 48.5 Z"
        fill="#00A896"
      />
      <path
        d="M 58.5 51.5 C 49.5 51, 41 53.5, 33.2 58.5 L 33.2 61 C 41.5 56, 50 54, 58.5 54 Z"
        fill="#00A896"
      />
    </svg>
  );
};

interface NavbarProps {
  activeTab: NavTabType;
  setActiveTab: (tab: NavTabType) => void;
  onOpenReportModal: () => void;
  onOpenCompareModal: () => void;
  compareCount?: number;
  authUser?: AuthUser | null;
  pendingReportsCount?: number;
  onOpenLoginModal: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenReportModal,
  onOpenCompareModal,
  compareCount = 0,
  authUser = null,
  pendingReportsCount = 0,
  onOpenLoginModal,
  onLogout
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#F5F7FA]/90 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand / Logo (Left) */}
        <div className="flex items-center gap-3 shrink-0">
          <div
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <EduTrackLogo />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight">
                  <span className="text-[#004E98]">Edu</span>
                  <span className="text-[#00A896]">Track</span>
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/80">
                  MIA 2026
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden 2xl:block">
                Transparent School Assessment & Public Audit
              </p>
            </div>
          </div>
        </div>

        {/* Center Floating Dark Pill Navbar (Persis FINNOVA) */}
        <nav className="hidden lg:flex items-center bg-[#14151A] text-white rounded-full p-1.5 shadow-lg shadow-slate-900/10 border border-slate-800">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'bg-[#5E5CE6] text-white font-semibold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Overview & KPI</span>
          </button>

          <button
            onClick={() => setActiveTab('tracker')}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-2 ${
              activeTab === 'tracker'
                ? 'bg-[#5E5CE6] text-white font-semibold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <TableProperties className="w-3.5 h-3.5" />
            <span>Master-Detail Tracker</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-2 ${
              activeTab === 'analytics'
                ? 'bg-[#5E5CE6] text-white font-semibold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Analytics & Tren</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('compare');
              onOpenCompareModal();
            }}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-2 ${
              activeTab === 'compare'
                ? 'bg-[#5E5CE6] text-white font-semibold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Komparasi</span>
            {compareCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white tabular-nums">
                {compareCount}
              </span>
            )}
          </button>

          {authUser && (
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'admin'
                  ? 'bg-[#5E5CE6] text-white font-semibold shadow-sm'
                  : 'text-amber-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span>🔒 Admin & Moderasi</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold tabular-nums ${
                  pendingReportsCount > 0
                    ? 'bg-amber-400 text-slate-950'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}
              >
                {pendingReportsCount}
              </span>
            </button>
          )}
        </nav>

        {/* Right Actions (Persis FINNOVA) */}
        <div className="flex items-center gap-2.5 shrink-0">
          {!authUser ? (
            <>
              <div className="hidden 2xl:flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200/70">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>BAN-PDM Jatim Synced</span>
              </div>

              <button
                onClick={onOpenLoginModal}
                className="px-4 py-2.5 rounded-full text-xs font-semibold text-slate-800 bg-white hover:bg-slate-100 border border-slate-200/90 shadow-sm transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <KeyRound className="w-3.5 h-3.5 text-[#5E5CE6]" />
                <span>Portal Asesor / Admin</span>
              </button>
            </>
          ) : (
            <div className="flex items-center gap-1.5 bg-white border border-indigo-200/90 rounded-full pl-2 pr-1.5 py-1 shadow-sm">
              <button
                onClick={() => setActiveTab('admin')}
                className="flex items-center gap-2 text-left hover:opacity-85 transition-opacity cursor-pointer"
                title="Klik untuk membuka Panel Admin & Moderasi"
              >
                <span className="w-7 h-7 rounded-full bg-indigo-50 border border-indigo-200 text-[#5E5CE6] text-[10px] font-extrabold flex items-center justify-center shrink-0">
                  DH
                </span>
                <span className="text-xs font-bold text-slate-900 hidden xl:inline whitespace-nowrap">
                  {authUser.name} — <span className="text-[#5E5CE6]">{authUser.roleLabel}</span>
                </span>
                <span className="text-xs font-bold text-slate-900 xl:hidden whitespace-nowrap">
                  {authUser.name}
                </span>
              </button>
              <button
                onClick={onLogout}
                title="Keluar dari Portal Asesor / Kembali ke Mode Publik"
                className="p-1.5 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Quick Action Button */}
          <button
            onClick={onOpenReportModal}
            className="px-4 sm:px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-[#5E5CE6] hover:bg-[#4B49C8] transition-all duration-200 shadow-md shadow-indigo-500/20 flex items-center gap-2 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-white" />
            <span className="hidden sm:inline">+ Lapor Kondisi Sekolah</span>
            <span className="sm:hidden">Lapor</span>
          </button>
        </div>
      </div>
    </header>
  );
};
