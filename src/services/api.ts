import axios from "services/axios.customize";

const registerAPI = (
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

const loginAPI = (username: string, password: string) => {
  const urlBackend = "/api/v1/login";
  return axios.post<IBackendRes<ILogin>>(urlBackend, {
    username,
    password,
  });
};

const fetchAPI = () => {
  const urlBackend = "/api/v1/account";
  return axios.get<IBackendRes<IUser>>(urlBackend, {
    headers: {
      delay: 3000,
    },
  });
};

export { registerAPI, loginAPI, fetchAPI };
