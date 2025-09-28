import React, { useEffect, useState } from "react";
import API from "../utils/api";

export default function EventsList({ user }) {
  const [events, setEvents] = useState([]);

  useEffect(() => { fetchEvents(); }, []);

  const fetchEvents = async () => {
    try {
      const res = await API.get("/events");
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const register = async (eventId) => {
    try {
      await API.post(`/registrations/${eventId}`);
      alert("Registered successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to register");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Upcoming Events</h1>
      <div style={styles.cardsContainer}>
        {events.map(ev => (
          <div key={ev._id} style={styles.card}>
            <h3>{ev.title}</h3>
            <p>{ev.description}</p>
            <p>Date: {new Date(ev.date).toLocaleDateString()}</p>
            <p>Venue: {ev.venue}</p>
            <p>Capacity: {ev.capacity}</p>
            <button style={styles.btn} onClick={() => register(ev._id)}>Register</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "20px", fontFamily: "Arial, sans-serif" },
  title: { textAlign: "center", color: "#2c3e50", marginBottom: "30px" },
  cardsContainer: { display: "flex", flexWrap: "wrap", gap: "15px" },
  card: { flex: "1 1 250px", background: "#fff", padding: "15px", borderRadius: "10px", boxShadow: "0 0 15px rgba(0,0,0,0.1)" },
  btn: { padding: "10px", borderRadius: "8px", backgroundColor: "#2c3e50", color: "#fff", border: "none", cursor: "pointer", marginTop: "10px" },
};
