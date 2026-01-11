import createInstanceAxios from "@/lib/api/axios.customize";
import { accountUrl, loginUrl, loginWithGoogleUrl, registerUrl } from "./url";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

const getGoogleAuthUrl = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  return `${backendURL}/api/v1${loginWithGoogleUrl}`;
};

const register = (
  username: string,
  password: string,
  confirmPassword: string,
  fullName?: string
) => {
  return axios.post<IBackendRes<IRegister>>(
    registerUrl,
    {
      username,
      password,
      confirmPassword,
      fullName,
    },
    {
      headers: {
        delay: 1000,
      },
    }
  );
};

const login = (username: string, password: string) => {
  return axios.post<IBackendRes<ILogin>>(loginUrl, {
    username,
    password,
  });
};

const fetchAccount = () => {
  return axios.get<IBackendRes<IUser>>(accountUrl);
};

const AuthService = {
  getGoogleAuthUrl,
  register,
  login,
  fetchAccount,
};

export default AuthService;
