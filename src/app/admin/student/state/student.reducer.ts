import { studentData } from './student.interface'
import { createReducer, on } from '@ngrx/store'
import * as action from './student.action'



const intiialState: studentData[] = []

const studentGetReducer = createReducer(
    intiialState,
    on(action.loadAllStudentSuccess, (_state, { allStudent }) => {
        return Object.values(allStudent[0])
    })
)

export function _studentGetReducer(state: any, action: any) {
    return studentGetReducer(state, action)
}