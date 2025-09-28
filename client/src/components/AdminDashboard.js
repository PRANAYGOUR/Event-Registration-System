import React, { useEffect, useState } from "react";
import API from "../utils/api";

// Set token for authenticated requests
const token = localStorage.getItem("token");
if (token) API.setAuthToken?.(token); // optional if set in API utils

function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",
    capacity: "",
  });

  // Fetch all events
  const fetchEvents = async () => {
    try {
      const res = await API.get("/events");
      setEvents(res.data);
    } catch (err) {
      console.error("Failed to load events:", err);
    }
  };

  // Fetch all registrations for admin
  const fetchRegistrations = async () => {
    try {
      const res = await API.get("/registrations/all");
      setRegistrations(res.data);
    } catch (err) {
      console.error("Failed to load registrations:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchRegistrations();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit Add Event form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/events", form);
      alert("Event created successfully!");
      setForm({ title: "", description: "", date: "", venue: "", capacity: "" });
      fetchEvents();
    } catch (err) {
      console.error(err);
      alert("Failed to create event");
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#4B0082" }}>Admin Dashboard</h1>

      {/* Add Event Form */}
      <section style={{ marginBottom: "50px", backgroundColor: "#f3f3f3", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
        <h2 style={{ color: "#6A0DAD" }}>Add New Event</h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", maxWidth: "450px", gap: "12px" }}
        >
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
          />
          <input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
          />
          <input
            name="venue"
            placeholder="Venue"
            value={form.venue}
            onChange={handleChange}
            required
            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
          />
          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            value={form.capacity}
            onChange={handleChange}
            required
            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
          />
          <button
            type="submit"
            style={{ marginTop: "10px", backgroundColor: "#4B0082", color: "#fff", border: "none", padding: "12px", borderRadius: "8px", cursor: "pointer" }}
          >
            Create Event
          </button>
        </form>
      </section>

      {/* Events List */}
      <section style={{ marginBottom: "50px" }}>
        <h2 style={{ color: "#6A0DAD" }}>Events</h2>
        {events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {events.map((ev) => (
              <li key={ev._id} style={{ marginBottom: "12px", backgroundColor: "#e8e8ff", padding: "12px", borderRadius: "10px" }}>
                <strong>{ev.title}</strong> — {new Date(ev.date).toLocaleDateString()} at {ev.venue} (Capacity: {ev.capacity})
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Registrations List */}
      <section>
        <h2 style={{ color: "#6A0DAD" }}>Student Registrations</h2>
        {registrations.length === 0 ? (
          <p>No registrations yet.</p>
        ) : (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {registrations.map((ev) => (
              <li key={ev.eventId} style={{ marginBottom: "12px", backgroundColor: "#ffe8f0", padding: "12px", borderRadius: "10px" }}>
                <strong>{ev.title}</strong> ({new Date(ev.date).toLocaleDateString()} at {ev.venue})
                <br />
                Registered Students: {ev.registrations.length > 0 ? ev.registrations.join(", ") : "None"}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default AdminDashboard;
