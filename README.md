# Edu Track — Transparent School Assessment Tracking & Public Audit Dashboard

> **MIA 2026 (WIA) Competition Entry**  
> **Tema Utama:** *Designing Digital Futures — Powering Public Transparency*  
> **Target Platform:** Desktop Web Full (Optimized for 1440px+, Responsive)  
> **Tanggal Pembaruan:** 30 Oktober 2026 (Menuju First Draft Milestone 1 November 2026)

---

## 1. Judul Projek & Deskripsi Singkat

**Edu Track** adalah platform audit keterbukaan mutu pendidikan dan pemantauan akreditasi sekolah pertama di Indonesia yang mengintegrasikan transparansi SLA proses akreditasi BAN-PDM secara *real-time*, korelasi akuntabilitas penyerapan dana BOS Kemendikdasmen, dan ledger audit partisipatif berbasis warga (*crowdsourced reality check*).

### Masalah Nyata yang Diselesaikan:
1. **"Kosmetik Akreditasi"**: Seringkali sekolah mengklaim kesiapan fasilitas laboratorium, sanitasi, dan rasio guru 95%+ di sistem evaluasi diri (Sispena), namun fakta riil di lapangan menunjukkan fasilitas rusak, komputer tidak memadai, dan toilet mampet.
2. **Bottleneck Birokrasi yang Tertutup**: Berkas sekolah yang sudah 100% lengkap kerap mandek berminggu-minggu di tingkat verifikasi provinsi atau penugasan tim asesor tanpa alasan transparan, merugikan siswa tingkat akhir yang membutuhkan legalitas akreditasi.
3. **Ketertutupan Realisasi Dana BOS**: Wali murid dan komite sekolah kesulitan mengecek apakah pagu anggaran sarpras ratusan juta rupiah benar-benar terwujud dalam bentuk fisik sarana belajar.

Edu Track hadir memecahkan kebuntuan ini dengan pendekatan **Public Transparency & AI-Powered Discrepancy Detection**.

---

## 2. Pemetaan 4 Sub-Tema Lomba MIA 2026 & Inovasi AI

| No | Sub-Tema Kompetisi | Implementasi Solusi dalam Edu Track |
|---|---|---|
| **1** | **Open Data & Transparansi Publik** | Mengintegrasikan data terbuka multi-sumber dari BAN-PDM Jawa Timur, Dapodik Kemendikdasmen, dan RKAS BOS dalam satu dasbor publik yang dapat diakses siapa saja tanpa hambatan login. |
| **2** | **AI-Powered Discrepancy & Anomaly Engine** | Algoritma AI menganalisis kesenjangan antara klaim dokumen Sispena dengan bukti visual foto warga secara otomatis. Menghasilkan *AI Field-Assessor Brief* berisikan **"3 Fokus Investigasi Lapangan Wajib"** untuk memandu tim asesor independen. |
| **3** | **Real-Time SLA Bottleneck Tracking** | Fitur *Live SLA Stepper* (5 tahap akreditasi) yang menampilkan durasi per tahap dengan batas waktu tegas (maks 62 hari). Memberikan penanda visual merah jika terjadi keterlambatan birokrasi lebih dari batas SLA. |
| **4** | **Crowdsourced Citizen Audit Ledger** | Kanal pelaporan partisipatif bagi wali murid, siswa, dan warga sekitar dengan verifikasi geotagging dan timestamp foto, menangkal manipulasi laporan sebelum visitasi asesor berlangsung. |

---

## 3. Tech Stack & Arsitektur Monorepo

```
edu-track-mia2026/
├── frontend/                  # React 18 + Vite + TypeScript + Tailwind CSS
│   ├── src/
│   │   ├── components/        # SlaStepper, RadarStandardsChart, BosCorrelationChart, Modals, Navbar
│   │   ├── pages/             # LandingPage, ExplorePage (Desktop 60/40 Master-Detail Split)
│   │   ├── data/              # mockSchools.ts (12 Sekolah Sintetis Jawa Timur)
│   │   ├── services/          # api.ts (Smart Fallback API Service Layer)
│   │   ├── types/             # school.ts (Data Interface Lengkap)
│   │   └── App.tsx            # State Root & Navigation Controller
│   ├── package.json
│   └── vite.config.ts
├── backend/                   # Go (Golang) + Fiber v2 + GORM + Supabase PostgreSQL
│   ├── models/                # school.go (Skema Data Relasional)
│   ├── handlers/              # school_handler.go, stats_handler.go
│   ├── database/              # db.go, seed.go (Auto Migrasi & Seeder Sintetis)
│   ├── .env.example           # Konfigurasi Koneksi Supabase
│   ├── go.mod
│   └── main.go
└── README.md                  # Dokumentasi Utama Kompetisi
```

### Frontend (`/frontend`):
- **Framework & Tooling:** React 18, Vite 6, TypeScript 5.
- **Styling:** Tailwind CSS dengan estetika *Modern Gov-Tech Dark Mode* (background `#090D16`, glassmorphism `#0F1626`, aksen warna status: Emerald tervalidasi, Cyan brand, Amber warning, Rose alert).
- **Visualisasi & Charts:** `recharts` (Radar Chart untuk 8 Standar Nasional Pendidikan dan Scatter/Matrix Chart Korelasi Dana BOS vs Mutu Riil).
- **Icons:** `lucide-react`.
- **Fitur Khusus (Smart Fallback):** Dilengkapi API Service Layer yang secara otomatis mencoba mengambil data dari Go Fiber backend (`http://localhost:8080/api/...`), namun langsung melakukan *seamless fallback* ke dataset sintetis lokal jika backend dalam keadaan offline. Aplikasi selalu **100% interaktif dan demo-ready**.

### Backend (`/backend`):
- **Bahasa & Framework:** Go 1.22+ menggunakan **Fiber v2** (`github.com/gofiber/fiber/v2`).
- **ORM & Database:** **GORM** terhubung dengan **Supabase PostgreSQL** (`gorm.io/driver/postgres`).
- **API Endpoints:**
  - `GET /api/schools`: Daftar sekolah dengan relasi tahap akreditasi, radar standar, dan bukti warga.
  - `GET /api/schools/:id`: Detail sekolah berdasarkan ID atau NPSN.
  - `POST /api/schools/:id/reports`: Kirim laporan foto audit warga baru.
  - `GET /api/stats`: Agregasi metrik keterbukaan publik (SLA overdue %, total laporan tervalidasi).
- **Auto-Seeding:** Otomatis mengisi data jika basis data kosong saat inisialisasi server.

---

## 4. Tiga Skenario Data Sintetis (Pitch Demo Ready)

Dataset mencakup 12 sekolah realistis di wilayah Surabaya, Sidoarjo, Waru, dan Gresik:

1. **Skenario 1 — Ideal / High Trust (Green):**
   - *Contoh:* **SMAN 5 Surabaya** (NPSN: 20532185) & **SMKN 2 Surabaya** (NPSN: 20532189).
   - *Karakteristik:* Kepatuhan SLA On-Track (4 hari lebih cepat dari batas), penyerapan BOS transparan dipajang di portal sekolah, dan skor klaim sekolah (95.8) selaras dengan skor validasi publik (93.4) dengan selisih sangat kecil (gap 2.5%).
2. **Skenario 2 — Bureaucratic Bottleneck (SLA Red Alert):**
   - *Contoh:* **SMPN 14 Sidoarjo** (NPSN: 20501814) & **SMAN 2 Waru** (NPSN: 20501902).
   - *Karakteristik:* Berkas sekolah sudah diunggah lengkap 100%, namun tertahan selama **48 hari** di tahap "Penugasan Asesor" (melewati batas toleransi SLA 14 hari). AI memberi label *Bottleneck Birokrasi Akut*.
3. **Skenario 3 — Cosmetic Accreditation / High Discrepancy (AI Red Alert):**
   - *Contoh:* **SMAN X Waru** (NPSN: 20599104).
   - *Karakteristik:* Sekolah menyerap dana BOS Sarpras sebesar Rp 780 Juta dan mengklaim kesiapan laboratorium komputer 96%. Namun sistem mencatat **19 laporan warga terverifikasi dengan foto visual** yang menunjukkan 35 monitor rusak/mati, atap lab bocor berjamur, dan toilet mampet. AI mendeteksi anomali gap 41.2% dan menerbitkan **3 Fokus Investigasi Lapangan Wajib** untuk asesor.

---

## 5. Cara Menjalankan Project

### A. Menjalankan Frontend (Langsung Demo Ready)
```bash
# 1. Pindah ke direktori frontend
cd frontend

# 2. Install dependensi (jika belum)
npm install

# 3. Jalankan development server
npm run dev
```
Buka browser pada alamat: **`http://localhost:5173`**

### B. Menjalankan Backend (Go Fiber)
```bash
# 1. Pindah ke direktori backend
cd backend

# 2. Salin dan sesuaikan konfigurasi environment
cp .env.example .env

# 3. Unduh modul Go & jalankan
go mod download
go run main.go
```
Backend API akan aktif pada alamat: **`http://localhost:8080`**

---

## 6. Progress Saat Ini (Menuju First Draft 1 November 2026)

- [x] **Monorepo Architecture:** Penataan struktur `/frontend` dan `/backend` yang rapi dan terisolasi.
- [x] **Smart Fallback Data Engine:** Memastikan frontend tetap 100% interaktif dan dapat didemokan secara penuh meskipun backend Go belum tersambung ke database cloud.
- [x] **Landing Page (`/`):**
  - [x] Modern Gov-Tech Top Navigation Bar dengan indikator sinkronisasi live BAN-PDM.
  - [x] Hero Section dengan headline tajam dan Quick Filter Search Bar.
  - [x] 3 Hero KPI Metrik Transparansi (1.248 sekolah, 18,4% SLA overdue, 3.890 laporan warga).
  - [x] Interactive Reality Check Preview (Klaim Dokumen vs Bukti Foto Warga vs AI Asesor Brief).
  - [x] Upcoming Visitation Notice Banner untuk 3 sekolah dalam 7 hari ke depan.
  - [x] 4 Pilar Inovasi MIA 2026.
- [x] **Master-Detail Exploration Dashboard (`/explore`):**
  - [x] Desktop 60/40 Master-Detail Split Layout (1440px+ optimized).
  - [x] Macro Correlation Matrix (Penyerapan Dana BOS vs Skor Mutu Riil).
  - [x] Filter multi-kriteria (Jenjang, Kepatuhan SLA, Status AI Risk).
  - [x] Interactive School Directory Table dengan SLA Badge dan BOS absorption.
  - [x] Sticky Detail Panel: Live SLA Stepper (5 tahap), AI Assessor Brief (3 fokus investigasi), Recharts Radar 8 Standar Nasional Pendidikan, dan Crowdsourced Reality Check Ledger.
  - [x] Modal Interaktif Kirim Bukti Lapor Warga (dengan update data langsung secara dinamis).
  - [x] Modal Komparasi Dua Sekolah (Parent Decision Support).
- [x] **Go Fiber Backend & Supabase Ready:** Skema GORM, REST API Handler, dan Seeder Sintetis Jawa Timur.
- [ ] **Milestone Berikutnya:** Integrasi Supabase Storage untuk upload gambar langsung dari kamera ponsel pengguna dan pembuatan PWA offline-first untuk asesor di daerah 3T.

