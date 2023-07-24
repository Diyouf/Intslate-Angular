import { admissionData } from './admission.interface'
import { createFeatureSelector, createSelector } from '@ngrx/store'

export const selectadmissionState = createFeatureSelector<admissionData[]>('Alladmission')

export const selectAlladmissionData = createSelector(selectadmissionState, (state: admissionData[]) => { return state })
