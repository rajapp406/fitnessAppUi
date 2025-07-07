import { AxiosRequestConfig } from 'axios';
import apiClient, { ApiError, apiRequest } from '../lib/axios';
import { IUser, IAuthTokens, ILoginRequest, IRegisterRequest, IRefreshTokenRequest } from '../models/userModel';

// Define API response types
export interface AuthResponse {
  user: IUser;
  tokens: IAuthTokens;
}

class ApiService {
  // Auth endpoints
  static async login(credentials: ILoginRequest) {
    return apiRequest<AuthResponse>({
      method: 'POST',
      url: '/auth/login',
      data: credentials,
    });
  }

  static async register(userData: IRegisterRequest) {
    return apiRequest<AuthResponse>({
      method: 'POST',
      url: '/auth/register',
      data: userData,
    });
  }

  static async googleAuth(idToken: string) {
    return apiRequest<AuthResponse>({
      method: 'POST',
      url: '/auth/google',
      data: { idToken },
    });
  }

  static async refreshToken(refreshToken: string) {
    return apiRequest<{ accessToken: string; refreshToken: string }>({
      method: 'POST',
      url: '/auth/refresh-token',
      data: { refreshToken },
    });
  }

  static async updateProfile(profileData: any) {
    return apiRequest<{ user: IUser }>({
      method: 'PATCH',
      url: '/users/me',
      data: profileData,
    });
  }

  static async logout() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      await apiRequest({
        method: 'POST',
        url: '/auth/logout',
        data: { refreshToken },
      });
    }
  }

  // User endpoints
  static async getCurrentUser() {
    return apiRequest<IUser>({
      method: 'GET',
      url: '/users/me',
    });
  }

  static async updateUser(userData: Partial<IUser>) {
    return apiRequest<IUser>({
      method: 'PATCH',
      url: '/users/me',
      data: userData,
    });
  }

  // Generic request method for other API calls
  static async request<T>(config: AxiosRequestConfig) {
    return apiRequest<T>(config);
  }
}

export default ApiService;
