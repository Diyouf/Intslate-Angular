export interface TeacherloginData {
    teacherId?:number | null | undefined
    email?:string | null | undefined
    password?:string | null | undefined
}

export interface returnData {
    idNotmatch?:string
    emailError?:string
    passError?:string
    regError?:string
    msg?:string
    success?:boolean
    id:string
    access_token:string
}