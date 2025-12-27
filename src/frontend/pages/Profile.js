// frontend/pages/Profile.js
import React, { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../config/api";
import CDN_BASE_URL from "../config/cdn";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return setUser(null);
    }

    // گرفتن اطلاعات کاربر از API
    fetch(`${API_ENDPOINTS.auth}/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error("خطا در دریافت اطلاعات کاربر:", err));

    // گرفتن لیست مانهوآهای مورد علاقه
    fetch(`${API_ENDPOINTS.manhwas}/favorites`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setFavorites(data))
      .catch(err => console.error("خطا در دریافت مانهوآهای مورد علاقه:", err));
  }, []);

  if (!user) return <p>لطفاً وارد حساب کاربری شوید ❌</p>;

  return (
    <div className="profile-page">
      <h1>👤 پروفایل کاربر</h1>
      <p>نام کاربری: {user.username}</p>
      <p>ایمیل: {user.email}</p>
      <p>تاریخ عضویت: {new Date(user.createdAt).toLocaleDateString()}</p>

      <h2>⭐ مانهوآهای مورد علاقه</h2>
      <div className="favorites-grid">
        {favorites.map(manhwa => (
          <div key={manhwa._id} className="manhwa-card">
            <img
              src={`${CDN_BASE_URL}${manhwa.coverUrl}`}
              alt={manhwa.title}
              className="manhwa-cover"
            />
            <h3>{manhwa.title}</h3>
            <span className="rating">⭐ {manhwa.rating}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;