import { teacherQueryKeys } from '@/api/teacher';
import { apiClient } from '@/config/axios';
import { useQuery } from '@tanstack/react-query';

const getUsersFn = async () => {
  const response = await apiClient.get('/teacher');
  return response.data;
};

export function useTeachers() {
  return useQuery({
    queryKey: teacherQueryKeys.all,
    queryFn: getUsersFn,
  });
}