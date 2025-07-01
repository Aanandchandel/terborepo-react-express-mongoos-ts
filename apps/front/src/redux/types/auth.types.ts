// types/auth.types.ts
export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}

export interface AuthResponse {
  user: {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
  token: string;
}
