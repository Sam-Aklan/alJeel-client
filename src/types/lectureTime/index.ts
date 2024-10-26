export type newLectureTime ={
    name:string,
    startTime:Date,
    endTime:Date
}

export type udatedLectureTime = Partial<newLectureTime> | undefined
