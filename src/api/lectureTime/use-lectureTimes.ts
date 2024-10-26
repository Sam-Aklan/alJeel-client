import { lectureTimesQueryKeys } from '@/api/lectureTime';
import { apiClient } from '@/config/axios';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const getLectureTimeFn = async () => {
  try {
    
    const response = await apiClient.get('/lecture-time/');
    return response.data;
  } catch (error:any) {
    if (error instanceof AxiosError) {
      throw new Error(error.message)
    }
    throw new Error(error.message)
  }
};

export function useLectureTimes() {
  return useQuery({
    queryKey: lectureTimesQueryKeys.all,
    queryFn: getLectureTimeFn,
    retry:1
  });
}