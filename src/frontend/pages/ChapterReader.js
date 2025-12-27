// frontend/pages/ChapterReader.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api";
import CDN_BASE_URL from "../config/cdn";

const ChapterReader = () => {
  const { manhwaId, chapterId } = useParams(); // گرفتن شناسه مانهوآ و چپتر از URL
  const [chapter, setChapter] = useState(null);

  useEffect(() => {
    // گرفتن جزئیات چپتر از API
    fetch(`${API_ENDPOINTS.chapters}/${manhwaId}/${chapterId}`)
      .then(res => res.json())
      .then(data => setChapter(data))
      .catch(err => console.error("خطا در دریافت چپتر:", err));
  }, [manhwaId, chapterId]);

  if (!chapter) return <p>در حال بارگذاری...</p>;

  return (
    <div className="chapter-reader">
      <h1>
        📖 {chapter.title} (چپتر {chapter.number})
      </h1>
      <div className="chapter-pages">
        {chapter.pages.map((page, index) => (
          <img
            key={index}
            src={`${CDN_BASE_URL}${page}`}
            alt={`صفحه ${index + 1}`}
            className="chapter-page"
          />
        ))}
      </div>
    </div>
  );
};

export default ChapterReader;