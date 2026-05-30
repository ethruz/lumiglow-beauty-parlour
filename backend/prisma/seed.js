// prisma/seed.js
// Run with: npx prisma db seed

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // ─────────────────────────────────────────────
  // SEED TIME SLOTS
  // ─────────────────────────────────────────────
  const timeSlots = [
    { label: "09:00 AM", startTime: "09:00", endTime: "10:00" },
    { label: "10:00 AM", startTime: "10:00", endTime: "11:00" },
    { label: "11:00 AM", startTime: "11:00", endTime: "12:00" },
    { label: "12:00 PM", startTime: "12:00", endTime: "13:00" },
    { label: "01:00 PM", startTime: "13:00", endTime: "14:00" },
    { label: "02:00 PM", startTime: "14:00", endTime: "15:00" },
    { label: "03:00 PM", startTime: "15:00", endTime: "16:00" },
    { label: "04:00 PM", startTime: "16:00", endTime: "17:00" },
    { label: "05:00 PM", startTime: "17:00", endTime: "18:00" },
  ];

  for (const slot of timeSlots) {
    await prisma.timeSlot.upsert({
      where: { id: timeSlots.indexOf(slot) + 1 },
      update: {},
      create: slot,
    });
  }
  console.log(`✅ Seeded ${timeSlots.length} time slots`);

  // ─────────────────────────────────────────────
  // SEED SERVICES
  // ─────────────────────────────────────────────
  const services = [
    {
      name: "Haircut & Style",
      description:
        "Professional haircut and styling tailored to your face shape and preference.",
      duration: 60,
      price: 800,
    },
    {
      name: "Facial Treatment",
      description:
        "Deep cleansing facial with moisturizing mask for glowing, refreshed skin.",
      duration: 45,
      price: 1200,
    },
    {
      name: "Manicure & Pedicure",
      description:
        "Complete nail care for hands and feet including shaping, buffing, and polish.",
      duration: 90,
      price: 1500,
    },
    {
      name: "Hair Coloring",
      description:
        "Full hair color service using premium, long-lasting dye with conditioning treatment.",
      duration: 120,
      price: 3000,
    },
    {
      name: "Eyebrow Threading",
      description:
        "Precise eyebrow shaping using traditional threading technique for a clean arch.",
      duration: 15,
      price: 200,
    },
    {
      name: "Bridal Package",
      description:
        "Complete bridal makeover including hair styling, makeup, and nail art for your special day.",
      duration: 240,
      price: 12000,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { id: services.indexOf(service) + 1 },
      update: {},
      create: service,
    });
  }
  console.log(`✅ Seeded ${services.length} services`);

  // ─────────────────────────────────────────────
  // SEED ADMIN USER
  // ─────────────────────────────────────────────
  const adminPassword = await bcrypt.hash("Admin@123", 12);

  await prisma.user.upsert({
    where: { email: "admin@beautyparlour.com" },
    update: {},
    create: {
      name: "Salon Admin",
      email: "admin@beautyparlour.com",
      password: adminPassword,
      phone: "9800000000",
      role: "ADMIN",
    },
  });
  console.log("✅ Seeded admin user (admin@beautyparlour.com / Admin@123)");

  console.log("\n🌸 Database seeded successfully!\n");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
