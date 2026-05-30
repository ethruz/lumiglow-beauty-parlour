// src/routes/admin.routes.js
import { Router } from "express";
import {
  getDashboard,
  getAllServicesAdmin,
  updateService,
  updateBookingStatus,
} from "../controllers/admin.controller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = Router();

// All routes: JWT verify + ADMIN role check
router.get("/dashboard",             protect, adminOnly, getDashboard);
router.get("/services",              protect, adminOnly, getAllServicesAdmin);
router.patch("/services/:id",        protect, adminOnly, updateService);
router.patch("/bookings/:id/status", protect, adminOnly, updateBookingStatus);

export default router;
