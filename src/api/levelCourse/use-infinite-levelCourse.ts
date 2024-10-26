
import { apiClient } from '@/config/axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { levelQueryKeys } from './levelCourse-query-keys';

export function useInfiniteLevels({ pageLimit }: { pageLimit: number }) {
  const getInfiniteLevelsFn = async ({ pageParam = 1 }) => {
    const response = await apiClient.get(
      `?_page=${+pageParam}&_limit=${+pageLimit}`
    );
    return response;
  };


  // https://tanstack.com/query/latest/docs/react/guides/infinite-queries
  return useInfiniteQuery({
    queryKey: levelQueryKeys.infinite(),
    queryFn: getInfiniteLevelsFn,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.data.isNext) {
        return undefined
      }
      console.log(lastPage)
      return lastPage.data.nextPage
    },
    // getPreviousPageParam:(fristPage)=>{
    //   return fristPage.data.prePage
    // }
  });
}