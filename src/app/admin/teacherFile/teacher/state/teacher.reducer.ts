import { teacherData } from './teacher.interface'
import { createReducer, on } from '@ngrx/store'
import * as action from './teacher.action'



const intiialState : teacherData[] = []

const teacherGetReducer = createReducer(
    intiialState,
    on(action.loadAllTeacherSuccess, (_state, { allteacher }) => {
        return Object.values(allteacher[0]) 
    })
)

export function _teacherGetReducer(state:any,action:any){
    return teacherGetReducer(state,action)
}