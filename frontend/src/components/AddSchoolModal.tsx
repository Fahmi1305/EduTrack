import React, { useState } from 'react';
import { X, Building2, Sparkles, PlusCircle } from 'lucide-react';
import { CreateSchoolPayload, SchoolLevel } from '../types/school';
import { DEFAULT_SNP_SUBJECTS } from '../services/api';

interface AddSchoolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateSchool: (payload: CreateSchoolPayload) => Promise<void>;
}

export const AddSchoolModal: React.FC<AddSchoolModalProps> = ({
  isOpen,
  onClose,
  onCreateSchool
}) => {
  const [name, setName] = useState('');
  const [npsn, setNpsn] = useState('');
  const [level, setLevel] = useState<SchoolLevel>('SMA');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('Kota Surabaya');
  const [address, setAddress] = useState('');
  const [bosTotalReceived, setBosTotalReceived] = useState<number>(1450000000);
  const [bosAbsorptionRate, setBosAbsorptionRate] = useState<number>(96.8);
  const [standards, setStandards] = useState<{ subject: string; claimedScore: number }[]>(
    DEFAULT_SNP_SUBJECTS.map((subject) => ({ subject, claimedScore: 92 }))
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const avgClaimed = Number(
    (standards.reduce((sum, s) => sum + s.claimedScore, 0) / standards.length).toFixed(1)
  );

  const handleQuickFillDemo = () => {
    const randSuffix = Math.floor(100 + Math.random() * 899);
    setName('SMAN 10 Surabaya');
    setNpsn(`20532${randSuffix}`);
    setLevel('SMA');
    setDistrict('Jambangan');
    setCity('Kota Surabaya');
    setAddress('Jl. Jemursari I No.28, Jemur Wonosari, Kec. Wonocolo/Jambangan, Surabaya');
    setBosTotalReceived(1620000000);
    setBosAbsorptionRate(97.5);
    setStandards([
      { subject: 'Standar Kelulusan', claimedScore: 95 },
      { subject: 'Standar Isi', claimedScore: 94 },
      { subject: 'Standar Proses', claimedScore: 93 },
      { subject: 'Standar Penilaian', claimedScore: 94 },
      { subject: 'Standar PTK', claimedScore: 91 },
      { subject: 'Standar Sarpras', claimedScore: 95 },
      { subject: 'Standar Pengelolaan', claimedScore: 93 },
      { subject: 'Standar Pembiayaan', claimedScore: 94 }
    ]);
  };

  const handleScoreChange = (idx: number, value: number) => {
    const clamped = Math.max(0, Math.min(100, value));
    setStandards((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, claimedScore: clamped } : item))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !npsn.trim() || !district.trim()) return;

    setIsSubmitting(true);
    try {
      await onCreateSchool({
        name: name.trim(),
        npsn: npsn.trim(),
        level,
        district: district.trim(),
        city: city.trim(),
        address: address.trim(),
        bosTotalReceived: Number(bosTotalReceived) || 1200000000,
        bosAbsorptionRate: Number(bosAbsorptionRate) || 96.5,
        standardsClaimed: standards,
        sourceSystem: 'MANUAL_ADMIN'
      });

      setName('');
      setNpsn('');
      setDistrict('');
      setAddress('');
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-[28px] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-50 border border-indigo-100 text-[#5E5CE6]">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Input Data Satuan Pendidikan Baru
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Registrasi berkas akreditasi sekolah ke antrean pengawasan BAN-PDM Jatim
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleQuickFillDemo}
              className="px-3 py-1.5 rounded-full text-[11px] font-bold bg-indigo-50 hover:bg-indigo-100 text-[#5E5CE6] border border-indigo-200 transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>Isi Contoh Cepat</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[82vh] overflow-y-auto">
          {/* Basic Identity */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Nama Satuan Pendidikan *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: SMAN 10 Surabaya"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-[#5E5CE6] focus:bg-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Nomor NPSN (8 Digit) *
              </label>
              <input
                type="text"
                required
                value={npsn}
                onChange={(e) => setNpsn(e.target.value)}
                placeholder="20532208"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 tabular-nums focus:outline-none focus:border-[#5E5CE6] focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Jenjang Pendidikan *
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as SchoolLevel)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#5E5CE6] cursor-pointer"
              >
                <option value="SD">SD / Sederajat</option>
                <option value="SMP">SMP / Sederajat</option>
                <option value="SMA">SMA / Sederajat</option>
                <option value="SMK">SMK Vokasi</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Kecamatan *
              </label>
              <input
                type="text"
                required
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="Contoh: Gubeng / Waru"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-[#5E5CE6] focus:bg-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Kota / Kabupaten *
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#5E5CE6] cursor-pointer"
              >
                <option value="Kota Surabaya">Kota Surabaya</option>
                <option value="Kab. Sidoarjo">Kab. Sidoarjo</option>
                <option value="Kota Malang">Kota Malang</option>
                <option value="Kab. Gresik">Kab. Gresik</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Alamat Lengkap Sekolah (Opsional)
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Jl. Raya Pendidikan No. 12..."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-[#5E5CE6] focus:bg-white transition-colors"
            />
          </div>

          {/* BOS Budget */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Total Pagu Anggaran Dana BOS (Rp) *
              </label>
              <input
                type="number"
                min={50000000}
                step={10000000}
                required
                value={bosTotalReceived}
                onChange={(e) => setBosTotalReceived(Number(e.target.value))}
                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900 tabular-nums focus:outline-none focus:border-[#5E5CE6]"
              />
              <span className="text-[11px] text-[#5E5CE6] font-semibold tabular-nums mt-1 block">
                Rp {(Number(bosTotalReceived) || 0).toLocaleString('id-ID')}
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Persentase Realisasi Serapan ARKAS (%)
              </label>
              <input
                type="number"
                min={50}
                max={100}
                step={0.1}
                value={bosAbsorptionRate}
                onChange={(e) => setBosAbsorptionRate(Number(e.target.value))}
                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900 tabular-nums focus:outline-none focus:border-[#5E5CE6]"
              />
              <span className="text-[11px] text-emerald-600 font-semibold tabular-nums mt-1 block">
                Terserap: Rp{' '}
                {Math.round((Number(bosTotalReceived) || 0) * ((Number(bosAbsorptionRate) || 0) / 100)).toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          {/* 8 Standar Nasional Pendidikan (SNP) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                  Skor Klaim Mandiri 8 Standar Nasional Pendidikan (SISPENA)
                </h4>
                <p className="text-[11px] text-slate-500">
                  Nilai evaluasi diri sekolah (0–100) yang akan diuji terhadap audit lapangan warga
                </p>
              </div>
              <div className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-extrabold text-[#5E5CE6] tabular-nums">
                Rata-rata Klaim: {avgClaimed}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {standards.map((std, idx) => (
                <div
                  key={std.subject}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3"
                >
                  <span className="text-xs font-semibold text-slate-700 truncate">
                    {idx + 1}. {std.subject}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <input
                      type="range"
                      min={50}
                      max={100}
                      value={std.claimedScore}
                      onChange={(e) => handleScoreChange(idx, Number(e.target.value))}
                      className="w-20 accent-[#5E5CE6] cursor-pointer"
                    />
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={std.claimedScore}
                      onChange={(e) => handleScoreChange(idx, Number(e.target.value))}
                      className="w-14 px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-center text-slate-900 tabular-nums focus:outline-none focus:border-[#5E5CE6]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer CTA */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !name.trim() || !npsn.trim() || !district.trim()}
              className={`px-6 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all ${
                !isSubmitting && name.trim() && npsn.trim() && district.trim()
                  ? 'bg-[#5E5CE6] hover:bg-[#4B49C8] text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>{isSubmitting ? 'Menyimpan...' : 'Simpan & Publikasikan Sekolah'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

