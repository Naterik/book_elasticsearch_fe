// --- Common Types ---

export interface IUserCore {
  id: number;
  username: string;
  fullName: string | null;
  avatar: string | null;
  status: string; // Use string or import UserStatus from enums if needed
  cardNumber: string | null;
}

// --- Client / Auth Context ---

export interface IClientUser extends IUserCore {
  role: string; // Flattened role name (e.g. "ADMIN")
}

// --- Admin / Dashboard Context ---

export interface IRole {
  id?: number;
  name: string;
}

export interface ISystemUser extends IUserCore {
  password?: string;
  address: string | null;
  phone: string | null;
  type: string;

  roleId: number;
  role: IRole;

  membershipStart: string | null;
  membershipEnd: string | null;

  createdAt: Date | string;
  updatedAt: Date | string;
}

// --- Aliases for Compat & Semantics ---

// Legacy/Compatibility aliases
export type IUser = IClientUser;
export type IAdminUser = ISystemUser;
export type IAdminUserDetail = ISystemUser;
export type IUserBase = ISystemUser; // For compatibility with Pick<IUserBase>
export type Role = IRole;
