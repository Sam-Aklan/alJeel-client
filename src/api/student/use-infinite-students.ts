
import { apiClient } from '@/config/axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import {studentQueryKeys } from './student-query-keys';

export function useInfiniteUsers({ pageLimit }: { pageLimit: number }) {
  const getInfiniteUsersFn = async ({ pageParam = 1 }) => {
    const response = await apiClient.get(
      `?_page=${+pageParam}&_limit=${+pageLimit}`
    );
    return response;
  };


  // https://tanstack.com/query/latest/docs/react/guides/infinite-queries
  return useInfiniteQuery({
    queryKey:studentQueryKeys.infinite(),
    queryFn: getInfiniteUsersFn,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages,lastPageParam) => {
      if (!lastPage.data.isNext) {
        return undefined
      }
      return lastPage.data.nextPage
    },
    // getPreviousPageParam:(fristPage)=>{
    //   return fristPage.data.prePage
    // }
  });
}