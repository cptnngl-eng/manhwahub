// backend/api/auth.js
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// مدل کاربر
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", UserSchema);

// کلید JWT (برای تست می‌تونی ثابت بذاری، در حالت واقعی باید از env بیاد)
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

/**
 * ثبت‌نام کاربر
 * POST /api/auth/register
 */
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // بررسی تکراری بودن
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: "کاربر با این نام یا ایمیل وجود دارد" });
    }

    // هش کردن رمز
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.json({ success: true, message: "ثبت‌نام موفقیت‌آمیز بود" });
  } catch (err) {
    res.status(500).json({ error: "خطا در ثبت‌نام" });
  }
});

/**
 * ورود کاربر
 * POST /api/auth/login
 */
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "کاربر یافت نشد" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "رمز عبور اشتباه است" });
    }

    // تولید توکن JWT
    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, {
      expiresIn: "7d"
    });

    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ error: "خطا در ورود" });
  }
});

export default router;