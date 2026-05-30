// src/components/FeatureGrid.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const services = [
  {
    icon: "✂️",
    title: "Haircut & Style",
    description: "Precision cuts tailored to your face shape with professional styling.",
    duration: "60 min",
    price: "NPR 800",
    color: "from-pink-50 to-rose-50",
    accent: "bg-pink-100 text-pink-600",
  },
  {
    icon: "✨",
    title: "Facial Treatment",
    description: "Deep cleansing facial with luxurious moisturizing mask for glowing skin.",
    duration: "45 min",
    price: "NPR 1,200",
    color: "from-blush-50 to-rose-mist",
    accent: "bg-blush-100 text-blush-600",
  },
  {
    icon: "💅",
    title: "Manicure & Pedicure",
    description: "Complete nail care for hands and feet with premium polish options.",
    duration: "90 min",
    price: "NPR 1,500",
    color: "from-rose-50 to-pink-50",
    accent: "bg-rose-100 text-rose-600",
  },
  {
    icon: "🎨",
    title: "Hair Coloring",
    description: "Full color service using premium, long-lasting dye with conditioning.",
    duration: "120 min",
    price: "NPR 3,000",
    color: "from-purple-50 to-pink-50",
    accent: "bg-purple-100 text-purple-600",
  },
  {
    icon: "🌿",
    title: "Eyebrow Threading",
    description: "Precise brow shaping using traditional threading for a perfect arch.",
    duration: "15 min",
    price: "NPR 200",
    color: "from-green-50 to-emerald-50",
    accent: "bg-green-100 text-green-600",
  },
  {
    icon: "👰",
    title: "Bridal Package",
    description: "Complete bridal makeover: hair, makeup, and nail art for your special day.",
    duration: "240 min",
    price: "NPR 12,000",
    color: "from-yellow-50 to-amber-50",
    accent: "bg-amber-100 text-amber-600",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const ServiceCard = ({ service, index }) => (
  <motion.div
    variants={cardVariants}
    whileHover={{ y: -8, transition: { duration: 0.25 } }}
    className="card p-6 flex flex-col gap-4 cursor-pointer group"
  >
    {/* Icon */}
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${service.accent} bg-opacity-60`}>
      {service.icon}
    </div>

    {/* Content */}
    <div className="flex-1">
      <h3 className="font-display text-lg font-semibold text-berry-500 mb-2 group-hover:text-berry-400 transition-colors">
        {service.title}
      </h3>
      <p className="font-body text-sm text-berry-400 leading-relaxed">
        {service.description}
      </p>
    </div>

    {/* Footer */}
    <div className="flex items-center justify-between pt-3 border-t border-blush-100">
      <div className="flex items-center gap-2">
        <span className="text-xs text-berry-300 font-body">⏱ {service.duration}</span>
      </div>
      <span className="font-display font-semibold text-berry-500 text-sm">
        {service.price}
      </span>
    </div>

    {/* Hover CTA */}
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      whileHover={{ opacity: 1, height: "auto" }}
      className="overflow-hidden"
    >
      <Link
        to="/book"
        className="btn-primary w-full text-center text-sm py-2 block mt-1"
      >
        Book Now
      </Link>
    </motion.div>
  </motion.div>
);

const FeatureGrid = () => {
  return (
    <section className="py-20 bg-cream">
      <div className="section-wrapper">

        {/* Section Header */}
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
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
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
};

export default FeatureGrid;
