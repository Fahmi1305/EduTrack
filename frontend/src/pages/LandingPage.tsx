import React, { useState } from 'react';
import {
  Search,
  ShieldCheck,
  AlertOctagon,
  Users,
  Building2,
  Calendar,
  ArrowRight,
  Sparkles,
  Camera,
  CheckCircle,
  FileWarning,
  Eye,
  TrendingDown,
  Layers,
  Award
} from 'lucide-react';
import { School, TransparencyStats } from '../types/school';

interface LandingPageProps {
  stats: TransparencyStats;
  schools: School[];
  onNavigateToExplore: (filters?: {
    search?: string;
    level?: string;
    sla?: string;
    aiRisk?: string;
    visitation?: boolean;
    selectedSchoolId?: string;
  }) => void;
  onOpenReportModal: (defaultSchoolId?: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  stats,
  schools,
  onNavigateToExplore,
  onOpenReportModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [previewTab, setPreviewTab] = useState<'claim' | 'reality' | 'ai'>('ai');

  const upcomingVisitationSchools = schools
    .filter((s) => Boolean(s.scheduledVisitationDate))
    .slice(0, 3);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigateToExplore({ search: searchQuery });
  };

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Hero Section & Interactive Quick Search */}
      <section className="relative pt-12 lg:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Glow ambient background effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[320px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>

        {/* Top Mini Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-6 shadow-glow-cyan">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>MIA 2026: Designing Digital Futures — Powering Public Transparency</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-100 max-w-4xl mx-auto leading-tight">
          Kawal Mutu Sekolah, Pantau Akreditasi{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent underline decoration-cyan-500/40 decoration-wavy">
            Tanpa Manipulasi.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-sm sm:text-base text-slate-300/90 max-w-2xl mx-auto leading-relaxed">
          Platform audit keterbukaan sekolah pertama di Indonesia. Melacak kepatuhan SLA proses akreditasi BAN-PDM secara real-time, mengkorelasikan serapan dana BOS dengan fakta mutu, dan memberdayakan warga menangkal &ldquo;kosmetik akreditasi&rdquo;.
        </p>

        {/* Interactive Search Bar */}
        <div className="mt-8 max-w-2xl mx-auto">
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex items-center bg-[#0F1626]/90 border border-slate-700/80 rounded-2xl p-2 shadow-2xl focus-within:border-cyan-500/80 focus-within:ring-2 focus-within:ring-cyan-500/20 transition-all"
          >
            <div className="pl-3 pr-2 text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama sekolah, NPSN, atau kecamatan (Surabaya, Sidoarjo, Waru)..."
              className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 hover:from-cyan-300 hover:to-emerald-300 transition-all shrink-0 flex items-center gap-1.5"
            >
              <span>Pantau Sekarang</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick Filter Tags */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-400 text-[11px] font-mono">Pencarian Cepat:</span>
            
            <button
              onClick={() => onNavigateToExplore({ level: 'SMA', search: 'Surabaya' })}
              className="px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-cyan-300 border border-slate-800 hover:border-cyan-500/40 transition-colors"
            >
              &ldquo;Cek SMA Surabaya&rdquo;
            </button>

            <button
              onClick={() => onNavigateToExplore({ sla: 'overdue' })}
              className="px-2.5 py-1 rounded-lg bg-rose-950/40 hover:bg-rose-950/60 text-rose-300 border border-rose-800/60 transition-colors flex items-center gap-1"
            >
              <AlertOctagon className="w-3 h-3 text-rose-400" />
              <span>&ldquo;Status SLA Overdue&rdquo;</span>
            </button>

            <button
              onClick={() => onNavigateToExplore({ visitation: true })}
              className="px-2.5 py-1 rounded-lg bg-amber-950/40 hover:bg-amber-950/60 text-amber-300 border border-amber-800/60 transition-colors flex items-center gap-1"
            >
              <Calendar className="w-3 h-3 text-amber-400" />
              <span>&ldquo;Jadwal Visitasi Minggu Ini&rdquo;</span>
            </button>

            <button
              onClick={() => onNavigateToExplore({ aiRisk: 'high_discrepancy' })}
              className="px-2.5 py-1 rounded-lg bg-cyan-950/50 hover:bg-cyan-900/50 text-cyan-300 border border-cyan-800/60 transition-colors"
            >
              &ldquo;Anomali Dana BOS&rdquo;
            </button>
          </div>
        </div>
      </section>

      {/* 2. Live Transparency Metric Cards (3 Hero KPI Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Total Sekolah */}
          <div className="glass-card p-6 rounded-2xl border-slate-800/80 relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-800/60 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                API Sync Aktif
              </span>
            </div>
            <div className="space-y-1">
              <div className="text-3xl lg:text-4xl font-extrabold text-slate-100 font-mono tracking-tight">
                {stats.totalSchoolsTracked.toLocaleString('id-ID')}
              </div>
              <p className="text-sm font-semibold text-slate-300">Sekolah Terpantau Real-time</p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sinkronisasi otomatis dengan Sispena BAN-PDM & Dapodik Kemendikdasmen Jawa Timur.
              </p>
            </div>
          </div>

          {/* Card 2: SLA Bottleneck */}
          <div className="glass-card p-6 rounded-2xl border-slate-800/80 relative overflow-hidden group hover:border-rose-500/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <AlertOctagon className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono text-rose-300 bg-rose-950/60 px-2.5 py-0.5 rounded-full border border-rose-800/60 font-bold">
                Bottleneck Alert
              </span>
            </div>
            <div className="space-y-1">
              <div className="text-3xl lg:text-4xl font-extrabold text-rose-400 font-mono tracking-tight flex items-baseline gap-2">
                <span>{stats.overduePercentage}%</span>
                <span className="text-xs font-normal text-slate-400 font-sans">
                  ({stats.overdueCount} Sekolah)
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-300">Berkas Melewati Batas SLA</p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tertahan lebih dari 14 hari di tahap Verifikasi Provinsi atau Penugasan Tim Asesor.
              </p>
            </div>
          </div>

          {/* Card 3: Crowdsourced Audit Ledger */}
          <div className="glass-card p-6 rounded-2xl border-slate-800/80 relative overflow-hidden group hover:border-emerald-500/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/60 px-2.5 py-0.5 rounded-full border border-cyan-800/60 font-bold">
                Warga Terlibat Aktif
              </span>
            </div>
            <div className="space-y-1">
              <div className="text-3xl lg:text-4xl font-extrabold text-emerald-400 font-mono tracking-tight">
                {stats.totalCitizenReports.toLocaleString('id-ID')}
              </div>
              <p className="text-sm font-semibold text-slate-300">Bukti Fisik Terverifikasi Warga</p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Foto kondisi toilet, lab komputer, dan transparansi BOS yang lolos verifikasi AI Vision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Upcoming Visitation Notice Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900/80 to-[#0F1626] border border-amber-800/60 shadow-xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold">
                <Calendar className="w-3.5 h-3.5" />
                <span>Jadwal Visitasi Asesor 7 Hari Ke Depan</span>
              </div>
              <h3 className="text-lg font-bold text-slate-100">
                Wali Murid & Siswa: Unggah Bukti Fisik Sebelum Asesor Datang!
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Asesor BAN-PDM akan melakukan uji petik lapangan. Foto jujur dari warga akan dimasukkan langsung ke dalam <strong>AI Field-Assessor Brief</strong> sebagai panduan investigasi wajib.
              </p>
            </div>

            {/* School Badges */}
            <div className="flex flex-col sm:flex-row gap-3">
              {upcomingVisitationSchools.map((school) => (
                <div
                  key={school.id}
                  onClick={() => onNavigateToExplore({ selectedSchoolId: school.id })}
                  className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-amber-500/60 transition-all cursor-pointer text-left space-y-1 min-w-[200px]"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-amber-400">
                    <span>Visitasi: {school.scheduledVisitationDate}</span>
                    <span className="px-1.5 py-0.2 rounded bg-amber-950 text-amber-300">
                      {school.level}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-100 truncate">
                    {school.name}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {school.city} • {school.citizenReports.length} Laporan Warga
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onOpenReportModal()}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors shrink-0 flex items-center justify-center gap-2"
            >
              <Camera className="w-4 h-4" />
              <span>+ Unggah Bukti Sekarang</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. Interactive Preview Section ("Reality Check: Klaim Dokumen vs Bukti Warga") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/80 text-cyan-400 text-xs font-semibold">
            <Eye className="w-3.5 h-3.5" />
            <span>Simulasi Deteksi Dini Kosmetik Akreditasi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
            Reality Check: Dokumen Sispena vs Foto Lapangan Warga
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Lihat bagaimana Edu Track menangkap manipulasi penilaian akreditasi pada studi kasus riil (Contoh: SMAN X Waru).
          </p>
        </div>

        {/* Interactive Comparison Card */}
        <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
          {/* Tab selector */}
          <div className="grid grid-cols-3 border-b border-slate-800 bg-slate-900/60 p-2 gap-2 text-xs font-semibold">
            <button
              onClick={() => setPreviewTab('claim')}
              className={`py-2 px-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
                previewTab === 'claim'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>1. Klaim Dokumen Sekolah</span>
            </button>

            <button
              onClick={() => setPreviewTab('reality')}
              className={`py-2 px-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
                previewTab === 'reality'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>2. Temuan Lapangan Warga (19 Foto)</span>
            </button>

            <button
              onClick={() => setPreviewTab('ai')}
              className={`py-2 px-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
                previewTab === 'ai'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>3. AI Field-Assessor Brief</span>
            </button>
          </div>

          {/* Tab Content Display */}
          <div className="p-6">
            {previewTab === 'claim' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-mono px-2.5 py-1 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-800">
                    <span>Dokumen Sispena Diajukan: SMAN X Waru</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-100">
                    &ldquo;Laboratorium Komputer & Sarana Pembelajaran Siap 96%&rdquo;
                  </h3>
                  <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                    <p>
                      • Sekolah melaporkan memiliki <strong>60 unit PC Core-i7</strong> dengan koneksi fiber optic 100 Mbps.
                    </p>
                    <p>
                      • Realisasi penyerapan dana BOS tahun anggaran berjalan mencapai <strong>Rp 1,42 Miliar (97.9%)</strong>, dengan porsi belanja Sarpras sebesar <strong>Rp 780 Juta</strong>.
                    </p>
                    <p>
                      • Dokumen portofolio dilengkapi dengan foto ruangan ber-AC rapi yang diambil dari satu sudut saat peresmian.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Skor Evaluasi Diri Sekolah:</span>
                    <span className="font-mono font-extrabold text-cyan-400 text-sm">96.4 / 100</span>
                  </div>
                </div>

                <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 p-4 relative">
                  <div className="text-[11px] font-mono text-cyan-400 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Foto Brosur / Lampiran Formal Sispena</span>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80"
                    alt="Klaim Dokumen Lab"
                    className="w-full h-52 object-cover rounded-lg filter brightness-95"
                  />
                  <div className="mt-2 text-[11px] text-slate-400 text-center">
                    Foto formal yang diajukan ke portal akreditasi
                  </div>
                </div>
              </div>
            )}

            {previewTab === 'reality' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-mono px-2.5 py-1 rounded-lg bg-rose-950 text-rose-300 border border-rose-800">
                    <FileWarning className="w-3.5 h-3.5" />
                    <span>Laporan Warga: 19 Bukti Foto Geotagging Valid</span>
                  </div>
                  <h3 className="text-lg font-bold text-rose-300">
                    Fakta Riil: 35 PC Mati, Atap Bocor & Toilet Mampet
                  </h3>
                  <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                    <p>
                      • Laporan siswa aktif: <em>&ldquo;Dari 40 komputer di Lab 2, cuma 8 yang bisa dipakai. Kalau hujan ember ditaruh di atas meja karena atap bocor.&rdquo;</em> (114 Upvotes).
                    </p>
                    <p>
                      • Laporan wali murid: <em>&ldquo;Toilet siswa mampet dan tidak ada air kran mengalir sejak Agustus. Anak saya harus menahan sampai pulang.&rdquo;</em> (98 Upvotes).
                    </p>
                    <p>
                      • Komite sekolah: Tidak pernah dilibatkan dalam SPJ belanja BOS Sarpras senilai Rp 780 Juta.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800 flex items-center justify-between text-xs">
                    <span className="text-rose-300">Skor Mutu Fisik Riil Warga:</span>
                    <span className="font-mono font-extrabold text-rose-400 text-sm">61.2 / 100 (-35.2 Poin)</span>
                  </div>
                </div>

                <div className="rounded-xl overflow-hidden border border-rose-800/60 bg-slate-950 p-4 relative">
                  <div className="text-[11px] font-mono text-rose-400 mb-2 flex items-center gap-2">
                    <AlertOctagon className="w-3.5 h-3.5" />
                    <span>Bukti Foto Warga Terverifikasi AI Vision</span>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80"
                    alt="Kenyataan Lab Komputer"
                    className="w-full h-52 object-cover rounded-lg"
                  />
                  <div className="mt-2 text-[11px] text-rose-300/80 text-center font-mono">
                    Geotag Sidoarjo • Diambil 27 Okt 2026 • Status: Terverifikasi
                  </div>
                </div>
              </div>
            )}

            {previewTab === 'ai' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-900 border border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/30">
                      <Sparkles className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                        AI Discrepancy Alert: Anomali Kosmetik Akreditasi Terdeteksi
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800">
                          Gap: 41.2%
                        </span>
                      </h4>
                      <p className="text-xs text-slate-400">
                        Disinkronkan otomatis ke tablet asesor menjelang visitasi 6 November 2026.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigateToExplore({ selectedSchoolId: 'sch-009' })}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors shrink-0 flex items-center gap-1.5"
                  >
                    <span>Inspeksi SMAN X Waru di Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">
                      Fokus Investigasi 1
                    </span>
                    <h5 className="text-xs font-bold text-slate-200">
                      Uji Petik Nomor Seri Faktur PC BOS
                    </h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Asesor wajib mencocokkan nomor seri 60 PC faktur BOS 2025 dengan unit riil di Laboratorium Komputer B.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-rose-400 font-bold">
                      Fokus Investigasi 2
                    </span>
                    <h5 className="text-xs font-bold text-slate-200">
                      Inspeksi Fisik Sanitasi & Septictank
                    </h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Pengujian langsung debit air, kebersihan kloset, dan saluran pipa di 6 bilik toilet siswa sayap timur.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">
                      Fokus Investigasi 3
                    </span>
                    <h5 className="text-xs font-bold text-slate-200">
                      Verifikasi Buku Kurikulum Fisik
                    </h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Validasi keberadaan buku teks cetak senilai Rp 120 Juta yang dilaporkan terserap di LPJ triwulan II.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. Sub-tema MIA 2026 Innovation Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-[#0F1626]/70 border border-slate-800 space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              Arsitektur Solusi
            </span>
            <h3 className="text-2xl font-bold text-slate-100">
              4 Pilar Transparansi Edu Track untuk MIA 2026
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2.5">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 w-fit">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-100">1. Open Data Multi-Sumber</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Menyatukan Sispena BAN-PDM, Dapodik, RKAS BOS Kemendikdasmen, dan laporan warga dalam satu kanal terbuka.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2.5">
              <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 w-fit">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-100">2. AI Discrepancy Engine</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Mendeteksi anomali antara klaim dokumen akreditasi dan bukti visual masyarakat menggunakan computer vision & NLP.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2.5">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 w-fit">
                <AlertOctagon className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-100">3. SLA Bottleneck Tracker</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Memetakan keterlambatan birokrasi per tahap secara transparan agar dinas tidak menumpuk berkas akreditasi.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2.5">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-100">4. Crowdsourced Reality Check</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Mekanisme partisipasi aktif wali murid dan siswa dengan audit ledger terdesentralisasi dan perlindungan pelapor.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

