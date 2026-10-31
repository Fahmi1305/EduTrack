import React from 'react';
import { Check, Clock, AlertOctagon } from 'lucide-react';
import { AccreditationStageItem } from '../types/school';

interface SlaStepperProps {
  stages: AccreditationStageItem[];
  currentStageNumber: number;
  theme?: 'default' | 'indigoCard';
}

export const SlaStepper: React.FC<SlaStepperProps> = ({
  stages,
  currentStageNumber,
  theme = 'indigoCard'
}) => {
  const isIndigo = theme === 'indigoCard';

  return (
    <div className="space-y-3">
      <div className={`flex items-center justify-between pb-2.5 ${isIndigo ? 'border-b border-white/20' : 'border-b border-slate-800/80'}`}>
        <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 text-white">
          <Clock className="w-4 h-4 text-white" />
          <span>Live SLA Akreditasi BAN-PDM (Maks 62 Hari)</span>
        </h4>
        <span className={`text-[11px] font-bold tabular-nums px-2.5 py-0.5 rounded-full ${
          isIndigo ? 'bg-white text-[#5B58EB] shadow-sm' : 'bg-indigo-950 text-indigo-300 border border-indigo-800'
        }`}>
          Tahap {currentStageNumber} dari 5
        </span>
      </div>

      {/* Vertical Stepper List */}
      <div className="space-y-2">
        {stages.map((stage) => {
          const isCompleted = stage.status === 'completed';
          const isOverdue = stage.status === 'overdue' || stage.daysSpent > stage.maxSlaDays;
          const isInProgress = stage.status === 'in_progress';

          return (
            <div
              key={stage.stageNumber}
              className={`p-3 rounded-2xl transition-all ${
                isIndigo
                  ? isOverdue
                    ? 'bg-rose-500/25 border border-rose-300 text-white'
                    : isInProgress
                    ? 'bg-white/20 border border-white/30 text-white'
                    : isCompleted
                    ? 'bg-white/10 border border-white/10 text-white'
                    : 'bg-white/5 opacity-60 text-white/80'
                  : isOverdue
                  ? 'bg-rose-950/20 border border-rose-800 text-white'
                  : isInProgress
                  ? 'bg-indigo-950/40 border border-indigo-500 text-white'
                  : 'bg-slate-900 border border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                {/* Icon & Title */}
                <div className="flex items-start gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold tabular-nums mt-0.5 ${
                      isOverdue
                        ? 'bg-rose-500 text-white animate-pulse'
                        : isCompleted
                        ? 'bg-emerald-400 text-slate-950'
                        : isInProgress
                        ? 'bg-white text-[#5B58EB] shadow-md animate-pulse'
                        : 'bg-white/20 text-white/70'
                    }`}
                  >
                    {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : isOverdue ? <AlertOctagon className="w-3.5 h-3.5" /> : stage.stageNumber}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-white">
                        {stage.name}
                      </span>
                      {isOverdue && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white">
                          Overdue +{stage.daysSpent - stage.maxSlaDays} Hari
                        </span>
                      )}
                      {isInProgress && !isOverdue && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-[#5B58EB]">
                          Sedang Diproses
                        </span>
                      )}
                    </div>

                    {stage.responsibleOfficer && (
                      <p className="text-[11px] text-white/80 mt-0.5">
                        PIC: <span className="text-white font-medium">{stage.responsibleOfficer}</span>
                      </p>
                    )}

                    {stage.notes && (
                      <p className="text-[11px] text-white/90 mt-1 leading-relaxed">
                        {stage.notes}
                      </p>
                    )}
                  </div>
                </div>

                {/* Days Spent Badge */}
                <div className="text-right shrink-0">
                  <div className="text-xs font-bold tabular-nums text-white">
                    <span className={isOverdue ? 'text-rose-200' : 'text-white'}>
                      {stage.daysSpent}
                    </span>
                    <span className="text-white/70 text-[10px]"> / {stage.maxSlaDays} Hari</span>
                  </div>
                  <span className="text-[10px] text-white/70 block">
                    Batas Standar
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-black/20 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isOverdue
                      ? 'bg-rose-400'
                      : isCompleted
                      ? 'bg-emerald-400'
                      : isInProgress
                      ? 'bg-white'
                      : 'bg-transparent'
                  }`}
                  style={{
                    width: isOverdue ? '100%' : `${Math.min(100, (stage.daysSpent / stage.maxSlaDays) * 100)}%`
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
