import createInstanceAxios from "@/services/axios.customize";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

export const loginWithGoogleURL = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  return `${backendURL}/api/v1/auth/google`;
};

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

export const loginAPI = (username: string, password: string) => {
  const urlBackend = "/api/v1/login";
  return axios.post<IBackendRes<ILogin>>(urlBackend, {
    username,
    password,
  });
};

export const fetchAPI = () => {
  const urlBackend = "/api/v1/account";
  return axios.get<IBackendRes<IUser>>(urlBackend);
};
