/**
 * Application Constants
 * Central place for all app-wide constant values
 */

export const APP_CONFIG = {
  NAME: "Book Library Management",
  SHORT_NAME: "BookLib",
  VERSION: "1.0.0",
  DESCRIPTION: "A modern library management system with Elasticsearch",
} as const;

export const API_CONFIG = {
  VERSION: "v1",
  TIMEOUT: 30000, // 30 seconds
  BASE_URL: import.meta.env.VITE_BACKEND_URL,
  PAYMENT_URL: import.meta.env.VITE_BACKEND_PAYMENT_URL,
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 12,
  PAGE_SIZE_OPTIONS: [12, 24, 48, 96],
} as const;

export const SEARCH = {
  DEBOUNCE_DELAY: 300, // ms
  MIN_SEARCH_LENGTH: 2,
  SUGGESTION_SIZE: 5,
} as const;

export const NOTIFICATION = {
  AUTO_CLOSE_DELAY: 3000, // ms
  MAX_DISPLAY: 5,
} as const;

export const LOAN = {
  MAX_BOOKS_PER_USER: 5,
  LOAN_DURATION_DAYS: 14,
  OVERDUE_WARNING_DAYS: 3,
} as const;

export const PAYMENT = {
  LOCALE: {
    VI: "vi",
    EN: "en",
  },
  TYPE: {
    MEMBERSHIP: "membership",
    FINE: "fine",
  },
  STATUS: {
    PENDING: "PENDING",
    SUCCESS: "PAYMENT_SUCCEED",
    FAILED: "PAYMENT_FAILED",
  },
} as const;

export const VNPAY = {
  SUCCESS_CODE: "00",
  RETURN_URL_PARAM: "vnp_TxnRef",
  RESPONSE_CODE_PARAM: "vnp_ResponseCode",
} as const;

export const DATE_FORMAT = {
  DISPLAY: "DD/MM/YYYY",
  FULL: "DD/MM/YYYY HH:mm:ss",
  API: "YYYY-MM-DD",
} as const;

export const STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  THEME: "theme",
  LANGUAGE: "language",
} as const;

export const placeholderImage =
  "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop";
