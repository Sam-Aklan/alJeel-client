export const levelQueryKeys = {
    all: ['levels'],
    details: () => [...levelQueryKeys.all, 'detail'],
    detail: (id: string) => [...levelQueryKeys.details(), id],
    pagination: (page: number) => [...levelQueryKeys.all, 'pagination', page],
    infinite: () => [...levelQueryKeys.all, 'infinite'],
  };