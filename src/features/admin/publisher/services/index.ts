import createInstanceAxios from "@/lib/api/axios.customize";
import type { IBackendRes, IModelPaginate } from "@/types/api/response.types";
import type { IPublisher } from "@/types/entities/publisher";
import { publisherBooksUrl, publisherByIdUrl, publishersUrl } from "./url";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

export const getPublishers = (page: number, name?: string) => {
  return axios.get<IBackendRes<IModelPaginate<IPublisher>>>(publishersUrl, {
    params: { page, name },
  });
};

export const createPublisher = (data: { name: string }) => {
  return axios.post<IBackendRes<IPublisher>>(publishersUrl, data);
};

export const updatePublisher = (id: number, data: { name: string }) => {
  return axios.put<IBackendRes<IPublisher>>(publisherByIdUrl(id), data);
};

export const getPublisherById = (id: number) => {
  return axios.get<IBackendRes<IPublisher>>(publisherByIdUrl(id));
};

export const deletePublisher = (id: number) => {
  return axios.delete<IBackendRes<null>>(publisherByIdUrl(id));
};

export const getAllPublishers = () => {
  return axios.get<IBackendRes<IPublisher[]>>(publisherBooksUrl);
};

const PublisherService = {
  getPublishers,
  createPublisher,
  updatePublisher,
  deletePublisher,
  getAllPublishers,
  getPublisherById,
};

export default PublisherService;
