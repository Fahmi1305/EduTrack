import React from 'react';
import { Sparkles, Search, AlertOctagon, Calendar, AlertTriangle, Building2, CheckCircle2 } from 'lucide-react';

interface ExecutiveHeaderProps {
  onQuickFilter: (filter: { level?: string; sla?: string; aiRisk?: string; visitation?: boolean; search?: string }) => void;
  activeFilterLabel?: string;
  onClearFilters: () => void;
}

export const ExecutiveHeader: React.FC<ExecutiveHeaderProps> = ({
  onQuickFilter,
  activeFilterLabel,
  onClearFilters
}) => {
  return (
    <div className="space-y-5 pt-2">
      {/* Top Banner Content (Clean Light Editorial FINNOVA style) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#5E5CE6]" />
            <span>MIA 2026: Designing Digital Futures — Powering Public Transparency</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Public Accreditation & School Audit Overview
          </h1>
          <p className="text-sm text-slate-500 max-w-3xl leading-relaxed">
            Platform analitik transparansi pemantauan kepatuhan SLA akreditasi BAN-PDM, deteksi anomali serapan dana BOS Kemendikdasmen, dan ledger audit partisipatif warga.
          </p>
        </div>

        {/* Live Status Pill */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-white border border-slate-200/80 px-4 py-3 rounded-2xl shadow-sm text-right">
            <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider block">
              Ledger Audit Publik
            </span>
            <div className="flex items-center justify-end gap-1.5 tabular-nums text-sm font-bold text-emerald-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>100% Aktif & Terverifikasi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Filter Pills Row (Persis FINNOVA) */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          <span className="text-slate-400 font-semibold mr-1 flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-[#5E5CE6]" />
            <span>Pencarian Cepat:</span>
          </span>

          <button
            onClick={() => onQuickFilter({ level: 'SMA', search: 'Surabaya' })}
            className="px-4 py-2 rounded-full bg-white border border-slate-200/90 hover:border-[#5E5CE6] text-slate-700 hover:text-[#5E5CE6] shadow-sm font-semibold transition-all flex items-center gap-1.5"
          >
            <Building2 className="w-3.5 h-3.5 text-[#5E5CE6]" />
            <span>&ldquo;Cek SMA Surabaya&rdquo;</span>
          </button>

          <button
            onClick={() => onQuickFilter({ sla: 'overdue' })}
            className="px-4 py-2 rounded-full bg-white border border-slate-200/90 hover:border-rose-400 text-slate-700 hover:text-rose-600 shadow-sm font-semibold transition-all flex items-center gap-1.5"
          >
            <AlertOctagon className="w-3.5 h-3.5 text-rose-500" />
            <span>&ldquo;Status SLA Overdue&rdquo;</span>
          </button>

          <button
            onClick={() => onQuickFilter({ visitation: true })}
            className="px-4 py-2 rounded-full bg-white border border-slate-200/90 hover:border-amber-400 text-slate-700 hover:text-amber-600 shadow-sm font-semibold transition-all flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-500" />
            <span>&ldquo;Jadwal Visitasi Minggu Ini&rdquo;</span>
          </button>

          <button
            onClick={() => onQuickFilter({ aiRisk: 'high_discrepancy' })}
            className="px-4 py-2 rounded-full bg-white border border-slate-200/90 hover:border-[#5E5CE6] text-slate-700 hover:text-[#5E5CE6] shadow-sm font-semibold transition-all flex items-center gap-1.5"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-[#5E5CE6]" />
            <span>&ldquo;Anomali Dana BOS&rdquo;</span>
          </button>
        </div>

        {activeFilterLabel && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#5E5CE6] bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-200">
              Filter aktif: {activeFilterLabel}
            </span>
            <button
              onClick={onClearFilters}
              className="text-xs text-slate-500 hover:text-slate-800 underline font-medium"
            >
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
