import { useMutation, useQueryClient } from '@tanstack/react-query';
import { studentQueryKeys } from '@/api/student'
import { apiClient } from '@/config/axios';
import { toast } from 'sonner';

// export interface Props {
//   closeModal: () => void;
//   id?: number;
// }

export function useDeleteStudent() {
  const queryClient = useQueryClient();

  const deleteStudentFn = async (id: string) => {
    try {
      
      const response = await apiClient.delete(`student/${id}`);
      return response;
    } catch (error : any ) {
      throw Error(error.message)
    }
  };

  return useMutation({
    mutationFn: deleteStudentFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: studentQueryKeys.all });
    },
    onSuccess: () => {
      toast.success('تمت عملية الحذف بنجاح')
    },
    onError: () => {
      toast.error('حدث خطا وقت عملية الحذف')
      queryClient.invalidateQueries({ queryKey: studentQueryKeys.all });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: studentQueryKeys.all });
      // closeModal();
    },
  });
}