/**
 * Genre API Services
 * Handles book genre and language operations
 */

import createInstanceAxios from "@/services/axios.customize";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

/**
 * Get all genres for display
 */
export const getAllGenreAPI = () => {
  return axios.get("/api/v1/genres/display");
};

/**
 * Get all languages from Elasticsearch
 */
export const getAllLanguagesElasticAPI = () => {
  return axios.get("/api/v1/languages/elastic");
};
