import { admissionData } from './admission.interface'
import { createReducer, on } from '@ngrx/store'
import * as action from './admission.action'



const intiialState : admissionData[] = []

const admissionGetReducer = createReducer(
    intiialState,
    on(action.loadAllAdmissionSuccess, (_state, { allAdmissions }) => {
        console.log(allAdmissions);
        return Object.values(allAdmissions[0]) 
    })
)

export function _admissionGetReducer(state:any,action:any){
    return admissionGetReducer(state,action)
}