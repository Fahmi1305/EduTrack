# Edu Track — Go Fiber Backend Service

Layanan backend REST API performa tinggi untuk **Edu Track**, dibangun menggunakan **Go (Golang)** dengan framework **Fiber v2** dan ORM **GORM**. Mendukung koneksi **Supabase PostgreSQL** maupun **Zero-Config Persistent Local Store (`data/local_store.json`)** sehingga `go run main.go` dapat langsung berjalan tanpa konfigurasi database eksternal.

## Fitur Utama Backend
1. **REST API Endpoint Lengkap (Publik & Portal Asesor/Admin BAN-PDM)**:
   - `POST /api/auth/login`: Autentikasi berbasis peran untuk Asesor Lapangan & Admin BAN-PDM Jatim (mendukung kredensial NIP maupun *One-Click Judge Demo Login*).
   - `GET /api/schools`: Daftar seluruh sekolah terpantau beserta relasi 5 tahap SLA, radar 8 SNP, dan laporan audit warga.
   - `GET /api/schools/:id`: Detail mendalam sekolah berdasarkan ID atau NPSN.
   - `POST /api/schools`: Registrasi sekolah baru / sinkronisasi data hulu (Dapodik & SISPENA).
   - `PUT /api/schools/:id/sla`: Pembaruan tahapan akreditasi (1–5), status kepatuhan SLA (`on_track` / `overdue`), dan jadwal visitasi.
   - `POST /api/schools/:id/reports`: Endpoint crowdsourced audit warga untuk mengunggah bukti foto dan temuan lapangan.
   - `PUT /api/reports/:id/verify`: Moderasi laporan warga oleh Asesor (`verified` masuk ke AI Brief / `countered` ditolak).
   - `GET /api/stats`: Agregasi metrik transparansi makro secara *real-time*.
2. **Dual Database Mode (PostgreSQL + Local Persistent Fallback)**:
   - Jika `DATABASE_URL` terisi koneksi Supabase PostgreSQL valid, GORM otomatis menjalankan migrasi dan seeding.
   - Jika `.env` belum dikonfigurasi, server otomatis mengaktifkan **Persistent Local Store (`data/local_store.json` + thread-safe in-memory store)** tanpa error.

## Cara Menjalankan Backend
```bash
cd backend
go mod download
go run main.go
```
Server akan langsung aktif di `http://localhost:8080`.
