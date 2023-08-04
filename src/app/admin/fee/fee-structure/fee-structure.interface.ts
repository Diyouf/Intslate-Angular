export interface FeeStructure {
    _id:string
    term1:{
        amount : number
    }
    term2:{
        amount : number
    }
    term3:{
        amount : number
    }
}

export interface StudnetFeeData {
    student:{
        name?: string,
        class:{
            className:number,
            division:string
        }
    }
    term1:{
        status:string
    }
    term2:{
        status:string
    }
    term3:{
        status:string
    }
}