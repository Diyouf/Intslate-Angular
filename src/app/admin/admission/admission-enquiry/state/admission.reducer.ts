import { admissionData } from './admission.interface'
import { createReducer, on } from '@ngrx/store'
import * as action from './admission.action'



const intiialState : admissionData[] = []
type AdmissionAction = typeof action.loadAllAdmissionSuccess

const admissionGetReducer = createReducer(
    intiialState,
    on(action.loadAllAdmissionSuccess, (_state, { allAdmissions }) => {
        return Object.values(allAdmissions[0]) 
    })
)

export function _admissionGetReducer(state:admissionData[],action:AdmissionAction){
    return admissionGetReducer(state,action)
}