import { useParams } from 'react-router-dom';
import {studentQueryKeys} from '@/api/student';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/config/axios';
import { AxiosError } from 'axios';

export function useStudent() {
  const { studentId } = useParams();

  console.log(studentId)
  const getUserFn = async () => {
    try {
      if (!studentId) {
        
        throw new Error(`studentId type ${studentId}`)
      }
      const response = await apiClient.get(`student/${studentId}`);
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
    queryKey: studentQueryKeys.detail(studentId!),
    queryFn: getUserFn,
    retry: 1,
  });
}
