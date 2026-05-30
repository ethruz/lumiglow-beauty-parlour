// src/components/Footer.jsx
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-berry-700">

      {/* ── Main Footer ── */}
      <div className="section-wrapper py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1 — Brand */}
          <div className="flex flex-col gap-4">
            <span className="font-display text-2xl font-bold text-white">
              Lumi<span className="text-blush-400">Glow</span>
            </span>
            <p className="font-body text-berry-300 text-sm leading-relaxed">
              Kathmandu's premium beauty parlour — where expert care meets modern elegance.
              Your glow is our passion.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-2">
              {/* Facebook */}
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-blush-400 flex items-center justify-center transition-colors duration-200">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-blush-400 flex items-center justify-center transition-colors duration-200">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
                </svg>
              </a>
              {/* TikTok */}
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-blush-400 flex items-center justify-center transition-colors duration-200">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.54V6.78a4.85 4.85 0 01-1.02-.09z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 — Pages */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-base font-bold text-white">Pages</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Home",      to: "/" },
                { label: "Services",  to: "/services" },
                { label: "Book Now",  to: "/book" },
                { label: "Dashboard", to: "/dashboard" },
                { label: "Login",     to: "/login" },
                { label: "Sign Up",   to: "/register" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="font-body text-sm text-berry-300 hover:text-blush-400 transition-colors duration-200 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3 — Services */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-base font-bold text-white">Our Services</h4>
            <div className="flex flex-col gap-2">
              {[
                "Haircut & Style",
                "Facial Treatment",
                "Manicure & Pedicure",
                "Hair Coloring",
                "Eyebrow Threading",
                "Bridal Package",
              ].map((svc) => (
                <Link
                  key={svc}
                  to="/book"
                  className="font-body text-sm text-berry-300 hover:text-blush-400 transition-colors duration-200 w-fit"
                >
                  {svc}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4 — Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-base font-bold text-white">Contact Us</h4>
            <div className="flex flex-col gap-3">
              {/* Address */}
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 text-blush-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span className="font-body text-sm text-berry-300 leading-relaxed">
                  Thamel Marg, Kathmandu<br />Bagmati Province, Nepal
                </span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-blush-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <a href="tel:+97714567890" className="font-body text-sm text-berry-300 hover:text-blush-400 transition-colors">
                  +977-1-4567890
                </a>
              </div>

              {/* Mobile */}
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-blush-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                  <line x1="12" y1="18" x2="12.01" y2="18" strokeLinecap="round"/>
                </svg>
                <a href="tel:+9779801234567" className="font-body text-sm text-berry-300 hover:text-blush-400 transition-colors">
                  +977-980-1234567
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-blush-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <a href="mailto:hello@lumiglow.com.np" className="font-body text-sm text-berry-300 hover:text-blush-400 transition-colors">
                  hello@lumiglow.com.np
                </a>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 text-blush-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2"/>
                </svg>
                <span className="font-body text-sm text-berry-300 leading-relaxed">
                  Sun–Fri: 9:00 AM – 6:00 PM<br/>
                  Saturday: 10:00 AM – 4:00 PM
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-white/10">
        <div className="section-wrapper py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-berry-400">
            © 2026 LumiGlow Beauty Parlour. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="font-body text-xs text-berry-400 hover:text-blush-400 transition-colors">
              Privacy Policy
            </a>
            <span className="text-berry-600">·</span>
            <a href="#" className="font-body text-xs text-berry-400 hover:text-blush-400 transition-colors">
              Terms of Service
            </a>
            <span className="text-berry-600">·</span>
            <a href="#" className="font-body text-xs text-berry-400 hover:text-blush-400 transition-colors">
              FAQ
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
