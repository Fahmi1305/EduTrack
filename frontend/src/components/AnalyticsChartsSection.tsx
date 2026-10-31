import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { TrendingUp, BarChart2 } from 'lucide-react';

const monthlyTrendData = [
  { month: 'Jan', avgSlaDays: 24, citizenReports: 140 },
  { month: 'Feb', avgSlaDays: 22, citizenReports: 195 },
  { month: 'Mar', avgSlaDays: 21, citizenReports: 260 },
  { month: 'Apr', avgSlaDays: 19, citizenReports: 310 },
  { month: 'Mei', avgSlaDays: 18, citizenReports: 390 },
  { month: 'Jun', avgSlaDays: 17, citizenReports: 420 },
  { month: 'Jul', avgSlaDays: 19, citizenReports: 460 },
  { month: 'Agu', avgSlaDays: 18, citizenReports: 510 },
  { month: 'Sep', avgSlaDays: 17, citizenReports: 580 },
  { month: 'Okt', avgSlaDays: 16, citizenReports: 625 },
  { month: 'Nov', avgSlaDays: 15, citizenReports: 480 },
  { month: 'Des', avgSlaDays: 14, citizenReports: 360 },
];

const levelComparisonData = [
  { level: 'SD', claimedScore: 92.4, verifiedScore: 88.6, bosRate: 94.2 },
  { level: 'SMP', claimedScore: 90.8, verifiedScore: 82.4, bosRate: 96.5 },
  { level: 'SMA', claimedScore: 93.6, verifiedScore: 78.5, bosRate: 97.2 },
  { level: 'SMK', claimedScore: 91.5, verifiedScore: 74.2, bosRate: 96.8 },
];

export const AnalyticsChartsSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* ================= KIRI (7 KOLOM): Area Chart Tren Bulanan ================= */}
      <div className="lg:col-span-7 bg-white rounded-[28px] p-6 border border-slate-200/70 shadow-sm flex flex-col justify-between">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-indigo-50 text-[#5E5CE6] flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Kecepatan Penyelesaian SLA vs Laporan Validasi Warga
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Peningkatan partisipasi publik mendorong pemangkasan durasi birokrasi akreditasi (Jan - Des).
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs font-semibold tabular-nums text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#5E5CE6]"></span>
              <span>Durasi SLA (Hari)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0D9488]"></span>
              <span>Laporan Warga</span>
            </span>
          </div>
        </div>

        {/* Chart Container */}
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="finnovaIndigo" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5E5CE6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#5E5CE6" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="finnovaTeal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0D9488" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#0D9488" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis
                dataKey="month"
                stroke="#94A3B8"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#E2E8F0' }}
              />
              <YAxis
                yAxisId="left"
                stroke="#94A3B8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                domain={[10, 30]}
                unit="h"
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#94A3B8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                domain={[0, 700]}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const sla = payload.find((p) => p.dataKey === 'avgSlaDays')?.value;
                    const reps = payload.find((p) => p.dataKey === 'citizenReports')?.value;
                    return (
                      <div className="bg-white border border-slate-200 p-3.5 rounded-2xl shadow-xl text-xs space-y-1.5 min-w-[190px]">
                        <p className="font-bold text-slate-900 border-b border-slate-100 pb-1">
                          Bulan {label} 2026
                        </p>
                        <div className="flex items-center justify-between text-slate-700">
                          <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#5E5CE6]"></span>
                            <span>Rerata Siklus SLA:</span>
                          </span>
                          <span className="font-bold text-[#5E5CE6] tabular-nums">{sla} Hari</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-700">
                          <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#0D9488]"></span>
                            <span>Bukti Warga Masuk:</span>
                          </span>
                          <span className="font-bold text-[#0D9488] tabular-nums">{reps} Foto</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="avgSlaDays"
                name="Rerata SLA (Hari)"
                stroke="#5E5CE6"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#finnovaIndigo)"
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="citizenReports"
                name="Laporan Warga"
                stroke="#0D9488"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#finnovaTeal)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ================= KANAN (5 KOLOM): Grouped Bar Chart per Jenjang ================= */}
      <div className="lg:col-span-5 bg-white rounded-[28px] p-6 border border-slate-200/70 shadow-sm flex flex-col justify-between">
        <div className="border-b border-slate-100 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-teal-50 text-[#0D9488] flex items-center justify-center shrink-0">
              <BarChart2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Klaim Sekolah vs Realita & Serapan BOS per Jenjang
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Komparasi evaluasi diri vs audit fisik warga (SD, SMP, SMA, SMK).
              </p>
            </div>
          </div>
        </div>

        {/* Grouped Bar Chart */}
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={levelComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis
                dataKey="level"
                stroke="#94A3B8"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#E2E8F0' }}
              />
              <YAxis
                stroke="#94A3B8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                domain={[50, 100]}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const claimed = payload.find((p) => p.dataKey === 'claimedScore')?.value;
                    const verified = payload.find((p) => p.dataKey === 'verifiedScore')?.value;
                    const bos = payload.find((p) => p.dataKey === 'bosRate')?.value;
                    return (
                      <div className="bg-white border border-slate-200 p-3.5 rounded-2xl shadow-xl text-xs space-y-1.5 min-w-[200px]">
                        <p className="font-bold text-slate-900 border-b border-slate-100 pb-1">
                          Jenjang {label}
                        </p>
                        <div className="flex items-center justify-between text-slate-600">
                          <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                            <span>Klaim Sispena:</span>
                          </span>
                          <span className="font-bold text-slate-900 tabular-nums">{claimed} / 100</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-600">
                          <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#0D9488]"></span>
                            <span>Skor Riil Warga:</span>
                          </span>
                          <span className="font-bold text-[#0D9488] tabular-nums">{verified} / 100</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-600 pt-1 border-t border-slate-100">
                          <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#5E5CE6]"></span>
                            <span>Serapan BOS:</span>
                          </span>
                          <span className="font-bold text-[#5E5CE6] tabular-nums">{bos}%</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={28}
                wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
                formatter={(val) => {
                  if (val === 'claimedScore') return <span className="text-slate-500 font-medium">Klaim Sispena</span>;
                  if (val === 'verifiedScore') return <span className="text-[#0D9488] font-semibold">Skor Riil Warga</span>;
                  return <span className="text-[#5E5CE6] font-semibold">Serapan BOS (%)</span>;
                }}
              />
              <Bar dataKey="claimedScore" fill="#CBD5E1" radius={[6, 6, 0, 0]} maxBarSize={20} />
              <Bar dataKey="verifiedScore" fill="#0D9488" radius={[6, 6, 0, 0]} maxBarSize={20} />
              <Bar dataKey="bosRate" fill="#5E5CE6" radius={[6, 6, 0, 0]} maxBarSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
