import React from 'react';
import { AlertOctagon, Building2, Clock, Users, ArrowUpRight, ArrowDownRight, Sparkles } from 'lucide-react';
import { TransparencyStats } from '../types/school';

interface KpiBentoCardsProps {
  stats: TransparencyStats;
  onFilterAnomaly?: () => void;
  onFilterOverdue?: () => void;
}

export const KpiBentoCards: React.FC<KpiBentoCardsProps> = ({
  stats,
  onFilterAnomaly,
  onFilterOverdue
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* ================= CARD 1: Bottleneck / Overdue SLA ================= */}
      <div className="bg-white rounded-[28px] p-6 border border-slate-200/70 shadow-[0_4px_24px_rgba(15,23,42,0.04)] hover:shadow-lg transition-all duration-200 flex flex-col justify-between">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Berkas Overdue SLA
            </span>
            <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center">
              <AlertOctagon className="w-4 h-4" />
            </div>
          </div>

          <div>
            <div className="text-3xl font-bold tracking-tight text-slate-900 tabular-nums">
              {stats.overduePercentage}%
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {stats.overdueCount} dari {stats.totalSchoolsTracked.toLocaleString('id-ID')} Berkas
            </p>
          </div>

          <div className="flex items-center gap-1 text-xs font-semibold text-rose-500 pt-1">
            <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            <span>↑ 2.4% dari bulan lalu (Perlu Atensi)</span>
          </div>
        </div>

        {/* Mini Visual: Clean Progress Quota Bar */}
        <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-medium text-slate-500">
            <span>Verifikasi: 52%</span>
            <span>Asesor: 38%</span>
            <span>Pleno: 10%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex gap-0.5 p-0.5">
            <div className="bg-rose-500 h-full rounded-full w-[52%]" title="Verifikasi"></div>
            <div className="bg-amber-400 h-full rounded-full w-[38%]" title="Asesor"></div>
            <div className="bg-slate-300 h-full rounded-full w-[10%]" title="Pleno"></div>
          </div>
        </div>
      </div>

      {/* ================= CARD 2: Total Sekolah & Serapan Dana BOS ================= */}
      <div className="bg-white rounded-[28px] p-6 border border-slate-200/70 shadow-[0_4px_24px_rgba(15,23,42,0.04)] hover:shadow-lg transition-all duration-200 flex flex-col justify-between">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Sekolah & Serapan BOS
            </span>
            <div className="w-8 h-8 rounded-full bg-indigo-50 text-[#5E5CE6] flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>

          <div>
            <div className="text-3xl font-bold tracking-tight text-slate-900 tabular-nums">
              {stats.totalSchoolsTracked.toLocaleString('id-ID')}
            </div>
            <p className="text-xs text-[#5E5CE6] font-semibold tabular-nums mt-0.5">
              Rp 142.5 Milyar Terpantau
            </p>
          </div>

          <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 pt-1">
            <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            <span>↑ 8.2% sinkronisasi bulan ini</span>
          </div>
        </div>

        {/* Mini Visual: Mini Vertical Bar Chart dengan gradasi ungu/indigo lembut */}
        <div className="mt-6 pt-4 border-t border-slate-100 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-medium text-slate-500">
            <span>Realisasi Bulanan</span>
            <span className="font-semibold text-slate-900 tabular-nums">98.2% Terserap</span>
          </div>
          <div className="flex items-end gap-2 h-7 pt-1">
            {[42, 55, 68, 62, 79, 88, 100].map((val, idx) => (
              <div
                key={idx}
                className="flex-1 rounded-t-md transition-all duration-300"
                style={{
                  height: `${val}%`,
                  background: idx === 6 ? '#5E5CE6' : `rgba(94, 92, 230, ${0.25 + idx * 0.1})`
                }}
                title={`Bulan ${idx + 1}: ${val}%`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ================= CARD 3: Rata-rata Durasi SLA (16 Hari) ================= */}
      <div className="bg-white rounded-[28px] p-6 border border-slate-200/70 shadow-[0_4px_24px_rgba(15,23,42,0.04)] hover:shadow-lg transition-all duration-200 flex flex-col justify-between">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Avg. Durasi Siklus SLA
            </span>
            <div className="w-8 h-8 rounded-full bg-indigo-50 text-[#5E5CE6] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>

          <div>
            <div className="text-3xl font-bold tracking-tight text-slate-900 tabular-nums">
              16 Hari
            </div>
            <p className="text-xs text-slate-500 font-medium tabular-nums mt-0.5">
              Batas Standar BAN: 62 Hari
            </p>
          </div>

          <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 pt-1">
            <ArrowDownRight className="w-3.5 h-3.5 shrink-0" />
            <span>↓ 3 Hari lebih cepat dari bulan lalu</span>
          </div>
        </div>

        {/* Mini Visual: Smooth Line Chart dengan Dots berwarna Indigo #5E5CE6 (FINNOVA) */}
        <div className="mt-6 pt-4 border-t border-slate-100 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-medium text-slate-500">
            <span>Efisiensi Waktu Siklus</span>
            <span className="font-semibold text-slate-900 tabular-nums">-28.4% Durasi</span>
          </div>
          <div className="relative h-7 flex items-center">
            <svg className="w-full h-7 overflow-visible" viewBox="0 0 160 28">
              <path
                d="M 5,24 Q 40,20 80,14 T 155,5"
                fill="none"
                stroke="#5E5CE6"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Dots */}
              <circle cx="5" cy="24" r="3.5" fill="#5E5CE6" />
              <circle cx="45" cy="19" r="3" fill="#A5B4FC" />
              <circle cx="80" cy="14" r="3" fill="#A5B4FC" />
              <circle cx="120" cy="9" r="3" fill="#A5B4FC" />
              <circle cx="155" cy="5" r="4.5" fill="#5E5CE6" stroke="#FFFFFF" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>

      {/* ================= CARD 4: Laporan Validasi Warga ================= */}
      <div className="bg-white rounded-[28px] p-6 border border-slate-200/70 shadow-[0_4px_24px_rgba(15,23,42,0.04)] hover:shadow-lg transition-all duration-200 flex flex-col justify-between">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Audit Partisipatif Warga
            </span>
            <div className="w-8 h-8 rounded-full bg-indigo-50 text-[#5E5CE6] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>

          <div>
            <div className="text-3xl font-bold tracking-tight text-slate-900 tabular-nums">
              {stats.totalCitizenReports.toLocaleString('id-ID')} Laporan
            </div>
            <p className="text-xs text-slate-500 font-medium tabular-nums mt-0.5">
              {stats.verifiedReports.toLocaleString('id-ID')} Bukti Terverifikasi ({((stats.verifiedReports / Math.max(1, stats.totalCitizenReports)) * 100).toFixed(1)}%)
            </p>
          </div>

          <div className="flex items-center gap-1 text-xs font-semibold text-indigo-600 pt-1">
            <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            <span>↑ 14.6% partisipasi publik</span>
          </div>
        </div>

        {/* Mini Visual: 3 Mini Cards (Visa/Stripe/PayPal style) + Black Capsule CTA */}
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-2.5">
          <div className="grid grid-cols-3 gap-1.5">
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2 text-center">
              <span className="text-[10px] font-bold text-slate-600 block leading-tight">Lab & IT</span>
              <span className="text-[9px] text-slate-400 font-medium">1,420 lap</span>
            </div>
            <div className="bg-[#5E5CE6] text-white rounded-xl p-2 text-center shadow-md shadow-indigo-500/20">
              <span className="text-[10px] font-bold text-white block leading-tight">Sanitasi</span>
              <span className="text-[9px] text-indigo-100 font-medium">1,680 lap</span>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2 text-center">
              <span className="text-[10px] font-bold text-slate-600 block leading-tight">Dana BOS</span>
              <span className="text-[9px] text-slate-400 font-medium">790 lap</span>
            </div>
          </div>

          <button
            onClick={onFilterAnomaly}
            className="w-full bg-[#14151A] hover:bg-slate-800 text-white rounded-full py-2 px-3 text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3 h-3 text-[#A5B4FC]" />
            <span>Lihat Anomali</span>
          </button>
        </div>
      </div>
    </div>
  );
};
