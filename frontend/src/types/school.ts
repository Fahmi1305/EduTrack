export type SchoolLevel = 'SD' | 'SMP' | 'SMA' | 'SMK';
export type SlaStatus = 'on_track' | 'warning' | 'overdue';
export type AiRiskLevel = 'verified' | 'bottleneck' | 'high_discrepancy';
export type FacilityTag = 'Sanitasi' | 'Lab Komputer' | 'Transparansi Dana' | 'Perpustakaan' | 'Ruang Kelas' | 'Sarpras Olahraga';

export interface AccreditationStageItem {
  stageNumber: number; // 1 to 5
  name: string;
  status: 'completed' | 'in_progress' | 'pending' | 'overdue';
  daysSpent: number;
  maxSlaDays: number;
  startedAt?: string;
  completedAt?: string;
  responsibleOfficer?: string;
  notes?: string;
}

export interface RadarStandardItem {
  subject: string; // 8 SNP
  claimedScore: number; // 0-100
  verifiedScore: number; // 0-100
  fullMark: number;
}

export interface CitizenReportItem {
  id: string;
  author: string;
  authorRole: 'Wali Murid' | 'Siswa' | 'Alumni' | 'Komite Sekolah' | 'Warga Sekitar';
  date: string;
  facilityTag: FacilityTag;
  text: string;
  photoUrl?: string;
  upvotes: number;
  status: 'verified' | 'investigating' | 'countered';
  verifiedBy?: string;
  verifiedAt?: string;
}

export interface BosBudgetData {
  totalReceived: number; // in IDR
  absorbed: number;
  absorptionRate: number; // percentage (e.g. 98.4)
  reportedAllocations: {
    sarpras: number;
    operasional: number;
    guruHonor: number;
    digitalisasi: number;
  };
}

export interface AiAssessorBrief {
  summary: string;
  discrepancyRate: number; // percentage of mismatch
  riskBadge: string;
  mandatoryInvestigationFocus: string[];
  flags: string[];
  generatedAt: string;
}

export interface School {
  id: string;
  npsn: string;
  name: string;
  level: SchoolLevel;
  district: string; // e.g., 'Genteng, Surabaya'
  city: string; // e.g., 'Kota Surabaya' or 'Kab. Sidoarjo'
  address: string;
  accreditationGrade: 'A' | 'B' | 'C' | 'Dalam Proses';
  lastAccreditationYear: number;
  currentStageNumber: number; // 1 to 5
  stageDetails: AccreditationStageItem[];
  slaStatus: SlaStatus;
  slaDaysDifference: number; // positive = overdue days, negative/zero = on track days remaining
  claimedScore: number; // overall self-assessment claim
  verifiedScore: number; // verified public/assessor score
  bosBudget: BosBudgetData;
  aiRiskLevel: AiRiskLevel;
  aiAssessorBrief: AiAssessorBrief;
  radarStandards: RadarStandardItem[];
  citizenReports: CitizenReportItem[];
  scheduledVisitationDate?: string; // YYYY-MM-DD if scheduled in near term
  assessorTeam?: {
    lead: string;
    members: string[];
  };
}

export interface TransparencyStats {
  totalSchoolsTracked: number;
  overduePercentage: number;
  overdueCount: number;
  totalCitizenReports: number;
  verifiedReports: number;
  avgAbsorptionRate: number;
  highDiscrepancyCount: number;
  upcomingVisitationsCount: number;
}

export interface AuthUser {
  id: string;
  nip: string;
  email: string;
  name: string;
  role: 'asesor' | 'admin_banpdm';
  roleLabel: string;
  region: string;
  token: string;
}

export interface CreateSchoolPayload {
  name: string;
  npsn: string;
  level: SchoolLevel;
  district: string;
  city: string;
  address?: string;
  bosTotalReceived: number;
  bosAbsorptionRate?: number;
  standardsClaimed: {
    subject: string;
    claimedScore: number;
  }[];
  sourceSystem?: 'MANUAL_ADMIN' | 'DAPODIK_SISPENA_SYNC';
}

export interface UpdateSlaPayload {
  currentStageNumber: number; // 1 to 5
  slaStatus: SlaStatus;
  slaDaysDifference?: number;
  scheduledVisitationDate?: string;
}

