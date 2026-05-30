// src/controllers/admin.controller.js
import prisma from "../config/db.js";

// ─────────────────────────────────────────────
// GET /api/admin/dashboard
// ─────────────────────────────────────────────
export const getDashboard = async (req, res, next) => {
  try {
    const now       = new Date();
    const dayOfWeek = now.getDay();
    const monday    = new Date(now);
    monday.setDate(now.getDate() - ((dayOfWeek + 6) % 7));
    monday.setHours(0, 0, 0, 0);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    const weeklyBookings = await prisma.appointment.count({
      where: { date: { gte: monday, lte: sunday }, status: { in: ["CONFIRMED", "COMPLETED"] } },
    });

    const totalBookings = await prisma.appointment.count({
      where: { status: { in: ["CONFIRMED", "COMPLETED"] } },
    });

    const weeklyAppointments = await prisma.appointment.findMany({
      where: { date: { gte: monday, lte: sunday }, status: { in: ["CONFIRMED", "COMPLETED"] } },
      include: { service: { select: { price: true } } },
    });
    const weeklyRevenue = weeklyAppointments.reduce((sum, apt) => sum + parseFloat(apt.service.price), 0);

    const allAppointments = await prisma.appointment.findMany({
      where: { status: { in: ["CONFIRMED", "COMPLETED"] } },
      include: { service: { select: { price: true } } },
    });
    const totalRevenue = allAppointments.reduce((sum, apt) => sum + parseFloat(apt.service.price), 0);

    const byService = await prisma.appointment.groupBy({
      by: ["serviceId"],
      where: { status: { in: ["CONFIRMED", "COMPLETED"] } },
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
    });

    const serviceIds   = byService.map((s) => s.serviceId);
    const serviceNames = await prisma.service.findMany({
      where: { id: { in: serviceIds } },
      select: { id: true, name: true, price: true },
    });
    const serviceMap = Object.fromEntries(serviceNames.map((s) => [s.id, s]));
    const serviceBreakdown = byService.map((item) => ({
      service:  serviceMap[item.serviceId],
      bookings: item._count.id,
      revenue:  item._count.id * parseFloat(serviceMap[item.serviceId]?.price || 0),
    }));

    const totalUsers = await prisma.user.count({ where: { role: "CLIENT" } });

    const recentAppointments = await prisma.appointment.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        user:     { select: { name: true, email: true, phone: true } },
        service:  { select: { name: true, price: true } },
        timeSlot: { select: { label: true } },
      },
    });

    const pendingCount = await prisma.appointment.count({ where: { status: "PENDING" } });

    return res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      data: {
        stats: { weeklyBookings, totalBookings, weeklyRevenue, totalRevenue, totalUsers, pendingCount },
        serviceBreakdown,
        recentAppointments,
        weekRange: {
          from: monday.toISOString().split("T")[0],
          to:   sunday.toISOString().split("T")[0],
        },
      },
    });
  } catch (error) { next(error); }
};

// ─────────────────────────────────────────────
// GET /api/admin/services
// All services including inactive ones
// ─────────────────────────────────────────────
export const getAllServicesAdmin = async (req, res, next) => {
  try {
    const services = await prisma.service.findMany({ orderBy: { id: "asc" } });
    return res.status(200).json({ success: true, message: "Services fetched", data: { services } });
  } catch (error) { next(error); }
};

// ─────────────────────────────────────────────
// PATCH /api/admin/services/:id
// Update service price, name, description, duration
// AND toggle isActive (available/unavailable)
// ─────────────────────────────────────────────
export const updateService = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ success: false, message: "Invalid service ID" });

    const service = await prisma.service.findUnique({ where: { id } });
    if (!service) return res.status(404).json({ success: false, message: "Service not found" });

    const { name, description, duration, price, isActive } = req.body;

    // Validate price if provided
    if (price !== undefined) {
      const parsed = parseFloat(price);
      if (isNaN(parsed) || parsed <= 0) {
        return res.status(400).json({ success: false, message: "Price must be a positive number" });
      }
    }

    // Validate duration if provided
    if (duration !== undefined) {
      const parsed = parseInt(duration);
      if (isNaN(parsed) || parsed <= 0) {
        return res.status(400).json({ success: false, message: "Duration must be a positive number" });
      }
    }

    const updated = await prisma.service.update({
      where: { id },
      data: {
        ...(name        !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(duration    !== undefined && { duration: parseInt(duration) }),
        ...(price       !== undefined && { price: parseFloat(price) }),
        ...(isActive    !== undefined && { isActive: Boolean(isActive) }),
      },
    });

    return res.status(200).json({
      success: true,
      message: `Service "${updated.name}" updated successfully`,
      data: { service: updated },
    });
  } catch (error) { next(error); }
};

// ─────────────────────────────────────────────
// PATCH /api/admin/bookings/:id/status
// Admin updates any appointment status
// ─────────────────────────────────────────────
export const updateBookingStatus = async (req, res, next) => {
  try {
    const id     = parseInt(req.params.id);
    const { status } = req.body;
    const validStatuses = ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: `Status must be one of: ${validStatuses.join(", ")}` });
    }
    const appointment = await prisma.appointment.findUnique({ where: { id } });
    if (!appointment) return res.status(404).json({ success: false, message: "Appointment not found" });

    const updated = await prisma.appointment.update({
      where: { id },
      data:  { status },
      include: {
        user:     { select: { name: true, email: true } },
        service:  { select: { name: true } },
        timeSlot: { select: { label: true } },
      },
    });
    return res.status(200).json({ success: true, message: "Status updated", data: { appointment: updated } });
  } catch (error) { next(error); }
};
