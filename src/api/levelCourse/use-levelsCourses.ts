import { levelQueryKeys } from '@/api/level';
import { apiClient } from '@/config/axios';
import { useQuery } from '@tanstack/react-query';

const getLevelsFn = async () => {
  const response = await apiClient.get('/level');
  return response.data;
};

export function useTeachers() {
  return useQuery({
    queryKey: levelQueryKeys.all,
    queryFn: getLevelsFn,
  });
}