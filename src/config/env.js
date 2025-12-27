// متغیرهای محیطی برای ManhwaHub
const ENV = {
  mode: process.env.NODE_ENV || "development", // حالت جاری (development یا production)
  debug: process.env.NODE_ENV !== "production", // فعال بودن لاگ‌ها در حالت توسعه
  apiTimeout: 10000, // تایم‌اوت درخواست‌های API (میلی‌ثانیه)
  cacheVersion: "v1.0.0" // نسخهٔ کش برای سرویس‌ورکر
};

export default ENV;