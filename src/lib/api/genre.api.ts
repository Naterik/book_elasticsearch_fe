import createInstanceAxios from "@/lib/api/axios.customize";
const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

export const getAllGenreAPI = () => {
  return axios.get("/api/v1/genres/display");
};

export const getAllLanguagesElasticAPI = () => {
  return axios.get("/api/v1/languages/elastic");
};
