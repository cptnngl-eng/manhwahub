// backend/api/search.js
import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// مدل مانهوآ (همون که در manhwas.js تعریف شده بود)
const ManhwaSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  rating: Number,
  coverUrl: String,
  genres: [String]
});

const Manhwa = mongoose.model("Manhwa", ManhwaSchema);

/**
 * جستجوی مانهوآها
 * GET /api/search?q=keyword
 */
router.get("/", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: "کلیدواژه جستجو الزامی است" });
    }

    // جستجو در عنوان و توضیحات و ژانرها
    const results = await Manhwa.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { genres: { $regex: q, $options: "i" } }
      ]
    });

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "خطا در جستجو" });
  }
});

export default router;