import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import "./../styles/main.css";

export default function StudentSignup({ setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", { name, email, password });
      const { token, user } = res.data;

      // Default role is student
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      nav("/events");
    } catch (err) {
      setMsg(err.response?.data?.message || "Sign up failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <img
          src="https://source.unsplash.com/500x500/?student,signup"
          alt="Signup"
        />
      </div>
      <div className="auth-right">
        <h2>Student Sign Up</h2>
        {msg && <div className="error-msg">{msg}</div>}
        <form onSubmit={submit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <button type="submit">Sign Up</button>
          <button type="button" className="back-btn" onClick={() => nav("/")}>
            Back
          </button>
        </form>
      </div>
    </div>
  );
}
