import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap} from 'rxjs/operators';
import * as action from './admission.action'
import { Injectable } from '@angular/core';
import { admissionActionService } from '../admission-enquiry.service';
import { of } from 'rxjs';

@Injectable()
export class AlladmissionEffect {

    constructor(
        private action$: Actions,
        private service: admissionActionService
    ) { }

    LoadUser$ = createEffect(() =>
        this.action$.pipe(
            ofType(action.loadAllAdmission),
            mergeMap(() => {
                return this.service.fetchAdmission().pipe(
                    map((user) => action.loadAllAdmissionSuccess({ allAdmissions : Object.values(user) })),
                    catchError((error) => of(action.loadAllAdmissionFailure({ error })))
                )
            }
            )
        )
    )
}