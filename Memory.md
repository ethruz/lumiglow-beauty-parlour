# Memory.md — Beauty Parlour Booking Platform
## Single Source of Truth | Updated: Day 4 COMPLETE ✅

---

## 1. PROJECT OVERVIEW

| Field | Value |
|---|---|
| Project Name | Modern Beauty Parlour & Appointment Booking Platform |
| Academic Level | BCA 5th Semester — Project II |
| Mac | MacBook Pro 2012, macOS 10.15 Catalina, Node v18.20.8 |
| Brand Name | LumiGlow Beauty Parlour |

---

## 2. TECH STACK — ALL LIVE ✅

| Layer | Technology | Status |
|---|---|---|
| Frontend | React (Vite 4.4.0) + Tailwind CSS v3 + Framer Motion | ✅ |
| Backend | Node.js v18 + Express.js | ✅ |
| Database | PostgreSQL 16 (Postgres.app) | ✅ |
| ORM | Prisma v5.22.0 | ✅ |
| Auth | bcryptjs + JWT | ✅ |
| Validation | Zod | ✅ |
| Security | Helmet, express-rate-limit | ✅ |

---

## 3. ENVIRONMENT

- Backend:  `/Users/bibi/Desktop/Beauty_palour/Beauty_palour/backend/`
- Frontend: `/Users/bibi/Desktop/Beauty_palour/Beauty_palour/frontend/`
- API: `http://localhost:5000`
- Frontend: `http://localhost:5173`
- DB: `postgresql://bibi@localhost:5432/beauty_parlour`

---

## 4. ALL API ROUTES (LIVE ✅)

| Method | Route | Auth | Status |
|---|---|---|---|
| GET | /api/health | Public | ✅ |
| POST | /api/auth/signup | Public | ✅ |
| POST | /api/auth/login | Public (5/15min limit) | ✅ |
| GET | /api/auth/me | JWT | ✅ |
| GET | /api/services | Public | ✅ |
| GET | /api/services/:id/slots?date= | Public | ✅ |
| POST | /api/bookings | JWT | ✅ |
| GET | /api/bookings/my | JWT | ✅ |
| DELETE | /api/bookings/:id | JWT (own only) | ✅ |
| GET | /api/admin/dashboard | JWT+ADMIN | ⬜ Day 6 |

---

## 5. BOOKING ENGINE — VERIFIED ✅

Double-booking is prevented by TWO layers:
1. `prisma.$transaction` — checks existing booking inside transaction before inserting
2. `@@unique([serviceId, timeSlotId, date])` — DB constraint catches any race condition

IDOR protection: `cancelBooking` verifies `appointment.userId === req.userId` before allowing cancel.

---

## 6. FRONTEND FILE STRUCTURE

```
frontend/src/
├── context/AuthContext.jsx       ✅
├── utils/api.js                  ✅
├── components/
│   ├── Navbar.jsx                ✅
│   └── FeatureGrid.jsx           ✅
├── pages/
│   ├── Home.jsx                  ✅
│   ├── Login.jsx                 ⬜ Day 5 (placeholder)
│   ├── Register.jsx              ⬜ Day 5 (placeholder)
│   ├── BookingPage.jsx           ⬜ Day 5
│   ├── Dashboard.jsx             ⬜ Day 5
│   └── AdminDashboard.jsx        ⬜ Day 6
├── App.jsx                       ✅
├── main.jsx                      ✅
└── index.css                     ✅
```

---

## 7. BACKEND FILE STRUCTURE

```
backend/src/
├── config/db.js                  ✅
├── controllers/
│   ├── auth.controller.js        ✅
│   ├── service.controller.js     ✅
│   └── booking.controller.js     ✅
├── middleware/
│   └── auth.middleware.js        ✅
├── routes/
│   ├── auth.routes.js            ✅
│   ├── service.routes.js         ✅
│   └── booking.routes.js         ✅
├── validators/
│   ├── auth.validator.js         ✅
│   └── booking.validator.js      ✅
└── server.js                     ✅
```

---

## 8. STATUS TRACKER

| Day | Task | Status |
|---|---|---|
| 1 | DB + Server + Seed | ✅ COMPLETE |
| 2 | Auth Engine | ✅ COMPLETE |
| 3 | Frontend Theme + UI | ✅ COMPLETE |
| 4 | Booking Engine (backend) | ✅ COMPLETE |
| 5 | Booking Interface + Auth Pages | ⬜ Next |
| 6 | Admin Dashboard | ⬜ Pending |
| 7 | Security Audit + GitHub | ⬜ Pending |
