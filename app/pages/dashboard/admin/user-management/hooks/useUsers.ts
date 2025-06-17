import { useQuery } from '@tanstack/react-query';
import API from '~/lib/axios';
import type { AuthUser } from '~/types/Auth';

export const useCurrentUser = () => {
  return useQuery<AuthUser>({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await API.get('/users');
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
};
