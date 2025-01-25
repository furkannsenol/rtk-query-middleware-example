export interface ILoginResponse {
  username: string;
  role: string;
  token: string;
  refreshToken: string;
}

export interface ILoginRequest {
  username: string;
  password: string;
}
