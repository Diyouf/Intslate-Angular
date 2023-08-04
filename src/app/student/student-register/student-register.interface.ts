export interface StudnetRegisterData {
    studentId?:number | null | undefined
    email?:string | null | undefined
    password?:string | null | undefined
    phone?:number | null | undefined
    Conpassword?:string | null | undefined
    name?:string | null | undefined
}

export interface returnDataRegister {
    idMatch?:string
    emailMatch?:string
    phoneMatch?:string
    alreadyReg?:string
    success?:boolean
}