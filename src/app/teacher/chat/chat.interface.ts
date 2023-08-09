export interface connectionData{
    success?:true
    _id?:string
    connection?:{
        student: {
            _id:string
            image:string
            name:string
            class:{
                className:number
                division:string
            }
        };
        teacher: {
            _id:string
            image:string
        };
    }
}