// src/routes/auth.routes.js
import { Router } from "express";
import rateLimit from "express-rate-limit";
import { signup, login, getMe } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

// ─────────────────────────────────────────────
// STRICT rate limiter for login only
// Max 5 attempts per 15 minutes per IP
// ─────────────────────────────────────────────
const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login attempts. Please try again after 15 minutes.",
  },
});

// ─────────────────────────────────────────────
// PUBLIC ROUTES
// ─────────────────────────────────────────────
router.post("/signup", signup);
router.post("/login", loginRateLimiter, login);

// ─────────────────────────────────────────────
// PROTECTED ROUTES
// ─────────────────────────────────────────────
router.get("/me", protect, getMe);

export default router;
