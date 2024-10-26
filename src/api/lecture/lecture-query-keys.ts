// Effective React Query Keys
// https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories
// https://tkdodo.eu/blog/leveraging-the-query-function-context#query-key-factories

export const lectureQueryKeys = {
    all: ['lectures'],
    details: () => [...lectureQueryKeys.all, 'detail'],
    detail: (id: string) => [...lectureQueryKeys.details(), id],
    pagination: (page: number) => [...lectureQueryKeys.all, 'pagination', page],
    infinite: () => [...lectureQueryKeys.all, 'infinite'],
  };