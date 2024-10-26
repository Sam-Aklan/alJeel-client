// Effective React Query Keys
// https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories
// https://tkdodo.eu/blog/leveraging-the-query-function-context#query-key-factories

export const lectureTimesQueryKeys = {
    all: ['lectureTimess'],
    details: () => [...lectureTimesQueryKeys.all, 'detail'],
    detail: (id: string) => [...lectureTimesQueryKeys.details(), id],
    pagination: (page: number) => [...lectureTimesQueryKeys.all, 'pagination', page],
    infinite: () => [...lectureTimesQueryKeys.all, 'infinite'],
  };