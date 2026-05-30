// src/middleware/auth.middleware.js
import jwt from "jsonwebtoken";
import prisma from "../config/db.js";

// ─────────────────────────────────────────────
// PROTECT — verifies JWT on any protected route
// Usage: router.get("/profile", protect, controller)
// ─────────────────────────────────────────────
export const protect = async (req, res, next) => {
  try {
    // 1. Extract token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    const token = authHeader.split(" ")[1];

    // 2. Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Session expired. Please log in again.",
        });
      }
      return res.status(401).json({
        success: false,
        message: "Invalid token. Please log in again.",
      });
    }

    // 3. Check user still exists in DB
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, role: true, email: true },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists.",
      });
    }

    // 4. Attach user info to request
    req.userId = user.id;
    req.userRole = user.role;
    req.userEmail = user.email;

    next();
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────
// ADMIN ONLY — must be used AFTER protect
// Usage: router.get("/admin", protect, adminOnly, controller)
// ─────────────────────────────────────────────
export const adminOnly = (req, res, next) => {
  if (req.userRole !== "ADMIN") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin privileges required.",
    });
  }
  next();
};
