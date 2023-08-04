export interface addTeacherModel {
    _id:string
    name: string
    gender: string
    email: string
    phone: number
    subject: string
    address: string
    image: string
}

export interface returnData {
    EmailError?:string
    Phoneerror?:string
}