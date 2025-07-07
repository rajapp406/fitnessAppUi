import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { IApiError } from '../models/userModel';

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
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3101/api/v2',
  headers: {
    'Content-Type': 'application/json',
  },
  //withCredentials: true, // Important for cookies, authorization headers with HTTPS
  timeout: 10000, // Request timeout
});

// Request interceptor for API calls
apiClient.interceptors.request.use(
  async (config) => {
    // Get token from localStorage or your auth service
    const token = localStorage.getItem('accessToken');
    
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
    return response.data;
  },
  async (error: AxiosError) => {
    // Handle errors (status code 4xx/5xx)
    const originalRequest = error.config as any;
    
    // If the error is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post<ApiResponse<{ accessToken: string; refreshToken: string }>>(
            `${originalRequest.baseURL}/auth/refresh-token`,
            { refreshToken }
          );
          
          const { accessToken, refreshToken: newRefreshToken } = response.data.data || {};
          
          if (accessToken && newRefreshToken) {
            // Store the new tokens
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', newRefreshToken);
            
            // Update the Authorization header
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            
            // Retry the original request
            return apiClient(originalRequest);
          }
        }
      } catch (refreshError) {
        // If refresh token fails, clear auth and redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
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
        message: error.response?.data?.message || error.message || 'An error occurred',
        code: error.response?.data?.code || error.code,
        details: error.response?.data?.details || error.response?.data,
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
          message: error.response.data?.message || error.message,
          code: error.response.data?.code,
          details: error.response.data?.details,
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
