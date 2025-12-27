// backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// ایمپورت روترها
import manhwasRouter from "./api/manhwas.js";
import chaptersRouter from "./api/chapters.js";
import authRouter from "./api/auth.js";
import searchRouter from "./api/search.js";

dotenv.config();
const app = express();

// میدل‌ورها
app.use(cors());
app.use(express.json());

// اتصال به دیتابیس
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ اتصال موفق به دیتابیس"))
  .catch(err => console.error("❌ خطا در اتصال به دیتابیس:", err));

// مسیرهای API
app.use("/api/manhwas", manhwasRouter);
app.use("/api/chapters", chaptersRouter);
app.use("/api/auth", authRouter);
app.use("/api/search", searchRouter);

// اجرای سرور
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 سرور روی پورت ${PORT} اجرا شد`);
});