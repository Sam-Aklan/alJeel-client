import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { studentQueryKeys } from '@/api/student';
import { TSFixMe,} from '@/types';
import {studentinfoUpdate, } from '@/types/student'
import { apiClient } from '@/config/axios';
import { AxiosError } from 'axios';

export function useEditStudent() {
  const { studentId } = useParams();
  const queryClient = useQueryClient();

  // if(!studentId) throw new Error('teacher id of wrong type')
  // https://react-query.tanstack.com/guides/optimistic-updates#updating-a-single-todo
  const editUserFn = async (updatedUser: Omit<studentinfoUpdate,'id'>&{oldImage?:string,updatedImage?:File}) => {
    if(!updatedUser) throw new Error(`can not send undefined data for updating a teacher`)
      try {
        const formData = new FormData()
        if(updatedUser.name)formData.append('name',updatedUser.name)
        if(updatedUser.dateOfBirth) formData.append('dateOfBirth',updatedUser.dateOfBirth)
        if(updatedUser.updatedImage) formData.append('updatedImage',updatedUser.updatedImage)
        if(updatedUser.oldImage) formData.append('oldImage',updatedUser.oldImage)
        if(updatedUser.levelId) formData.append('levelId',updatedUser.levelId)
    console.log("student update info",updatedUser,"old image",updatedUser.oldImage)
    const response = await apiClient.patch(`student/${studentId}`,formData);
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
      await queryClient.cancelQueries({queryKey:studentQueryKeys.detail(studentId!)});
      const previousUser = queryClient.getQueryData(
        studentQueryKeys.detail(studentId!)
      );
      queryClient.setQueryData(studentQueryKeys.detail(studentId!), updatedUser);
      return { previousUser: previousUser, updatedUser: updatedUser };
    },
    onError: (err, updatedUser, context?: TSFixMe) => {
      queryClient.setQueryData(
        studentQueryKeys.detail(studentId!),
        context.previousUser
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey:studentQueryKeys.all});
    },
  });
}