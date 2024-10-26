import { useMutation, useQueryClient } from '@tanstack/react-query';
import { lectureQueryKeys } from '@/api/lecture';
import { TSFixMe,} from '@/types';
import {updateLectureType} from '@/types/lecture'
import { apiClient } from '@/config/axios';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

export function useEditLecture() {
  const queryClient = useQueryClient();

  
  // https://react-query.tanstack.com/guides/optimistic-updates#updating-a-single-todo
  const editLectureFn = async (updatedLecture: updateLectureType) => {
    if(!updatedLecture) throw new Error(`can not send undefined data for updating a teacher`)
      try {
        
    const {levelCourseId,timeId,id} = updatedLecture
    if(!id) throw new Error('id not provided')
    const response = await apiClient.patch(`lecture/${id}`,{levelCourseId,timeId});
    return response;
      } catch (error:any) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 400) {
            
            toast.error('حدث خطا عند ارسال الطلب')
            return
          }
        }
       toast.error("حدث خطاء في الخادم")
      }
  };
  return useMutation({
    mutationFn: editLectureFn,
    onMutate: async (updatedLecture) => {
      await queryClient.cancelQueries({queryKey:lectureQueryKeys.detail(updatedLecture.id!)});
      const previousLecture = queryClient.getQueryData(
        lectureQueryKeys.detail(updatedLecture.id!)
      );
      queryClient.setQueryData(lectureQueryKeys.detail(updatedLecture.id!), updatedLecture);
      return { previousLecture: previousLecture, updatedLecture: updatedLecture };
    },
    onError: (_, updatedLecture, context?: TSFixMe) => {
      queryClient.setQueryData(
        lectureQueryKeys.detail(updatedLecture.id!),
        context.previousLecture
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey:lectureQueryKeys.all});
    },
    retry:1
  });
}