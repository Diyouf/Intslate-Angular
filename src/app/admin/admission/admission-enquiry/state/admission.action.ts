import { createAction, props } from '@ngrx/store';
import { admissionData } from './admission.interface';


export const loadAllAdmission = createAction('[AllAdmissiom] Load All Admission');

export const loadAllAdmissionSuccess = createAction('[AllAdmissiom] Load All Admission Success', props<{ allAdmissions: admissionData[] }>());

export const loadAllAdmissionFailure = createAction('[Admission] Load Admission Failure', props<{ error: string }>());