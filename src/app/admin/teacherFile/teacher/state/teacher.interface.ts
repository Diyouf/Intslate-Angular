export interface teacherData {
    _id:string,
    teacherId:number,
    name:string,
    gender:string,
    email: string,
    phone:number,
    subject:{
        _id:string
        subjectName:string
    }, 
    address:string,
    image:string
    is_classTeacher:boolean
    class?:{
        className:number
        division:string
    }

}