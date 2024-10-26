// Effective React Query Keys
// https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories
// https://tkdodo.eu/blog/leveraging-the-query-function-context#query-key-factories

import { StudentFilters } from "@/types/student";

export const studentQueryKeys = {
    all: ['student'],
    details: () => [...studentQueryKeys.all, 'detail'],
    detail: (id: string) => [...studentQueryKeys.details(), id],
    pagination: ({page,pageLimit,name,level}: StudentFilters) => [...studentQueryKeys.all, 'pagination', {page,pageLimit,name,level}],
    infinite: () => [...studentQueryKeys.all, 'infinite'],
  };