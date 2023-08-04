export interface HomeWork {
    dueDate: Date;
    homework: string;
    date: Date;
    teacher: {
      _id:string
    }; // You can use `Types.ObjectId` here if you are importing it from Mongoose
    class: {
      _id : string
      className:number
      division:string

    }; // You can use `Types.ObjectId` here if you are importing it from Mongoose
  }
  