// src/routes/booking.routes.js
import { Router } from "express";
import { createBooking, getMyBookings, cancelBooking } from "../controllers/booking.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

// All booking routes require authentication
router.post("/",        protect, createBooking);
router.get("/my",       protect, getMyBookings);
router.delete("/:id",   protect, cancelBooking);

export default router;
