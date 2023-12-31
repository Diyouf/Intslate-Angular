export interface AddAttendance {
    attendance: { studentId: string; attendance: 'present' | 'absent' }[];
  }
  

export interface attendanceData {
  _id?: string
  class:string
  date : string
  attendance:[
    {
      studentId:{
        image:string
        name:string
        email:string
      },
      attendance:string,
    }
  ]
}