// src/controllers/booking.controller.js
import prisma from "../config/db.js";
import { createBookingSchema } from "../validators/booking.validator.js";

// ─────────────────────────────────────────────
// POST /api/bookings  (protected)
// ATOMIC booking — prevents double-booking
// ─────────────────────────────────────────────
export const createBooking = async (req, res, next) => {
  try {
    // 1. Validate input
    const result = createBookingSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.errors.map((e) => ({
          field: e.path[0],
          message: e.message,
        })),
      });
    }

    const { serviceId, timeSlotId, date, notes } = result.data;
    const userId   = req.userId;
    const bookDate = new Date(date);

    // 2. Verify service and time slot exist
    const [service, timeSlot] = await Promise.all([
      prisma.service.findUnique({ where: { id: serviceId } }),
      prisma.timeSlot.findUnique({ where: { id: timeSlotId } }),
    ]);

    if (!service || !service.isActive) {
      return res.status(404).json({
        success: false,
        message: "Service not found or inactive",
      });
    }

    if (!timeSlot) {
      return res.status(404).json({
        success: false,
        message: "Time slot not found",
      });
    }

    // 3. ATOMIC TRANSACTION — check + book in one DB operation
    // The @@unique constraint on [serviceId, timeSlotId, date] is our
    // final safety net, but we check first for a clean error message.
    let appointment;
    try {
      appointment = await prisma.$transaction(async (tx) => {
        // Check if slot is already taken inside the transaction
        const existing = await tx.appointment.findUnique({
          where: {
            serviceId_timeSlotId_date: {
              serviceId,
              timeSlotId,
              date: bookDate,
            },
          },
        });

        if (existing) {
          const err = new Error("SLOT_TAKEN");
          err.statusCode = 409;
          throw err;
        }

        // Slot is free — create the booking
        return tx.appointment.create({
          data: {
            userId,
            serviceId,
            timeSlotId,
            date: bookDate,
            notes,
            status: "CONFIRMED",
          },
          include: {
            service:  { select: { name: true, price: true, duration: true } },
            timeSlot: { select: { label: true, startTime: true } },
          },
        });
      });
    } catch (txError) {
      // Handle double-booking (from our check OR from the DB unique constraint)
      if (
        txError.message === "SLOT_TAKEN" ||
        txError.code === "P2002" // Prisma unique constraint violation
      ) {
        return res.status(409).json({
          success: false,
          message: "This time slot is already booked. Please choose another slot.",
        });
      }
      throw txError;
    }

    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully!",
      data: { appointment },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────
// GET /api/bookings/my  (protected)
// Returns current user's appointments
// ─────────────────────────────────────────────
export const getMyBookings = async (req, res, next) => {
  try {
    const appointments = await prisma.appointment.findMany({
      where: { userId: req.userId },
      include: {
        service:  { select: { name: true, price: true, duration: true, imageUrl: true } },
        timeSlot: { select: { label: true, startTime: true, endTime: true } },
      },
      orderBy: { date: "desc" },
    });

    return res.status(200).json({
      success: true,
      message: "Appointments fetched successfully",
      data: { appointments },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────
// DELETE /api/bookings/:id  (protected)
// Cancel an appointment — IDOR protected
// ─────────────────────────────────────────────
export const cancelBooking = async (req, res, next) => {
  try {
    const appointmentId = parseInt(req.params.id);

    if (isNaN(appointmentId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid appointment ID",
      });
    }

    // Fetch appointment first — IDOR check: must belong to this user
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // SECURITY: user can only cancel their OWN appointments
    if (appointment.userId !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to cancel this appointment",
      });
    }

    // Can't cancel already cancelled or completed appointments
    if (appointment.status === "CANCELLED") {
      return res.status(400).json({
        success: false,
        message: "This appointment is already cancelled",
      });
    }

    if (appointment.status === "COMPLETED") {
      return res.status(400).json({
        success: false,
        message: "Completed appointments cannot be cancelled",
      });
    }

    // Cancel it
    const updated = await prisma.appointment.update({
      where: { id: appointmentId },
      data:  { status: "CANCELLED" },
      include: {
        service:  { select: { name: true } },
        timeSlot: { select: { label: true } },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Appointment cancelled successfully",
      data: { appointment: updated },
    });
  } catch (error) {
    next(error);
  }
};
