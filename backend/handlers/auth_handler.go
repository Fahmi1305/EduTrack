package handlers

import (
	"fmt"
	"strings"
	"time"

	"edu-track-backend/models"
	"github.com/gofiber/fiber/v2"
)

type LoginRequest struct {
	NipOrEmail     string `json:"nipOrEmail"`
	Password       string `json:"password"`
	IsDemoOneClick bool   `json:"isDemoOneClick"`
}

// LoginAssessorAdmin authenticates BAN-PDM Assessors / Provincial Admins (supports 1-click demo login)
func LoginAssessorAdmin(c *fiber.Ctx) error {
	var req LoginRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid login payload",
		})
	}

	if !req.IsDemoOneClick && strings.TrimSpace(req.NipOrEmail) == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "NIP or Email is required",
		})
	}

	nip := strings.TrimSpace(req.NipOrEmail)
	email := "hendra.asesor@banpdm-jatim.id"
	if strings.Contains(nip, "@") {
		email = nip
		nip = "197804122005011004"
	} else if nip == "" {
		nip = "197804122005011004"
	}

	user := models.AuthUser{
		ID:        "usr-banpdm-jatim-01",
		NIP:       nip,
		Email:     email,
		Name:      "Dr. Hendra, M.Pd",
		Role:      "asesor",
		RoleLabel: "Asesor BAN-PDM Jatim",
		Region:    "Provinsi Jawa Timur",
		Token:     fmt.Sprintf("edutrack-banpdm-jwt-%d", time.Now().Unix()),
	}

	return c.JSON(user)
}

