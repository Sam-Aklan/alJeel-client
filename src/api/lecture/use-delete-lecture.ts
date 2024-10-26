import { useMutation, useQueryClient } from '@tanstack/react-query';
import { lectureQueryKeys } from '@/api/lecture'
import { apiClient } from '@/config/axios';
import { toast } from 'sonner';

// export interface Props {
//   closeModal: () => void;
//   id?: number;
// }

export function useDeleteLecture() {
  const queryClient = useQueryClient();

  const deleteUserFn = async (id: string) => {
    try {
      
      const response = await apiClient.delete(`lecture/${id}`);
      return response;
    } catch (error : any ) {
      throw Error(error.message)
    }
  };

  return useMutation({
    mutationFn: deleteUserFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: lectureQueryKeys.all });
    },
    onSuccess: () => {
      toast.success('تمت عملية الحذف بنجاح')
    },
    onError: () => {
      toast.error('حدث خطا وقت عملية الحذف')
      queryClient.invalidateQueries({ queryKey: lectureQueryKeys.all });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: lectureQueryKeys.all });
      // closeModal();
    },
  });
}