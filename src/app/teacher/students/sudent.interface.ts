export interface studentData {
  _id: string;
  studentId: number;
  name: string;
  email: string;
  phone: number;
  class: {
    _id: string;
    className: number;
    division: string;
    students: number;
    maxStudent: number;
    classTeacher: string;
  };
  image: string;
  Guardname:string
  age:number
  relation: string
}
