import type { IDigitalBook } from "@/types";
import createInstanceAxios from "./axios.customize";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

export const showDigitalBookAPI = (isbn: string) => {
  return axios.get<IBackendRes<IDigitalBook>>(
    `/api/v1/digitals/preview/${isbn}`
  );
};
