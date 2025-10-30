export interface IBackendRes<T> {
  error?: string | string[];
  message: string;
  data?: T;
}

export interface IModelPaginate<T> {
  pagination: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalItems: number;
  };
  result: T[];
}

export interface ILogin {
  access_token: string;
  user: {
    id: number;
    email: string;
    fullName: string | null;
    avatar: string;
    status: string;
    role: string;
    cardNumber: string | null;
  };
}

export interface IRegister {
  id: number;
  email: string;
  fullName: string | null;
}
