// frontend/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// استایل‌های کلی (می‌تونی CSS یا Tailwind اضافه کنی)
import "./styles/global.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);