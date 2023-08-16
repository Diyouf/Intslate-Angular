export interface formData {
    currentPass?:string | null | undefined
    newPass?:string | null | undefined
    confirmPass?:string | null | undefined
}

export interface returnData {
    success?:boolean,
    currWrong?:string
}