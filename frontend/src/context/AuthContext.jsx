// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [token, setToken]     = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on app load
  useEffect(() => {
    const savedToken = sessionStorage.getItem("token");
    const savedUser  = sessionStorage.getItem("user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    const { user: u, token: t } = res.data.data;
    sessionStorage.setItem("token", t);
    sessionStorage.setItem("user", JSON.stringify(u));
    setUser(u);
    setToken(t);
    return u;
  };

  const signup = async (name, email, password, phone) => {
    const res = await api.post("/auth/signup", { name, email, password, phone });
    const { user: u, token: t } = res.data.data;
    sessionStorage.setItem("token", t);
    sessionStorage.setItem("user", JSON.stringify(u));
    setUser(u);
    setToken(t);
    return u;
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
