// Effective React Query Keys
// https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories
// https://tkdodo.eu/blog/leveraging-the-query-function-context#query-key-factories

export const teacherQueryKeys = {
    all: ['teachers'],
    details: () => [...teacherQueryKeys.all, 'detail'],
    detail: (id: string) => [...teacherQueryKeys.details(), id],
    pagination: (page: number) => [...teacherQueryKeys.all, 'pagination', page],
    infinite: () => [...teacherQueryKeys.all, 'infinite'],
  };