package database

import (
	"log"
	"os"
	"strings"

	"edu-track-backend/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

// InitDB initializes PostgreSQL / Supabase connection or automatically falls back to the persistent Local Store
func InitDB() (*gorm.DB, error) {
	dsn := strings.TrimSpace(os.Getenv("DATABASE_URL"))
	if dsn == "" || strings.Contains(dsn, "your-supabase-password") || strings.Contains(dsn, "your-supabase-ref") {
		log.Println("[INFO] DATABASE_URL not configured for external PostgreSQL. Activating persistent Local Store (data/local_store.json)...")
		InitLocalStore()
		return nil, nil
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Warn),
	})
	if err != nil {
		log.Printf("[WARN] Could not connect to PostgreSQL (%v). Falling back to persistent Local Store...\n", err)
		InitLocalStore()
		return nil, err
	}

	log.Println("[INFO] Successfully connected to Supabase PostgreSQL database.")

	// Auto Migration of all models
	err = db.AutoMigrate(
		&models.School{},
		&models.AccreditationStageItem{},
		&models.RadarStandardItem{},
		&models.CitizenReportItem{},
	)
	if err != nil {
		log.Printf("[WARN] PostgreSQL AutoMigrate failed (%v). Falling back to persistent Local Store...\n", err)
		InitLocalStore()
		return nil, err
	}

	// Automatic Seeding if database is empty
	var count int64
	db.Model(&models.School{}).Count(&count)
	if count == 0 {
		log.Println("[INFO] Schools table is empty. Executing East Java / Surabaya synthetic seeder...")
		SeedDatabase(db)
		log.Println("[INFO] Database successfully seeded with East Java schools.")
	} else {
		log.Printf("[INFO] Database contains %d schools. Skipping initial seed.\n", count)
	}

	DB = db
	return db, nil
}
