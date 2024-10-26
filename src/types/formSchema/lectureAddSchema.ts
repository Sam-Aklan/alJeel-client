import { z } from "zod";

export const lectureAddSchema = z.object(
    {
        subject: z.number({required_error:"اختر مادة"}),
        lectureTime :z.string({required_error:"الرجاء تحديد الفترة الزمنية"}),
        // startTime: z.date({required_error:"hihihi"}),
        // endTime: z.date(),
        // subjectDate:z.date()
    }
)