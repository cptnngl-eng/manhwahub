// frontend/pages/Home.js
import React, { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../config/api";
import CDN_BASE_URL from "../config/cdn";

const Home = () => {
  const [manhwas, setManhwas] = useState([]);

  useEffect(() => {
    // گرفتن لیست مانهوآها از API
    fetch(API_ENDPOINTS.manhwas)
      .then(res => res.json())
      .then(data => setManhwas(data))
      .catch(err => console.error("خطا در دریافت مانهوآها:", err));
  }, []);

  return (
    <div className="home-page">
      <h1>📚 لیست مانهوآها</h1>
      <div className="manhwa-grid">
        {manhwas.map(manhwa => (
          <div key={manhwa._id} className="manhwa-card">
            <img
              src={`${CDN_BASE_URL}${manhwa.coverUrl}`}
              alt={manhwa.title}
              className="manhwa-cover"
            />
            <h2>{manhwa.title}</h2>
            <p>{manhwa.description}</p>
            <span className="status">
              وضعیت: {manhwa.status === "ongoing" ? "در حال انتشار" : "تکمیل شده"}
            </span>
            <span className="rating">⭐ {manhwa.rating}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;