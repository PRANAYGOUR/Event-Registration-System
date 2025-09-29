import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin, setAuthToken } from "../utils/api";
import "./../styles/main.css";

export default function AdminLogin({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await adminLogin({ email, password });
      const { token, admin } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(admin));
      setAuthToken(token);
      setUser(admin);

      nav("/admin");
    } catch (err) {
      setMsg(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <img src="https://source.unsplash.com/500x500/?admin,office" alt="Admin" />
      </div>
      <div className="auth-right">
        <h2>Admin Login</h2>
        {msg && <div className="error-msg">{msg}</div>}
        <form onSubmit={submit}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Login</button>
          <button type="button" className="back-btn" onClick={() => nav("/")}>Back</button>
        </form>
      </div>
    </div>
  );
}
