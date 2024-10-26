import { levelQueryKeys } from '@/api/level';
import { apiClient } from '@/config/axios';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const getLevelsFn = async () => {
  try {
    
    const response = await apiClient.get('/level');
    return response.data;
  } catch (err:any) {
    if(err instanceof AxiosError) {
     if( err.response?.status===400) throw new Error('خطا في الطلب المرسل الى الخادم')
    }
    throw new Error('حدث خطا في الخادم')
  }
};

export function useLevels() {
  return useQuery({
    queryKey: levelQueryKeys.all,
    queryFn: getLevelsFn,
  });
}