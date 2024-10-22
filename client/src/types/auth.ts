export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IUser {
  email: string;
  username: string;
  isEmailConfirmed: boolean;
}

export interface ILoginResponse {
  accessToken: string;
  user: IUser;
}

export interface IRegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface IRegisterResponse {
  email: string;
}
