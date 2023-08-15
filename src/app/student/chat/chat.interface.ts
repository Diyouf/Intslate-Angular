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

export interface allChat {
    _id: string;
    content: string;
    date: string;
    from: string;
    to: string;
    connection?:{
      connection?: {
          student: {
            _id: string;
            image: string;
            name: string;
            class: {
              className: number;
              division: string;
            };
          };
          teacher: {
            _id: string;
            image: string;
          };
        };
    }
   
  }

  export interface Message {
    senderName:string 
    message:string 
    connectionId:string 
    to:{
        _id:string 
    }
  }