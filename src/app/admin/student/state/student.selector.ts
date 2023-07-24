import { studentData } from './student.interface'
import { createFeatureSelector, createSelector } from '@ngrx/store'

export const selectStudentState = createFeatureSelector<studentData[]>('Allstudent')

export const selectAllStudentData = createSelector(selectStudentState, (state: studentData[]) => { return state })
