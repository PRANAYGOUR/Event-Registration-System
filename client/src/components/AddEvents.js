import { useState } from "react";
import API from "../utils/apis";

function AddEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [capacity, setCapacity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/events", {
        title,
        description,
        date,
        venue,
        capacity,
      });
      alert("Event created successfully!");
      setTitle(""); setDescription(""); setDate(""); setVenue(""); setCapacity("");
    } catch (err) {
      console.error(err);
      alert("Failed to create event.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Event</h2>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <input placeholder="Venue" value={venue} onChange={(e) => setVenue(e.target.value)} required />
      <input type="number" placeholder="Capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} required />
      <button type="submit">Create Event</button>
    </form>
  );
}

export default AddEvent;
