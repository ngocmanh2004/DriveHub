/**
 * Custom hook for API calls with loading state
 * @module shared/hooks/useApi
 */

import httpClient from '../services/httpClient';
import { useLoading } from './useLoading';

export interface UseApiReturn {
  get: <T>(url: string, options?: { params?: object }) => Promise<T>;
  post: <T>(url: string, data?: object) => Promise<T>;
  put: <T>(url: string, data?: object) => Promise<T>;
  del: <T>(url: string) => Promise<T>;
}

export const useApi = (): UseApiReturn => {
  const { setLoading } = useLoading();

  const get = async <T>(url: string, options?: { params?: object }): Promise<T> => {
    setLoading(true);
    try {
      // Bust browser cache for dynamic endpoints to avoid empty 304 payloads in Axios.
      const params = { ...(options?.params || {}), _t: Date.now() };
      const response = await httpClient.get<T>(url, { params });
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  const post = async <T>(url: string, data?: object): Promise<T> => {
    setLoading(true);
    try {
      const response = await httpClient.post<T>(url, data);
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  const put = async <T>(url: string, data?: object): Promise<T> => {
    setLoading(true);
    try {
      const response = await httpClient.put<T>(url, data);
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  const del = async <T>(url: string): Promise<T> => {
    setLoading(true);
    try {
      const response = await httpClient.delete<T>(url);
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return { get, post, put, del };
};

export default useApi;
