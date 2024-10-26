import { useParams } from 'react-router-dom';
import {teacherQueryKeys } from '@/api/teacher';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/config/axios';
import { AxiosError } from 'axios';

export function useTeacher() {
  const { teacherId } = useParams();

  console.log(teacherId)
  const getUserFn = async () => {
    try {
      if (!teacherId) {
        
        throw new Error(`teacherId type ${teacherId}`)
      }
      const response = await apiClient.get(`teacher/${teacherId}`);
      return response.data;
    } catch (err:any) {
      if (err instanceof AxiosError) {
        throw new Error(err.message)
      }
      console.log(err.message)
      throw new Error(err.message)
    }
  };

  return useQuery({
    queryKey: teacherQueryKeys.detail(teacherId!),
    queryFn: getUserFn,
    retry: 1,
  });
}
