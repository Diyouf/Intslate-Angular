import { teacherData } from './teacher.interface'
import { createFeatureSelector, createSelector } from '@ngrx/store'

export const selectteacherState = createFeatureSelector<teacherData[]>('Allteacher')

export const selectAllteacherData = createSelector(selectteacherState, (state: teacherData[]) => { return state })
