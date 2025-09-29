import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin, setAuthToken } from "../utils/api"; // ⬅️ use adminLogin
import "./../styles/main.css";

export default function AdminLogin({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      // ⬅️ call admin login API
      const res = await adminLogin({ email, password });
      const { token, admin } = res.data;

      // store admin token separately
      localStorage.setItem("adminToken", token);
      localStorage.setItem("admin", JSON.stringify(admin));
      setAuthToken(token);
      setUser(admin);

      nav("/admin"); // redirect to admin dashboard
    } catch (err) {
      setMsg(err.response?.data?.msg || "Admin login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <img
          src="https://source.unsplash.com/500x500/?admin,office"
          alt="Admin"
        />
      </div>
      <div className="auth-right">
        <h2>Admin Login</h2>
        {msg && <div className="error-msg">{msg}</div>}
        <form onSubmit={submit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          <button type="button" className="back-btn" onClick={() => nav("/")}>
            Back
          </button>
        </form>
      </div>
    </div>
  );
}
