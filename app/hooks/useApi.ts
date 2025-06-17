import { useMutation, useQuery, type UseMutationOptions, type UseQueryOptions } from "@tanstack/react-query";
import type { AxiosRequestConfig } from "axios";
import axiosInstance from "~/lib/axios";


export function useApiGet<T>(
  key: string[],
  url: string,
  options?: UseQueryOptions<T> & { params: object },
  enabled = true,
) {
  return useQuery<T>({
    queryKey: key,
    queryFn: async () => {
      const { params, ...rest } = options || {};
      const response = await axiosInstance.get<T>(url, { params, ...rest });
      return response.data;
    },
    enabled,
    ...options,
  });
}

interface ApiPostConfig<TData, TVariables> {
  options?: UseMutationOptions<TData, unknown, TVariables>;
  axiosConfig?: AxiosRequestConfig;
}

export function useApiPost<TData, TVariables>(
  url: string,
  config?: ApiPostConfig<TData, TVariables>
) {
  return useMutation<TData, unknown, TVariables>({
    mutationFn: async (variables: TVariables) => {
      const res = await axiosInstance.post<TData>(
        url,
        variables,
        config?.axiosConfig
      );
      return res.data;
    },
    ...config?.options,
  });
}


export function useApiPut<TData, TVariables>(url: string, options?: UseMutationOptions<TData, unknown, TVariables>) {
  return useMutation<TData, unknown, TVariables>({
    mutationFn: async (variables: TVariables) => {
      const res = await axiosInstance.put<TData>(url, variables);
      return res.data;
    },
    ...options,
  });
}

export function useApiDelete<TData, TVariables extends { id: string | number }>(
  url: string,
  options?: UseMutationOptions<TData, unknown, TVariables>,
) {
  return useMutation<TData, unknown, TVariables>({
    mutationFn: async (variables: TVariables) => {
      const { id } = variables;
      const deleteUrl = `${url}/${id}`;
      const res = await axiosInstance.delete<TData>(deleteUrl);
      return res.data;
    },
    ...options,
  });
}
