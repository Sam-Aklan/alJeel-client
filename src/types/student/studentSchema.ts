import { z } from "zod";
const IMAGE_TYPES = ["image/jpeg","image/jpg","image/png"]
export const studentAddSchema = z.object({
    image: z
      //Rest of validations done via react dropzone
      .instanceof(File)
      .refine((file)=>{
        if(file) return IMAGE_TYPES.includes(file.type)
      }
        ,{message:'هذه الصيغة من الصورة ليست مدعومة'}).optional().or(z.literal(undefined)),
      name: z.string(
        {
            required_error:"قم بادخال الاسم"
        }).refine((name)=> name.split(' ').length ===4,{message:"يجب ان يكون طول المدخل اربعة اسماء"}),

        dateOfBirth: z.date({required_error:"الرجاء ادخال تاريخ صحيح"}),
        level:z.string({required_error:"قم بادخال المستوى الدراسي"})
  });

 export const studentsFiltersSchema = z.object(
    {
      name:z.string().optional().or(z.literal(undefined)),
      level:z.string().optional().or(z.literal(undefined))
    }
  )

  export const studentUpdateSchema = studentAddSchema.partial()