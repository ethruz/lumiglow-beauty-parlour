// src/pages/AdminDashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

const statusColors = {
  PENDING:   "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-500",
  COMPLETED: "bg-blue-100 text-blue-700",
};

// ── Stat Card ──
const StatCard = ({ title, value, sub, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="card p-6"
  >
    <p className="font-body text-sm text-berry-400 mb-1">{title}</p>
    <p className={`font-display text-3xl font-bold ${color || "text-berry-500"}`}>{value}</p>
    {sub && <p className="font-body text-xs text-berry-300 mt-1">{sub}</p>}
  </motion.div>
);

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate         = useNavigate();

  const [data, setData]           = useState(null);
  const [services, setServices]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [editingService, setEditingService] = useState(null);
  const [editForm, setEditForm]   = useState({});
  const [saving, setSaving]       = useState(false);
  const [saveMsg, setSaveMsg]     = useState("");

  // Redirect non-admins
  useEffect(() => {
    if (user && user.role !== "ADMIN") navigate("/dashboard");
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const [dashRes, svcRes] = await Promise.all([
        api.get("/admin/dashboard"),
        api.get("/admin/services"),
      ]);
      setData(dashRes.data.data);
      setServices(svcRes.data.data.services);
    } catch { /* error handled by interceptor */ }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  // ── Service edit ──
  const startEdit = (svc) => {
    setEditingService(svc.id);
    setEditForm({
      name:        svc.name,
      description: svc.description,
      duration:    svc.duration,
      price:       svc.price,
      isActive:    svc.isActive,
    });
    setSaveMsg("");
  };

  const saveService = async (id) => {
    setSaving(true);
    setSaveMsg("");
    try {
      const res = await api.patch(`/admin/services/${id}`, editForm);
      setServices((prev) => prev.map((s) => s.id === id ? res.data.data.service : s));
      setEditingService(null);
      setSaveMsg("Saved!");
    } catch (err) {
      setSaveMsg(err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
      setTimeout(() => setSaveMsg(""), 3000);
    }
  };

  // ── Booking status update ──
  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/admin/bookings/${id}/status`, { status });
      setData((prev) => ({
        ...prev,
        recentAppointments: prev.recentAppointments.map((a) =>
          a.id === id ? { ...a, status } : a
        ),
      }));
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-cream pt-20">
      <p className="font-display text-xl text-berry-400 animate-pulse">Loading dashboard...</p>
    </div>
  );

  const { stats, serviceBreakdown, recentAppointments, weekRange } = data || {};

  const tabs = ["overview", "services", "bookings"];

  return (
    <div className="min-h-screen bg-cream pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-berry-500">Admin Dashboard</h1>
            <p className="font-body text-berry-400 text-sm mt-1">
              Week: {weekRange?.from} → {weekRange?.to}
            </p>
          </div>
          <button onClick={() => { logout(); navigate("/"); }} className="btn-outline text-sm py-2 px-4">
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-blush-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 font-body text-sm font-medium capitalize transition-all border-b-2 -mb-px ${
                activeTab === tab
                  ? "border-berry-500 text-berry-500"
                  : "border-transparent text-berry-400 hover:text-berry-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW TAB ── */}
        {activeTab === "overview" && (
          <div className="flex flex-col gap-8">

            {/* Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <StatCard title="This Week's Bookings" value={stats?.weeklyBookings} sub="Confirmed + Completed" color="text-berry-500" />
              <StatCard title="Weekly Revenue" value={`NPR ${stats?.weeklyRevenue?.toLocaleString()}`} color="text-blush-500" />
              <StatCard title="Total Bookings" value={stats?.totalBookings} sub="All time" />
              <StatCard title="Total Revenue" value={`NPR ${stats?.totalRevenue?.toLocaleString()}`} sub="All time" color="text-green-600" />
              <StatCard title="Total Clients" value={stats?.totalUsers} sub="Registered users" />
              <StatCard title="Pending" value={stats?.pendingCount} sub="Awaiting confirmation" color="text-yellow-600" />
            </div>

            {/* Service Breakdown */}
            <div className="card p-6">
              <h2 className="font-display text-xl font-bold text-berry-500 mb-4">
                Bookings by Service
              </h2>
              {serviceBreakdown?.length === 0 ? (
                <p className="font-body text-sm text-berry-400">No bookings yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm font-body">
                    <thead>
                      <tr className="border-b border-blush-100">
                        <th className="text-left py-2 text-berry-400 font-medium">Service</th>
                        <th className="text-right py-2 text-berry-400 font-medium">Bookings</th>
                        <th className="text-right py-2 text-berry-400 font-medium">Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {serviceBreakdown?.map((row) => (
                        <tr key={row.service?.id} className="border-b border-blush-50 hover:bg-blush-50 transition-colors">
                          <td className="py-3 text-berry-500 font-medium">{row.service?.name}</td>
                          <td className="py-3 text-right text-berry-500">{row.bookings}</td>
                          <td className="py-3 text-right text-blush-500 font-semibold">
                            NPR {row.revenue?.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── SERVICES TAB ── */}
        {activeTab === "services" && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-berry-500">Manage Services</h2>
              {saveMsg && (
                <span className={`font-body text-sm px-3 py-1 rounded-full ${saveMsg === "Saved!" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                  {saveMsg}
                </span>
              )}
            </div>

            {services.map((svc) => (
              <motion.div
                key={svc.id}
                layout
                className="card p-5"
              >
                {editingService === svc.id ? (
                  // Edit mode
                  <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-body text-xs font-medium text-berry-400 mb-1 block">Name</label>
                        <input
                          className="input-field text-sm"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="font-body text-xs font-medium text-berry-400 mb-1 block">Price (NPR)</label>
                        <input
                          type="number"
                          className="input-field text-sm"
                          value={editForm.price}
                          onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="font-body text-xs font-medium text-berry-400 mb-1 block">Duration (min)</label>
                        <input
                          type="number"
                          className="input-field text-sm"
                          value={editForm.duration}
                          onChange={(e) => setEditForm({ ...editForm, duration: e.target.value })}
                        />
                      </div>
                      <div className="flex items-center gap-3 mt-4">
                        <label className="font-body text-sm font-medium text-berry-500">Available to customers</label>
                        <button
                          onClick={() => setEditForm({ ...editForm, isActive: !editForm.isActive })}
                          className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${editForm.isActive ? "bg-berry-500" : "bg-gray-300"}`}
                        >
                          <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${editForm.isActive ? "left-7" : "left-1"}`} />
                        </button>
                        <span className={`text-xs font-body font-medium ${editForm.isActive ? "text-green-600" : "text-red-500"}`}>
                          {editForm.isActive ? "Active" : "Hidden"}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="font-body text-xs font-medium text-berry-400 mb-1 block">Description</label>
                      <textarea
                        rows={2}
                        className="input-field text-sm resize-none"
                        value={editForm.description}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      />
                    </div>
                    <div className="flex gap-2 mt-1">
                      <button
                        onClick={() => saveService(svc.id)}
                        disabled={saving}
                        className="btn-primary text-sm py-2 px-5 disabled:opacity-60"
                      >
                        {saving ? "Saving..." : "Save Changes"}
                      </button>
                      <button
                        onClick={() => setEditingService(null)}
                        className="btn-outline text-sm py-2 px-4"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View mode
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-body font-semibold text-berry-500">{svc.name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-body font-medium ${svc.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-500"}`}>
                          {svc.isActive ? "Active" : "Hidden"}
                        </span>
                      </div>
                      <p className="font-body text-xs text-berry-400">{svc.duration} min · {svc.description}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-display font-bold text-blush-500">
                        NPR {Number(svc.price).toLocaleString()}
                      </span>
                      <button
                        onClick={() => startEdit(svc)}
                        className="btn-outline text-xs py-1.5 px-3"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* ── BOOKINGS TAB ── */}
        {activeTab === "bookings" && (
          <div className="flex flex-col gap-4">
            <h2 className="font-display text-xl font-bold text-berry-500">Recent Appointments</h2>

            {recentAppointments?.length === 0 ? (
              <div className="card p-8 text-center">
                <p className="font-body text-berry-400">No appointments yet.</p>
              </div>
            ) : (
              recentAppointments?.map((apt) => (
                <div key={apt.id} className="card p-5">
                  <div className="flex items-start justify-between flex-wrap gap-3">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-body font-semibold text-berry-500">{apt.user?.name}</span>
                        <span className="font-body text-xs text-berry-400">{apt.user?.email}</span>
                        {apt.user?.phone && <span className="font-body text-xs text-berry-400">· {apt.user.phone}</span>}
                      </div>
                      <p className="font-body text-sm text-berry-500">
                        {apt.service?.name} · {apt.timeSlot?.label}
                      </p>
                      <p className="font-body text-xs text-berry-400">
                        {new Date(apt.date).toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" })}
                        {" · "}NPR {Number(apt.service?.price).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-body font-medium ${statusColors[apt.status]}`}>
                        {apt.status}
                      </span>
                      <select
                        value={apt.status}
                        onChange={(e) => updateStatus(apt.id, e.target.value)}
                        className="text-xs border border-blush-200 rounded-lg px-2 py-1 font-body text-berry-500 bg-white focus:outline-none focus:ring-1 focus:ring-blush-400"
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
