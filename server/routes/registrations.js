// server/routes/registrations.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Event = require("../models/Event");
const User = require("../models/User");

// POST /api/registrations/:eventId → register current user for an event
router.post("/:eventId", auth, async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Initialize registrations array if not present
    event.registrations = event.registrations || [];

    // Check if user is already registered
    if (event.registrations.includes(req.user._id))
      return res.status(400).json({ message: "Already registered" });

    // Add user to event registrations
    event.registrations.push(req.user._id);
    await event.save();

    res.status(200).json({ message: "Registration successful", event });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/registrations → get all events the current user is registered for
router.get("/", auth, async (req, res) => {
  try {
    const events = await Event.find({ registrations: req.user._id }).select(
      "title description date venue capacity registrations"
    );

    // Map to include user-friendly info for frontend
    const formatted = events.map((ev) => ({
      _id: ev._id,
      title: ev.title,
      description: ev.description,
      date: ev.date,
      venue: ev.venue,
      capacity: ev.capacity,
      status: ev.registrations.includes(req.user._id) ? "Registered" : "Pending",
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch registrations" });
  }
});

// GET /api/registrations/all → admin route: fetch all events with all registrations
const adminAuth = require("../middleware/adminAuth");

router.get("/all", adminAuth, async (req, res) => {
  try {
    const events = await Event.find().populate("registrations", "name email").select(
      "title date venue registrations"
    );

    // Format for frontend
    const formatted = events.map((ev) => ({
      eventId: ev._id,
      title: ev.title,
      date: ev.date,
      venue: ev.venue,
      registrations: ev.registrations.map((u) => u.name),
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch registrations" });
  }
});

module.exports = router;
