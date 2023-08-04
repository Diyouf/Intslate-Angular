export interface studentProfileData {
    studentId:number
    name : string
    class : {
        className:number
        division:string
        classTeacher:{
            name:string
        }
    }
    Guardname:string
    email:string
    phone:number
    image:string
}