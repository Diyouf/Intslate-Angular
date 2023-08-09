export interface teacherData {
    _id:string,
    name:string,
    phone:number,
    subject:{
        subjectName:string
    }, 
    image:string
    
}

export interface returnData {
    success?:true
    _id?:string
    connection?:{
        student: {
            _id:string
            image:string
        };
        teacher: {
            _id:string
            image:string
        };
    }

}