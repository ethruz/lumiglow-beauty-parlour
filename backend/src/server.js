// backend/src/server.js — Day 6 final version
import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
dotenv.config();

import authRoutes    from "./routes/auth.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import adminRoutes   from "./routes/admin.routes.js";

const app  = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, max: 100,
  standardHeaders: true, legacyHeaders: false,
  message: { success: false, message: "Too many requests. Please try again later." },
});
app.use(globalLimiter);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.get("/api/health", (req, res) => res.status(200).json({
  success: true, message: "Beauty Parlour API is running",
  timestamp: new Date().toISOString(), environment: process.env.NODE_ENV,
}));

app.use("/api/auth",     authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin",    adminRoutes);

app.use((req, res) => res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` }));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === "production" ? "Internal server error" : err.message || "Internal Server Error";
  if (process.env.NODE_ENV !== "production") console.error(`[ERROR] ${err.stack}`);
  res.status(statusCode).json({ success: false, message, ...(process.env.NODE_ENV !== "production" && { stack: err.stack }) });
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

app.listen(PORT, () => {
  console.log(`\n🌸 Beauty Parlour API running on port ${PORT}`);
  console.log(`🔐 Environment: ${process.env.NODE_ENV}`);
  console.log(`📡 CORS allowed from: ${process.env.CORS_ORIGIN}\n`);
});

export default app;
