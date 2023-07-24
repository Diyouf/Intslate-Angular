import { createAction, props } from '@ngrx/store';
import { studentData } from './student.interface';


export const loadAllStudent = createAction('[AllStudent] Load All Student');

export const loadAllStudentSuccess = createAction('[AllStudent] Load All Student Success', props<{ allStudent: studentData[] }>());

export const loadAllStudentFailure = createAction('[User] Load Student Failure', props<{ error: string }>());