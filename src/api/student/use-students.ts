import { studentQueryKeys } from '@/api/student';
import { apiClient } from '@/config/axios';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const getUsersFn = async () => {
  try {
    // throw AxiosError.ERR_BAD_REQUEST
    const response = await apiClient.get('/student?pageLimit=5');
    return response.data;
    
    
  } catch (err:any) {
    if(err instanceof AxiosError) {
      if( err.response?.status===400) throw new Error('خطا في الطلب المرسل الى الخادم')
     }
     throw new Error('حدث خطا في الخادم')
  }
};

export function useStudents() {
  return useQuery({
    queryKey: studentQueryKeys.all,
    queryFn: getUsersFn,
  });
}