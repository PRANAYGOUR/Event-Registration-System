const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const JWT_SECRET = process.env.JWT_SECRET || "change_this_in_prod";

// Admin login route
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ msg: "Email and password required" });

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ msg: "Invalid credentials" });

    if (admin.password !== password)
      return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id, email: admin.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ 
      token, 
      admin: { 
        id: admin._id, 
        email: admin.email,
        role: "admin" 
      } 
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
