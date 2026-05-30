// src/pages/Home.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import FeatureGrid from "../components/FeatureGrid";

const stats = [
  { value: "500+", label: "Happy Clients" },
  { value: "6",    label: "Expert Services" },
  { value: "5★",   label: "Average Rating" },
  { value: "3yrs", label: "Experience" },
];

const Home = () => {
  return (
    <div className="min-h-screen">

      {/* ── HERO SECTION ── */}
      <section className="relative min-h-screen bg-hero-gradient flex items-center overflow-hidden pt-20">

        {/* Decorative blobs */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-blush-200 rounded-full opacity-30 blur-3xl -z-0 animate-float" />
        <div className="absolute bottom-10 left-0 w-72 h-72 bg-berry-100 rounded-full opacity-20 blur-3xl -z-0" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blush-100 rounded-full opacity-40 blur-2xl -z-0 -translate-x-1/2 -translate-y-1/2" />

        <div className="section-wrapper relative z-10 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Left — Text */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="badge mb-6 inline-block">✨ Kathmandu's Premium Salon</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-berry-500 leading-tight mb-6"
              >
                Beauty That
                <span className="block italic text-blush-400">Speaks for</span>
                <span className="block">Itself</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-body text-lg text-berry-400 leading-relaxed mb-8 max-w-md"
              >
                Step into LumiGlow — where expert hands, premium products, and a passion
                for beauty come together to make you shine.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/book" className="btn-primary text-base px-8 py-4">
                  Book Appointment 🌸
                </Link>
                <Link to="/services" className="btn-outline text-base px-8 py-4">
                  Explore Services
                </Link>
              </motion.div>
            </div>

            {/* Right — Visual Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden md:block"
            >
              <div className="relative">
                {/* Main card */}
                <div className="bg-white rounded-3xl shadow-glow p-8 relative z-10">
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-3 animate-float inline-block">💆‍♀️</div>
                    <h3 className="font-display text-xl font-bold text-berry-500">
                      Your Glow Awaits
                    </h3>
                    <p className="font-body text-sm text-berry-400 mt-1">
                      Book in seconds, shine all day
                    </p>
                  </div>

                  {/* Mini service pills */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {["Haircut", "Facial", "Nails", "Coloring", "Threading", "Bridal"].map((s) => (
                      <span key={s} className="badge text-xs">{s}</span>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link to="/book" className="btn-blush w-full text-center block mt-6 text-sm">
                    Check Available Slots →
                  </Link>
                </div>

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
                  className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-card px-4 py-2 z-20"
                >
                  <span className="font-body text-sm font-medium text-berry-500">⭐ 5.0 Rating</span>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, delay: 1 }}
                  className="absolute -bottom-4 -left-4 bg-berry-500 rounded-2xl shadow-card px-4 py-2 z-20"
                >
                  <span className="font-body text-sm font-medium text-white">500+ Happy Clients 🌸</span>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-blush-200"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl font-bold text-berry-500">{stat.value}</div>
                <div className="font-body text-sm text-berry-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES / SERVICES GRID ── */}
      <FeatureGrid />

      {/* ── WHY CHOOSE US ── */}
      <section className="py-20 bg-berry-gradient">
        <div className="section-wrapper text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-4xl font-bold text-white mb-4">
              Why Choose LumiGlow?
            </h2>
            <p className="font-body text-blush-200 text-lg mb-12 max-w-xl mx-auto">
              We combine expertise with love to deliver an experience you'll remember.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: "🎓", title: "Expert Stylists", desc: "Trained professionals with years of experience" },
                { icon: "📅", title: "Easy Booking", desc: "Book online in seconds, no waiting in line" },
                { icon: "💎", title: "Premium Products", desc: "Only the finest products touch your skin and hair" },
              ].map((item) => (
                <div key={item.title} className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center border border-white/20">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="font-display text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="font-body text-blush-200 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-berry-700 py-8">
        <div className="section-wrapper text-center">
          <span className="font-display text-xl font-bold text-white">
            Lumi<span className="text-blush-400">Glow</span>
          </span>
          <p className="font-body text-berry-300 text-sm mt-2">
            © 2026 LumiGlow Beauty Parlour. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
