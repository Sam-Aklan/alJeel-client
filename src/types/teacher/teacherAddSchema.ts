import { z } from "zod";

export const teacherSchema = z.object({
    teacherName: z.string().min(10,{message:"يجب ان يكون الاسم على الاقل عشرة احرف"}),
    specialization:z.string().min(5,{message:"يجب ان يكون اسم التخصص على الاقل خمسة احرف"})
})

