export interface StudentLoginData {
    studentId?:number | null | undefined
    email?:string | null | undefined
    password?:string | null | undefined
}

export interface returndata {
    idNotmatch?:string
    emailError?:string
    passError?:string
    regError?:string
    msg?:string
    success?:boolean
    id:string
    access_token:string
}