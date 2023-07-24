import { createAction, props } from '@ngrx/store';
import { teacherData } from './teacher.interface';


export const loadAllTeacher = createAction('[AllTeacher] Load All Teacher');

export const loadAllTeacherSuccess = createAction('[AllUser] Load All Teacher Success', props<{ allteacher: teacherData[] }>());

export const loadAllTeacherFailure = createAction('[User] Load Teacher Failure', props<{ error: string }>());