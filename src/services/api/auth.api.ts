/**
 * Authentication API Services
 * Handles login, register, and account management
 */

import createInstanceAxios from "@/services/axios.customize";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

/**
 * Get Google OAuth login URL
 */
export const loginWithGoogleURL = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  return `${backendURL}/api/v1/auth/google`;
};

/**
 * Register a new user account
 */
export const registerAPI = (
  username: string,
  password: string,
  confirmPassword: string,
  fullName?: string
) => {
  const urlBackend = "/api/v1/register";
  return axios.post<IBackendRes<IRegister>>(
    urlBackend,
    {
      username,
      password,
      confirmPassword,
      fullName,
    },
    {
      headers: {
        delay: 3000,
      },
    }
  );
};

/**
 * Login with username and password
 */
export const loginAPI = (username: string, password: string) => {
  const urlBackend = "/api/v1/login";
  return axios.post<IBackendRes<ILogin>>(urlBackend, {
    username,
    password,
  });
};

/**
 * Fetch current authenticated user account
 */
export const fetchAPI = () => {
  const urlBackend = "/api/v1/account";
  return axios.get<IBackendRes<IUser>>(urlBackend, {
    headers: {
      delay: 3000,
    },
  });
};
