// src/pages/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { signup }   = useAuth();
  const navigate     = useNavigate();
  const [form, setForm]         = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);
  const [apiError, setApiError] = useState("");

  const validate = () => {
    const e = {};
    if (!form.name || form.name.trim().length < 2) e.name = "Name must be at least 2 characters";
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (form.phone && !/^[0-9]{10}$/.test(form.phone)) e.phone = "Phone must be 10 digits";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8) e.password = "At least 8 characters";
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(form.password))
      e.password = "Must contain uppercase, lowercase and a number";
    if (!form.confirm) e.confirm = "Please confirm your password";
    else if (form.confirm !== form.password) e.confirm = "Passwords do not match";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setLoading(true);
    try {
      await signup(form.name.trim(), form.email, form.password, form.phone || undefined);
      navigate("/dashboard");
    } catch (err) {
      setApiError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const field = (key) => ({
    value: form[key],
    onChange: (e) => { setForm({ ...form, [key]: e.target.value }); setErrors({ ...errors, [key]: "" }); },
  });

  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center pt-20 px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="card p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-4">
              <span className="font-display text-2xl font-bold text-berry-500">
                Lumi<span className="text-blush-400">Glow</span>
              </span>
            </Link>
            <h1 className="font-display text-3xl font-bold text-berry-500 mb-1">Create Account</h1>
            <p className="font-body text-berry-400 text-sm">Join LumiGlow today</p>
          </div>

          {apiError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-body text-center">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Full Name */}
            <div>
              <label className="font-body text-sm font-medium text-berry-500 mb-1 block">Full Name *</label>
              <input type="text" placeholder="Your full name" className="input-field" {...field("name")} />
              {errors.name && <p className="text-red-500 text-xs mt-1 font-body">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="font-body text-sm font-medium text-berry-500 mb-1 block">Email Address *</label>
              <input type="email" placeholder="you@example.com" className="input-field" {...field("email")} />
              {errors.email && <p className="text-red-500 text-xs mt-1 font-body">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="font-body text-sm font-medium text-berry-500 mb-1 block">
                Phone Number <span className="text-berry-300 font-normal">(optional)</span>
              </label>
              <input type="tel" placeholder="10-digit phone number" className="input-field" {...field("phone")} />
              {errors.phone && <p className="text-red-500 text-xs mt-1 font-body">{errors.phone}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="font-body text-sm font-medium text-berry-500 mb-1 block">Password *</label>
              <input type="password" placeholder="Min 8 chars, uppercase + number" className="input-field" {...field("password")} />
              {errors.password && <p className="text-red-500 text-xs mt-1 font-body">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="font-body text-sm font-medium text-berry-500 mb-1 block">Confirm Password *</label>
              <input type="password" placeholder="Repeat your password" className="input-field" {...field("confirm")} />
              {errors.confirm && <p className="text-red-500 text-xs mt-1 font-body">{errors.confirm}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center font-body text-sm text-berry-400 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blush-500 font-medium hover:text-blush-600">Sign In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
