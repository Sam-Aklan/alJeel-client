import { level } from "../level"

export type Student ={
    id:string,
    name:string,
    dateOfBirth:Date,
    image?:File,
    levelId:string,
}
export type StudentType = {
    id:string,
    name:string,
    dateOfBirth:Date,
    imagePath:string|null,
    level:{
        id:string,
        levelName:string
    }
}
export type studentNormalizeType = {
    id:string,
    name:string,
    dateOfBirth:Date,
    imagePath:string|null,
    levelId:string,
    levelName:string
}
export type StudentPagePayload = {
    students: studentNormalizeType[],
    levels: level[]
    totalCount:number,
    prevouisPage:number,
    isNext:boolean,
    currentPage:number,
}

export type StudentFilters ={
    name?:string,
    levelId?:string,
    page?:number
    pageLimit?:number
}

export type StudentUpdateType = {
    id:string,
    name:string,
    image?:File,
    dateOfBirth:string,
    levelId:string,
}

 export type studentinfoUpdate  = Partial<StudentUpdateType>