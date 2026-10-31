import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  AlertOctagon,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Sparkles,
  Camera,
  ThumbsUp,
  ExternalLink,
  ChevronRight,
  TrendingDown,
  Building2,
  Calendar,
  Layers,
  ArrowUpDown,
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { School, SchoolLevel, SlaStatus, AiRiskLevel } from '../types/school';
import { SlaStepper } from '../components/SlaStepper';
import { RadarStandardsChart } from '../components/RadarStandardsChart';
import { BosCorrelationChart } from '../components/BosCorrelationChart';

interface ExplorePageProps {
  schools: School[];
  selectedSchool: School;
  onSelectSchool: (school: School) => void;
  onOpenReportModal: (defaultSchoolId?: string) => void;
  onUpvoteReport: (schoolId: string, reportId: string) => void;
  compareList: School[];
  onToggleCompare: (school: School) => void;
  onOpenCompareModal: () => void;
  initialFilters?: {
    search?: string;
    level?: string;
    sla?: string;
    aiRisk?: string;
    visitation?: boolean;
  };
}

export const ExplorePage: React.FC<ExplorePageProps> = ({
  schools,
  selectedSchool,
  onSelectSchool,
  onOpenReportModal,
  onUpvoteReport,
  compareList,
  onToggleCompare,
  onOpenCompareModal,
  initialFilters
}) => {
  // Filters State
  const [searchTerm, setSearchTerm] = useState(initialFilters?.search || '');
  const [levelFilter, setLevelFilter] = useState<string>(initialFilters?.level || 'ALL');
  const [slaFilter, setSlaFilter] = useState<string>(initialFilters?.sla || 'ALL');
  const [aiRiskFilter, setAiRiskFilter] = useState<string>(initialFilters?.aiRisk || 'ALL');
  const [showMacroChart, setShowMacroChart] = useState(true);

  // Sync initial filters if navigated with quick search tags
  React.useEffect(() => {
    if (initialFilters?.search !== undefined) setSearchTerm(initialFilters.search);
    if (initialFilters?.level !== undefined) setLevelFilter(initialFilters.level);
    if (initialFilters?.sla !== undefined) setSlaFilter(initialFilters.sla);
    if (initialFilters?.aiRisk !== undefined) setAiRiskFilter(initialFilters.aiRisk);
  }, [initialFilters]);

  // Filtered Schools Logic
  const filteredSchools = useMemo(() => {
    return schools.filter((school) => {
      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchName = school.name.toLowerCase().includes(query);
        const matchNpsn = school.npsn.includes(query);
        const matchDistrict = school.district.toLowerCase().includes(query);
        const matchCity = school.city.toLowerCase().includes(query);
        if (!matchName && !matchNpsn && !matchDistrict && !matchCity) return false;
      }

      // Level
      if (levelFilter !== 'ALL' && school.level !== levelFilter) return false;

      // SLA
      if (slaFilter === 'overdue' && school.slaStatus !== 'overdue') return false;
      if (slaFilter === 'on_track' && school.slaStatus !== 'on_track') return false;

      // AI Risk
      if (aiRiskFilter === 'high_discrepancy' && school.aiRiskLevel !== 'high_discrepancy') return false;
      if (aiRiskFilter === 'bottleneck' && school.aiRiskLevel !== 'bottleneck') return false;
      if (aiRiskFilter === 'verified' && school.aiRiskLevel !== 'verified') return false;

      // Visitation Filter
      if (initialFilters?.visitation && !school.scheduledVisitationDate) return false;

      return true;
    });
  }, [schools, searchTerm, levelFilter, slaFilter, aiRiskFilter, initialFilters]);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const isCompared = (schoolId: string) => {
    return compareList.some((s) => s.id === schoolId);
  };

  return (
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* 1. Top Macro Insights Bar (Collapsible Matrix & Quick Filters) */}
      <section className="space-y-3">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-[#0F1626]/80 border border-slate-800 p-4 rounded-2xl shadow-xl">
          {/* Left Title & Counter */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-100 flex items-center gap-2">
                Direktori Audit Akuntabilitas Sekolah
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">
                  {filteredSchools.length} Sekolah Ditampilkan
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Pilih sekolah di panel kiri untuk membuka Live SLA Stepper, AI Assessor Brief, dan Radar 8 SNP di panel kanan.
              </p>
            </div>
          </div>

          {/* Right Toggle Chart Button */}
          <div className="flex items-center gap-2 self-start xl:self-auto">
            <button
              onClick={() => setShowMacroChart(!showMacroChart)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-700 hover:border-cyan-500 text-slate-300 hover:text-cyan-300 transition-colors flex items-center gap-2"
            >
              <span>{showMacroChart ? 'Sembunyikan Matrix BOS' : 'Tampilkan Matrix BOS'}</span>
              {showMacroChart ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {compareList.length > 0 && (
              <button
                onClick={onOpenCompareModal}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-all shadow-glow-cyan flex items-center gap-1.5"
              >
                <Scale className="w-4 h-4" />
                <span>Bandingkan ({compareList.length}/2)</span>
              </button>
            )}
          </div>
        </div>

        {/* Collapsible Macro Matrix Chart */}
        {showMacroChart && (
          <BosCorrelationChart
            schools={schools}
            onSelectSchool={(s) => onSelectSchool(s)}
          />
        )}

        {/* Quick Filters Toolbar */}
        <div className="glass-panel p-3.5 rounded-2xl border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[260px] max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari nama, NPSN, atau kecamatan..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Jenjang Filter */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <span className="text-[11px] font-mono text-slate-400 px-2">Jenjang:</span>
            {['ALL', 'SD', 'SMP', 'SMA', 'SMK'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevelFilter(lvl)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  levelFilter === lvl
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lvl === 'ALL' ? 'Semua' : lvl}
              </button>
            ))}
          </div>

          {/* Status SLA Filter */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <span className="text-[11px] font-mono text-slate-400 px-2">Kepatuhan SLA:</span>
            <button
              onClick={() => setSlaFilter('ALL')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                slaFilter === 'ALL'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setSlaFilter('on_track')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                slaFilter === 'on_track'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              On-Track
            </button>
            <button
              onClick={() => setSlaFilter('overdue')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                slaFilter === 'overdue'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Overdue
            </button>
          </div>

          {/* AI Risk Filter */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <span className="text-[11px] font-mono text-slate-400 px-2">Status AI:</span>
            <button
              onClick={() => setAiRiskFilter('ALL')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                aiRiskFilter === 'ALL'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setAiRiskFilter('verified')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                aiRiskFilter === 'verified'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Terverifikasi
            </button>
            <button
              onClick={() => setAiRiskFilter('bottleneck')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                aiRiskFilter === 'bottleneck'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Bottleneck
            </button>
            <button
              onClick={() => setAiRiskFilter('high_discrepancy')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                aiRiskFilter === 'high_discrepancy'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Diskrepansi Tinggi
            </button>
          </div>
        </div>
      </section>

      {/* 2. Desktop 60/40 Master-Detail Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ================= LEFT PANEL (60% Width - School Directory & Audit Table) ================= */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
            {/* Table Header */}
            <div className="p-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300 uppercase tracking-wider font-mono">
                Daftar Sekolah & Status Akreditasi
              </span>
              <span className="text-[11px] text-slate-400">
                Klik baris untuk membuka detail inspeksi
              </span>
            </div>

            {/* School Items Table / Cards */}
            <div className="divide-y divide-slate-800/80 max-h-[1100px] overflow-y-auto">
              {filteredSchools.length === 0 ? (
                <div className="p-12 text-center text-slate-400 space-y-2">
                  <Search className="w-8 h-8 text-slate-600 mx-auto" />
                  <p className="text-sm font-semibold">Tidak ada sekolah yang cocok dengan filter.</p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setLevelFilter('ALL');
                      setSlaFilter('ALL');
                      setAiRiskFilter('ALL');
                    }}
                    className="text-xs text-cyan-400 underline"
                  >
                    Reset Semua Filter
                  </button>
                </div>
              ) : (
                filteredSchools.map((school) => {
                  const isSelected = selectedSchool?.id === school.id;
                  const compared = isCompared(school.id);

                  return (
                    <div
                      key={school.id}
                      onClick={() => onSelectSchool(school)}
                      className={`p-4 transition-all duration-150 cursor-pointer relative group ${
                        isSelected
                          ? 'bg-slate-800/90 border-l-4 border-l-cyan-400 shadow-lg'
                          : 'hover:bg-slate-900/60'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        {/* Compare Checkbox & School Info */}
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          {/* Checkbox for Compare */}
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleCompare(school);
                            }}
                            className="pt-1"
                            title="Pilih untuk bandingkan sekolah"
                          >
                            <input
                              type="checkbox"
                              checked={compared}
                              onChange={() => {}}
                              className="w-4 h-4 rounded border-slate-700 text-cyan-500 focus:ring-0 cursor-pointer"
                            />
                          </div>

                          <div className="space-y-1 min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-extrabold text-slate-100 group-hover:text-cyan-300 transition-colors truncate">
                                {school.name}
                              </span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                                NPSN: {school.npsn}
                              </span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-400">
                                {school.level}
                              </span>
                              {school.scheduledVisitationDate && (
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  <span>Visitasi: {school.scheduledVisitationDate}</span>
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-slate-400 truncate">
                              {school.address}
                            </p>

                            {/* Stage & SLA Info */}
                            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                              {/* Stage pill */}
                              <span className="text-[11px] font-mono text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                                Tahap {school.currentStageNumber}/5:{' '}
                                {school.stageDetails[school.currentStageNumber - 1]?.name || 'Pleno'}
                              </span>

                              {/* SLA Badge */}
                              <span
                                className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                                  school.slaStatus === 'on_track'
                                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                                    : 'bg-rose-950/80 text-rose-300 border border-rose-800'
                                }`}
                              >
                                {school.slaStatus === 'on_track' ? (
                                  <>
                                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                    <span>On-Track: SLA Terjaga</span>
                                  </>
                                ) : (
                                  <>
                                    <AlertOctagon className="w-3 h-3 text-rose-400" />
                                    <span>Overdue: {school.slaDaysDifference} Hari</span>
                                  </>
                                )}
                              </span>

                              {/* AI Risk Alert Badge */}
                              <span
                                className={`text-[11px] font-semibold px-2 py-0.5 rounded flex items-center gap-1 ${
                                  school.aiRiskLevel === 'verified'
                                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                    : school.aiRiskLevel === 'bottleneck'
                                    ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                    : 'bg-rose-950 text-rose-300 border border-rose-800'
                                }`}
                              >
                                <Sparkles className="w-3 h-3" />
                                <span>{school.aiAssessorBrief.riskBadge}</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right Scores & BOS */}
                        <div className="text-right shrink-0 space-y-1">
                          <div className="flex items-baseline justify-end gap-1.5 font-mono">
                            <span className="text-xs text-slate-500">Skor Riil:</span>
                            <span
                              className={`text-base font-extrabold ${
                                school.verifiedScore >= 80 ? 'text-emerald-400' : 'text-rose-400'
                              }`}
                            >
                              {school.verifiedScore}
                            </span>
                            <span className="text-slate-500 text-xs">/ {school.claimedScore}</span>
                          </div>

                          <div className="text-[11px] text-slate-400">
                            BOS: <span className="font-mono text-slate-200">{formatRupiah(school.bosBudget.absorbed)}</span>
                          </div>

                          <div className="text-[10px] text-cyan-400 font-mono">
                            {school.citizenReports.length} Laporan Warga
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* ================= RIGHT PANEL (40% Width - Sticky Detail & AI Inspector) ================= */}
        <div className="lg:col-span-5 sticky top-20 space-y-5">
          {selectedSchool ? (
            <div className="glass-card rounded-2xl border border-slate-800 p-5 shadow-2xl space-y-5 max-h-[calc(100vh-6rem)] overflow-y-auto">
              {/* 1. School Header & Quick Actions */}
              <div className="border-b border-slate-800 pb-4 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                        NPSN: {selectedSchool.npsn}
                      </span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        Jenjang {selectedSchool.level}
                      </span>
                      <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                        Akreditasi: {selectedSchool.accreditationGrade}
                      </span>
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-100 mt-1">
                      {selectedSchool.name}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {selectedSchool.address}
                    </p>
                  </div>

                  {/* Compare toggle */}
                  <button
                    onClick={() => onToggleCompare(selectedSchool)}
                    className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                      isCompared(selectedSchool.id)
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                        : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-slate-200'
                    }`}
                    title="Bandingkan sekolah ini"
                  >
                    <Scale className="w-4 h-4" />
                  </button>
                </div>

                {/* Score Summary Box */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                  <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Klaim Sispena</span>
                    <span className="text-sm font-extrabold font-mono text-cyan-400">
                      {selectedSchool.claimedScore}
                    </span>
                  </div>

                  <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Validasi Publik</span>
                    <span
                      className={`text-sm font-extrabold font-mono ${
                        selectedSchool.verifiedScore >= 80 ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {selectedSchool.verifiedScore}
                    </span>
                  </div>

                  <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Gap Mutu</span>
                    <span
                      className={`text-sm font-extrabold font-mono ${
                        selectedSchool.aiAssessorBrief.discrepancyRate > 10
                          ? 'text-rose-400'
                          : 'text-emerald-400'
                      }`}
                    >
                      {selectedSchool.aiAssessorBrief.discrepancyRate}%
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. Live SLA Stepper */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <SlaStepper
                  stages={selectedSchool.stageDetails}
                  currentStageNumber={selectedSchool.currentStageNumber}
                />
              </div>

              {/* 3. AI Field-Assessor Brief & Anomaly Box */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 via-[#0F1626] to-slate-900 border border-cyan-500/30 shadow-glow-cyan space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
                    <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider font-mono">
                      AI Field-Assessor Briefing
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                    GenAI Kemendikdasmen
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                  {selectedSchool.aiAssessorBrief.summary}
                </p>

                {/* 3 Mandatory Focus Inspections */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wide block">
                    3 Fokus Investigasi Lapangan Wajib bagi Asesor:
                  </span>
                  <div className="space-y-1.5">
                    {selectedSchool.aiAssessorBrief.mandatoryInvestigationFocus.map((focus, i) => (
                      <div
                        key={i}
                        className="text-xs text-slate-300 p-2 rounded-lg bg-slate-900/90 border border-slate-800 flex items-start gap-2"
                      >
                        <span className="w-4 h-4 rounded bg-cyan-500/20 text-cyan-400 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="leading-snug">{focus}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Flags tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedSchool.aiAssessorBrief.flags.map((flag, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700"
                    >
                      #{flag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 4. Radar Chart (8 Standar Nasional Pendidikan) */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <span>Radar 8 Standar Nasional Pendidikan (SNP)</span>
                  </h4>
                  <span className="text-[10px] text-slate-400">
                    Klaim vs Validasi
                  </span>
                </div>

                <RadarStandardsChart
                  data={selectedSchool.radarStandards}
                  isHighDiscrepancy={selectedSchool.aiRiskLevel === 'high_discrepancy'}
                />
              </div>

              {/* 5. Crowdsourced Reality Check Ledger & Action CTA */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                      <Camera className="w-4 h-4 text-emerald-400" />
                      <span>Ledger Bukti Fisik Warga ({selectedSchool.citizenReports.length})</span>
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Audit partisipatif tervalidasi oleh sistem
                    </p>
                  </div>

                  <button
                    onClick={() => onOpenReportModal(selectedSchool.id)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors shadow-sm flex items-center gap-1"
                  >
                    <span>+ Lapor Bukti</span>
                  </button>
                </div>

                {/* Citizen Reports List */}
                <div className="space-y-2.5 pt-1">
                  {selectedSchool.citizenReports.map((report) => (
                    <div
                      key={report.id}
                      className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-200">
                            {report.author}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-cyan-300">
                            {report.authorRole}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">
                          {report.date}
                        </span>
                      </div>

                      <div className="inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                        Fasilitas: {report.facilityTag}
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {report.text}
                      </p>

                      {report.photoUrl && (
                        <div className="rounded-lg overflow-hidden border border-slate-800 max-h-36">
                          <img
                            src={report.photoUrl}
                            alt="Bukti Warga"
                            className="w-full h-36 object-cover hover:scale-105 transition-transform"
                          />
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-1 border-t border-slate-900 text-xs">
                        <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Terverifikasi Geotag</span>
                        </span>

                        <button
                          onClick={() => onUpvoteReport(selectedSchool.id, report.id)}
                          className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-cyan-300 transition-colors"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>Dukung Temuan ({report.upvotes})</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card rounded-2xl border border-slate-800 p-12 text-center text-slate-400 space-y-3">
              <Building2 className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-sm font-semibold">Pilih sekolah di panel kiri</p>
              <p className="text-xs text-slate-500">
                Data SLA, AI Briefing, dan Radar Standar akan muncul secara instan.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

