export interface homeWorkData {
    class?:string | null | undefined,
    homework?:string | null | undefined,
    dueDate?:Date | null | undefined
}

export interface classData{
    _id:string
    className:number
    division:string
}