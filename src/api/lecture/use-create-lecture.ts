import { useMutation, useQueryClient } from '@tanstack/react-query';
import { lectureQueryKeys } from '@/api/lecture';
import { TSFixMe,} from '@/types';
import {lectureType} from '@/types/lecture';
import { apiClient } from '@/config/axios';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const createLectureFn = async (newLecture: Omit<lectureType,'lectureId'>) => {
  try {
    
    const response = await apiClient.post('/lecture', newLecture);
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status ===422) {
        throw Error('لم يتم ادخال البيانات المطلوبة بشكل صحيح')
      }
      if (err.response?.status ===400) {
        throw Error('خطا في ارسال الطلب')
      }
    }
    throw Error('حدث خطاء وقت ارسال البيانات الى الخادم')
  }
};

// https://tanstack.com/query/latest/docs/react/guides/optimistic-updates
export function useCreateLecture() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLectureFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: lectureQueryKeys.all });
    },
    onSuccess: (data) => {
      toast.success('تم عملية الاضافة بنجاح')
    },
    onError: (err, newLecture, context?: TSFixMe) => {
      console.log(context)
      queryClient.setQueryData(lectureQueryKeys.all, context.previousLectures);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: lectureQueryKeys.all });
    },
  });
}