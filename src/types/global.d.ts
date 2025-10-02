export {};
declare global {
  interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    data?: T;
  }

  interface IModelPaginate<T> {
    meta: {
      current: number;
      pageSize: number;
      pages: number;
      total: number;
    };
    results: T[];
  }

  interface ILogin {
    access_token: string;
    user: {
      id: number;
      email: string;
      fullName: string | null;
      avatar: string;
      status: string;
      role: string;
    };
  }
  interface IRegister {
    id: number;
    email: string;
    fullName: string | null;
  }
  interface IUser {
    id: number;
    email: string;
    fullName: string | null;
    avatar: string;
    status: string;
    role: string;
  }
  interface Item {
    id: string;
    kind: "BOOK" | "ARTICLE" | "STANDARD";
    image: string;
    title: string;
    authors: string;
    meta1?: string;
    meta2?: string;
    publisher: string;
  }
}
