require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const connectDB = require('../utils/db');

async function makeAdmin() {
  try {
    await connectDB();

    const email = process.env.ADMIN_EMAIL || 'admin@example.com';
    const name = process.env.ADMIN_NAME || 'Admin';
    const password = process.env.ADMIN_PASSWORD || 'Admin@123';

    const existing = await User.findOne({ email });
    if (existing) {
      console.log('Admin already exists:', existing.email);
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Use passwordHash because your schema requires it
    const admin = new User({ name, email, passwordHash, role: 'admin' });
    await admin.save();

    console.log('✅ Admin user created:');
    console.log('Email:', email);
    console.log('Password:', password);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

makeAdmin();
