package database

import (
	"log"
	"strings"
	"time"

	"edu-track-backend/models"
	"gorm.io/gorm"
)

func buildDefaultStages(schoolID string, currentStage int, slaStatus models.SlaStatus) []models.AccreditationStageItem {
	names := []struct {
		num  int
		name string
		max  int
	}{
		{1, "Submit Berkas Sispena", 14},
		{2, "Verifikasi Berkas Provinsi", 10},
		{3, "Penugasan Tim Asesor", 14},
		{4, "Visitasi Lapangan", 10},
		{5, "Pleno & Terbit Sertifikat SK", 14},
	}

	items := make([]models.AccreditationStageItem, 0, 5)
	for _, n := range names {
		st := "pending"
		days := 0
		if n.num < currentStage {
			st = "completed"
			days = n.max - 3
		} else if n.num == currentStage {
			if slaStatus == models.SlaOverdue {
				st = "overdue"
				days = n.max + 18
			} else {
				st = "in_progress"
				days = 5
			}
		}
		items = append(items, models.AccreditationStageItem{
			SchoolID:    schoolID,
			StageNumber: n.num,
			Name:        n.name,
			Status:      st,
			DaysSpent:   days,
			MaxSlaDays:  n.max,
		})
	}
	return items
}

func buildDefaultRadar(schoolID string, claimedBase, verifiedBase float64) []models.RadarStandardItem {
	subjects := []string{
		"Standar Kelulusan",
		"Standar Isi",
		"Standar Proses",
		"Standar Penilaian",
		"Standar PTK",
		"Standar Sarpras",
		"Standar Pengelolaan",
		"Standar Pembiayaan",
	}

	items := make([]models.RadarStandardItem, 0, 8)
	for i, sub := range subjects {
		v := verifiedBase
		if sub == "Standar Sarpras" && claimedBase-verifiedBase > 15 {
			v = verifiedBase - 14
		} else if i%2 == 0 {
			v = verifiedBase + 1
		}
		items = append(items, models.RadarStandardItem{
			SchoolID:      schoolID,
			Subject:       sub,
			ClaimedScore:  claimedBase,
			VerifiedScore: v,
			FullMark:      100,
		})
	}
	return items
}

// BuildInitialSeedSchools constructs the default East Java synthetic dataset
func BuildInitialSeedSchools() []models.School {
	dateVisit1 := "2026-11-03"
	dateVisit2 := "2026-11-05"
	dateVisit3 := "2026-11-06"

	schools := []models.School{
		{
			ID:                      "sch-001",
			NPSN:                    "20532185",
			Name:                    "SMAN 5 Surabaya",
			Level:                   models.LevelSMA,
			District:                "Genteng",
			City:                    "Kota Surabaya",
			Address:                 "Jl. Kusuma Bangsa No.21, Ketabang, Kec. Genteng, Surabaya",
			AccreditationGrade:      "A",
			LastAccreditationYear:   2021,
			CurrentStageNumber:      4,
			SlaStatus:               models.SlaOnTrack,
			SlaDaysDifference:       -4,
			ClaimedScore:            95.8,
			VerifiedScore:           93.4,
			ScheduledVisitationDate: &dateVisit1,
			BosBudget: models.BosBudgetData{
				TotalReceived:  1850000000,
				Absorbed:       1813000000,
				AbsorptionRate: 98.0,
				ReportedAllocations: models.BosAllocations{
					Sarpras:      550000000,
					Operasional:  620000000,
					GuruHonor:    343000000,
					Digitalisasi: 300000000,
				},
			},
			AiRiskLevel: models.RiskVerified,
			AiAssessorBrief: models.AiAssessorBrief{
				Summary:         "Tingkat kesesuaian antara dokumen evaluasi diri (Sispena) dan laporan lapangan warga mencapai 97.5%. Alokasi dana BOS untuk laboratorium IPA terkonfirmasi dengan bukti inventaris terdigitalisasi.",
				DiscrepancyRate: 2.5,
				RiskBadge:       "Integritas Sangat Baik",
				MandatoryFocus1: "Uji petik lisensi perangkat lunak di Lab Komputer 2 (memastikan kesesuaian faktur pengadaan)",
				MandatoryFocus2: "Konfirmasi kecukupan debit air bersih pada fasilitas sanitasi lantai 3 sayap barat",
				MandatoryFocus3: "Validasi rekapitulasi pelatihan pedagogik guru honorer tahun anggaran 2025/2026",
				FlagsString:     "Dokumen Lengkap Tervalidasi,Audit BOS Publik Terbuka,Feedback Warga Positif (96%)",
				GeneratedAt:     "2026-10-28 09:15 WIB",
			},
			CitizenReports: []models.CitizenReportItem{
				{
					ID:          "rep-001",
					SchoolID:    "sch-001",
					Author:      "Dewi Kartika",
					AuthorRole:  "Wali Murid",
					Date:        "2026-10-25",
					FacilityTag: "Lab Komputer",
					Text:        "Lab Komputer A & B sangat representatif. 40 unit PC terbaru terinstalasi lengkap dan AC menyala dingin.",
					Upvotes:     42,
					Status:      "verified",
					CreatedAt:   time.Now(),
				},
			},
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		},
		{
			ID:                    "sch-002",
			NPSN:                  "20532189",
			Name:                  "SMKN 2 Surabaya",
			Level:                 models.LevelSMK,
			District:              "Wonokromo",
			City:                  "Kota Surabaya",
			Address:               "Jl. Tentara Genie Pelajar No.26, Sawahan, Surabaya",
			AccreditationGrade:    "A",
			LastAccreditationYear: 2020,
			CurrentStageNumber:    5,
			SlaStatus:             models.SlaOnTrack,
			SlaDaysDifference:     -2,
			ClaimedScore:          94.2,
			VerifiedScore:         92.1,
			BosBudget: models.BosBudgetData{
				TotalReceived:  2100000000,
				Absorbed:       2045000000,
				AbsorptionRate: 97.3,
				ReportedAllocations: models.BosAllocations{
					Sarpras:      890000000,
					Operasional:  580000000,
					GuruHonor:    315000000,
					Digitalisasi: 260000000,
				},
			},
			AiRiskLevel: models.RiskVerified,
			AiAssessorBrief: models.AiAssessorBrief{
				Summary:         "Standar bengkel kejuruan mesin CNC dan otomotif memiliki sertifikasi industri (Vokasi Unggulan). Penyerapan BOS Sarpras selaras dengan realitas mesin praktek.",
				DiscrepancyRate: 2.2,
				RiskBadge:       "Integritas Sangat Baik",
				MandatoryFocus1: "Pemeriksaan kepatuhan K3 di bengkel Teknik Pemesinan",
				MandatoryFocus2: "Validasi kemitraan teaching factory dengan industri lokal ring 1",
				MandatoryFocus3: "Verifikasi serapan lulusan di dunia usaha & dunia kerja (DUDI)",
				FlagsString:     "Teaching Factory Aktif,Laporan Keuangan Rapi,Sertifikasi K3 Valid",
				GeneratedAt:     "2026-10-25 14:20 WIB",
			},
			CitizenReports: []models.CitizenReportItem{
				{
					ID:          "rep-004",
					SchoolID:    "sch-002",
					Author:      "Hendro Gunawan",
					AuthorRole:  "Alumni",
					Date:        "2026-10-18",
					FacilityTag: "Lab Komputer",
					Text:        "Mesin praktek bubut dan CNC sangat prima untuk uji kompetensi BNSP.",
					Upvotes:     31,
					Status:      "verified",
					CreatedAt:   time.Now(),
				},
			},
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		},
		{
			ID:                      "sch-004",
			NPSN:                    "20501712",
			Name:                    "SMAN 1 Sidoarjo",
			Level:                   models.LevelSMA,
			District:                "Sidoarjo",
			City:                    "Kab. Sidoarjo",
			Address:                 "Jl. Jenderal Ahmad Yani No.39, Sidokumpul, Kec. Sidoarjo",
			AccreditationGrade:      "A",
			LastAccreditationYear:   2021,
			CurrentStageNumber:      4,
			SlaStatus:               models.SlaOnTrack,
			SlaDaysDifference:       -1,
			ClaimedScore:            94.7,
			VerifiedScore:           92.5,
			ScheduledVisitationDate: &dateVisit2,
			BosBudget: models.BosBudgetData{
				TotalReceived:  1720000000,
				Absorbed:       1680000000,
				AbsorptionRate: 97.6,
				ReportedAllocations: models.BosAllocations{
					Sarpras:      510000000,
					Operasional:  540000000,
					GuruHonor:    330000000,
					Digitalisasi: 300000000,
				},
			},
			AiRiskLevel: models.RiskVerified,
			AiAssessorBrief: models.AiAssessorBrief{
				Summary:         "Kesiapan sarana digital dan laboratorium multimedia sesuai dengan pagu anggaran BOS 2025. Warga mengapresiasi transparansi sekolah.",
				DiscrepancyRate: 2.3,
				RiskBadge:       "Integritas Sangat Baik",
				MandatoryFocus1: "Observasi pemanfaatan smartboard di kelas X dan XI",
				MandatoryFocus2: "Verifikasi dokumen rekapitulasi dana BOS triwulan III",
				MandatoryFocus3: "Audit sanitasi mushola sekolah",
				FlagsString:     "Akreditasi Mandiri Siap,Transparansi Tinggi",
				GeneratedAt:     "2026-10-26 11:30 WIB",
			},
			CitizenReports: []models.CitizenReportItem{},
			CreatedAt:      time.Now(),
			UpdatedAt:      time.Now(),
		},
		{
			ID:                    "sch-005",
			NPSN:                  "20501814",
			Name:                  "SMPN 14 Sidoarjo",
			Level:                 models.LevelSMP,
			District:              "Candi",
			City:                  "Kab. Sidoarjo",
			Address:               "Jl. Raya Sepande, Candi, Kec. Candi, Kab. Sidoarjo",
			AccreditationGrade:    "B",
			LastAccreditationYear: 2019,
			CurrentStageNumber:    3,
			SlaStatus:             models.SlaOverdue,
			SlaDaysDifference:     34,
			ClaimedScore:          89.4,
			VerifiedScore:         86.2,
			BosBudget: models.BosBudgetData{
				TotalReceived:  980000000,
				Absorbed:       940000000,
				AbsorptionRate: 95.9,
				ReportedAllocations: models.BosAllocations{
					Sarpras:      290000000,
					Operasional:  380000000,
					GuruHonor:    180000000,
					Digitalisasi: 90000000,
				},
			},
			AiRiskLevel: models.RiskBottleneck,
			AiAssessorBrief: models.AiAssessorBrief{
				Summary:         "DOKUMEN SEKOLAH SUDAH LENGKAP 100%, NAMUN TERKENDALA BIROKRASI. Proses mandek selama 48 hari di tahap 'Penugasan Asesor' karena kekosongan kuota asesor regional Sidoarjo.",
				DiscrepancyRate: 3.5,
				RiskBadge:       "Bottleneck Birokrasi Akut",
				MandatoryFocus1: "Desak percepatan SK penugasan asesor lintas-kabupaten oleh Koordinator BAN-PDM Jawa Timur",
				MandatoryFocus2: "Verifikasi keabsahan data administrasi yang mendekati masa kedaluwarsa 60 hari",
				MandatoryFocus3: "Cek kondisi riil sarana toilet yang dilaporkan warga mengalami perbaikan tertunda",
				FlagsString:     "Overdue SLA > 30 Hari,Dokumen Sispena Siap 100%,Antrean Asesor Mandek",
				GeneratedAt:     "2026-10-29 08:30 WIB",
			},
			CitizenReports: []models.CitizenReportItem{
				{
					ID:          "rep-pending-02",
					SchoolID:    "sch-005",
					Author:      "Rina Kusumawati",
					AuthorRole:  "Wali Murid",
					Date:        "2026-10-30",
					FacilityTag: "Ruang Kelas",
					Text:        "Plafon ruang kelas VIII-C mulai retak akibat rembesan talang hujan minggu ini. Mohon tim asesor mengecek kelayakan struktur atap saat visitasi turun.",
					Upvotes:     17,
					Status:      "investigating",
					CreatedAt:   time.Now(),
				},
			},
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		},
		{
			ID:                      "sch-009",
			NPSN:                    "20599104",
			Name:                    "SMAN X Waru",
			Level:                   models.LevelSMA,
			District:                "Waru",
			City:                    "Kab. Sidoarjo",
			Address:                 "Jl. Brigjen Katamso Km.14, Waru, Kab. Sidoarjo",
			AccreditationGrade:      "Dalam Proses",
			LastAccreditationYear:   2019,
			CurrentStageNumber:      4,
			SlaStatus:               models.SlaWarning,
			SlaDaysDifference:       2,
			ClaimedScore:            96.4,
			VerifiedScore:           61.2,
			ScheduledVisitationDate: &dateVisit3,
			BosBudget: models.BosBudgetData{
				TotalReceived:  1450000000,
				Absorbed:       1420000000,
				AbsorptionRate: 97.9,
				ReportedAllocations: models.BosAllocations{
					Sarpras:      780000000,
					Operasional:  340000000,
					GuruHonor:    180000000,
					Digitalisasi: 120000000,
				},
			},
			AiRiskLevel: models.RiskHighDiscrepancy,
			AiAssessorBrief: models.AiAssessorBrief{
				Summary:         "PERINGATAN ANOMALI TINGKAT TINGGI (41.2% GAP MUTU). Sekolah mengklaim kesiapan laboratorium komputer 95% dan menyerap dana BOS Sarpras Rp 780 Juta, namun laporan warga menunjukkan 35 monitor rusak dan sanitasi mampet.",
				DiscrepancyRate: 41.2,
				RiskBadge:       "Bahaya: Kosmetik Akreditasi Terdeteksi",
				MandatoryFocus1: "INVESTIGASI FISIK FISKAL: Cocokkan nomor seri 60 PC faktur BOS 2025 dengan unit riil di Laboratorium Komputer B",
				MandatoryFocus2: "INSPEKSI SANITASI LANGSUNG: Uji fungsi air, pintu, dan instalasi septictank di 6 bilik toilet siswa sayap timur",
				MandatoryFocus3: "AUDIT PEMBELIAN PERPUSTAKAAN: Validasi fisik buku kurikulum nasional senilai Rp 120 Juta",
				FlagsString:     "Anomali Fisik vs Faktur BOS,Laporan Foto Warga Valid,Indikasi Manipulasi Dokumen Sispena",
				GeneratedAt:     "2026-10-29 18:00 WIB",
			},
			CitizenReports: []models.CitizenReportItem{
				{
					ID:          "rep-pending-01",
					SchoolID:    "sch-009",
					Author:      "Arif Wicaksono",
					AuthorRole:  "Wali Murid",
					Date:        "2026-10-31",
					FacilityTag: "Lab Komputer",
					Text:        "Temuan pagi ini: 12 unit UPS pada rak server Lab Komputer B dalam kondisi mati total dan berdebu tebal, tidak sesuai kuitansi pengadaan BOS tahap II.",
					Upvotes:     28,
					Status:      "investigating",
					CreatedAt:   time.Now(),
				},
				{
					ID:          "rep-012",
					SchoolID:    "sch-009",
					Author:      "Dian Prasetyo",
					AuthorRole:  "Siswa",
					Date:        "2026-10-27",
					FacilityTag: "Lab Komputer",
					Text:        "Dari 40 komputer di Lab 2, hanya 8 yang menyala dan atap pojok kiri bocor saat hujan deras.",
					Upvotes:     114,
					Status:      "verified",
					CreatedAt:   time.Now(),
				},
			},
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		},
	}

	for i := range schools {
		s := &schools[i]
		s.StageDetails = buildDefaultStages(s.ID, s.CurrentStageNumber, s.SlaStatus)
		s.RadarStandards = buildDefaultRadar(s.ID, s.ClaimedScore, s.VerifiedScore)

		focus := []string{}
		if s.AiAssessorBrief.MandatoryFocus1 != "" {
			focus = append(focus, s.AiAssessorBrief.MandatoryFocus1)
		}
		if s.AiAssessorBrief.MandatoryFocus2 != "" {
			focus = append(focus, s.AiAssessorBrief.MandatoryFocus2)
		}
		if s.AiAssessorBrief.MandatoryFocus3 != "" {
			focus = append(focus, s.AiAssessorBrief.MandatoryFocus3)
		}
		s.AiAssessorBrief.MandatoryInvestigationFocus = focus
		if s.AiAssessorBrief.FlagsString != "" {
			s.AiAssessorBrief.Flags = strings.Split(s.AiAssessorBrief.FlagsString, ",")
		} else {
			s.AiAssessorBrief.Flags = []string{}
		}
	}

	return schools
}

// SeedDatabase seeds realistic schools into GORM PostgreSQL when connected
func SeedDatabase(db *gorm.DB) {
	schools := BuildInitialSeedSchools()
	for _, s := range schools {
		if err := db.Create(&s).Error; err != nil {
			log.Printf("[WARN] Error seeding school %s: %v\n", s.Name, err)
		}
	}
}
