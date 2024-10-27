import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "@/components/ui/form";
import {DatePicker, Select, SelectItem,Input as InputNx, Button} from "@nextui-org/react";
import { ImagePlus, Info, XIcon } from "lucide-react";
import { toast } from "sonner";
import { studentAddSchema, studentUpdateSchema } from "@/types/student/studentSchema";
import { level } from "@/types/level";
import { useCreateStudent, useEditStudent } from "@/api/student";
import { studentinfoUpdate, StudentUpdateType } from "@/types/student";
import { useNavigate } from "react-router-dom";
import {DateValue, parseAbsoluteToLocal} from "@internationalized/date";

import { IMAGE_BASE_URL } from "@/config/enviroment";


export const StudentForm= ({levels,studentPayload}:{levels:level[],studentPayload?
  :StudentUpdateType}) => {
  const [preview, setPreview] = React.useState<string | ArrayBuffer | null>(studentPayload?.image? IMAGE_BASE_URL+ studentPayload.image.name :null);

  const editStudent = useEditStudent()

  const form = useForm<z.infer<typeof studentAddSchema>>({
    resolver: zodResolver(studentAddSchema),
    mode: "onBlur",
    defaultValues: {
      image: studentPayload?.image?studentPayload.image:undefined,
      dateOfBirth:studentPayload?new Date(studentPayload.dateOfBirth):undefined,
      level:studentPayload?studentPayload.levelId:undefined,
      name:studentPayload?studentPayload.name:undefined
    },
  });

  const navigate = useNavigate()

  const [date]= useState<DateValue|undefined>(studentPayload?parseAbsoluteToLocal(studentPayload.dateOfBirth):undefined)

  // if(studentPayload)
  // {console.log(parseAbsoluteToLocal(studentPayload?.dateOfBith.toString()))}
  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader();
      try {
        reader.onload = () => setPreview(reader.result);
        reader.readAsDataURL(acceptedFiles[0]);
        form.setValue("image", acceptedFiles[0]);
        form.clearErrors("image");
      } catch (error) {
        setPreview(null);
        form.resetField("image");
      }
    },
    [form],
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      maxSize: 2000000,
      accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
    });
    
    // create student mutation
    const createStudent = useCreateStudent()

  const handleSubmit = async(values: z.infer<typeof studentAddSchema>) => {
    let studentDate:{
      name:string,
      dateOfBirth:Date,
      image?:File,
      levelId:string,
    } ={
      name:'',
      dateOfBirth: new Date(),
      image:undefined,
      levelId:''
    }
    if (values.image) {
        studentDate.image =values.image
        console.log(values.image)
    }
    studentDate.name = values.name
    studentDate.dateOfBirth = values.dateOfBirth
    studentDate.levelId = values.level
    try {
      
      await createStudent.mutateAsync(studentDate)
    } catch (err:any) {
      toast.error(createStudent.error?.message)
    }
    
    createStudent.isSuccess && toast.success("تم تنشاء المستخدم بنجاح")
    setTimeout(()=>navigate('/students'),1000)
  };

  const handleUpdate = async(values:z.infer<typeof studentUpdateSchema>)=>{
    if(studentPayload){
    if(studentPayload?.image?.name === values.image?.name&&
      studentPayload?.name === values.name&&
      new Date(studentPayload?.dateOfBirth).getDate() === values.dateOfBirth?.getDate()&&
      studentPayload?.levelId === values.level
    ) 
    {
    toast.warning("لم يتم تحديث البيانات")
    return
  }}
  
  if(!values) return toast.warning("لايوجد بيانات لتحديثها")
    let studentDate:studentinfoUpdate&{oldImage?:string,
      updatedImage?:File}={
      dateOfBirth:values.dateOfBirth?.toISOString(),
      levelId:values.level,
      name:values.name
    }
    if(values.image?.name !== studentPayload?.image?.name && studentPayload?.image){
      studentDate.updatedImage = values.image
      studentDate.oldImage = studentPayload.image.name
    }
    if(!values.image && studentPayload?.image){
      studentDate.oldImage = studentPayload.image.name
    }
    if(values.image){
      studentDate.updatedImage = values.image
    }
    // console.log("students data: ", studentDate)
    await editStudent.mutateAsync(studentDate)
    
    // if(editStudent.error){
    //   toast.error("حدث خطاء")
    //   return
    // }
    if(editStudent.isSuccess) toast.success('تمت عملية التعديل بنجاح')
    
  setTimeout(()=>navigate('/students'),1000)
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-full ">

    <Form {...form}>
      <form onSubmit={studentPayload?form.handleSubmit(handleUpdate):form.handleSubmit(handleSubmit)} className="w-full h-full flex flex-col mx-2 justify-center items-center">
        <div className="flex flex-col justify-center items-end gap-2">
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem className="w-1/2 border-none">
              <FormLabel
                className={`${
                  fileRejections.length !== 0 && "text-destructive"
                }`}
              >
                <p className="text-sm font-semibold tracking-tight text-right">
                  حمل الصورة
                  <span
                    className={
                      form.formState.errors.image || fileRejections.length !== 0
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }
                  ></span>
                </p>
              </FormLabel>
              <FormControl>
                <div
                  {...getRootProps()}
                  className="mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border border- p-8 shadow-sm  max-w[350px] max-h-[400px] relative bg-white"
                >
                  {form.getValues("image")?.size && <XIcon width={`15px`} height={`15px`} className="bg-danger text-[#fff] rounded-md absolute top-1 right-2" onClick={()=>{
                     form.setValue("image",undefined)
                     setPreview(null)}}/>}
                    <div className="flex flex-col justify-center items-end">

                  {preview && (
                    <img
                    src={preview as string}
                    alt="Uploaded image"
                    className="max-h-[300px] rounded-lg max-w-full"
                    />
                  )}
                  <ImagePlus
                    className={`size-10 ${preview ? "hidden" : "block"}`}
                    />
                  <Input {...getInputProps()} type="file" 
                  />
                  {isDragActive ? (
                    <p className="text-sm text-success">افلت الصورة!</p>
                  ) : (
                    form.getValues("image")?.size?(
                      <div className="flex gap-1 justify-center items-start ">
                      <p  dir="rtl" className="text-xs">تم تحميل صورة يمكنك تغيرها عن طريق النقر عليها
                      </p>
                      <Info width={`15px`} height={`15px`} className="p-2  text-primary-300 text-xl w-4 h-4"/>
                    </div>
                    ):(
                      <p className="text-sm">
                        حمل صورة او قم بسحب صورة و افلاتها
                      </p>
                    )
                    
                  )}
                  </div>

                </div>
              </FormControl>
              <FormMessage>
                {fileRejections.length !== 0 && (
                  <p>
                    يجب ان يكون حجم الصورة اقل من <span>1mb</span>
                  </p>
                )}
              </FormMessage>
            </FormItem>
          )}
          
        />
        <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                const {error} = useFormField()
                return(
                  <div className="flex flex-col gap-2 justify-center items-end  w-[500px] sm:w-[300px]">
                    <FormLabel className="flex justify-end">الاسم الرباعي</FormLabel>
                    <InputNx
                    errorMessage={error?.message}
                    isInvalid={!!error?.message}
                    variant="bordered"
                    defaultValue={studentPayload?studentPayload.name:undefined}
                    classNames={
                      {base:"bg-white"}
                    }
                    {...field}/>
                  </div>
                )
            }}
            />
            <FormField
          control={form.control}
          name="dateOfBirth"
          render={() => {
            const {error} = useFormField()
            return(
            <div className="flex flex-col gap-2 justify-center items-end  w-[500px] sm:w-[300px]">

              <FormLabel>تاريخ الميلاد</FormLabel>
              <DatePicker
              variant="bordered"
              showMonthAndYearPickers
              onChange={(dateValue)=>form.setValue("dateOfBirth",new Date(dateValue.toString()))}
              errorMessage={error?.message}
              // isInvalid={!!error?.message}
              value={date}
              classNames={
                {base:"bg-white"}
              }
            />
              
            </div>
              
          )}}
        />
        <FormField
        control={form.control}
        name="level"
        render={()=>{
        const {error} = useFormField()
        return (
        <div className="w-[500px] sm:w-[300px] text-right flex flex-col gap-2">
          <FormLabel>المستوى الدراسي</FormLabel>
        <Select
        items={levels}
        variant="bordered"
        placeholder=""
        dir="rtl"
        defaultSelectedKeys={studentPayload?[studentPayload.levelId]:undefined}
        classNames={
          {
            base:"bg-white"
          }
        }
        onSelectionChange={(e)=>form.setValue('level',e.currentKey||"-1")}
        errorMessage={error?.message }
        isInvalid={!!error?.message}
        >
          {(level) => <SelectItem key={level.id} value={level.id}>{level.levelName}</SelectItem>}
        </Select>
        </div>
        )
        }}/>
        <Button
          type="submit"
          isDisabled={form.formState.isSubmitting || form.formState.isLoading}
          color="primary"
          radius="sm"
        >
          ارسال
        </Button>
        </div>
      </form>
    </Form>
    </div>
  );
};

