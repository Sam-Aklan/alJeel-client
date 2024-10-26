export type lectureType = {
    lectureId:string
    levelCourseId:number,
    timeId:string,
    lectureDate:Date
}

export type updateLectureType ={
    id:string
    levelCourseId?:number,
    timeId?:string,
}