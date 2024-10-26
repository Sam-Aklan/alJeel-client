import { useParams } from 'react-router-dom';
import {lectureQueryKeys } from '@/api/lecture';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/config/axios';
import { AxiosError } from 'axios';

export function useLecture() {
  const { levelId } = useParams();

  // console.log(levelId)
  const getLectureFn = async () => {
    try {
      if (!levelId) {
        
        throw new Error(`levelId type ${levelId}`)
      }
      const response = await apiClient.get(`lecture/level/${levelId}`);
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
    queryKey: lectureQueryKeys.detail(levelId!),
    queryFn:getLectureFn,
    retry: 1,
  });
}
