// مسیر پایهٔ API برای ManhwaHub
const API_BASE_URL = "/api";

// مسیرهای مختلف API
const API_ENDPOINTS = {
  manhwas: `${API_BASE_URL}/manhwas`,
  chapters: `${API_BASE_URL}/chapters`,
  auth: `${API_BASE_URL}/auth`,
  search: `${API_BASE_URL}/search`
};

export { API_BASE_URL, API_ENDPOINTS };