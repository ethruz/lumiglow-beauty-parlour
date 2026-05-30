// src/routes/service.routes.js
import { Router } from "express";
import { getAllServices, getAvailableSlots } from "../controllers/service.controller.js";

const router = Router();

// Public — no auth needed to browse services
router.get("/",            getAllServices);
router.get("/:id/slots",   getAvailableSlots);

export default router;
