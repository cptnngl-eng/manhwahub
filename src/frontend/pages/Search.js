// frontend/pages/Search.js
import React, { useState } from "react";
import { API_ENDPOINTS } from "../config/api";
import CDN_BASE_URL from "../config/cdn";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");

  const handleSearch = async e => {
    e.preventDefault();
    if (!query.trim()) {
      setMessage("لطفاً یک کلیدواژه وارد کنید ❌");
      return;
    }

    try {
      const res = await fetch(`${API_ENDPOINTS.search}?q=${query}`);
      const data = await res.json();

      if (data.length > 0) {
        setResults(data);
        setMessage("");
      } else {
        setResults([]);
        setMessage("هیچ مانهوآیی پیدا نشد ❌");
      }
    } catch (err) {
      setMessage("خطا در ارتباط با سرور ❌");
    }
  };

  return (
    <div className="search-page">
      <h1>🔎 جستجوی مانهوآ</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="عنوان یا ژانر مانهوآ..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button type="submit">جستجو</button>
      </form>

      {message && <p>{message}</p>}

      <div className="search-results">
        {results.map(manhwa => (
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

export default Search;