import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { teacherQueryKeys } from '@/api/teacher';
import { TSFixMe,} from '@/types';
import {UpdateTeacher} from '@/types/teacher'
import { apiClient } from '@/config/axios';
import { AxiosError } from 'axios';

export function useEditTeacher() {
  const { teacherId } = useParams();
  const queryClient = useQueryClient();

  if(!teacherId) throw new Error('teacher id of wrong type')
  // https://react-query.tanstack.com/guides/optimistic-updates#updating-a-single-todo
  const editUserFn = async (updatedUser: UpdateTeacher) => {
    if(!updatedUser) throw new Error(`can not send undefined data for updating a teacher`)
      try {
        
    const {name,specialization} = updatedUser
    const response = await apiClient.patch(`teacher/${teacherId}`,{name,specialization});
    return response;
      } catch (error:any) {
        if (error instanceof AxiosError) {
          if (error.response?.statusText === AxiosError.ERR_BAD_RESPONSE) {
            
            throw new Error('حدث خطا عند ارسال الطلب')
          }
        }
        throw new Error('حدث خطا في الخادم')
      }
  };
  return useMutation({
    mutationFn: editUserFn,
    onMutate: async (updatedUser) => {
      await queryClient.cancelQueries({queryKey:teacherQueryKeys.detail(teacherId!)});
      const previousUser = queryClient.getQueryData(
        teacherQueryKeys.detail(teacherId!)
      );
      queryClient.setQueryData(teacherQueryKeys.detail(teacherId!), updatedUser);
      return { previousUser: previousUser, updatedUser: updatedUser };
    },
    onError: (context?: TSFixMe) => {
      queryClient.setQueryData(
        teacherQueryKeys.detail(teacherId!),
        context.previousUser
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey:teacherQueryKeys.all});
    },
    retry:1
  });
}