import React, { useState } from 'react';
import { X, Camera, CheckCircle, ShieldAlert, UploadCloud, Send } from 'lucide-react';
import { School, FacilityTag } from '../types/school';

interface SubmitReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  schools: School[];
  defaultSchoolId?: string;
  onSubmitSuccess: (schoolId: string, newReport: any) => void;
}

export const SubmitReportModal: React.FC<SubmitReportModalProps> = ({
  isOpen,
  onClose,
  schools,
  defaultSchoolId,
  onSubmitSuccess
}) => {
  const [selectedSchoolId, setSelectedSchoolId] = useState<string>(
    defaultSchoolId || (schools.length > 0 ? schools[0].id : '')
  );
  const [author, setAuthor] = useState('');
  const [authorRole, setAuthorRole] = useState<'Wali Murid' | 'Siswa' | 'Alumni' | 'Komite Sekolah' | 'Warga Sekitar'>('Wali Murid');
  const [facilityTag, setFacilityTag] = useState<FacilityTag>('Lab Komputer');
  const [text, setText] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  React.useEffect(() => {
    if (defaultSchoolId) {
      setSelectedSchoolId(defaultSchoolId);
    }
  }, [defaultSchoolId]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !isAgreed) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newReport = {
        author: author.trim() || 'Warga Anonim (Terverifikasi NIK)',
        authorRole,
        facilityTag,
        text: text.trim(),
        photoUrl: photoUrl.trim() || 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop&q=80'
      };

      onSubmitSuccess(selectedSchoolId, newReport);
      setIsSubmitting(false);
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        setText('');
        setAuthor('');
        setPhotoUrl('');
        setIsAgreed(false);
        onClose();
      }, 1500);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-50 border border-indigo-100 text-[#5E5CE6]">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                Kirim Bukti Audit Warga
                <span className="text-[10px] font-bold tabular-nums px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Reality Check
                </span>
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Laporan foto Anda langsung mengkoreksi klaim Sispena dan dianalisis AI Asesor.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {isSuccess ? (
          <div className="p-8 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center border border-emerald-200 animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Laporan Berhasil Disubmit!</h4>
            <p className="text-xs text-slate-500 max-w-md">
              Bukti fisik Anda telah tersimpan persisten di Ledger Audit Publik dan masuk ke Antrean Moderasi Asesor BAN-PDM Jatim.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            {/* School Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Target Sekolah Terlapor
              </label>
              <select
                value={selectedSchoolId}
                onChange={(e) => setSelectedSchoolId(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:border-[#5E5CE6] transition-colors cursor-pointer"
              >
                {schools.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.npsn}) — {s.city}
                  </option>
                ))}
              </select>
            </div>

            {/* Reporter Name & Role */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Nama Anda / Inisial (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Budi Santoso"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:border-[#5E5CE6] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Peran Pelapor
                </label>
                <select
                  value={authorRole}
                  onChange={(e) => setAuthorRole(e.target.value as any)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:border-[#5E5CE6] transition-colors cursor-pointer"
                >
                  <option value="Wali Murid">Wali Murid</option>
                  <option value="Siswa">Siswa Aktif</option>
                  <option value="Komite Sekolah">Komite Sekolah</option>
                  <option value="Alumni">Alumni</option>
                  <option value="Warga Sekitar">Warga Sekitar</option>
                </select>
              </div>
            </div>

            {/* Facility Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Kategori Fasilitas / Standar
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  'Lab Komputer',
                  'Sanitasi',
                  'Transparansi Dana',
                  'Perpustakaan',
                  'Ruang Kelas',
                  'Sarpras Olahraga'
                ].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setFacilityTag(tag as FacilityTag)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border text-center transition-all ${
                      facilityTag === tag
                        ? 'bg-[#5E5CE6] text-white border-[#5E5CE6] shadow-sm font-bold'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Finding Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
                <span>Deskripsi Temuan Lapangan Riil</span>
                <span className="text-[10px] text-slate-400">Minimal 15 karakter</span>
              </label>
              <textarea
                rows={3}
                required
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Ceritakan temuan faktual (misal: kondisi PC lab, kebersihan jamban, keterbukaan papan BOS, dsb)..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:border-[#5E5CE6] transition-colors leading-relaxed"
              />
            </div>

            {/* Photo Proof URL / Attachment */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-2">
                <UploadCloud className="w-3.5 h-3.5 text-[#5E5CE6]" />
                <span>URL Bukti Foto / Link Drive (Opsional tapi Direkomendasikan)</span>
              </label>
              <input
                type="url"
                placeholder="https://... atau tempel URL foto kondisi fisik"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:border-[#5E5CE6] transition-colors"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                AI Vision akan memverifikasi geotag, timestamp, dan kesesuaian objek fasilitas dengan SPJ BOS.
              </p>
            </div>

            {/* Integrity Agreement */}
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <label className="text-[11px] text-amber-900 cursor-pointer select-none font-medium leading-relaxed">
                <input
                  type="checkbox"
                  required
                  checked={isAgreed}
                  onChange={(e) => setIsAgreed(e.target.checked)}
                  className="mr-2 rounded border-amber-400 text-[#5E5CE6] focus:ring-0"
                />
                Saya menyatakan bahwa informasi dan foto yang saya unggah adalah benar sesuai fakta lapangan riil tanpa rekayasa.
              </label>
            </div>

            {/* Action Buttons */}
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
                disabled={!isAgreed || !text.trim() || isSubmitting}
                className={`px-6 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all ${
                  isAgreed && text.trim() && !isSubmitting
                    ? 'bg-[#5E5CE6] hover:bg-[#4B49C8] text-white shadow-md shadow-indigo-500/20'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Mengirim...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim Bukti Audit</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
