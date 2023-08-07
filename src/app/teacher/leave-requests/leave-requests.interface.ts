export interface LeaveReqData {
    _id:string
    noofday:number
    startDate:Date
    endDate:Date
    currentDate:Date
    reason:string
    student:{
        name : string
    }
    status:string
}