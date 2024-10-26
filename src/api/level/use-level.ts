import { useParams } from 'react-router-dom';
import {levelQueryKeys } from '@/api/level';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/config/axios';
import { AxiosError } from 'axios';

export function useLevel() {
  const { levelId } = useParams();

  console.log(levelId)
  const getUserFn = async () => {
    try {
      if (!levelId) {
        
        throw new Error(`levelId type ${levelId}`)
      }
      const response = await apiClient.get(`level/${levelId}`);
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
    queryKey: levelQueryKeys.detail(levelId!),
    queryFn: getUserFn,
    retry: 1,
  });
}
