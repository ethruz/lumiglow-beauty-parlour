// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

const statusColors = {
  PENDING:   "bg-yellow-100 text-yellow-700 border-yellow-200",
  CONFIRMED: "bg-green-100 text-green-700 border-green-200",
  CANCELLED: "bg-red-100 text-red-500 border-red-200",
  COMPLETED: "bg-blue-100 text-blue-700 border-blue-200",
};

const Dashboard = () => {
  const { user, logout }              = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [cancelling, setCancelling]   = useState(null);
  const [error, setError]             = useState("");

  const fetchAppointments = async () => {
    try {
      const res = await api.get("/bookings/my");
      setAppointments(res.data.data.appointments);
    } catch {
      setError("Failed to load appointments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAppointments(); }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
    setCancelling(id);
    try {
      await api.delete(`/bookings/${id}`);
      setAppointments((prev) =>
        prev.map((a) => a.id === id ? { ...a, status: "CANCELLED" } : a)
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to cancel.");
    } finally {
      setCancelling(null);
    }
  };

  const upcoming = appointments.filter((a) => ["PENDING", "CONFIRMED"].includes(a.status));
  const past     = appointments.filter((a) => ["CANCELLED", "COMPLETED"].includes(a.status));

  return (
    <div className="min-h-screen bg-cream pt-24 pb-12 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-display text-3xl font-bold text-berry-500">
                My Appointments
              </h1>
              <p className="font-body text-berry-400 mt-1">
                Welcome back, <strong>{user?.name}</strong> 🌸
              </p>
            </div>
            <Link to="/book" className="btn-primary text-sm px-5 py-2">
              + New Booking
            </Link>
          </div>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <p className="font-body text-berry-400">Loading your appointments...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 font-body text-sm mb-6">
            {error}
          </div>
        )}

        {/* Empty state */}
        {!loading && appointments.length === 0 && (
          <div className="card p-12 text-center">
            <div className="text-5xl mb-4">📅</div>
            <h3 className="font-display text-xl font-bold text-berry-500 mb-2">No appointments yet</h3>
            <p className="font-body text-berry-400 mb-6">Book your first service today!</p>
            <Link to="/book" className="btn-primary px-8">Book Now 🌸</Link>
          </div>
        )}

        {/* Upcoming */}
        {upcoming.length > 0 && (
          <div className="mb-8">
            <h2 className="font-display text-lg font-bold text-berry-500 mb-4">
              Upcoming ({upcoming.length})
            </h2>
            <div className="flex flex-col gap-4">
              <AnimatePresence>
                {upcoming.map((apt) => (
                  <motion.div
                    key={apt.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-body font-semibold text-berry-500">
                          {apt.service.name}
                        </h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-body ${statusColors[apt.status]}`}>
                          {apt.status}
                        </span>
                      </div>
                      <p className="font-body text-sm text-berry-400">
                        📅 {new Date(apt.date).toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" })}
                        {" · "}
                        🕐 {apt.timeSlot.label}
                      </p>
                      <p className="font-display font-semibold text-blush-500 text-sm">
                        NPR {Number(apt.service.price).toLocaleString()}
                      </p>
                    </div>

                    <button
                      onClick={() => handleCancel(apt.id)}
                      disabled={cancelling === apt.id}
                      className="btn-outline text-sm py-2 px-4 border-red-300 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 disabled:opacity-50"
                    >
                      {cancelling === apt.id ? "Cancelling..." : "Cancel"}
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Past */}
        {past.length > 0 && (
          <div>
            <h2 className="font-display text-lg font-bold text-berry-400 mb-4">
              Past Appointments ({past.length})
            </h2>
            <div className="flex flex-col gap-3">
              {past.map((apt) => (
                <div key={apt.id} className="card p-5 opacity-70">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-body font-semibold text-berry-400">{apt.service.name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-body ${statusColors[apt.status]}`}>
                          {apt.status}
                        </span>
                      </div>
                      <p className="font-body text-xs text-berry-300 mt-1">
                        {new Date(apt.date).toLocaleDateString()} · {apt.timeSlot.label}
                      </p>
                    </div>
                    <span className="font-display text-sm text-berry-400">
                      NPR {Number(apt.service.price).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
