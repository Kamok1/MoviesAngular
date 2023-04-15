export interface AuthResponse {
  token: string;
  refreshToken: {
    token: string;
    expires: string;
  }
}
