# Claude.md — Daily Progress & Constraints
## Beauty Parlour Booking Platform | BCA Project II
## Last Updated: Day 4 COMPLETE ✅

---

## ARCHITECTURAL CONSTRAINTS (NEVER VIOLATE)

1. **No placeholders** — every function must be complete and functional
2. **No mixed concerns** — controllers handle logic, routes handle routing only
3. **All DB writes inside transactions** — especially bookings ✅ implemented
4. **Zod validation on every POST/PUT** — no raw req.body access
5. **JWT required on all protected routes**
6. **Admin routes double-gated** — protect + adminOnly
7. **Uniform JSON responses** — always `{ success, message, data? }`
8. **Prisma client is singleton** — import from `src/config/db.js` only
9. **No console.log in production paths**
10. **Node v18 constraint** — no Node 20+ features
11. **No emojis as icons** — replace with real images in Day 5

---

## ✅ DAY 1 — COMPLETE
- PostgreSQL 16, Prisma migrated + seeded, Express server live

## ✅ DAY 2 — COMPLETE
- Auth: signup, login, /me — all verified with JWT

## ✅ DAY 3 — COMPLETE
- Full frontend: Navbar, Hero, FeatureGrid, Home page, Router, AuthContext

## ✅ DAY 4 — COMPLETE
- `src/validators/booking.validator.js` — Zod schema with past-date check
- `src/controllers/service.controller.js` — getAllServices, getAvailableSlots
- `src/controllers/booking.controller.js` — atomic $transaction, IDOR-safe cancel
- `src/routes/service.routes.js` — GET /api/services, GET /api/services/:id/slots
- `src/routes/booking.routes.js` — POST /api/bookings, GET /api/bookings/my, DELETE /api/bookings/:id
- `src/server.js` — service + booking routes active

### Verified working ✅
- GET  /api/services → 6 services returned
- GET  /api/services/1/slots?date=2026-06-05 → 9 slots, all isAvailable:true
- POST /api/bookings → appointment id:1 created, status CONFIRMED
- POST /api/bookings (same slot) → 409 "This time slot is already booked" 🔒
- Atomic $transaction prevents double-booking at DB level

---

## 🔄 DAY 5 — NEXT: Booking Interface + Auth Pages (Frontend)

### Files to create
- [ ] `src/pages/Login.jsx` — real login form, connect to /api/auth/login
- [ ] `src/pages/Register.jsx` — real register form
- [ ] `src/pages/BookingPage.jsx` — service picker + calendar + slot grid
- [ ] `src/components/TimeSlotPicker.jsx` — available/unavailable visual slots
- [ ] `src/pages/Dashboard.jsx` — user appointments list with cancel button
- [ ] Update App.jsx placeholder pages with real components

### Key integrations
- BookingPage fetches services from GET /api/services
- On date+service select → fetch GET /api/services/:id/slots?date=
- On submit → POST /api/bookings with JWT
- Dashboard fetches GET /api/bookings/my
- Cancel button calls DELETE /api/bookings/:id

---

## ⬜ DAY 6 — Admin Dashboard
- `src/controllers/admin.controller.js` — weekly bookings, revenue, service breakdown
- `src/routes/admin.routes.js` — GET /api/admin/dashboard
- `src/pages/AdminDashboard.jsx` — metrics cards

---

## ⬜ DAY 7 — Security Audit + GitHub
- BOLA/IDOR checks (already implemented in cancelBooking)
- Unhandled rejections audit
- Mobile responsive check
- Push to GitHub private repo for friend

---

## START COMMANDS

```bash
# Open Postgres.app first (elephant in menu bar → Start)

# Terminal 1 — Backend
cd /Users/bibi/Desktop/Beauty_palour/Beauty_palour/backend && npm run dev

# Terminal 2 — Frontend
cd /Users/bibi/Desktop/Beauty_palour/Beauty_palour/frontend && npm run dev
```
