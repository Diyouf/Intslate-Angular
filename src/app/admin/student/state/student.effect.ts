import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap} from 'rxjs/operators';
import * as action from './student.action'
import { Injectable } from '@angular/core';
import { StudentService } from '../student.service';
import { of } from 'rxjs';

@Injectable()
export class AllStudentEffect {

    constructor(
        private action$: Actions,
        private service: StudentService
    ) { }

    LoadUser$ = createEffect(() =>
        this.action$.pipe(
            ofType(action.loadAllStudent),
            mergeMap(() => {
                return this.service.fetchStudent().pipe(  
                    map((user) => action.loadAllStudentSuccess({ allStudent : Object.values(user) })),
                    catchError((error) => of(action.loadAllStudentFailure({ error })))
                )
            }
            )
        )
    )
}