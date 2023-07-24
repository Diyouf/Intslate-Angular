import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap} from 'rxjs/operators';
import * as action from './teacher.action'
import { Injectable } from '@angular/core';
import { teacherService } from '../teacher.service';
import { of } from 'rxjs';

@Injectable()
export class AllteacherEffect {

    constructor(
        private action$: Actions,
        private service: teacherService
    ) { }

    LoadUser$ = createEffect(() =>
        this.action$.pipe(
            ofType(action.loadAllTeacher),
            mergeMap(() => {
                return this.service.fetchaAllTeacher().pipe(  
                    map((user) => action.loadAllTeacherSuccess({ allteacher : Object.values(user) })),
                    catchError((error) => of(action.loadAllTeacherFailure({ error })))
                )
            }
            )
        )
    )
}