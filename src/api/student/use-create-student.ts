import { useMutation, useQueryClient } from '@tanstack/react-query';
import { studentQueryKeys } from '@/api/student';
import { TSFixMe,} from '@/types';
import {Student} from '@/types/student';
import { apiClient } from '@/config/axios';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const createUserFn = async (newUser: Omit<Student,'id'>) => {
  try {
    const formData = new FormData()
    if (newUser.image) {
      console.log(`dose image exists ${newUser.image.name}`)
      formData.append('image',newUser.image)
  }
  formData.append('name',newUser.name)
  formData.append('dateOfBirth',newUser.dateOfBirth.toISOString())
  formData.append('levelId',newUser.levelId)
    const response = await apiClient.post('/Student', formData);
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status ===422) {
        throw Error('لم يتم ادخال البيانات المطلوبة بشكل صحيح')
      }
    }
    throw Error('حدث خطاء وقت ارسال البيانات الى الخادم')
  }
};

// https://tanstack.com/query/latest/docs/react/guides/optimistic-updates
export function useCreateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUserFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: studentQueryKeys.all });
    },
    onSuccess: () => {
      toast.success('تم عملية الاضافة بنجاح')
    },
    onError: (context?: TSFixMe) => {
      console.log("student context on error")
      console.log(context)
      context && queryClient.setQueryData(studentQueryKeys.all, context.previousStudents);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: studentQueryKeys.all });
    },
  });
}