export interface studentData {
  _id:string
  studentId: number;
  name: string;
  email: string;
  phone: number;
  class: {
    _id:string,
    className: number;
    division: string;
    classTeacher: {
      name:string
    };
  };
  image: string;
  DOB:Date
  gender:string
  address:string
  status?:boolean
  city:string
  state:string
  zip:string
  Guardname:string
  relation:string

}
