import { useMutation, useQueryClient } from '@tanstack/react-query';
import { teacherQueryKeys } from '@/api/teacher'
import { apiClient } from '@/config/axios';
import { toast } from 'sonner';

// export interface Props {
//   closeModal: () => void;
//   id?: number;
// }

export function useDeleteTeacher() {
  const queryClient = useQueryClient();

  const deleteUserFn = async (id: string) => {
    try {
      
      const response = await apiClient.delete(`teacher/${id}`);
      toast.success("تمت عملية الخذف بنجاح")
      return response;
    } catch (error : any ) {
      toast.error("لم تتم عملية الحذف")
    }
  };

  return useMutation({
    mutationFn: deleteUserFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: teacherQueryKeys.all });
    },
    onSuccess: () => {
      toast.success('تمت عملية الحذف بنجاح')
    },
    onError: () => {
      toast.error('حدث خطا وقت عملية الحذف')
      queryClient.invalidateQueries({ queryKey: teacherQueryKeys.all });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: teacherQueryKeys.all });
      // closeModal();
    },
  });
}