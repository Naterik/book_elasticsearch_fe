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
