// backend/api/chapters.js
import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// مدل چپتر
const ChapterSchema = new mongoose.Schema({
  manhwaId: mongoose.Schema.Types.ObjectId, // شناسه مانهوآ
  number: Number,                           // شماره چپتر
  title: String,                            // عنوان چپتر
  pages: [String],                          // لیست صفحات (لینک تصاویر)
  releaseDate: Date                         // تاریخ انتشار
});

const Chapter = mongoose.model("Chapter", ChapterSchema);

/**
 * لیست چپترهای یک مانهوآ
 * GET /api/chapters/:manhwaId
 */
router.get("/:manhwaId", async (req, res) => {
  try {
    const { manhwaId } = req.params;
    const chapters = await Chapter.find({ manhwaId }).sort({ number: 1 });
    res.json(chapters);
  } catch (err) {
    res.status(500).json({ error: "خطا در دریافت لیست چپترها" });
  }
});

/**
 * جزئیات یک چپتر خاص
 * GET /api/chapters/:manhwaId/:chapterId
 */
router.get("/:manhwaId/:chapterId", async (req, res) => {
  try {
    const { manhwaId, chapterId } = req.params;
    const chapter = await Chapter.findOne({ _id: chapterId, manhwaId });
    if (!chapter) {
      return res.status(404).json({ error: "چپتر پیدا نشد" });
    }
    res.json(chapter);
  } catch (err) {
    res.status(500).json({ error: "خطا در دریافت جزئیات چپتر" });
  }
});

export default router;