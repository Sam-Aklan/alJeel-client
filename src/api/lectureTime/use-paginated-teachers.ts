
import { apiClient } from '@/config/axios';
import { useQuery } from '@tanstack/react-query';
import { teacherQueryKeys } from './lectureTime-query-keys';

type Props = {
  page: number;
  pageLimit: number;
};

export function usePaginatedUsers({ page, pageLimit }: Props) {
  const getPaginatedUsersFn = async (p = page) => {
    const response = await apiClient.get(`?_page=${p}&_limit=${pageLimit}`);
    return response.data;
  };

  return useQuery({
    queryKey:teacherQueryKeys.pagination(page),
    queryFn:() => getPaginatedUsersFn(page),
    retry:1
   },
   
  );
}