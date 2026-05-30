// src/validators/booking.validator.js
import { z } from "zod";

export const createBookingSchema = z.object({
  serviceId: z
    .number({ required_error: "Service is required" })
    .int()
    .positive("Invalid service"),

  timeSlotId: z
    .number({ required_error: "Time slot is required" })
    .int()
    .positive("Invalid time slot"),

  date: z
    .string({ required_error: "Date is required" })
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
    .refine((d) => {
      const selected = new Date(d);
      const today    = new Date();
      today.setHours(0, 0, 0, 0);
      return selected >= today;
    }, "Appointment date cannot be in the past"),

  notes: z.string().max(300, "Notes too long").optional(),
});
