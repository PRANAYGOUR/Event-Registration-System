require("dotenv").config();
const Admin = require("../models/Admin");
const connectDB = require("../utils/db");

async function makeAdmin() {
  try {
    await connectDB();

    const email = process.env.ADMIN_EMAIL || "admin@example.com";
    const password = process.env.ADMIN_PASSWORD || "123";

    await Admin.deleteOne({ email });
    const admin = new Admin({ email, password });
    await admin.save();

    console.log("✅ Admin created successfully:");
    console.log("Email:", email);
    console.log("Password:", password);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating admin:", err);
    process.exit(1);
  }
}

makeAdmin();
