import React from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip
} from 'recharts';
import { RadarStandardItem } from '../types/school';

interface RadarStandardsChartProps {
  data: RadarStandardItem[];
  isHighDiscrepancy?: boolean;
  theme?: 'default' | 'indigoCard';
}

export const RadarStandardsChart: React.FC<RadarStandardsChartProps> = ({
  data,
  isHighDiscrepancy = false,
  theme = 'indigoCard'
}) => {
  const isIndigo = theme === 'indigoCard';
  const gridStroke = isIndigo ? 'rgba(255, 255, 255, 0.25)' : '#E2E8F0';
  const textFill = isIndigo ? '#FFFFFF' : '#334155';
  const radiusFill = isIndigo ? 'rgba(255, 255, 255, 0.6)' : '#94A3B8';
  
  // Polygons
  const claimedStroke = isIndigo ? '#FFFFFF' : '#5E5CE6';
  const claimedFill = isIndigo ? '#FFFFFF' : '#5E5CE6';
  const verifiedStroke = isHighDiscrepancy ? '#F43F5E' : '#34D399';
  const verifiedFill = isHighDiscrepancy ? '#F43F5E' : '#34D399';

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke={gridStroke} strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: textFill, fontSize: 10, fontWeight: 600 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: radiusFill, fontSize: 9 }}
            stroke={gridStroke}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload;
                const gap = item.claimedScore - item.verifiedScore;
                return (
                  <div className="bg-white border border-slate-200 p-3 rounded-2xl shadow-2xl text-xs space-y-1.5 min-w-[170px] text-slate-800">
                    <p className="font-bold text-slate-900 border-b border-slate-100 pb-1">{item.subject}</p>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <span className="w-2 h-2 rounded-full bg-[#5E5CE6]"></span>
                        <span>Klaim Sekolah:</span>
                      </span>
                      <span className="tabular-nums font-bold text-slate-900">
                        {item.claimedScore}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: verifiedStroke }}
                        ></span>
                        <span>Validasi Riil:</span>
                      </span>
                      <span
                        className="tabular-nums font-bold"
                        style={{ color: verifiedStroke }}
                      >
                        {item.verifiedScore}
                      </span>
                    </div>
                    {gap > 10 && (
                      <p className="text-[10px] tabular-nums text-rose-500 font-bold pt-1 border-t border-slate-100">
                        ⚠️ Selisih: -{gap.toFixed(1)} Poin
                      </p>
                    )}
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={28}
            wrapperStyle={{
              paddingTop: '6px',
              fontSize: '11px',
              fontWeight: 500
            }}
            formatter={(value) => (
              <span className={isIndigo ? 'text-white/90 font-semibold px-1' : 'text-slate-700 font-semibold px-1'}>
                {value === 'claimedScore'
                  ? 'Klaim Sispena (Putih)'
                  : isHighDiscrepancy
                  ? 'Validasi Riil: Anomali (Rose)'
                  : 'Validasi Riil: Tervalidasi (Emerald)'}
              </span>
            )}
          />
          <Radar
            name="claimedScore"
            dataKey="claimedScore"
            stroke={claimedStroke}
            fill={claimedFill}
            fillOpacity={isIndigo ? 0.25 : 0.2}
            strokeWidth={2}
          />
          <Radar
            name="verifiedScore"
            dataKey="verifiedScore"
            stroke={verifiedStroke}
            fill={verifiedFill}
            fillOpacity={0.35}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
