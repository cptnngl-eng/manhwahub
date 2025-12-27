// frontend/pages/Settings.js
import React, { useState } from "react";
import APP_CONFIG from "../config/app";

const Settings = () => {
  const [settings, setSettings] = useState(APP_CONFIG);

  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
    // ذخیره در localStorage برای ماندگاری
    localStorage.setItem("appSettings", JSON.stringify({ ...settings, [key]: value }));
  };

  return (
    <div className="settings-page">
      <h1>⚙️ تنظیمات اپلیکیشن</h1>

      <div className="setting-item">
        <label>🎨 رنگ تم:</label>
        <input
          type="color"
          value={settings.themeColor}
          onChange={e => handleChange("themeColor", e.target.value)}
        />
      </div>

      <div className="setting-item">
        <label>🌐 زبان:</label>
        <select
          value={settings.language}
          onChange={e => handleChange("language", e.target.value)}
        >
          <option value="fa">فارسی</option>
          <option value="en">English</option>
        </select>
      </div>

      <div className="setting-item">
        <label>
          <input
            type="checkbox"
            checked={settings.cacheEnabled}
            onChange={e => handleChange("cacheEnabled", e.target.checked)}
          />
          📦 فعال‌سازی کش آفلاین
        </label>
      </div>

      <div className="setting-item">
        <label>
          <input
            type="checkbox"
            checked={settings.animations}
            onChange={e => handleChange("animations", e.target.checked)}
          />
          🎬 فعال‌سازی انیمیشن‌ها
        </label>
      </div>

      <div className="setting-item">
        <label>
          <input
            type="checkbox"
            checked={settings.offlineMode}
            onChange={e => handleChange("offlineMode", e.target.checked)}
          />
          📴 حالت آفلاین
        </label>
      </div>
    </div>
  );
};

export default Settings;