export interface HomeWork {
    dueDate: Date;
    homework: string;
    date: Date;
    teacher: any; // You can use `Types.ObjectId` here if you are importing it from Mongoose
    class: any; // You can use `Types.ObjectId` here if you are importing it from Mongoose
  }
  