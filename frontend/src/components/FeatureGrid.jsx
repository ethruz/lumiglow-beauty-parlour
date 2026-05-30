// src/components/FeatureGrid.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Haircut & Style",
    description: "Precision cuts tailored to your face shape with professional styling.",
    duration: "60 min",
    price: "NPR 800",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop&q=80",
    accent: "bg-pink-100 text-pink-600",
  },
  {
    title: "Facial Treatment",
    description: "Deep cleansing facial with luxurious moisturizing mask for glowing skin.",
    duration: "45 min",
    price: "NPR 1,200",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop&q=80",
    accent: "bg-blush-100 text-blush-600",
  },
  {
    title: "Manicure & Pedicure",
    description: "Complete nail care for hands and feet with premium polish options.",
    duration: "90 min",
    price: "NPR 1,500",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop&q=80",
    accent: "bg-rose-100 text-rose-600",
  },
  {
    title: "Hair Coloring",
    description: "Full color service using premium, long-lasting dye with conditioning.",
    duration: "120 min",
    price: "NPR 3,000",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop&q=80",
    accent: "bg-purple-100 text-purple-600",
  },
  {
    title: "Eyebrow Threading",
    description: "Precise brow shaping using traditional threading for a perfect arch.",
    duration: "15 min",
    price: "NPR 200",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop&q=80",
    accent: "bg-green-100 text-green-600",
  },
  {
    title: "Bridal Package",
    description: "Complete bridal makeover: hair, makeup, and nail art for your special day.",
    duration: "240 min",
    price: "NPR 12,000",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop&q=80",
    accent: "bg-amber-100 text-amber-600",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const ServiceCard = ({ service }) => (
  <motion.div
    variants={cardVariants}
    whileHover={{ y: -8, transition: { duration: 0.25 } }}
    className="card overflow-hidden flex flex-col cursor-pointer group"
  >
    {/* Image */}
    <div className="relative h-48 overflow-hidden">
      <img
        src={service.image}
        alt={service.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-berry-700/40 to-transparent" />
    </div>

    {/* Content */}
    <div className="p-5 flex flex-col gap-3 flex-1">
      <h3 className="font-display text-lg font-semibold text-berry-500 group-hover:text-berry-400 transition-colors">
        {service.title}
      </h3>
      <p className="font-body text-sm text-berry-400 leading-relaxed flex-1">
        {service.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-blush-100">
        <span className="text-xs text-berry-300 font-body">⏱ {service.duration}</span>
        <span className="font-display font-semibold text-berry-500 text-sm">{service.price}</span>
      </div>

      <Link
        to="/book"
        className="btn-primary w-full text-center text-sm py-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        Book Now
      </Link>
    </div>
  </motion.div>
);

const FeatureGrid = () => (
  <section className="py-20 bg-cream">
    <div className="section-wrapper">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <span className="badge mb-4 inline-block">Our Services</span>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-berry-500 mb-4">
          Indulge in <span className="italic text-blush-400">Pure Beauty</span>
        </h2>
        <p className="font-body text-berry-400 text-lg max-w-xl mx-auto leading-relaxed">
          From everyday care to bridal transformations — every service is crafted with love and precision.
        </p>
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {services.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center mt-12"
      >
        <Link to="/book" className="btn-primary text-base px-8 py-4">
          Book Your Appointment 🌸
        </Link>
      </motion.div>
    </div>
  </section>
);

export default FeatureGrid;
