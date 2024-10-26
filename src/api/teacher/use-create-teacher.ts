import { useMutation, useQueryClient } from '@tanstack/react-query';
import { teacherQueryKeys } from '@/api/teacher';
import { TSFixMe,} from '@/types';
import {Teacher, TeacherPayload} from '@/types/teacher';
import { apiClient } from '@/config/axios';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const createUserFn = async (newUser: Omit<TeacherPayload,'id'>) => {
  try {
    
    const response = await apiClient.post('/teacher', newUser);
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status ===422) {
        throw Error('لم يتم ادخال البيانات المطلوبة بشكل صحيح')
      }
      if(err.response?.status===400){ 
        throw Error('لم يتم ادخال البيانات المطلوبة بشكل صحيح')
      }
    }
    throw Error('حدث خطاء وقت ارسال البيانات الى الخادم')
  }
};

// https://tanstack.com/query/latest/docs/react/guides/optimistic-updates
export function useCreateTeacher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUserFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: teacherQueryKeys.all });
    },
    onSuccess: (data) => {
      toast.success('تم عملية الاضافة بنجاح')
    },
    onError: (err, newUser, context?: TSFixMe) => {
      queryClient.setQueryData(teacherQueryKeys.all, context.previousUsers);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: teacherQueryKeys.all });
    },
  });
}