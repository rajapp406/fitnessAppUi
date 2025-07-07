
/**
 * Base user interface that matches the Prisma User model
 * This can be extended as needed for frontend-specific requirements
 */
export interface IUser {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: string;
  isEmailVerified: boolean;
  avatar: string | null;
  authProvider: 'email' | 'google' | string;
  lastLogin: Date | string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

/**
 * Authentication tokens
 */
export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn?: number;
}

/**
 * Standard API response format
 */
export interface IApiResponse<T> {
  success: boolean;
  data?: T;
  error?: IApiError;
}

/**
 * Error response format
 */
export interface IApiError {
  status: 'error';
  message: string;
  code?: string | number;
  details?: Record<string, unknown>;
  errors?: Record<string, string[]>;
}





/**
 * Google authentication request payload
 */
export interface IGoogleAuthRequest {
  idToken: string;
}

/**
 * Token refresh response
 */
export interface IRefreshTokenResponse {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

/**
 * Generic API response type that can be used with fetch/axios
 */
export type ApiResponse<T> = 
  | { success: true; data: T }
  | { success: false; error: IApiError };

/**
 * Login request payload
 */
export interface ILoginRequest {
  email: string;
  password: string;
}

/**
 * Registration request payload
 */
export interface IRegisterRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

/**
 * Refresh token request payload
 */
export interface IRefreshTokenRequest {
  refreshToken: string;
}



/**
 * Type guard to check if a response is successful
 */
export function isSuccessResponse<T>(
  response: ApiResponse<T>
): response is { success: true; data: T } {
  return response.success === true;
}

/**
 * Type guard to check if a response is an error
 */
export function isErrorResponse<T>(
  response: ApiResponse<T>
): response is { success: false; error: IApiError } {
  return response.success === false;
}

/**
 * Helper to create a successful API response
 */
export function successResponse<T>(data: T): { success: true; data: T } {
  return { success: true, data };
}

/**
 * Helper to create an error API response
 */
export function errorResponse(error: string | Error, code?: string | number): { success: false; error: IApiError } {
  return {
    success: false,
    error: {
      status: 'error',
      message: error instanceof Error ? error.message : error,
      code,
    },
  };
}

// Re-export commonly used types for convenience
