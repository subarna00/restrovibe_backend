import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const API_TIMEOUT = 10000;

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }

  
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: any) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    
    if (error.response?.status === 403) {
      // Handle forbidden access
      console.error('Access forbidden:', error.response.data.message);
    }
    
    if (error.response?.status >= 500) {
      // Handle server errors
      console.error('Server error:', error.response.data.message);
    }
    
    return Promise.reject(error);
  }
);

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

// API Methods
export const api = {
  // Generic CRUD operations
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> =>
    apiClient.get(url, config).then((res: any) => res.data),
  
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> =>
    apiClient.post(url, data, config).then((res: any) => res.data),
  
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> =>
    apiClient.put(url, data, config).then((res: any) => res.data),
  
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> =>
    apiClient.patch(url, data, config).then((res: any) => res.data),
  
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> =>
    apiClient.delete(url, config).then((res: any) => res.data),
};

export default apiClient;
