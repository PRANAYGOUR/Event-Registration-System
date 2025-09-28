import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const nav = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Event Registration</h1>
        <div style={styles.buttonContainer}>
          <button style={styles.btn} onClick={() => nav("/login?role=student")}>
            Student Login
          </button>
          <button style={styles.btn} onClick={() => nav("/login?role=admin")}>
            Admin Login
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
    background: "#f5f5f5",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    textAlign: "center",
    padding: "50px",
    background: "#fff",
    borderRadius: "15px",
    boxShadow: "0 0 20px rgba(0,0,0,0.1)",
  },
  title: {
    marginBottom: "40px",
    fontSize: "36px",
    color: "#2c3e50",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  btn: {
    padding: "15px 30px",
    fontSize: "18px",
    backgroundColor: "#2c3e50",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "0.3s",
  },
};
