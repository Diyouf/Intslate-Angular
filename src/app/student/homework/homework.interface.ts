export interface Homework {
    _id:string
    teacher:{
        image:string
        subject:{
            subjectName:string
        }
    }
    date:Date
    homework:string
    dueDate:Date
}