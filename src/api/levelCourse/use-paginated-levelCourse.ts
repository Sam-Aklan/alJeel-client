
import { apiClient } from '@/config/axios';
import { useQuery } from '@tanstack/react-query';
import { levelQueryKeys } from './levelCourse-query-keys';

type Props = {
  page: number;
  pageLimit: number;
};

export function usePaginatedLevels({ page, pageLimit }: Props) {
  const getPaginatedLevelsFn = async (p = page) => {
    const response = await apiClient.get(`?_page=${p}&_limit=${pageLimit}`);
    return response.data;
  };

  return useQuery({
    queryKey:levelQueryKeys.pagination(page),
    queryFn:() => getPaginatedLevelsFn(page),
    retry:1
   },
   
  );
}