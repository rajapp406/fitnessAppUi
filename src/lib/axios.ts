import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { IApiError } from '../models/userModel';
import tokenStore from './tokenStore';

// Create a custom type for our API response format
type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: IApiError;
};

// Create a custom error class for API errors
export class ApiError extends Error {
  status: number;
  code?: string | number;
  details?: Record<string, unknown>;

  constructor(error: IApiError, status: number) {
    super(error.message);
    this.name = 'ApiError';
    this.status = status;
    this.code = error.code;
    this.details = error.details;
  }
}

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4001/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  //withCredentials: true, // Important for cookies, authorization headers with HTTPS
  timeout: 10000, // Request timeout
});

// Request interceptor for API calls
apiClient.interceptors.request.use(
  async (config) => {
    // Get token from in-memory token store
    const token = tokenStore.getAccessToken();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Handle successful responses (status code 2xx)
    return response;
  },
  async (error: AxiosError) => {
    // Handle errors (status code 4xx/5xx)
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    
    // If the error is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token using in-memory refresh token
        const refreshToken = tokenStore.getRefreshToken();
        if (refreshToken) {
          const response = await axios.post<ApiResponse<{ accessToken: string; refreshToken: string }>>(
            `${originalRequest.baseURL}/auth/refresh-token`,
            { refreshToken }
          );
          
          const { data } = response.data || {};
          const { accessToken, refreshToken: newRefreshToken } = data || {};
          
          if (accessToken && newRefreshToken) {
            // Store the new tokens in memory
            tokenStore.setAccessToken(accessToken);
            tokenStore.setRefreshToken(newRefreshToken);
            
            // Update the Authorization header
            if (originalRequest.headers) {
              (originalRequest.headers as Record<string, string>)["Authorization"] = `Bearer ${accessToken}`;
            }
            
            // Retry the original request
            return apiClient(originalRequest);
          }
        }
      } catch (refreshError) {
        // If refresh token fails, clear auth and redirect to login
        tokenStore.clear();
        localStorage.removeItem('user');
        
        // Redirect to login page
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
        
        return Promise.reject(refreshError);
      }
    }
    
    // Handle other errors
    const apiError: ApiError = new ApiError(
      {
        status: 'error',
        message: (error.response?.data as unknown as { message?: string })?.message || error.message || 'An error occurred',
        code: (error.response?.data as unknown as { code?: string })?.code || error.code,
        details: typeof (error.response?.data as unknown as { details?: unknown })?.details === 'object'
          ? (error.response?.data as unknown as { details?: Record<string, unknown> })?.details
          : undefined,
      },
      error.response?.status || 500
    );
    
    return Promise.reject(apiError);
  }
);

// Helper function to handle API requests with proper typing
export const apiRequest = async <T>(
  config: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    const response = await apiClient.request<ApiResponse<T>>(config);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        error: {
          status: 'error',
          message: (error.response.data as unknown as { message?: string })?.message || error.message,
          code: (error.response.data as unknown as { code?: string })?.code,
          details: (error.response.data as unknown as { details?: Record<string, unknown> })?.details,
        },
      };
    }
    return {
      success: false,
      error: {
        status: 'error',
        message: error instanceof Error ? error.message : 'An unknown error occurred',
      },
    };
  }
};

export default apiClient;
