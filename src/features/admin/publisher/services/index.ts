import createInstanceAxios from "@/lib/api/axios.customize";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

export const getPublishersAPI = (params?: { page?: number }) => {
  return axios.get<IBackendRes<IModelPaginate<IPublisher>>>(
    "/api/v1/publishers",
    { params }
  );
};

export const createPublisherAPI = (data: { name: string }) => {
  return axios.post<IBackendRes<IPublisher>>("/api/v1/publishers", data);
};

export const updatePublisherAPI = (id: number, data: { name: string }) => {
  return axios.put<IBackendRes<IPublisher>>(`/api/v1/publishers/${id}`, data);
};

export const deletePublisherAPI = (id: number) => {
  return axios.delete<IBackendRes<null>>(`/api/v1/publishers/${id}`);
};

export const getAllPublishersAPI = () => {
  const urlBackend = `/api/v1/publishers`;
  return axios.get<IBackendRes<IPublisher[]>>(urlBackend);
};
