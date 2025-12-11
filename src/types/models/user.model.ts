export interface IUserBase {
  id: number;
  username: string;
  fullName: string | null;
  address: string | null;
  phone: string | null;
  avatar: string | null;
  status: string;
  roleId: number;
}

// Standard User (from auth)
export interface IUser {
  id: number;
  email: string;
  fullName: string | null;
  avatar: string;
  status: string;
  role: string;
  cardNumber: string | null;
}

export interface IUserInfo extends IUserBase {
  cardNumber: string | null;
  membershipStart: string | null;
  membershipEnd: string | null;
}

export interface IAdminUser extends IUserBase {
  fullName: string;
  type: string;
  cardNumber: string | null;
  membershipStart: string | null;
  membershipEnd: string | null;
  googleId: string | null;
  role: {
    id: number;
    name: string;
  };
}
export interface IAdminUserDetail extends IAdminUser {
  createdAt?: string;
  updatedAt?: string;
}
