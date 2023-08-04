import { teacherData } from './teacher.interface'
import { createReducer, on } from '@ngrx/store'
import * as action from './teacher.action'



const intiialState : teacherData[] = []
type teacherAction = typeof action.loadAllTeacherSuccess

const teacherGetReducer = createReducer(
    intiialState,
    on(action.loadAllTeacherSuccess, (_state, { allteacher }) => {
        
        return allteacher
    })
)

export function _teacherGetReducer(state:teacherData[],action:teacherAction){
    return teacherGetReducer(state,action)
}