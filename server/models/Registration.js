const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['registered', 'cancelled'], default: 'registered' },
  registeredAt: { type: Date, default: Date.now }
});

// prevent duplicate registration for same user & event
RegistrationSchema.index({ event: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Registration', RegistrationSchema);
