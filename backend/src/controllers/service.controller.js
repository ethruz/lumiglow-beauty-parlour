// src/controllers/service.controller.js
import prisma from "../config/db.js";

// ─────────────────────────────────────────────
// GET /api/services
// Returns all active services
// ─────────────────────────────────────────────
export const getAllServices = async (req, res, next) => {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { price: "asc" },
    });

    return res.status(200).json({
      success: true,
      message: "Services fetched successfully",
      data: { services },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────
// GET /api/services/:id/slots?date=YYYY-MM-DD
// Returns ALL time slots, marking which are taken
// ─────────────────────────────────────────────
export const getAvailableSlots = async (req, res, next) => {
  try {
    const serviceId = parseInt(req.params.id);
    const { date }  = req.query;

    // Validate inputs
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({
        success: false,
        message: "Valid date query parameter required (YYYY-MM-DD)",
      });
    }

    if (isNaN(serviceId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID",
      });
    }

    // Check service exists
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });
    if (!service || !service.isActive) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // Get all time slots
    const allSlots = await prisma.timeSlot.findMany({
      orderBy: { startTime: "asc" },
    });

    // Get booked slot IDs for this service + date
    const bookedAppointments = await prisma.appointment.findMany({
      where: {
        serviceId,
        date: new Date(date),
        status: { in: ["PENDING", "CONFIRMED"] },
      },
      select: { timeSlotId: true },
    });

    const bookedSlotIds = new Set(bookedAppointments.map((a) => a.timeSlotId));

    // Merge: mark each slot as available or taken
    const slots = allSlots.map((slot) => ({
      ...slot,
      isAvailable: !bookedSlotIds.has(slot.id),
    }));

    return res.status(200).json({
      success: true,
      message: "Slots fetched successfully",
      data: { date, service, slots },
    });
  } catch (error) {
    next(error);
  }
};
