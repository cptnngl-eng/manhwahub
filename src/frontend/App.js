// frontend/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

// صفحات
import Home from "./pages/Home";
import ManhwaDetail from "./pages/ManhwaDetail";
import ChapterReader from "./pages/ChapterReader";
import Auth from "./pages/Auth";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/manhwa/:id" element={<ManhwaDetail />} />
          <Route path="/manhwa/:manhwaId/chapter/:chapterId" element={<ChapterReader />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;