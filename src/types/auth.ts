export interface LoginRequest {
  username: string;
  password: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
  };
}