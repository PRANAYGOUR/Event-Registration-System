import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API, { setAuthToken } from "../utils/api";
import studentImage from "../assets/student.jpg"; // adjust path if needed

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "student"; // student/admin

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      const { token, user } = res.data;

      if (role === "admin" && user.role !== "admin") {
        setMsg("Invalid admin credentials");
        return;
      }

      if (role === "student" && user.role !== "student") {
        setMsg("Invalid student credentials");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setAuthToken(token);
      setUser(user);

      nav(user.role === "admin" ? "/admin" : "/");
    } catch (err) {
      setMsg(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.imageContainer}>
        <img src={studentImage} alt="Login" style={styles.image} />
      </div>

      <div style={styles.formContainer}>
        <h2 style={{ marginBottom: 20 }}>
          {role === "admin" ? "Admin" : "Student"} Login
        </h2>
        {msg && <div style={{ color: "red", marginBottom: 15 }}>{msg}</div>}
        <form onSubmit={submit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.btn}>
            Login
          </button>
          {role === "student" && (
            <button
              type="button"
              style={styles.btnSecondary}
              onClick={() => nav("/register")}
            >
              Sign Up
            </button>
          )}
          <button
            type="button"
            style={styles.btnBack}
            onClick={() => nav("/")}
          >
            Back
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "80vh",
    fontFamily: "Arial, sans-serif",
    background: "#f5f5f5",
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "0 15px 15px 0",
  },
  formContainer: {
    flex: 1,
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "15px 0 0 15px",
    boxShadow: "0 0 20px rgba(0,0,0,0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    maxWidth: "350px",
    gap: "15px",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  btn: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    backgroundColor: "#2c3e50",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  btnSecondary: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    backgroundColor: "#34495e",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  btnBack: {
    padding: "10px",
    fontSize: "14px",
    borderRadius: "8px",
    backgroundColor: "#bdc3c7",
    color: "#2c3e50",
    border: "none",
    cursor: "pointer",
    marginTop: "10px",
  },
};
