// frontend/components/Layout.js
import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      {/* هدر */}
      <header className="app-header">
        <h1>📖 ManhwaHub</h1>
        <nav>
          <Link to="/">خانه</Link>
          <Link to="/search">جستجو</Link>
          <Link to="/profile">پروفایل</Link>
          <Link to="/settings">تنظیمات</Link>
        </nav>
      </header>

      {/* محتوای اصلی */}
      <main className="app-content">{children}</main>

      {/* فوتر */}
      <footer className="app-footer">
        <p>© 2025 ManhwaHub — همه حقوق محفوظ است</p>
      </footer>
    </div>
  );
};

export default Layout;