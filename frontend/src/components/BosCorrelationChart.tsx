import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Cell,
  ReferenceLine,
  CartesianGrid
} from 'recharts';
import { School } from '../types/school';
import { AlertCircle, TrendingUp, Info } from 'lucide-react';

interface BosCorrelationChartProps {
  schools: School[];
  onSelectSchool?: (school: School) => void;
}

export const BosCorrelationChart: React.FC<BosCorrelationChartProps> = ({
  schools,
  onSelectSchool
}) => {
  const [filterType, setFilterType] = useState<'all' | 'high_gap'>('all');

  const chartData = schools
    .filter((s) => (filterType === 'all' ? true : s.aiRiskLevel === 'high_discrepancy'))
    .map((s) => ({
      name: s.name,
      npsn: s.npsn,
      bosMilyar: Number((s.bosBudget.absorbed / 1000000000).toFixed(2)),
      verifiedScore: s.verifiedScore,
      claimedScore: s.claimedScore,
      discrepancy: Number((s.claimedScore - s.verifiedScore).toFixed(1)),
      aiRiskLevel: s.aiRiskLevel,
      schoolRef: s
    }));

  return (
    <div className="p-4 rounded-2xl bg-[#0F1626]/90 border border-slate-800 shadow-xl space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-100 flex items-center gap-2">
              Korelasi Penyerapan Dana BOS vs Skor Mutu Riil
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                Matrix Akuntabilitas
              </span>
            </h4>
            <p className="text-[11px] text-slate-400">
              Mendeteksi sekolah dengan serapan BOS tinggi namun mutu riil rendah (Anomali Kuadran Kanan-Bawah).
            </p>
          </div>
        </div>

        {/* Chart Filter Toggle */}
        <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setFilterType('all')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              filterType === 'all'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Semua Sekolah ({schools.length})
          </button>
          <button
            onClick={() => setFilterType('high_gap')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors flex items-center gap-1 ${
              filterType === 'high_gap'
                ? 'bg-rose-500/20 text-rose-300 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <AlertCircle className="w-3 h-3 text-rose-400" />
            <span>Anomali Terindikasi</span>
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
            <XAxis
              type="number"
              dataKey="bosMilyar"
              name="Dana BOS Terserap"
              unit="M"
              domain={[0.5, 2.5]}
              stroke="#64748B"
              fontSize={10}
              tickLine={false}
              label={{
                value: 'Penyerapan Dana BOS (Miliar Rupiah)',
                position: 'insideBottom',
                offset: -12,
                fill: '#94A3B8',
                fontSize: 10
              }}
            />
            <YAxis
              type="number"
              dataKey="verifiedScore"
              name="Skor Validasi Publik"
              domain={[40, 100]}
              stroke="#64748B"
              fontSize={10}
              tickLine={false}
              label={{
                value: 'Skor Mutu Tervalidasi',
                angle: -90,
                position: 'insideLeft',
                fill: '#94A3B8',
                fontSize: 10,
                offset: 10
              }}
            />
            <ZAxis range={[60, 140]} />
            
            {/* Reference Benchmark Line */}
            <ReferenceLine y={80} stroke="#F59E0B" strokeDasharray="3 3" label={{ value: 'Batas Minimum Standar (80)', fill: '#F59E0B', fontSize: 9, position: 'right' }} />

            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-[#090D16] border border-slate-700 p-3 rounded-xl shadow-2xl text-xs space-y-1.5 z-50">
                      <p className="font-bold text-slate-100">{data.name}</p>
                      <p className="text-[10px] font-mono text-slate-400">NPSN: {data.npsn}</p>
                      <div className="pt-1 border-t border-slate-800 space-y-1">
                        <p className="text-slate-300">
                          BOS Terserap:{' '}
                          <span className="font-mono font-bold text-cyan-400">
                            Rp {data.bosMilyar} Milyar
                          </span>
                        </p>
                        <p className="text-slate-300">
                          Skor Validasi Riil:{' '}
                          <span className={`font-mono font-bold ${
                            data.verifiedScore >= 80 ? 'text-emerald-400' : 'text-rose-400'
                          }`}>
                            {data.verifiedScore} / 100
                          </span>
                        </p>
                        <p className="text-slate-400">
                          Skor Klaim Dokumen: <span className="font-mono text-slate-200">{data.claimedScore}</span>
                        </p>
                        {data.discrepancy > 10 && (
                          <p className="text-[10px] font-bold text-rose-400 bg-rose-950/60 p-1 rounded">
                            ⚠️ Diskrepansi: Selisih {data.discrepancy} Poin
                          </p>
                        )}
                      </div>
                      <p className="text-[10px] text-cyan-400 pt-1 underline cursor-pointer">
                        Klik titik untuk melihat audit sekolah
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter
              name="Sekolah"
              data={chartData}
              onClick={(node) => {
                if (node && node.schoolRef && onSelectSchool) {
                  onSelectSchool(node.schoolRef);
                }
              }}
            >
              {chartData.map((entry, index) => {
                let fill = '#10B981'; // Green: Ideal
                if (entry.aiRiskLevel === 'bottleneck') fill = '#F59E0B'; // Amber: Bottleneck
                if (entry.aiRiskLevel === 'high_discrepancy') fill = '#F43F5E'; // Red: Anomaly
                return <Cell key={`cell-${index}`} fill={fill} className="cursor-pointer hover:opacity-80 transition-opacity" />;
              })}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Legend & Insight Note */}
      <div className="flex flex-wrap items-center justify-between text-[11px] pt-1 text-slate-400 border-t border-slate-800/60">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>Mutu Selaras BOS (Ideal)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span>Bottleneck Birokrasi</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span>Anomali / Kosmetik Akreditasi</span>
          </span>
        </div>
        <span className="text-[10px] font-mono text-cyan-400">
          *Klik titik sekolah mana saja untuk inspeksi mendalam
        </span>
      </div>
    </div>
  );
};

