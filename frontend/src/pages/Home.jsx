// src/pages/Home.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import FeatureGrid from "../components/FeatureGrid";
import Footer from "../components/Footer";

const stats = [
  { value: "500+", label: "Happy Clients" },
  { value: "6",    label: "Expert Services" },
  { value: "5★",   label: "Average Rating" },
  { value: "3yrs", label: "Experience" },
];

const WhyIcons = {
  expert: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
      <circle cx="40" cy="40" r="38" fill="#FFF0F5" stroke="#F472B6" strokeWidth="2"/>
      <circle cx="40" cy="28" r="10" fill="#F472B6"/>
      <path d="M20 58c0-11.046 8.954-20 20-20s20 8.954 20 20" stroke="#6B1A3A" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M32 44l5 5 11-11" stroke="#F472B6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  booking: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
      <circle cx="40" cy="40" r="38" fill="#FFF0F5" stroke="#F472B6" strokeWidth="2"/>
      <rect x="22" y="24" width="36" height="34" rx="4" fill="white" stroke="#6B1A3A" strokeWidth="2"/>
      <path d="M22 32h36" stroke="#6B1A3A" strokeWidth="2"/>
      <path d="M30 20v8M50 20v8" stroke="#F472B6" strokeWidth="2.5" strokeLinecap="round"/>
      <rect x="30" y="38" width="8" height="8" rx="2" fill="#F472B6"/>
      <rect x="44" y="38" width="8" height="8" rx="2" fill="#FBCFE8"/>
      <rect x="30" y="48" width="8" height="5" rx="2" fill="#FBCFE8"/>
    </svg>
  ),
  premium: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
      <circle cx="40" cy="40" r="38" fill="#FFF0F5" stroke="#F472B6" strokeWidth="2"/>
      <path d="M40 18l5.5 11 12.5 1.8-9 8.7 2.1 12.5L40 46.5l-11.1 5.5 2.1-12.5-9-8.7 12.5-1.8z" fill="#F472B6" stroke="#6B1A3A" strokeWidth="1.5" strokeLinejoin="round"/>
      <circle cx="40" cy="40" r="6" fill="white"/>
      <circle cx="40" cy="40" r="3" fill="#6B1A3A"/>
    </svg>
  ),
};

const Home = () => (
  <div className="min-h-screen">

    {/* HERO */}
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=1600&h=900&fit=crop&q=85"
          alt="Luxury beauty salon interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/30" />
      </div>

      <div className="section-wrapper relative z-10 py-20 w-full">
        <div className="max-w-xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="badge mb-6 inline-block">✨ Kathmandu's Premium Salon</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-berry-500 leading-tight mb-6">
            Beauty That
            <span className="block italic text-blush-400">Speaks for</span>
            <span className="block">Itself</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-lg text-berry-400 leading-relaxed mb-8 max-w-md">
            Step into LumiGlow — where expert hands, premium products, and a passion for beauty come together to make you shine.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4">
            <Link to="/book" className="btn-primary text-base px-8 py-4">Book Appointment 🌸</Link>
            <Link to="/services" className="btn-outline text-base px-8 py-4">Explore Services</Link>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-blush-200 max-w-2xl">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl font-bold text-berry-500">{stat.value}</div>
              <div className="font-body text-sm text-berry-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* SERVICES */}
    <FeatureGrid />

    {/* WHY CHOOSE US */}
    <section className="py-20 bg-berry-gradient">
      <div className="section-wrapper text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="font-display text-4xl font-bold text-white mb-4">Why Choose LumiGlow?</h2>
          <p className="font-body text-blush-200 text-lg mb-14 max-w-xl mx-auto">
            We combine expertise with love to deliver an experience you'll remember.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: WhyIcons.expert, title: "Expert Stylists", desc: "Trained professionals with years of hands-on experience in modern beauty techniques." },
              { icon: WhyIcons.booking, title: "Easy Online Booking", desc: "Book your appointment in seconds — pick your service, choose a slot, and you're set." },
              { icon: WhyIcons.premium, title: "Premium Products", desc: "Only the finest internationally recognized products touch your skin and hair." },
            ].map((item) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="font-display text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="font-body text-blush-200 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    {/* GALLERY */}
    <section className="py-16 bg-cream overflow-hidden">
      <div className="section-wrapper">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold text-berry-500">Inside <span className="italic text-blush-400">LumiGlow</span></h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop&q=80",
            "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=400&fit=crop&q=80",
            "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop&q=80",
            "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=400&fit=crop&q=80",
          ].map((src, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }} whileHover={{ scale: 1.03 }}
              className="rounded-2xl overflow-hidden aspect-square shadow-card">
              <img src={src} alt="LumiGlow salon" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" loading="lazy"/>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 bg-blush-50">
      <div className="section-wrapper text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-4xl font-bold text-berry-500 mb-4">Ready to <span className="italic text-blush-400">Glow Up?</span></h2>
          <p className="font-body text-berry-400 mb-8 text-lg">Book your appointment today and let us take care of the rest.</p>
          <Link to="/book" className="btn-primary text-base px-10 py-4">Book Now 🌸</Link>
        </motion.div>
      </div>
    </section>

    {/* FOOTER */}
    <Footer />
  </div>
);

export default Home;
