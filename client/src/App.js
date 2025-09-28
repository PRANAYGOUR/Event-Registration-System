import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import EventsList from "./components/EventsList";
import MyRegistrations from "./components/MyRegistrations";
import AdminDashboard from "./components/AdminDashboard";
import LandingPage from "./components/LandingPage";
import { setAuthToken } from "./utils/api";

function App() {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (token) setAuthToken(token);
    return raw ? JSON.parse(raw) : null;
  });

  const navigate = useNavigate(); // ✅ define navigate here

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthToken(token);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthToken(null);
    setUser(null);
    navigate("/"); // ✅ redirect to landing page after logout
  };

  return (
    <div className="container">
  {/* Header: app title + user info + logout */}
  <header
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 20px",
      background: "#f5f5f5",
      borderBottom: "2px solid #ddd"
    }}
  >
    <h1 style={{ fontSize: "26px", fontWeight: "bold", margin: 0, color: "#222" }}>
      Event Registration
    </h1>

    {user && (
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ fontSize: "14px", color: "#555" }}>
          Signed in as: {user.name} ({user.role})
        </span>
        <button
          onClick={logout}
          style={{
            background: "#6a0dad",
            color: "#fff",
            border: "none",
            padding: "7px 12px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
          onMouseOver={(e) => (e.target.style.background = "#4b0082")}
          onMouseOut={(e) => (e.target.style.background = "#6a0dad")}
        >
          Logout
        </button>
      </div>
    )}
  </header>


      <main>
        <Routes>
          {/* Landing page as default */}
          <Route
            path="/"
            element={
              !user ? (
                <LandingPage />
              ) : user.role === "admin" ? (
                <Navigate to="/admin" />
              ) : (
                <EventsList user={user} />
              )
            }
          />

          {/* Login/Signup */}
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />

          {/* Student routes */}
          <Route
            path="/my"
            element={
              user?.role === "student" ? (
                <MyRegistrations user={user} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Admin route */}
          <Route
            path="/admin"
            element={
              user?.role === "admin" ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </main>
    </div>
  );
}

// ✅ wrap App with BrowserRouter in index.js instead of here
export default App;
