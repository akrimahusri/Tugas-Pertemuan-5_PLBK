// src/services/api.js
// =============================================
// Service layer: Abstraksi komunikasi dengan API
// Menggunakan library AXIOS untuk HTTP requests
// =============================================

import axios from "axios";
// Buat instance axios dengan konfigurasi default
const apiClient = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 10000, // 10 detik timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor untuk logging request
apiClient.interceptors.request.use(
  (config) => {
    console.log(`[API] ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error),
);

// Interceptor untuk handling error response
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(
        `[API Error] ${error.response.status}: ${error.response.statusText}`,
      );
    } else if (error.request) {
      console.error("[API Error] No response received");
    }
    return Promise.reject(error);
  },
);

// === API Functions ===

// Ambil semua produk
export const getProducts = async () => {
  const response = await apiClient.get("/products");
  return response.data;
};

// Ambil produk berdasarkan ID
export const getProductById = async (id) => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};

// Ambil produk berdasarkan kategori
export const getProductsByCategory = async (category) => {
  const response = await apiClient.get(`/products/category/${category}`);
  return response.data;
};

// Ambil semua kategori
export const getCategories = async () => {
  const response = await apiClient.get("/products/categories");
  return response.data;
};

export default apiClient;
