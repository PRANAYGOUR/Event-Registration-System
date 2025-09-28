const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const auth = require("../middleware/authMiddleware");

// GET all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new event (admin only)
router.post("/", auth, async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

    const { title, description, date, venue, capacity } = req.body;
    const event = new Event({ title, description, date, venue, capacity });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
