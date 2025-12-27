// frontend/pages/Auth.js
import React, { useState } from "react";
import { API_ENDPOINTS } from "../config/api";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const endpoint = isLogin ? `${API_ENDPOINTS.auth}/login` : `${API_ENDPOINTS.auth}/register`;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success) {
        setMessage(isLogin ? "ورود موفقیت‌آمیز بود ✅" : "ثبت‌نام موفقیت‌آمیز بود 🎉");
        if (data.token) {
          localStorage.setItem("token", data.token); // ذخیره توکن JWT
        }
      } else {
        setMessage(data.error || "خطا رخ داد ❌");
      }
    } catch (err) {
      setMessage("خطا در ارتباط با سرور ❌");
    }
  };

  return (
    <div className="auth-page">
      <h1>{isLogin ? "ورود" : "ثبت‌نام"}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="نام کاربری"
          value={formData.username}
          onChange={handleChange}
          required
        />
        {!isLogin && (
          <input
            type="email"
            name="email"
            placeholder="ایمیل"
            value={formData.email}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="password"
          name="password"
          placeholder="رمز عبور"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isLogin ? "ورود" : "ثبت‌نام"}</button>
      </form>
      <p>{message}</p>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "ثبت‌نام کنید" : "ورود کنید"}
      </button>
    </div>
  );
};

export default Auth;