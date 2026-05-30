// src/pages/BookingPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import TimeSlotPicker from "../components/TimeSlotPicker";
import api from "../utils/api";

const STEPS = ["Service", "Date & Slot", "Confirm"];

const BookingPage = () => {
  const { user }     = useAuth();
  const navigate     = useNavigate();

  const [step, setStep]               = useState(0);
  const [services, setServices]       = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate]       = useState("");
  const [slots, setSlots]             = useState([]);
  const [selectedSlot, setSelectedSlot]       = useState(null);
  const [notes, setNotes]             = useState("");
  const [loading, setLoading]         = useState(false);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [success, setSuccess]         = useState(false);
  const [error, setError]             = useState("");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  // Fetch services on mount
  useEffect(() => {
    api.get("/services").then((res) => setServices(res.data.data.services));
  }, []);

  // Fetch slots when service + date selected
  useEffect(() => {
    if (!selectedService || !selectedDate) return;
    setSlotsLoading(true);
    setSelectedSlot(null);
    api.get(`/services/${selectedService.id}/slots?date=${selectedDate}`)
      .then((res) => setSlots(res.data.data.slots))
      .catch(() => setSlots([]))
      .finally(() => setSlotsLoading(false));
  }, [selectedService, selectedDate]);

  // Get today's date in YYYY-MM-DD for min date
  const today = new Date().toISOString().split("T")[0];

  const handleBook = async () => {
    setError("");
    setLoading(true);
    try {
      await api.post("/bookings", {
        serviceId:  selectedService.id,
        timeSlotId: selectedSlot.id,
        date:       selectedDate,
        notes:      notes || undefined,
      });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Success screen
  if (success) {
    return (
      <div className="min-h-screen bg-hero-gradient flex items-center justify-center pt-20 px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="card p-10 text-center max-w-md w-full"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="text-6xl mb-4"
          >
            🎉
          </motion.div>
          <h2 className="font-display text-3xl font-bold text-berry-500 mb-2">Booked!</h2>
          <p className="font-body text-berry-400 mb-2">
            <strong>{selectedService.name}</strong>
          </p>
          <p className="font-body text-berry-400 mb-6">
            {selectedDate} at {selectedSlot.label}
          </p>
          <button onClick={() => navigate("/dashboard")} className="btn-primary w-full">
            View My Appointments
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pt-24 pb-12 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <span className="badge mb-3 inline-block">Book Appointment</span>
          <h1 className="font-display text-4xl font-bold text-berry-500">
            Choose Your <span className="italic text-blush-400">Service</span>
          </h1>
        </motion.div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-body font-bold transition-all duration-300 ${
                i < step ? "bg-berry-500 text-white" :
                i === step ? "bg-blush-400 text-white" :
                "bg-blush-100 text-berry-400"
              }`}>
                {i < step ? "✓" : i + 1}
              </div>
              <span className={`text-xs font-body hidden sm:block ${i === step ? "text-berry-500 font-medium" : "text-berry-300"}`}>
                {s}
              </span>
              {i < STEPS.length - 1 && <div className={`w-8 h-0.5 ${i < step ? "bg-berry-500" : "bg-blush-200"}`} />}
            </div>
          ))}
        </div>

        <div className="card p-6 md:p-8">

          {/* STEP 0 — Choose Service */}
          {step === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="font-display text-xl font-bold text-berry-500 mb-4">Select a Service</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map((svc) => (
                  <motion.button
                    key={svc.id}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setSelectedService(svc); setStep(1); }}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                      selectedService?.id === svc.id
                        ? "border-berry-500 bg-blush-50"
                        : "border-blush-200 bg-white hover:border-blush-400"
                    }`}
                  >
                    <p className="font-body font-semibold text-berry-500 text-sm">{svc.name}</p>
                    <p className="font-body text-xs text-berry-400 mt-1">{svc.duration} min</p>
                    <p className="font-display font-bold text-blush-500 mt-1">NPR {Number(svc.price).toLocaleString()}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 1 — Choose Date & Slot */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <button onClick={() => setStep(0)} className="text-berry-400 hover:text-berry-500 font-body text-sm">
                  ← Back
                </button>
                <h2 className="font-display text-xl font-bold text-berry-500">
                  {selectedService?.name}
                </h2>
              </div>

              {/* Date Picker */}
              <div>
                <label className="font-body text-sm font-medium text-berry-500 mb-2 block">
                  Select Date
                </label>
                <input
                  type="date"
                  min={today}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="input-field"
                />
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <div>
                  <label className="font-body text-sm font-medium text-berry-500 mb-2 block">
                    Select Time Slot
                  </label>
                  {slotsLoading ? (
                    <p className="font-body text-sm text-berry-400 text-center py-4">Loading slots...</p>
                  ) : (
                    <TimeSlotPicker
                      slots={slots}
                      selectedSlot={selectedSlot}
                      onSelect={setSelectedSlot}
                    />
                  )}
                </div>
              )}

              <button
                disabled={!selectedDate || !selectedSlot}
                onClick={() => setStep(2)}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue →
              </button>
            </motion.div>
          )}

          {/* STEP 2 — Confirm */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <button onClick={() => setStep(1)} className="text-berry-400 hover:text-berry-500 font-body text-sm">
                  ← Back
                </button>
                <h2 className="font-display text-xl font-bold text-berry-500">Confirm Booking</h2>
              </div>

              {/* Summary */}
              <div className="bg-blush-50 rounded-2xl p-5 flex flex-col gap-3">
                <div className="flex justify-between">
                  <span className="font-body text-sm text-berry-400">Service</span>
                  <span className="font-body text-sm font-semibold text-berry-500">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-body text-sm text-berry-400">Date</span>
                  <span className="font-body text-sm font-semibold text-berry-500">{selectedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-body text-sm text-berry-400">Time</span>
                  <span className="font-body text-sm font-semibold text-berry-500">{selectedSlot?.label}</span>
                </div>
                <div className="flex justify-between border-t border-blush-200 pt-3">
                  <span className="font-body text-sm text-berry-400">Total</span>
                  <span className="font-display font-bold text-blush-500">
                    NPR {Number(selectedService?.price).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="font-body text-sm font-medium text-berry-500 mb-1 block">
                  Notes <span className="text-berry-300 font-normal">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Any special requests or notes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="input-field resize-none"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-body text-center">
                  {error}
                </div>
              )}

              <button
                onClick={handleBook}
                disabled={loading}
                className="btn-primary w-full py-4 text-base disabled:opacity-60"
              >
                {loading ? "Booking..." : "Confirm Booking 🌸"}
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
