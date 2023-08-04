export interface subject {
    subjectName?:string | null | undefined
}

export interface LoadSubject {
    _id:string
    subjectName:string
    teacherCount:number
}