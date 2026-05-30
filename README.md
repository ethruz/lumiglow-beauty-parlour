# LumiGlow Beauty Parlour — BCA Project II
Full-stack appointment booking platform built with React, Node.js, PostgreSQL.

## Backend Setup
cd backend && npm install
Create .env with DATABASE_URL, JWT_SECRET, PORT=5000, CORS_ORIGIN=http://localhost:5173
npx prisma migrate dev --name init && npm run db:seed && npm run dev

## Frontend Setup
cd frontend && npm install && npm run dev

## Admin Login
Email: admin@beautyparlour.com | Password: Admin@123
