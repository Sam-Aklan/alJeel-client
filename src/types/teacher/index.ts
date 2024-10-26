
export type Teacher ={
    id:string,
    name:string,
    specialization:string
}

export type UpdateTeacher = {
    id:string,
    name?:string,
    specialization?:string
}

export type TeacherPayload = {
    id:string,
    teacherName:string,
    specialization:string,
}