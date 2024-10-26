
import { apiClient } from '@/config/axios';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { studentQueryKeys } from './student-query-keys';
import { StudentFilters } from '@/types/student';
import { AxiosError } from 'axios';

export function usePaginatedStudents({ page, pageLimit,name,levelId, isEnabled}: StudentFilters&{isEnabled:boolean}) {
  
  const getPaginatedStudentsFn = async () => {
    try {
      console.log(`name: ,${name}, levelId: ,${levelId}`)
      const response = await apiClient.get(`student?page=${Number(page)}&pageLimit=${Number(pageLimit)} ${name?`&name=${name}`:''} ${levelId?`&levelId=${levelId}`:''}`);
      return response.data;
    } catch (err:any) {
      if (err instanceof AxiosError) {
        if (err.response?.status ===400) {
          throw new Error("لم يتم ارسال الطلب بشكل صحيح" + err.message)
        }
        throw new Error("حدث خطأ في الخادم")
      }
    }
  };

  return useQuery({
    queryKey:studentQueryKeys.pagination({page,pageLimit,name,levelId}),
    queryFn:() => getPaginatedStudentsFn(),
    retry:1,
    placeholderData:keepPreviousData,
    enabled:isEnabled
   },
   
  );
}