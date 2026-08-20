/**
 * config.js — the ONE place that knows about the backend.
 *
 * Right now there is no Django server, so USE_MOCK is true and our services
 * read from mock-data.js. In Phase 16 we flip USE_MOCK to false, point
 * API_BASE_URL at Django, and NOTHING else in the app has to change.
 *
 * That is the whole reason this file exists: to keep backend knowledge out of
 * our UI code.
 */

export const USE_MOCK = true;

// Django dev server default. Later this might be "https://api.yoursite.com/api".
export const API_BASE_URL = "http://127.0.0.1:8000/api";

/**
 * Every endpoint Django REST Framework will eventually expose.
 * Written as functions where the URL needs an id, so we never build URLs
 * by string-concatenation scattered around the codebase.
 */
export const ENDPOINTS = {
  // Catalog
  products: "/products/",
  product: (id) => `/products/${id}/`,
  categories: "/categories/",

  // Cart
  cart: "/cart/",
  cartItems: "/cart/items/",
  cartItem: (id) => `/cart/items/${id}/`,

  // Orders
  orders: "/orders/",
  order: (id) => `/orders/${id}/`,

  // Auth
  register: "/auth/register/",
  login: "/auth/login/",
  logout: "/auth/logout/",
  refresh: "/auth/refresh/",

  // User
  profile: "/users/profile/",
  wishlist: "/wishlist/",
};

/** localStorage keys, kept in one place so we never typo them. */
export const STORAGE_KEYS = {
  cart: "ss_cart",
  wishlist: "ss_wishlist",
  user: "ss_user",
  token: "ss_access_token",
};

/** Store-wide settings used by the cart maths later. */
export const APP_CONFIG = {
  currency: "INR",
  currencySymbol: "₹",
  taxRate: 0.18,          // 18% GST
  freeShippingAbove: 999,
  shippingFee: 49,
};
