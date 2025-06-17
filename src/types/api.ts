/**
 * Generic API response type
 * @template T - The type of the data field
 */
export interface ApiResponse<T = unknown> {
  status: string;
  message: string;
  data: T;
}

/**
 * Legacy API response types for backward compatibility
 * Some APIs might still return statusCode, timestamp, path
 */
export interface LegacyApiResponse<T = unknown> {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string;
  data: T;
}

/**
 * Error response type
 */
export interface ApiErrorResponse {
  status: string;
  message: string;
  errors?: Record<string, string[]>;
  code?: string;
  statusCode?: number;
  timestamp?: string;
  path?: string;
} 