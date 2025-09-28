import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API, { setAuthToken } from "../utils/api";
import "./../styles/main.css";

export default function StudentLogin({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      const { token, user } = res.data;

      if (user.role !== "student") {
        setMsg("Invalid credentials for student login");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setAuthToken(token);
      setUser(user);

      nav("/events");
    } catch (err) {
      setMsg(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <img
          src="https://source.unsplash.com/500x500/?student,event"
          alt="Student"
        />
      </div>
      <div className="auth-right">
        <h2>Student Login</h2>
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
        <button className="signup-btn" onClick={() => nav("/student/signup")}>
          Sign Up
        </button>
      </div>
    </div>
  );
}
