package database

import (
	"encoding/json"
	"log"
	"os"
	"path/filepath"
	"sync"

	"edu-track-backend/models"
)

type LocalMemoryStore struct {
	mu       sync.RWMutex
	filePath string
	Schools  []models.School          `json:"schools"`
	Stats    models.TransparencyStats `json:"stats"`
}

var LocalStore *LocalMemoryStore

// InitLocalStore initializes a zero-config persistent local JSON & in-memory database fallback
func InitLocalStore() *LocalMemoryStore {
	dataDir := "data"
	_ = os.MkdirAll(dataDir, 0755)
	storePath := filepath.Join(dataDir, "local_store.json")

	store := &LocalMemoryStore{
		filePath: storePath,
	}

	if raw, err := os.ReadFile(storePath); err == nil && len(raw) > 0 {
		if err := json.Unmarshal(raw, store); err == nil && len(store.Schools) > 0 {
			log.Printf("[INFO] Loaded %d schools from local persistent store (%s)\n", len(store.Schools), storePath)
			LocalStore = store
			return store
		}
	}

	// Seed default East Java schools into local store
	store.Schools = BuildInitialSeedSchools()
	store.Stats = models.TransparencyStats{
		TotalSchoolsTracked:      1248,
		OverduePercentage:        18.4,
		OverdueCount:             230,
		TotalCitizenReports:      3890,
		VerifiedReports:          3215,
		AvgAbsorptionRate:        92.6,
		HighDiscrepancyCount:     47,
		UpcomingVisitationsCount: 14,
	}

	store.Save()
	log.Printf("[INFO] Initialized local persistent store (%s) with %d East Java schools.\n", storePath, len(store.Schools))
	LocalStore = store
	return store
}

func (s *LocalMemoryStore) Lock() {
	s.mu.Lock()
}

func (s *LocalMemoryStore) Unlock() {
	s.mu.Unlock()
}

func (s *LocalMemoryStore) RLock() {
	s.mu.RLock()
}

func (s *LocalMemoryStore) RUnlock() {
	s.mu.RUnlock()
}

func (s *LocalMemoryStore) Save() {
	raw, err := json.MarshalIndent(s, "", "  ")
	if err != nil {
		log.Printf("[WARN] Failed to marshal local store: %v\n", err)
		return
	}
	if err := os.WriteFile(s.filePath, raw, 0644); err != nil {
		log.Printf("[WARN] Failed to write local store file: %v\n", err)
	}
}

