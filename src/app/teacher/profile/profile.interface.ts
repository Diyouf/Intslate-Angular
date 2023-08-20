export  interface teacherProfileData {
    image:string
    teacherId:number
    name:string
    email:string
    phone:number
    class:{
        className:number
        division:string
    }
    subject:{
        subjectName:string
    }
    address:string
    is_delete:boolean
}